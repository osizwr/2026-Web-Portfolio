import ProfileSidebar from "@/components/ProfileSidebar";
import WorkExperience from "@/components/WorkExperience";
import SectionOutlet from "@/components/SectionOutlet";

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      {/* The window scrolls, so the scrollbar sits at its usual right edge.
          The side columns stick under the 64px bar while column two moves. */}
      <section className="grid grid-cols-1 items-start lg:grid-cols-[289fr_622fr_289fr]">
        {/* Hidden below lg: the same profile and socials live in the
            hamburger menu there, and would otherwise appear twice. */}
        <div className="hidden p-4 lg:sticky lg:top-16 lg:block">
          <ProfileSidebar />
        </div>
        <div className="p-4 sm:p-8">
          <SectionOutlet />
        </div>
        {/* Hidden below lg: on mobile this lives on its own page,
            reached from the briefcase in the header. */}
        <div className="hidden p-4 sm:p-8 lg:sticky lg:top-16 lg:block">
          <WorkExperience />
        </div>
      </section>
    </main>
  );
}
