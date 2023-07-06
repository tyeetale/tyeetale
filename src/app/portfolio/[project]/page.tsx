import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import ProjectIntro from "~/components/project/intro";
import ProjectDetails from "~/components/project/projectDetails";
import { Separator } from "~/components/ui/separator";

interface PageProps {
  params: {
    project: string;
  };
}

async function getProjectFromParams(slug: string) {
  const project = allProjects.find((project) => project.slugAsParams === slug);

  if (!project) notFound(); // throws a 404 page

  return project;
}

const ProjectPage = async ({ params }: PageProps) => {
  const project = await getProjectFromParams(params.project);

  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl border border-zinc-300 p-8 flex space-x-4">
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
