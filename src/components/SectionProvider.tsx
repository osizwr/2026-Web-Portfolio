"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SectionId } from "./sections";

type SectionContextValue = {
  active: SectionId;
  setActive: (id: SectionId) => void;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SectionId>("home");

  return (
    <SectionContext.Provider value={{ active, setActive }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used inside <SectionProvider>");
  }
  return context;
}
