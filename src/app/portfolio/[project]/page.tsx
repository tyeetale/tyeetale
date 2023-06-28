import ProjectIntro from "~/components/project/intro";
import ProjectDetails from "~/components/project/projectDetails";
import { Separator } from "~/components/ui/separator";

const ProjectPage = () => {
  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl border border-zinc-300 p-8 flex space-x-4">
        <ProjectIntro />

        <Separator
          orientation="vertical"
          className="h-full w-[2px] bg-zinc-300"
        />

        <ProjectDetails />
      </div>
    </main>
  );
};

export default ProjectPage;
