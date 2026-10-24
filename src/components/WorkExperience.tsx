import { Briefcase } from "lucide-react";

const experience = [
  {
    company: "Safety System Pty Ltd",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Oct 2026 – Present",
      },
      {
        title: "Junior Software Engineer",
        period: "Apr 2026 – Oct 2026",
        duration: "6 months",
      },
      {
        title: "Intern",
        period: "Feb 2026 – Apr 2026",
      },
    ],
  },
  {
    company: "Art of Scaling LLC (Content Creator)",
    roles: [
      {
        title: "Head Video Editor",
        period: "Nov 2025 – Jan 2026",
      },
    ],
  },
  {
    company: "AO Productions (AI-Videos)",
    roles: [
      {
        title: "Head Video Editor",
        period: "Sep 2025 – Jan 2026",
      },
    ],
  },
];

export default function WorkExperience() {
  return (
    <section aria-labelledby="work-heading" className="flex flex-col gap-5">
      <h2 id="work-heading" className="type-title-md text-ink">
        Work Experience
      </h2>

      {experience.map(({ company, roles }) => (
        <div key={company} className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-fog">
              <Briefcase
                aria-hidden
                size={18}
                strokeWidth={1.5}
                className="text-ink-secondary"
              />
            </span>
            <span className="type-body font-semibold text-ink">{company}</span>
          </div>

          <ul>
            {roles.map(({ title, period, duration }, index) => {
              const isCurrent = period.includes("Present");

              return (
                <li key={title} className="relative pb-4 pl-[52px] last:pb-0">
                  {index < roles.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-6 -bottom-6 left-5 w-px -translate-x-1/2 bg-card-border"
                    />
                  )}
                  {isCurrent ? (
                    <span
                      aria-hidden
                      className="absolute top-5 left-5 flex size-2 -translate-x-1/2"
                    >
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
                      <span className="relative inline-flex size-full rounded-full bg-success" />
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="absolute top-5 left-5 size-2 -translate-x-1/2 rounded-full bg-steel"
                    />
                  )}
                  <p className="type-body font-semibold text-ink">{title}</p>
                  <p className="type-ui text-ink-secondary">
                    {period}
                    {duration && ` · ${duration}`}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
