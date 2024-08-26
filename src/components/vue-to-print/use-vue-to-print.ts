import { type Font, type PublicUseVueToPrintProps, type UseVueToPrintProps } from "./types";
import * as ShadowDomSupport from "./supports/shadow-dom";
import { deepCloneNode } from "./clone-node";
import { toValue } from "vue";

/**
 * The default props in Vue are set within vueToPrintProps too.
 */
// NOTE: https://github.com/Microsoft/TypeScript/issues/23812
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultProps = {
  copyStyles: true,
  pageStyle: `
        @page {
            /* Remove browser default header (title) and footer (url) */
            margin: 0;
        }
        @media print {
            body {
                /* Tell browsers to print background colors */
                -webkit-print-color-adjust: exact; /* Chrome/Safari/Edge/Opera */
                color-adjust: exact; /* Firefox */
            }
        }
    `,
  removeAfterPrint: false,
  suppressErrors: false
};

export function useVueToPrint(props: PublicUseVueToPrintProps) {
  props = { ...defaultProps, ...props };

  let numResourcesToLoad = 0;
  let resourcesLoaded: (Element | Font | FontFace)[] = [];
  let resourcesErrored: (Element | Font | FontFace)[] = [];

  const startPrint = (target: HTMLIFrameElement) => {
    const onAfterPrint = toValue(props.onAfterPrint);
    const onPrintError = toValue(props.onPrintError);
    const print = toValue(props.print);
    const documentTitle = toValue(props.documentTitle);

    // Some browsers such as Safari don't always behave well without this timeout
    setTimeout(() => {
      if (target.contentWindow) {
        target.contentWindow.focus(); // Needed for IE 11

        if (print) {
          print(target)
            .then(() => onAfterPrint?.())
            .then(() => handleRemoveIframe())
            .catch((error: Error) => {
              if (onPrintError) {
                onPrintError("print", error);
              } else {
                logMessages(["An error was thrown by the specified `print` function"]);
              }
            });
        } else {
          if (target.contentWindow.print) {
            const tempContentDocumentTitle = target.contentDocument?.title ?? "";
            const tempOwnerDocumentTitle = target.ownerDocument.title;

            // Override page and various target content titles during print
            // NOTE: some browsers seem to take the print title from the highest level
            // title, while others take it from the lowest level title. So, we set the title
            // in a few places and hope the current browser takes one of them :pray:
            if (documentTitle) {
              // Print filename in Chrome
              target.ownerDocument.title = documentTitle;

              // Print filename in Firefox, Safari
              if (target.contentDocument) {
                target.contentDocument.title = documentTitle;
              }
            }

            target.contentWindow.print();

            // Restore the page's original title information
            if (documentTitle) {
              target.ownerDocument.title = tempOwnerDocumentTitle;

              if (target.contentDocument) {
                target.contentDocument.title = tempContentDocumentTitle;
              }
            }
          } else {
            // Some browsers, such as Firefox Android, do not support printing at all
            // https://developer.mozilla.org/en-US/docs/Web/API/Window/print
            logMessages([
              "Printing for this browser is not currently possible: the browser does not have a `print` method available for iframes."
            ]);
          }

          onAfterPrint?.();
          handleRemoveIframe();
        }
      } else {
        logMessages([
          "Printing failed because the `contentWindow` of the print iframe did not load. This is possibly an error with `vue-to-print`. Please file an issue: https://github.com/gregnb/react-to-print/issues/"
        ]);
      }
    }, 500);
  };

  const triggerPrint = (target: HTMLIFrameElement) => {
    const onBeforePrint = toValue(props.onBeforePrint);
    const onPrintError = toValue(props.onPrintError);

    if (onBeforePrint) {
      const onBeforePrintOutput = onBeforePrint();
      if (onBeforePrintOutput && typeof onBeforePrintOutput.then === "function") {
        onBeforePrintOutput
          .then(() => {
            startPrint(target);
          })
          .catch((error: Error) => {
            if (onPrintError) {
              onPrintError("onBeforePrint", error);
            }
          });
      } else {
        startPrint(target);
      }
    } else {
      startPrint(target);
    }
  };

  const handleClick = () => {
    const onBeforeGetContent = toValue(props.onBeforeGetContent);
    const onPrintError = toValue(props.onPrintError);

    if (onBeforeGetContent) {
      const onBeforeGetContentOutput = onBeforeGetContent();
      if (onBeforeGetContentOutput && typeof onBeforeGetContentOutput.then === "function") {
        onBeforeGetContentOutput.then(handlePrint).catch((error: Error) => {
          if (onPrintError) {
            onPrintError("onBeforeGetContent", error);
          }
        });
      } else {
        handlePrint();
      }
    } else {
      handlePrint();
    }
  };

  const handlePrint = async () => {
    // const { bodyClass, content, copyStyles, fonts, pageStyle, nonce } = props;
    const bodyClass = toValue(props.bodyClass);
    const content = toValue(props.content);
    const copyStyles = toValue(props.copyStyles);
    const fonts = toValue(props.fonts);
    const pageStyle = toValue(props.pageStyle);
    const nonce = toValue(props.nonce);

    const contentEl = content;

    if (contentEl === undefined) {
      logMessages([
        "To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples"
      ]);
      return;
    }

    if (contentEl === null) {
      logMessages([
        'There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing "vue-to-print" to be called.'
      ]);
      return;
    }

    const printWindow = document.createElement("iframe");
    printWindow.width = `${document.documentElement.clientWidth}px`;
    printWindow.height = `${document.documentElement.clientHeight}px`;
    printWindow.style.position = "absolute";
    printWindow.style.top = `-${document.documentElement.clientHeight + 100}px`;
    printWindow.style.left = `-${document.documentElement.clientWidth + 100}px`;
    printWindow.id = "printWindow";
    // Ensure we set a DOCTYPE on the iframe's document
    // https://github.com/gregnb/react-to-print/issues/459
    printWindow.srcdoc = "<!DOCTYPE html>";

    const contentNodes = contentEl;

    if (!contentNodes) {
      logMessages([
        '"vue-to-print" could not locate the DOM node corresponding with the `content` prop'
      ]);
      return;
    }

    // React components can return a bare string as a valid JSX response
    const clonedContentNodes = await deepCloneNode(contentNodes);
    // const isText = clonedContentNodes instanceof Text;

    const globalStyleLinkNodes = document.querySelectorAll("link[rel~='stylesheet']");

    const numFonts = fonts ? fonts.length : 0;

    numResourcesToLoad = globalStyleLinkNodes.length + numFonts;
    resourcesLoaded = [];
    resourcesErrored = [];

    const markLoaded = (resource: Element | Font | FontFace, errorMessages?: unknown[]) => {
      if (resourcesLoaded.includes(resource)) {
        logMessages(["Tried to mark a resource that has already been handled", resource], "debug");
        return;
      }

      if (!errorMessages) {
        resourcesLoaded.push(resource);
      } else {
        logMessages([
          '"vue-to-print" was unable to load a resource but will continue attempting to print the page',
          ...errorMessages
        ]);
        resourcesErrored.push(resource);
      }

      // We may have errors, but attempt to print anyways - maybe they are trivial and the
      // user will be ok ignoring them
      const numResourcesManaged = resourcesLoaded.length + resourcesErrored.length;

      if (numResourcesManaged === numResourcesToLoad) {
        triggerPrint(printWindow);
      }
    };

    printWindow.onload = async () => {
      // Some agents, such as IE11 and Enzyme (as of 2 Jun 2020) continuously call the
      // `onload` callback. This ensures that it is only called once.
      printWindow.onload = null;

      const domDoc = printWindow.contentDocument || printWindow.contentWindow?.document;

      if (domDoc) {
        domDoc.body.appendChild(clonedContentNodes);

        if (fonts) {
          if (printWindow.contentDocument?.fonts && typeof FontFace !== "undefined") {
            fonts.forEach((font) => {
              const fontFace = new FontFace(font.family, font.source, {
                weight: font.weight,
                style: font.style
              });
              printWindow.contentDocument!.fonts.add(fontFace);
              fontFace.loaded
                .then(() => {
                  markLoaded(fontFace);
                })
                .catch((error: Error) => {
                  markLoaded(fontFace, [
                    "Failed loading the font:",
                    fontFace,
                    "Load error:",
                    error
                  ]);
                });
            });
          } else {
            fonts.forEach((font) => markLoaded(font)); // Pretend we loaded the fonts to allow printing to continue
            logMessages([
              '"vue-to-print" is not able to load custom fonts because the browser does not support the FontFace API but will continue attempting to print the page'
            ]);
          }
        }

        const defaultPageStyle = typeof pageStyle === "function" ? pageStyle() : pageStyle;

        if (typeof defaultPageStyle !== "string") {
          logMessages([
            `"vue-to-print" expected a "string" from \`pageStyle\` but received "${typeof defaultPageStyle}". Styles from \`pageStyle\` will not be applied.`
          ]); // eslint-disable-line max-len
        } else {
          const styleEl = domDoc.createElement("style");
          if (nonce) {
            styleEl.setAttribute("nonce", nonce);
            domDoc.head.setAttribute("nonce", nonce);
          }
          styleEl.appendChild(domDoc.createTextNode(defaultPageStyle));
          domDoc.head.appendChild(styleEl);
        }

        if (bodyClass) {
          domDoc.body.classList.add(...bodyClass.split(" "));
        }

        if (copyStyles) {
          const headEls = document.querySelectorAll("style, link[rel~='stylesheet']");
          for (let i = 0, headElsLen = headEls.length; i < headElsLen; ++i) {
            const node = headEls[i];

            if (node.tagName.toLowerCase() === "style") {
              // <style> nodes
              const newHeadEl = domDoc.createElement(node.tagName);
              const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet;
              if (sheet) {
                let styleCSS = "";
                // NOTE: for-of is not supported by IE
                try {
                  // Accessing `sheet.cssRules` on cross-origin sheets can throw
                  // security exceptions in some browsers, notably Firefox
                  // https://github.com/gregnb/react-to-print/issues/429
                  const cssLength = sheet.cssRules.length;
                  for (let j = 0; j < cssLength; ++j) {
                    if (typeof sheet.cssRules[j].cssText === "string") {
                      styleCSS += `${sheet.cssRules[j].cssText}\r\n`;
                    }
                  }
                } catch (error) {
                  logMessages(
                    [
                      `A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross \`crossorigin\` attribute, and setting the \`Access-Control-Allow-Origin\` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.`,
                      node
                    ],
                    "warning"
                  );
                }

                newHeadEl.setAttribute("id", `vue-to-print-${i}`);
                if (nonce) {
                  newHeadEl.setAttribute("nonce", nonce);
                }
                newHeadEl.appendChild(domDoc.createTextNode(styleCSS));
                domDoc.head.appendChild(newHeadEl);
              }
            } else {
              // <link> nodes, and any others
              // Many browsers will do all sorts of weird things if they encounter an
              // empty `href` tag (which is invalid HTML). Some will attempt to load
              // the current page. Some will attempt to load the page"s parent
              // directory. These problems can cause `vue-to-print` to stop without
              // any error being thrown. To avoid such problems we simply do not
              // attempt to load these links.
              if (node.getAttribute("href")) {
                // Browser's don't display `disabled` `link` nodes, so we need to filter them out
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled
                // https://caniuse.com/mdn-html_elements_link_disabled
                // TODO: ideally we could just filter these out on selection using
                // a selector such as: `link[rel='stylesheet']:not([disabled])`
                // https://stackoverflow.com/questions/27733826/css-selectors-for-excluding-by-attribute-presence
                // However, that doesn't seem to work. Why?
                if (!node.hasAttribute("disabled")) {
                  const newHeadEl = domDoc.createElement(node.tagName);

                  // Manually re-create the node
                  // TODO: document why cloning the node won't work? I don't recall
                  // the reasoning behind why we do it this way
                  // NOTE: node.attributes has NamedNodeMap type that is not an Array
                  // and can be iterated only via direct [i] access
                  for (let j = 0, attrLen = node.attributes.length; j < attrLen; ++j) {
                    const attr = node.attributes[j];
                    if (attr) {
                      newHeadEl.setAttribute(attr.nodeName, attr.nodeValue || "");
                    }
                  }

                  newHeadEl.onload = () => markLoaded(newHeadEl);
                  newHeadEl.onerror = (_event, _source, _lineno, _colno, error) =>
                    markLoaded(newHeadEl, ["Failed to load", newHeadEl, "Error:", error]);
                  if (nonce) {
                    newHeadEl.setAttribute("nonce", nonce);
                  }
                  domDoc.head.appendChild(newHeadEl);
                } else {
                  logMessages(
                    [
                      "`vue-to-print` encountered a <link> tag with a `disabled` attribute and will ignore it. Note that the `disabled` attribute is deprecated, and some browsers ignore it. You should stop using it. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-disabled. The <link> is:",
                      node
                    ],
                    "warning"
                  );
                  // `true` because this isn't an error: we are intentionally skipping this node
                  markLoaded(node);
                }
              } else {
                logMessages(
                  [
                    "`vue-to-print` encountered a <link> tag with an empty `href` attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:",
                    node
                  ],
                  "warning"
                );
                // `true` because we"ve already shown a warning for this
                markLoaded(node);
              }
            }
          }
        }
      }

      ShadowDomSupport.retrieveStyleSheets(printWindow);

      if (numResourcesToLoad === 0 || !copyStyles) {
        triggerPrint(printWindow);
      }
    };

    // Ensure we remove any pre-existing print windows before adding a new one
    handleRemoveIframe(true);

    document.body.appendChild(printWindow);
  };

  const handleRemoveIframe = (force?: boolean) => {
    const { removeAfterPrint } = props;

    if (force || removeAfterPrint) {
      // The user may have removed the iframe in `onAfterPrint`
      const documentPrintWindow = document.getElementById("printWindow");
      if (documentPrintWindow) {
        document.body.removeChild(documentPrintWindow);
      }
    }
  };

  const logMessages = (messages: unknown[], level: "error" | "warning" | "debug" = "error") => {
    const { suppressErrors } = props;

    if (!suppressErrors) {
      if (level === "error") {
        console.error(messages); // eslint-disable-line no-console
      } else if (level === "warning") {
        console.warn(messages); // eslint-disable-line no-console
      } else if (level === "debug") {
        console.debug(messages); // eslint-disable-line no-console
      }
    }
  };

  return {
    handlePrint: handleClick
  };
}
