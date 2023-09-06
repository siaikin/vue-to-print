import { registryVueToPrintShadowDom } from "./registry-custom-element";

const styleSheetsMap = new Map<string, Set<CSSStyleSheet>>();

export function cloneNode(dom: Element): Element {
  registryVueToPrintShadowDom();

  const tagName = dom.nodeName.toLowerCase();
  const shadowRoot = dom.shadowRoot!;
  const styleSheets = shadowRoot.adoptedStyleSheets;

  const clone = document.createElement("vue-to-print-shadow-dom");
  clone.setAttribute("original-tag-name", tagName);

  if (!styleSheetsMap.has(tagName)) styleSheetsMap.set(tagName, new Set());
  const styleSet = styleSheetsMap.get(tagName)!;

  for (let i = styleSheets.length; i--; ) {
    styleSet.add(styleSheets[i]);
  }

  const targetAttributes = clone.attributes;
  const attributes = dom.attributes;
  for (let i = attributes.length; i--; ) {
    targetAttributes.setNamedItem(attributes[i].cloneNode() as Attr);
  }

  return clone;
}

export function getShadowDomCSSTextMap(): Map<string, Array<string>> {
  const cssTextMap = new Map<string, Array<string>>();
  const styleSheetStringMap = new Map<CSSStyleSheet, string>();

  const keys = Array.from(styleSheetsMap.keys());
  for (let i = keys.length; i--; ) {
    const styleSheetStrings: Array<string> = [];

    const tagName = keys[i];
    const styleSheets = Array.from(styleSheetsMap.get(tagName)!);
    for (let j = styleSheets.length; j--; ) {
      const styleSheet = styleSheets[j];

      if (!styleSheetStringMap.has(styleSheet)) {
        let styleSheetString = "";
        const rules = Array.from(styleSheet.cssRules);
        for (let k = rules.length; k--; ) {
          styleSheetString += rules[k].cssText;
        }
        styleSheetStringMap.set(styleSheet, styleSheetString);
      }

      styleSheetStrings.push(styleSheetStringMap.get(styleSheet)!);
    }

    cssTextMap.set(tagName, styleSheetStrings);
  }

  return cssTextMap;
}
