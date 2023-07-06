import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";

export default async function findProject(slug: string) {
  const project = allProjects.find((project) => project.slugAsParams === slug);
  if (!project) notFound(); // throws a 404 page
  return project;
}
