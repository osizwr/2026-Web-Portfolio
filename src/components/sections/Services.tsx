import type { CSSProperties } from "react";
import { Clapperboard, Code, LayoutDashboard, Server } from "lucide-react";

// Placeholder content — rewrite the copy and bullets for what you actually offer.
export const services = [
  {
    title: "Web Development",
    Icon: Code,
    description:
      "End-to-end builds, from a marketing site to a full application.",
    points: ["Next.js & Laravel", "Database design", "Deployment"],
  },
  {
    title: "Frontend Development",
    Icon: LayoutDashboard,
    description:
      "Responsive, accessible interfaces built from your designs or mine.",
    points: ["React & Vue", "Tailwind CSS", "Design-to-code"],
  },
  {
    title: "Backend & APIs",
    Icon: Server,
    description:
      "REST APIs, integrations and the data layer behind your product.",
    points: ["Node.js & Django", "Third-party APIs", "Auth & roles"],
  },
  {
    title: "Video Editing",
    Icon: Clapperboard,
    description:
      "Long-form and short-form edits with an AI-assisted workflow.",
    points: ["YouTube content", "Short-form cuts", "Fast turnaround"],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="type-heading text-ink">Services</h2>
      <p className="type-body text-ink-secondary">
        What I can help with. Placeholder copy — swap for your own offer.
      </p>

      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map(({ title, Icon, description, points }, index) => (
          <li
            key={title}
            style={{ animationDelay: `${index * 60}ms` } as CSSProperties}
            className="fill-mode-both fade-in slide-in-from-bottom-2 animation-duration-300 motion-safe:animate-in"
          >
            <div className="flex h-full flex-col gap-3 rounded-sm bg-canvas-soft p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-background">
                <Icon
                  aria-hidden
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary"
                />
              </span>

              <h3 className="type-subhead text-ink">{title}</h3>
              <p className="type-body text-ink-secondary">{description}</p>

              <ul className="mt-auto flex flex-col gap-1 pt-2">
                {points.map((point) => (
                  <li key={point} className="type-ui text-ink-secondary">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
