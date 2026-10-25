"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/data/projects";

/**
 * One card per view, scrolled by hand or by the arrows. Nothing moves on its
 * own — the arrows are there to say the row scrolls sideways.
 *
 * The loop is seamless rather than a rewind: the list is rendered three times
 * and the viewport starts on the middle copy, so there is always a real card
 * either side. Once a scroll settles, the position is snapped back into the
 * middle band — the copies are identical, so the jump is invisible and the
 * cards only ever travel in the direction you pushed them.
 */
const COPIES = 3;

function strideOf(track: HTMLElement): number {
  const slides = track.children;
  if (slides.length > 1) {
    // Distance between two slides covers card width and gap in one number.
    return (
      (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft
    );
  }
  return track.clientWidth;
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);
  const count = projects.length;

  // Arrows surface while the row is moving and fade out once it settles.
  // Driven by a data attribute rather than state: this fires on every scroll
  // frame, and re-rendering the carousel that often would be wasteful.
  function revealArrows(holdMs = 900) {
    const frame = frameRef.current;
    if (!frame) return;

    frame.dataset.visible = "true";
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      frame.dataset.visible = "false";
    }, holdMs);
  }

  // Start on the middle copy.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;
    track.scrollLeft = strideOf(track) * count;
    revealArrows(1800);
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    function recentre() {
      if (!track) return;
      const setWidth = strideOf(track) * count;
      if (setWidth === 0) return;

      if (track.scrollLeft >= setWidth * 2) {
        track.scrollLeft -= setWidth;
      } else if (track.scrollLeft < setWidth) {
        track.scrollLeft += setWidth;
      }
    }

    // scrollend fires once the smooth scroll or the swipe has settled; the
    // timeout covers browsers that do not have it yet.
    // Only a real sideways move reveals the arrows. A scroll event alone is
    // not enough: panning the page vertically with a finger on the row fires
    // one with scrollLeft unchanged, which was showing them during a plain
    // vertical scroll.
    let lastLeft = track.scrollLeft;
    const onAnyScroll = () => {
      if (!track || track.scrollLeft === lastLeft) return;
      lastLeft = track.scrollLeft;
      revealArrows();
    };
    track.addEventListener("scroll", onAnyScroll, { passive: true });

    if ("onscrollend" in window) {
      track.addEventListener("scrollend", recentre);
      return () => {
        track.removeEventListener("scroll", onAnyScroll);
        track.removeEventListener("scrollend", recentre);
      };
    }

    let timer: number | undefined;
    function onScroll() {
      window.clearTimeout(timer);
      timer = window.setTimeout(recentre, 160);
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scroll", onAnyScroll);
      window.removeEventListener("scroll", onAnyScroll);
    };
  }, [count]);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * strideOf(track), behavior: "smooth" });
  }

  const arrow =
    "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-data-[visible=true]:pointer-events-auto group-data-[visible=true]:opacity-100 cursor-pointer items-center justify-center rounded-full border border-hairline bg-background text-ink shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition duration-200 motion-safe:active:scale-90";

  return (
    <div ref={frameRef} data-visible="false" className="group relative">
      <button
        type="button"
        onClick={() => step(-1)}
        aria-label="Previous project"
        className={`${arrow} left-1`}
      >
        <ChevronLeft aria-hidden size={18} strokeWidth={1.5} />
      </button>

      <ul
        ref={trackRef}
        // No scroll-smooth here: it animates every scroll correction, including
        // the browser re-snapping when the mobile URL bar resizes the viewport,
        // which looked like the carousel sliding back on its own. The arrows
        // pass behavior: "smooth" themselves, so only their moves animate.
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          projects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${copy}`}
              project={project}
              index={index}
              hidden={copy !== 1}
              className="w-full shrink-0 snap-start"
            />
          )),
        )}
      </ul>

      <button
        type="button"
        onClick={() => step(1)}
        aria-label="Next project"
        className={`${arrow} right-1`}
      >
        <ChevronRight aria-hidden size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
