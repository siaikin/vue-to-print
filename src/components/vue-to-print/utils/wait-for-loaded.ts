/**
 * @see https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
 * @param image
 */
export async function waitImage(image: HTMLImageElement): Promise<void> {
  if (!image.getAttribute("src")) return;
  if (image.complete) return;

  await new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", (ev) => reject(ev.error), {
      once: true
    });
  });
}

export async function waitVideo(video: HTMLVideoElement): Promise<void> {
  if (video.readyState >= 2) return;

  await new Promise((resolve, reject) => {
    video.addEventListener("loadeddata", resolve, { once: true });

    // TODO: why do `onabort` and `onstalled` seem to fire all the time even if there is no issue?
    // videoNode.onabort = () => markLoaded(videoNode, ["Loading video aborted", videoNode]);
    video.addEventListener("error", (ev) => reject(ev.error), {
      once: true
    });
    // videoNode.onemptied = () => markLoaded(videoNode, ["Loading video emptied, skipping", videoNode]);
    video.addEventListener("stalled", () => reject(new Error("Loading video stalled, skipping")), {
      once: true
    });
  });
}
