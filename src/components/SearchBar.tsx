"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useSection } from "./SectionProvider";
import { search, sectionIcons, type SearchResult } from "@/lib/search";

export default function SearchBar({
  onNavigate,
}: {
  /** Lets the mobile header collapse its search row once a result is picked. */
  onNavigate?: () => void;
}) {
  const { setActive } = useSection();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const results = useMemo(() => search(query), [query]);
  const showList = open && results.length > 0;

  // Close when the click lands anywhere outside the search bar.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function choose(result: SearchResult) {
    setActive(result.section);
    setQuery("");
    setOpen(false);
    // Sections are state, not routes: from another page the outlet only shows
    // the pick once we are back on "/".
    if (pathname !== "/") router.push("/");
    onNavigate?.();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!showList) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[highlighted] ?? results[0]);
    }
  }

  return (
    <div ref={containerRef} className="relative min-w-0 flex-1">
      <label className="flex h-10 items-center gap-2 rounded-full bg-fog px-4">
        <Search
          aria-hidden
          size={16}
          strokeWidth={1.5}
          className="shrink-0 text-ink-tertiary"
        />
        <input
          type="search"
          value={query}
          placeholder="Search"
          aria-label="Search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlighted(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="type-ui min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink-tertiary"
        />
      </label>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-12 left-0 z-50 w-full overflow-hidden rounded-sm border border-card-border bg-background py-1 shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
        >
          {results.map((result, index) => {
            const Icon = sectionIcons.get(result.section);

            return (
              <li key={result.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={index === highlighted}
                  onMouseEnter={() => setHighlighted(index)}
                  onClick={() => choose(result)}
                  className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left transition-colors ${
                    index === highlighted ? "bg-fog" : ""
                  }`}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-fog">
                    {Icon && (
                      <Icon
                        aria-hidden
                        size={16}
                        strokeWidth={1.5}
                        className="text-ink-secondary"
                      />
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="type-ui block truncate text-ink">
                      {result.label}
                    </span>
                    <span className="type-caption block truncate text-ink-tertiary">
                      {result.detail}
                    </span>
                  </span>

                  <span className="type-caption shrink-0 text-ink-tertiary">
                    {result.kind}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
