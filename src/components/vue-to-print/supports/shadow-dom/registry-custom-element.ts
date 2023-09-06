let isVueToPrintShadowDomRegistered = false;

/**
 * 注册自定义元素 vue-to-print-shadow-dom, 作为 Shadow DOM 的根节点
 */
export function registryVueToPrintShadowDom() {
  if (isVueToPrintShadowDomRegistered) return;

  class VueToPrintShadowDom extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  }
  customElements.define("vue-to-print-shadow-dom", VueToPrintShadowDom);
  isVueToPrintShadowDomRegistered = true;
}

const scriptOfRegistryVueToPrintShadowDom = `
  class VueToPrintShadowDom extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  }
  customElements.define('vue-to-print-shadow-dom', VueToPrintShadowDom);
`;
export function registryVueToPrintShadowDomScript(document: Document) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("vue-to-print-custom-script", "registry-shadow-dom");
  script.innerHTML = scriptOfRegistryVueToPrintShadowDom;

  document.body.appendChild(script);
}

const scriptOfRegistryRetrieveStyleSheetsFunc = `
  function retrieveStyleSheets(styleSheetMap) {
    styleSheetMap.forEach((styleSheetStrings, tagName) => {
      const styleSheets = [];
      for (let i = styleSheetStrings.length; i--;) {
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(styleSheetStrings[i]);
        styleSheets.push(styleSheet);
      }

      const elements = document.querySelectorAll('vue-to-print-shadow-dom[original-tag-name=' + tagName + ']');
      for (let i = elements.length; i--;) {
        const element = elements[i];
        element.shadowRoot.adoptedStyleSheets = styleSheets;
      }
    });
  }
`;
export function registryRetrieveStyleSheetsFuncScript(document: Document) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("vue-to-print-custom-script", "registry-retrieve-style-sheets-func");
  script.innerHTML = scriptOfRegistryRetrieveStyleSheetsFunc;

  document.body.appendChild(script);
}
