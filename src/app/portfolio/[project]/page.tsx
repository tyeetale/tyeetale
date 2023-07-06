import ProjectIntro from "~/components/project/intro";
import ProjectDetails from "~/components/project/projectDetails";
import { Separator } from "~/components/ui/separator";
import findProject from "~/utils/findProject";

interface PageProps {
  params: {
    project: string;
  };
}

const ProjectPage = async ({ params }: PageProps) => {
  const project = await findProject(params.project);

  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl border border-zinc-300 p-8 flex space-x-8">
        <ProjectIntro
          title={project.title}
          slogan={project.slogan}
          description={project.description}
          badges={project.badges}
        />

        <Separator
          orientation="vertical"
          className="h-full w-[2px] bg-zinc-300"
        />

        <ProjectDetails code={project.body.code} />
      </div>
    </main>
  );
};

export default ProjectPage;
