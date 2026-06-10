import { ExternalLink } from "lucide-react";
import { otherProjects } from "@/data/projects";

export function OtherProjects() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-4">
        Other Projects
      </h2>
      <div className="flex flex-col gap-2.5">
        {otherProjects.map((project) => (
          <div
            key={project.slug}
            className="flex items-baseline justify-between gap-4"
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground text-[0.9rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-1"
            >
              {project.name}
              <ExternalLink size={12} className="text-muted" />
            </a>
            <span className="text-muted text-[0.8rem] text-right">
              {project.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
