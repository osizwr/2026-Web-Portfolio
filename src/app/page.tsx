import ProfileSidebar from "@/components/ProfileSidebar";
import WorkExperience from "@/components/WorkExperience";
import SectionOutlet from "@/components/SectionOutlet";

export default function Home() {
  return (
    <main className="flex-1 bg-background">
      {/* The window scrolls, so the scrollbar sits at its usual right edge.
          The side columns stick under the 64px bar while column two moves. */}
      <section className="grid grid-cols-1 items-start md:grid-cols-[289fr_622fr_289fr]">
        <div className="p-4 md:sticky md:top-16">
          <ProfileSidebar />
        </div>
        <div className="p-8">
          <SectionOutlet />
        </div>
        <div className="p-8 md:sticky md:top-16">
          <WorkExperience />
        </div>
      </section>
    </main>
  );
}
