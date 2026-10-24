import { Briefcase } from "lucide-react";

type Role = { title: string; period: string; duration?: string };
type EmploymentType = "full-time" | "freelance";
type Employer = {
  company: string;
  subtitle?: string;
  type: EmploymentType;
  roles: Role[];
};

export const experience: Employer[] = [
  {
    company: "Safety Systems Pty Ltd",
    type: "full-time",
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
    company: "Art of Scaling LLC",
    type: "freelance",
    subtitle: "Content Creator",
    roles: [
      {
        title: "Head Video Editor",
        period: "Nov 2025 – Jan 2026",
      },
    ],
  },
  {
    company: "AO Productions",
    type: "freelance",
    subtitle: "AI-Videos",
    roles: [
      {
        title: "Head Video Editor",
        period: "Sep 2025 – Jan 2026",
      },
    ],
  },
  {
    company: "Ragnarok Online Private Server",
    type: "freelance",
    subtitle: "Delirium RO",
    roles: [
      {
        title: "Game Developer",
        period: "Mar 2023 – Jul 2023",
      },
    ],
  },
];

const groups: { label: string; type: EmploymentType }[] = [
  { label: "Full-time", type: "full-time" },
  { label: "Freelance & Contract", type: "freelance" },
];

export default function WorkExperience() {
  return (
    <section aria-labelledby="work-heading" className="flex flex-col gap-5">
      <h2 id="work-heading" className="type-title-md text-ink">
        Work Experience
      </h2>

      {groups.map(({ label, type }) => {
        const employers = experience.filter((entry) => entry.type === type);
        if (employers.length === 0) return null;

        return (
          <div key={label} className="flex flex-col gap-4">
            <h3 className="type-caption tracking-[0.12em] text-ink-tertiary uppercase">
              {label}
            </h3>

            {employers.map(({ company, subtitle, roles }) => (
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
                  <div className="flex flex-col">
                    <span className="type-body font-semibold text-ink">
                      {company}
                    </span>
                    {subtitle && (
                      <span className="type-ui text-ink-secondary">
                        {subtitle}
                      </span>
                    )}
                  </div>
                </div>

                <ul>
                  {roles.map(({ title, period, duration }, index) => {
                    const isCurrent = period.includes("Present");

                    return (
                      <li
                        key={title}
                        className="relative pb-4 pl-[52px] last:pb-0"
                      >
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
                        <p className="type-body font-semibold text-ink">
                          {title}
                        </p>
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
          </div>
        );
      })}
    </section>
  );
}
