import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";

export async function getAllProjects() {
  const projects = allProjects;
  if (!projects) notFound(); // throws a 404 page
  return projects.sort((a, b) => a.order - b.order);
}
