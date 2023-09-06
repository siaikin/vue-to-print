let isVueToPrintCustomElementRegistered = false;

class VueToPrintCustomElement extends HTMLElement {
  constructor() {
    super();
  }
}

/**
 * 注册自定义元素 vue-to-print-custom-element, 作为自定义元素的根节点
 */
export function registryVueToPrintCustomElement() {
  if (isVueToPrintCustomElementRegistered) return;

  customElements.define("vue-to-print-custom-element", VueToPrintCustomElement);
  isVueToPrintCustomElementRegistered = true;
}

const scriptOfRegistryVueToPrintCustomElement = `
  class VueToPrintCustomElement extends HTMLElement {
    constructor() {
      super();
    }
  }
  customElements.define('vue-to-print-custom-element', VueToPrintCustomElement);
`;
export function registryVueToPrintCustomElementScript(document: Document) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("vue-to-print-custom-script", "registry-custom-element");
  script.innerHTML = scriptOfRegistryVueToPrintCustomElement;

  document.body.appendChild(script);
}
