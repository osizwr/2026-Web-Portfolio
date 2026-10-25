"use client";

import { ArrowRight } from "lucide-react";
import ContributionGraph from "@/components/ContributionGraph";
import GitHubRepos from "@/components/GitHubRepos";
import ProjectCard from "@/components/ProjectCard";
import ProjectCarousel from "@/components/ProjectCarousel";
import { useSection } from "@/components/SectionProvider";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";

export default function Home() {
  const { setActive } = useSection();

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border px-4 py-2">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-destructive opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-full rounded-full bg-destructive" />
          </span>
          <span className="type-caption tracking-[0.12em] text-ink-secondary uppercase">
            Not available for work
          </span>
        </span>

        <h2 className="type-heading sm:type-display-xl text-ink uppercase">
          Hi, I&apos;m Marvin
        </h2>

        <p className="type-body max-w-2xl text-ink-secondary">
          Placeholder intro — a line or two about your background, what you
          build, and what you care about. Mention your main stack and the kind
          of work you want to be hired for.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            type="button"
            onClick={() => setActive("projects")}
            className="type-button h-12 rounded-full px-8 tracking-[0.08em] uppercase hover:bg-store-blue"
          >
            Explore Projects
            <ArrowRight aria-hidden size={16} />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setActive("contact")}
            className="type-button h-12 rounded-full border-ink px-8 tracking-[0.08em] text-ink uppercase"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="type-subhead text-ink">Featured Projects</h3>
          <button
            type="button"
            onClick={() => setActive("projects")}
            className="type-ui inline-flex cursor-pointer items-center gap-1 text-link-blue"
          >
            View all projects
            <ArrowRight aria-hidden size={14} />
          </button>
        </div>

        <div className="lg:hidden">
          <ProjectCarousel projects={featuredProjects} />
        </div>

        <ul className="hidden gap-4 lg:grid lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </ul>
      </div>

      <ContributionGraph />

      <GitHubRepos />
    </div>
  );
}
