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
      <div className="w-full h-full rounded-3xl lg:border lg:border-zinc-300 lg:p-8 lg:flex lg:space-x-8">
        <ProjectIntro
          title={project.title}
          slogan={project.slogan}
          description={project.description}
          badges={project.badges}
        />

        <Separator
          orientation="vertical"
          className="hidden lg:block h-full w-[2px] lg:bg-zinc-300"
        />

        <ProjectDetails code={project.body.code} />
      </div>
    </main>
  );
};

export default ProjectPage;
