"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
};

const REPO_COUNT = 6;

// A dot per language, so the row reads at a glance. Anything unlisted falls
// back to steel rather than guessing a colour.
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4f5d95",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Blade: "#f7523f",
  Shell: "#89e051",
};

function updatedLabel(pushedAt: string): string {
  // Absolute, not "3 days ago": a relative label needs the current time, which
  // is exactly the kind of value that breaks a prerender.
  return new Date(pushedAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function GitHubRepos() {
  const user = siteConfig.githubUsername;
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [errored, setErrored] = useState(false);

  // A missing username is known at render time, so it is derived rather than
  // pushed into state from the effect.
  const failed = !user || errored;

  useEffect(() => {
    if (!user) return;

    const controller = new AbortController();

    fetch(
      `https://api.github.com/users/${user}/repos?sort=pushed&per_page=24&type=owner`,
      {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" },
      },
    )
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        return response.json() as Promise<Repo[]>;
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.fork).slice(0, REPO_COUNT));
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setErrored(true);
      });

    return () => controller.abort();
  }, [user]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="type-subhead text-ink">Recent Repositories</h3>
        {siteConfig.links.github && (
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="type-ui text-link-blue"
          >
            View on GitHub
          </a>
        )}
      </div>

      {failed ? (
        <p className="type-ui text-ink-secondary">
          Couldn&apos;t load repositories right now.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {repos
            ? repos.map(
                ({
                  id,
                  name,
                  html_url,
                  description,
                  language,
                  stargazers_count,
                  pushed_at,
                }) => (
                  <li key={id}>
                    <a
                      href={html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-full flex-col gap-2 bg-canvas-soft p-5 transition duration-200 hover:bg-background hover:ring-1 hover:ring-card-border motion-safe:hover:-translate-y-0.5"
                    >
                      <span className="type-body font-semibold text-ink">
                        {name}
                      </span>

                      <span className="type-ui line-clamp-2 flex-1 text-ink-secondary">
                        {description ?? "No description"}
                      </span>

                      <span className="type-caption flex flex-wrap items-center gap-3 pt-1 text-ink-tertiary">
                        {language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              aria-hidden
                              className="size-2 rounded-full"
                              style={{
                                backgroundColor:
                                  languageColors[language] ?? "var(--steel)",
                              }}
                            />
                            {language}
                          </span>
                        )}
                        {stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star aria-hidden size={12} strokeWidth={1.5} />
                            {stargazers_count}
                          </span>
                        )}
                        <span>Updated {updatedLabel(pushed_at)}</span>
                      </span>
                    </a>
                  </li>
                ),
              )
            : Array.from({ length: REPO_COUNT }, (_, index) => (
                <li
                  key={index}
                  aria-hidden
                  className="h-[132px] animate-pulse bg-fog"
                />
              ))}
        </ul>
      )}
    </div>
  );
}
