"use client";

import Image from "next/image";
import SearchBar from "./SearchBar";
import { useSection } from "./SectionProvider";
import { sections } from "./sections";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const { active, setActive } = useSection();

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-hairline bg-announce">
      {/* Same column template as the page, so the tabs line up with column two */}
      <div className="grid h-full grid-cols-1 md:grid-cols-[289fr_622fr_289fr]">
        {/* Logo and search, over the sidebar column */}
        <div className="flex h-full items-center gap-2 px-4 md:px-2">
          <button
            type="button"
            onClick={() => setActive("home")}
            aria-label="Home"
            title="Home"
            className="shrink-0 cursor-pointer rounded-full p-1 transition-opacity hover:opacity-80"
          >
            <Image
              src="/images/logo.webp"
              alt={`${siteConfig.name} logo`}
              width={80}
              height={80}
              priority
              className="size-10"
            />
          </button>

          <SearchBar />
        </div>

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
