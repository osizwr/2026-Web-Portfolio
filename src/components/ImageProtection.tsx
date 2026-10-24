"use client";

import { useEffect } from "react";

/**
 * Project rule: no image on this site may be dragged out or saved through the
 * right-click menu.
 *
 * Listeners sit on the document in the capture phase so they cover every image
 * on every section, including ones rendered later — nothing has to opt in. The
 * context menu is only suppressed over images; the rest of the page keeps it.
 *
 * Worth knowing: this stops casual saving, not a determined visitor. The files
 * are still served over HTTP and reachable from devtools or by URL.
 */
export default function ImageProtection() {
  useEffect(() => {
    function isImage(target: EventTarget | null): boolean {
      return (
        target instanceof HTMLImageElement ||
        target instanceof SVGImageElement ||
        (target instanceof HTMLElement && target.tagName === "PICTURE")
      );
    }

    function blockIfImage(event: Event) {
      if (isImage(event.target)) event.preventDefault();
    }

    document.addEventListener("dragstart", blockIfImage, true);
    document.addEventListener("contextmenu", blockIfImage, true);

    return () => {
      document.removeEventListener("dragstart", blockIfImage, true);
      document.removeEventListener("contextmenu", blockIfImage, true);
    };
  }, []);

  return null;
}
