import WorkExperience from "@/components/WorkExperience";

export const metadata = {
  title: "Work Experience",
};

export default function ExperiencePage() {
  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto w-full max-w-2xl p-4 sm:p-8">
        <WorkExperience />
      </div>
    </main>
  );
}
