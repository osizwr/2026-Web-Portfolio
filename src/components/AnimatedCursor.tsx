"use client";

import { useEffect } from "react";

/**
 * The game's cursor, ported from fluxcp-modern's useAnimatedCursor().
 *
 * An arrow that turns, and a glove over anything clickable. This component
 * publishes the images as custom properties on <html> and adds the class the
 * rules in globals.css hang off; it renders nothing itself.
 *
 * Nothing is applied on a touch screen, and the spin stops under reduced
 * motion or when the tab is hidden.
 */

const FRAME_COUNT = 6;
const FRAME_MS = 125;
// The arrow pauses on frame 0 rather than spinning at a constant rate.
const REST_FRAME = 0;
const REST_MS = 700;

const ROOT_CLASS = "cursor-animated";
const FRAME_PROPERTY = "--cursor-frame";
const HAND_PROPERTY = "--cursor-hand";
const HAND_PRESS_PROPERTY = "--cursor-hand-press";
const STILL_PROPERTY = "--cursor-arrow-still";

const HAND = "hand";
const HAND_PRESS = "hand-press";
const STILL = "arrow-still";

const POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function assetPath(name: string, density: "" | "@2x"): string {
  return `/images/cursors/${name}${density}.png`;
}

function arrowFrame(frame: number): string {
  return `arrow-${String(frame).padStart(2, "0")}`;
}

function frameDuration(frame: number): number {
  return frame === REST_FRAME ? REST_MS : FRAME_MS;
}

function supportsImageSet(): boolean {
  return (
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("cursor", `image-set(url("${assetPath(HAND, "")}") 1x) 0 0, auto`)
  );
}

export default function AnimatedCursor() {
  useEffect(() => {
    const root = document.documentElement;

    const hiDpi = supportsImageSet();
    const density: "" | "@2x" =
      hiDpi && window.devicePixelRatio > 1 ? "@2x" : "";

    const image = (name: string) =>
      hiDpi
        ? `image-set(url("${assetPath(name, "")}") 1x, url("${assetPath(name, "@2x")}") 2x)`
        : `url("${assetPath(name, "")}")`;

    const frames = Array.from({ length: FRAME_COUNT }, (_, frame) =>
      image(arrowFrame(frame)),
    );

    const pointer = window.matchMedia(POINTER_QUERY);
    const motion = window.matchMedia(MOTION_QUERY);

    let timer: number | null = null;
    let frame = 0;
    let preloaded = false;

    function preload() {
      if (preloaded) return;
      preloaded = true;

      const names = [
        ...Array.from({ length: FRAME_COUNT }, (_, index) => arrowFrame(index)),
        HAND,
        HAND_PRESS,
      ];
      for (const name of names) {
        new Image().src = assetPath(name, density);
      }
    }

    function show(next: number) {
      frame = next % FRAME_COUNT;
      root.style.setProperty(FRAME_PROPERTY, frames[frame]);
    }

    function stopSpinning() {
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    }

    function scheduleNext() {
      timer = window.setTimeout(() => {
        show(frame + 1);
        scheduleNext();
      }, frameDuration(frame));
    }

    function startSpinning() {
      stopSpinning();
      if (motion.matches || document.visibilityState !== "visible") return;
      scheduleNext();
    }

    function detach() {
      stopSpinning();
      root.classList.remove(ROOT_CLASS);
      root.style.removeProperty(FRAME_PROPERTY);
      root.style.removeProperty(HAND_PROPERTY);
      root.style.removeProperty(HAND_PRESS_PROPERTY);
      root.style.removeProperty(STILL_PROPERTY);
    }

    function apply() {
      if (!pointer.matches) {
        detach();
        return;
      }

      preload();
      show(motion.matches ? 0 : frame);
      root.style.setProperty(HAND_PROPERTY, image(HAND));
      root.style.setProperty(HAND_PRESS_PROPERTY, image(HAND_PRESS));
      root.style.setProperty(STILL_PROPERTY, image(STILL));
      root.classList.add(ROOT_CLASS);
      startSpinning();
    }

    pointer.addEventListener("change", apply);
    motion.addEventListener("change", apply);
    document.addEventListener("visibilitychange", apply);
    apply();

    return () => {
      pointer.removeEventListener("change", apply);
      motion.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", apply);
      detach();
    };
  }, []);

  return null;
}
