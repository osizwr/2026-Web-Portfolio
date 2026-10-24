"use client";

import dynamic from "next/dynamic";

// Loaded client-side only: the calendar reads `new Date()` during render, which
// Next's prerender rejects, and its data is fetched from GitHub at runtime anyway.
const ContributionCalendar = dynamic(
  () => import("./ContributionCalendar"),
  {
    ssr: false,
    loading: () => <div className="h-[140px] w-full animate-pulse bg-fog" />,
  },
);

export default function ContributionGraph() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="type-subhead text-ink">Contributions</h3>

      <div className="rounded-sm bg-canvas-soft p-6">
        <ContributionCalendar />
      </div>
    </div>
  );
}
