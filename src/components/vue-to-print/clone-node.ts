import * as ShadowDomSupport from "./supports/shadow-dom";
import * as CustomElementSupport from "./supports/custom-element";
import { waitImage, waitVideo } from "./utils/wait-for-loaded";

function cloneCanvasElement(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const clone = canvas.cloneNode() as HTMLCanvasElement;

  const ctx = clone.getContext("2d")!;
  if (ctx) ctx.drawImage(canvas, 0, 0);

  return clone;
}

function cloneImageElement(
  image: HTMLImageElement,
  waitQueue: Array<Promise<void>>
): HTMLImageElement {
  const clone = image.cloneNode() as HTMLImageElement;
  waitQueue.push(waitImage(clone));
  return clone;
}

function cloneVideoElement(
  video: HTMLVideoElement,
  waitQueue: Array<Promise<void>>
): HTMLVideoElement {
  const videoNode = video.cloneNode() as HTMLVideoElement;
  videoNode.preload = "auto"; // Hint to the browser that it should load this resource

  const videoPoster = videoNode.getAttribute("poster");
  if (videoPoster) {
    const image = new Image();
    image.src = videoPoster;
    waitQueue.push(waitImage(image));
  } else {
    waitQueue.push(waitVideo(videoNode));
  }

  return videoNode;
}

function cloneInputElement(input: HTMLInputElement): HTMLInputElement {
  const clone = input.cloneNode() as HTMLInputElement;

  switch (input.type) {
    case "checkbox":
    case "radio":
      clone.checked = input.checked;
      break;
    default:
      clone.value = input.value;
      break;
  }

  return clone;
}

function cloneSelectElement(select: HTMLSelectElement): HTMLSelectElement {
  const clone = select.cloneNode() as HTMLSelectElement;
  clone.value = select.value;
  return clone;
}

function cloneOptionElement(option: HTMLOptionElement): HTMLOptionElement {
  const clone = option.cloneNode() as HTMLOptionElement;
  clone.selected = option.selected;
  return clone;
}

type CloneNodeFunction<T extends Node> = (dom: T, waitQueue: Array<Promise<void>>) => T;
const CLONE_FUNCTIONS = new Map<string, CloneNodeFunction<any>>([
  ["canvas", cloneCanvasElement],
  ["img", cloneImageElement],
  ["video", cloneVideoElement],
  ["input", cloneInputElement],
  ["select", cloneSelectElement],
  ["option", cloneOptionElement]
]);

function defaultCloneNode<T extends Node>(dom: T): T {
  return dom.cloneNode() as T;
}

function cloneNode<T extends Node>(dom: T, waitQueue: Array<Promise<void>> = []): T {
  const tagName = dom.nodeName.toLowerCase();
  const cloneFunc = CLONE_FUNCTIONS.has(tagName) ? CLONE_FUNCTIONS.get(tagName)! : defaultCloneNode;

  return cloneFunc(dom, waitQueue) as T;
}

function getChildNodes(dom: Node): Array<Node> {
  const nodeName = dom.nodeName.toLowerCase();

  if (nodeName === "slot") {
    const children: Array<Node> = (dom as HTMLSlotElement).assignedNodes();
    /**
     * 如果分配给 slot 的节点为空, 则使用 slot 的回退内容.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots#adding_flexibility_with_slots
     * > If the slot's content isn't defined when the element is included in the markup, or if the browser doesn't support slots, <my-paragraph> just contains the fallback content "My default text".
     */
    return children.length > 0 ? children : Array.from(dom.childNodes);
  } else {
    return Array.from(((dom as Element).shadowRoot ?? dom).childNodes);
  }
}

export async function deepCloneNode(dom: Node): Promise<{ node: Node; result: PromiseSettledResult<void>[]}> {
  const cloneMap = new Map<Node, Node>();
  const waitList: Array<Promise<void>> = [];

  let root: Node;
  if (ShadowDomSupport.isShadowDom(dom)) root = ShadowDomSupport.cloneNode(dom);
  else if (CustomElementSupport.isCustomElement(dom)) root = CustomElementSupport.cloneNode(dom);
  else root = dom.cloneNode();
  cloneMap.set(dom, root);

  const queue = [dom];
  while (queue.length) {
    const node = queue.shift()!;

    const children: Array<Node> = getChildNodes(node);
    if (children.length <= 0) continue;

    const mirror = cloneMap.get(node)!;
    const parent = ShadowDomSupport.isShadowDom(mirror) ? mirror.shadowRoot! : mirror;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      let clone: Node;
      if (ShadowDomSupport.isShadowDom(child)) clone = ShadowDomSupport.cloneNode(child);
      else if (CustomElementSupport.isCustomElement(child))
        clone = CustomElementSupport.cloneNode(child);
      else clone = cloneNode(child, waitList);

      cloneMap.set(child, clone);
      queue.push(child);
      parent.appendChild(clone);
    }
  }

  return { node: root, result: await Promise.allSettled(waitList) };
}
