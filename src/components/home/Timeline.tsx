import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-6">
        Timeline
      </h2>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-border to-transparent" />

        {timeline.map((entry, idx) => (
          <div
            key={idx}
            className={`relative ${idx < timeline.length - 1 ? "mb-8" : ""}`}
          >
            {/* Dot */}
            <div
              className={`absolute -left-6 top-1.5 w-2 h-2 rounded-full border-2 border-background ${
                entry.current ? "bg-accent" : "bg-muted"
              }`}
            />

            <div className="flex flex-col gap-0.5">
              <span className="text-muted text-xs">{entry.dateRange}</span>
              {entry.external ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-[0.95rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-1 w-fit"
                >
                  {entry.company}
                  <ExternalLink size={12} className="text-muted" />
                </a>
              ) : (
                <Link
                  to={entry.href}
                  className="text-foreground text-[0.95rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors w-fit"
                >
                  {entry.company}
                </Link>
              )}
              <span className="text-muted-foreground text-[0.85rem]">
                {entry.title}
              </span>
              <span className="text-muted text-[0.8rem]">
                {entry.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
