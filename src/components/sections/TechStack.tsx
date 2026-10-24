import type { CSSProperties } from "react";
import {
  SiCss,
  SiDjango,
  SiFigma,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiNuxt,
  SiPhp,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

const stack = [
  {
    category: "Languages",
    items: [
      { label: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
      { label: "Python", Icon: SiPython, color: "#3776ab" },
      { label: "PHP", Icon: SiPhp, color: "#777bb4" },
    ],
  },
  {
    category: "Markup & Styling",
    items: [
      { label: "HTML", Icon: SiHtml5, color: "#e34f26" },
      { label: "CSS", Icon: SiCss, color: "#663399" },
      { label: "Tailwind CSS", Icon: SiTailwindcss, color: "#06b6d4" },
      { label: "Figma", Icon: SiFigma, color: "#f24e1e" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { label: "React", Icon: SiReact, color: "#61dafb" },
      { label: "Next.js", Icon: SiNextdotjs, color: "#000000" },
      { label: "Vue.js", Icon: SiVuedotjs, color: "#4fc08d" },
      { label: "Nuxt.js", Icon: SiNuxt, color: "#00dc82" },
    ],
  },
  {
    category: "Backend",
    items: [
      { label: "Node.js", Icon: SiNodedotjs, color: "#5fa04e" },
      { label: "Laravel", Icon: SiLaravel, color: "#ff2d20" },
      { label: "Django", Icon: SiDjango, color: "#092e20" },
    ],
  },
  {
    category: "Tools & Deployment",
    items: [
      { label: "Git", Icon: SiGit, color: "#f05032" },
      { label: "Vercel", Icon: SiVercel, color: "#000000" },
    ],
  },
];

// One continuous stagger across every category, not a restart per group.
let order = 0;
const groups = stack.map(({ category, items }) => ({
  category,
  items: items.map((item) => ({ ...item, delay: order++ * 40 })),
}));

export default function TechStack() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="type-heading text-ink">Tech Stack</h2>

      {groups.map(({ category, items }) => (
        <section key={category} className="flex flex-col gap-4">
          <h3 className="type-subhead text-ink">{category}</h3>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map(({ label, Icon, color, delay }) => (
              <li
                key={label}
                style={{ "--brand": color, animationDelay: `${delay}ms` } as CSSProperties}
                className="group flex flex-col items-center justify-center gap-2 bg-canvas-soft px-3 py-4 fill-mode-both fade-in slide-in-from-bottom-2 animation-duration-300 motion-safe:animate-in transition duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-background hover:ring-1 hover:ring-card-border"
              >
                <Icon
                  aria-hidden
                  size={28}
                  className="text-ink-secondary transition duration-200 motion-safe:group-hover:scale-110 group-hover:text-[var(--brand)]"
                />
                <span className="type-ui text-center text-ink">{label}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
