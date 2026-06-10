import { Link } from "react-router-dom";
import { pastProjects } from "@/data/projects";

export function PastProjects() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-4">
        Past Projects
      </h2>
      <div className="flex flex-col gap-2.5">
        {pastProjects.map((project) => (
          <div
            key={project.slug}
            className="flex items-baseline justify-between gap-4"
          >
            <Link
              to={project.href}
              className="text-foreground text-[0.9rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors"
            >
              {project.name}
            </Link>
            <span className="text-muted text-[0.8rem] text-right">
              {project.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
