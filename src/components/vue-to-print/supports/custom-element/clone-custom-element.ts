import { registryVueToPrintCustomElement } from "./registry-custom-element";

export function cloneNode(dom: Element): Element {
  registryVueToPrintCustomElement();

  const tagName = dom.nodeName.toLowerCase();

  const clone = document.createElement("vue-to-print-custom-element");
  clone.setAttribute("original-tag-name", tagName);

  const targetAttributes = clone.attributes;
  const attributes = dom.attributes;
  for (let i = attributes.length; i--; ) {
    targetAttributes.setNamedItem(attributes[i].cloneNode() as Attr);
  }

  return clone;
}
