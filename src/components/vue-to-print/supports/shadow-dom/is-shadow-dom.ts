export function isShadowDom(dom: Node): dom is Element {
  return !!(dom as Element).shadowRoot;
}
