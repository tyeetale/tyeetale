"use client";

import Intro from "~/components/portfolio/intro";
import ProjectPreviews from "~/components/portfolio/projectPreviews";
import { Separator } from "~/components/ui/separator";
import { getAllProjects } from "~/utils/getAllProjects";

const Portfolio = async () => {
  const projects = await getAllProjects();

  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl lg:border lg:border-zinc-300 lg:p-8 lg:flex lg:space-x-8">
        <Intro projects={projects} />

        <Separator
          orientation="vertical"
          className="hidden lg:block h-full w-[2px] lg:bg-zinc-300"
        />

        <ProjectPreviews projects={projects} />
      </div>
    </main>
  );
};
export default Portfolio;
