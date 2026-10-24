/**
 * Per-deployment values, all sourced from .env.local (see .env.example).
 *
 * NEXT_PUBLIC_* variables are inlined at build time, so each one has to be
 * written out statically — `process.env[name]` would not be replaced. Keeping
 * them in this one file means components never touch process.env directly.
 */
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Marvin Marianito Cajilo",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  links: {
    email: process.env.NEXT_PUBLIC_EMAIL || "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
} as const;
