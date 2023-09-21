export function isCustomElement(dom: Node): dom is Element {
  return !!customElements.get(dom.nodeName.toLowerCase());
}
