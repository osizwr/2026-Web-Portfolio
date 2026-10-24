import { experience } from "@/components/WorkExperience";
import { services } from "@/components/sections/Services";
import { stack } from "@/components/sections/TechStack";
import { sections, type SectionId } from "@/components/sections";
import { projects } from "@/data/projects";

export type SearchResult = {
  id: string;
  label: string;
  detail: string;
  kind: string;
  section: SectionId;
};

/**
 * Everything on the site worth finding, flattened once at module load.
 * Each result knows which section to open when it is picked.
 */
const index: SearchResult[] = [
  ...sections.map(({ id, label }) => ({
    id: `section:${id}`,
    label,
    detail: "Jump to section",
    kind: "Section",
    section: id,
  })),

  ...stack.flatMap(({ category, items }) =>
    items.map(({ label }) => ({
      id: `tech:${label}`,
      label,
      detail: category,
      kind: "Tech",
      section: "tech-stack" as SectionId,
    })),
  ),

  ...projects.map(({ title, category, tags }) => ({
    id: `project:${title}`,
    label: title,
    detail: `${category} · ${tags.join(", ")}`,
    kind: "Project",
    section: "projects" as SectionId,
  })),

  ...services.map(({ title, description }) => ({
    id: `service:${title}`,
    label: title,
    detail: description,
    kind: "Service",
    section: "services" as SectionId,
  })),

  // Work experience lives in the sidebar, so these point at Home rather than
  // a section of their own.
  ...experience.flatMap(({ company, roles }) => [
    {
      id: `employer:${company}`,
      label: company,
      detail: roles.map((role) => role.title).join(", "),
      kind: "Experience",
      section: "home" as SectionId,
    },
    ...roles.map(({ title, period }) => ({
      id: `role:${company}:${title}`,
      label: title,
      detail: `${company} · ${period}`,
      kind: "Experience",
      section: "home" as SectionId,
    })),
  ]),
];

export const MAX_RESULTS = 8;

/** Case-insensitive match, with label-prefix hits ranked above the rest. */
export function search(query: string): SearchResult[] {
  const term = query.trim().toLowerCase();
  if (!term) return [];

  const starts: SearchResult[] = [];
  const contains: SearchResult[] = [];

  for (const item of index) {
    const label = item.label.toLowerCase();
    if (label.startsWith(term)) {
      starts.push(item);
    } else if (label.includes(term) || item.detail.toLowerCase().includes(term)) {
      contains.push(item);
    }
  }

  return [...starts, ...contains].slice(0, MAX_RESULTS);
}

export const sectionIcons = new Map(
  sections.map(({ id, Icon }) => [id, Icon] as const),
);
