import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { FolderOpen, House, Layers, Mail, Wrench } from "lucide-react";
import Contact from "./Contact";
import Home from "./Home";
import Projects from "./Projects";
import Services from "./Services";
import TechStack from "./TechStack";

export type SectionId =
  | "home"
  | "tech-stack"
  | "projects"
  | "services"
  | "contact";

export type Section = {
  id: SectionId;
  label: string;
  Icon: LucideIcon;
  Component: ComponentType;
};

export const sections: Section[] = [
  { id: "home", label: "Home", Icon: House, Component: Home },
  { id: "tech-stack", label: "Tech Stack", Icon: Layers, Component: TechStack },
  {
    id: "projects",
    label: "Projects",
    Icon: FolderOpen,
    Component: Projects,
  },
  { id: "services", label: "Services", Icon: Wrench, Component: Services },
  { id: "contact", label: "Contact", Icon: Mail, Component: Contact },
];
