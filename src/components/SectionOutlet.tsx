"use client";

import { useSection } from "./SectionProvider";
import { sections } from "./sections";

export default function SectionOutlet() {
  const { active } = useSection();
  const { Component } = sections.find((s) => s.id === active) ?? sections[0];

  return <Component />;
}
