"use client";

import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { siteConfig } from "@/lib/site-config";

const GITHUB_USERNAME = siteConfig.githubUsername;
const YEARS_SHOWN = 4;

export default function ContributionCalendar() {
  // Safe to read here: this component is only ever rendered in the browser.
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: YEARS_SHOWN },
    (_, index) => currentYear - index,
  );
  const [year, setYear] = useState(currentYear);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      {/* The calendar SVG carries a viewBox, so forcing it to 100% width
          scales the whole year down to fit instead of scrolling. */}
      <div className="min-w-0 flex-1 [&_svg]:h-auto [&_svg]:w-full">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          year={year}
          colorScheme="light"
          blockSize={11}
          blockMargin={3}
          blockRadius={2}
          fontSize={12}
          errorMessage="Set NEXT_PUBLIC_GITHUB_USERNAME in .env.local to show contributions."
        />
      </div>

      <div className="flex shrink-0 flex-wrap gap-1 sm:flex-col">
        {years.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setYear(value)}
            aria-current={year === value ? "true" : undefined}
            className={`type-ui cursor-pointer rounded-sm px-4 py-2 text-left transition-colors ${
              year === value
                ? "bg-primary text-primary-foreground"
                : "text-ink-secondary hover:bg-fog hover:text-ink"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
