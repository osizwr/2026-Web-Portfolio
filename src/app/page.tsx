import ProfileSidebar from "@/components/ProfileSidebar";
import WorkExperience from "@/components/WorkExperience";
import SectionOutlet from "@/components/SectionOutlet";

export default function Home() {
  return (
    <main className="flex-1 bg-background md:min-h-0">
      <section className="grid h-full grid-cols-1 divide-y divide-divider md:grid-cols-[289fr_622fr_289fr] md:divide-x md:divide-y-0">
        <div className="p-4 md:overflow-hidden">
          <ProfileSidebar />
        </div>
        <div className="p-8 md:overflow-y-auto">
          <SectionOutlet />
        </div>
        <div className="p-8 md:overflow-hidden">
          <WorkExperience />
        </div>
      </section>
    </main>
  );
}
