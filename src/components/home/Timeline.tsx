import { ExternalLink } from "lucide-react";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-6">
        Timeline
      </h2>
      <div className="relative ml-3">
        {/* Vertical line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        {timeline.map((entry, idx) => (
          <div
            key={idx}
            className={`relative pl-6 ${idx < timeline.length - 1 ? "pb-8" : ""}`}
          >
            {/* Dot - centered on the line */}
            <div
              className={`absolute left-0 top-[0.45rem] w-2.5 h-2.5 rounded-full -translate-x-1/2 ${
                entry.current
                  ? "bg-accent shadow-[0_0_6px_rgba(74,222,128,0.5)]"
                  : "bg-muted"
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
                <a
                  href={entry.href}
                  className="text-foreground text-[0.95rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors w-fit"
                >
                  {entry.company}
                </a>
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
