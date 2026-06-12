import { SEO } from "@/components/SEO";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const projects = [
  { slug: "tildenn", title: "Tildenn", tagline: "AI travel planner, built at the dawn of GPT-3" },
  { slug: "coopsight", title: "Coopsight", tagline: "ML-powered startup ecosystem matching" },
  { slug: "metaphor3d", title: "Metaphor3D", tagline: "AI-generated 3D mesh assets" },
  { slug: "fibes", title: "Fibes", tagline: "UGC influencer marketplace" },
];

export function Projects() {
  return (
    <>
      <SEO
        title="Projects"
        description="Past projects by Thomas Yee. AI travel planning, ML startup matching, generative 3D, and UGC marketplaces."
        path="/projects"
      />
      <Container>
        <Header />
        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Projects</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Things I've built. Click to read the full story.
        </p>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group flex items-baseline justify-between gap-4 py-2 border-b border-border last:border-0"
            >
              <span className="text-foreground text-[0.95rem] group-hover:underline underline-offset-[3px] decoration-border transition-colors">
                {project.title}
              </span>
              <span className="text-muted text-[0.8rem] text-right">
                {project.tagline}
              </span>
            </Link>
          ))}
        </div>
        <Footer />
      </Container>
    </>
  );
}
