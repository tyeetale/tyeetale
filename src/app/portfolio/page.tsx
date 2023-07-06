"use client";

import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Intro from "~/components/portfolio/intro";
import ProjectPreviews from "~/components/portfolio/projectPreviews";
import { Separator } from "~/components/ui/separator";

export async function getAllProjects() {
  const projects = allProjects;

  if (!projects) notFound(); // throws a 404 page

  return projects.sort((a, b) => a.order - b.order);
}

const Portfolio = async () => {
  const projects = await getAllProjects();

  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl border border-zinc-300 p-8 flex space-x-8">
        <Intro projects={projects} />

        <Separator
          orientation="vertical"
          className="h-full w-[2px] bg-zinc-300"
        />

        <ProjectPreviews projects={projects} />
      </div>
    </main>
  );
};
export default Portfolio;
