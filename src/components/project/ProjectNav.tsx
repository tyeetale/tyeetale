import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <nav className="border-t border-border mt-12 pt-6 flex justify-between items-center">
      {prev ? (
        <Link
          to={`/projects/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          to={`/projects/${next.slug}`}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <span>{next.title}</span>
          <ArrowRight size={14} />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
