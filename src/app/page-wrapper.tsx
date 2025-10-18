import { getAllProjects } from "~/utils/getAllProjects";
import Portfolio from "./portfolio-page";

export default async function PageWrapper() {
  const projects = await getAllProjects();
  return <Portfolio projects={projects} />;
}