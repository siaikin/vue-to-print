export * from "./is-shadow-dom";
export * from "./clone-shadow-dom";

import { getShadowDomCSSTextMap } from "./clone-shadow-dom";
import {
  registryVueToPrintShadowDomScript,
  registryRetrieveStyleSheetsFuncScript
} from "./registry-custom-element";

export function retrieveStyleSheets(iframe: HTMLIFrameElement) {
  const printWindow =
    (iframe.contentWindow as WindowProxy & {
      retrieveStyleSheets: (styleSheetMap: Map<string, Array<string>>) => void;
    }) || null;
  if (!printWindow) throw new Error("Cannot access print window");

  const printDocument = printWindow.document;
  if (!printDocument) throw new Error("Cannot access print document");

  registryVueToPrintShadowDomScript(printDocument);
  registryRetrieveStyleSheetsFuncScript(printDocument);

  const cssTextMap = getShadowDomCSSTextMap();
  printWindow.retrieveStyleSheets(cssTextMap);
}
