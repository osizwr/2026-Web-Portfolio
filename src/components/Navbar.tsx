"use client";

import { useSection } from "./SectionProvider";
import { sections } from "./sections";

export default function Navbar() {
  const { active, setActive } = useSection();

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-hairline bg-background">
      {/* Same column template as the page, so the tabs line up with column two */}
      <div className="grid h-full grid-cols-1 md:grid-cols-[289fr_622fr_289fr]">
        <div className="hidden md:block" />
        <nav aria-label="Main" className="flex h-full items-stretch">
          {sections.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              title={label}
              aria-label={label}
              aria-current={active === id ? "true" : undefined}
              className={`relative flex flex-1 cursor-pointer items-center justify-center transition-colors ${
                active === id
                  ? "text-primary"
                  : "text-nav-ink hover:bg-fog hover:text-primary"
              }`}
            >
              <Icon aria-hidden size={24} strokeWidth={1.5} />
              {active === id && (
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </nav>
        <div className="hidden md:block" />
      </div>
    </header>
  );
}
