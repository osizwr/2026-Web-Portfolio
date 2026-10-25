"use client";

import { useSection } from "./SectionProvider";
import { sections } from "./sections";

export default function SectionOutlet() {
  const { active } = useSection();
  const { Component } = sections.find((s) => s.id === active) ?? sections[0];

  return (
    // Keyed on the active section so switching tabs remounts the subtree and
    // replays the entrance. Sections with their own stagger (Tech Stack,
    // Projects, Services) run theirs inside this one.
    <div
      key={active}
      className="fade-in slide-in-from-bottom-2 fill-mode-both animation-duration-300 motion-safe:animate-in"
    >
      <Component />
    </div>
  );
}
