import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ProjectDetailProps {
  title: string;
  tagline: string;
  badges?: string[];
  children: ReactNode;
}

export function ProjectDetail({
  title,
  tagline,
  badges,
  children,
}: ProjectDetailProps) {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        back
      </Link>

      <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
        {title}
      </h1>
      <p className="text-muted-foreground text-[0.95rem] mb-4">{tagline}</p>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-xs px-2 py-0.5 rounded bg-surface text-muted-foreground border border-border"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert prose-sm max-w-none [&_img]:rounded-lg [&_img]:border [&_img]:border-border [&>p:first-of-type>strong]:text-foreground [&>p:first-of-type>strong]:text-base [&>p:first-of-type>strong]:leading-relaxed [&>p:first-of-type>strong]:block [&>p:first-of-type>strong]:mb-6 [&>p:first-of-type>strong]:font-medium [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground">
        {children}
      </article>
    </div>
  );
}
