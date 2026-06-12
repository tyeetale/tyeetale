import { useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { ProjectNav } from "@/components/project/ProjectNav";
import { lazy, Suspense } from "react";

const projects = {
  tildenn: lazy(() => import("@/content/projects/tildenn.mdx")),
  coopsight: lazy(() => import("@/content/projects/coopsight.mdx")),
  metaphor3d: lazy(() => import("@/content/projects/metaphor3d.mdx")),
  fibes: lazy(() => import("@/content/projects/fibes.mdx")),
} as Record<string, React.LazyExoticComponent<React.ComponentType<any>>>;

const projectOrder = ["fibes", "metaphor3d", "coopsight", "tildenn"];

const projectMeta: Record<
  string,
  { title: string; tagline: string; badges: string[] }
> = {
  tildenn: {
    title: "Tildenn",
    tagline: "The Flexible Travel App",
    badges: ["AI", "Travel", "Mobile"],
  },
  coopsight: {
    title: "Coopsight",
    tagline: "Startup Ecosystem Matchmaker",
    badges: ["ML", "Startups", "B2B"],
  },
  metaphor3d: {
    title: "Metaphor3D",
    tagline: "AI 3D Generated Assets",
    badges: ["Generative AI", "3D", "Three.js"],
  },
  fibes: {
    title: "Fibes",
    tagline: "Organic Influencer Affiliate Platform",
    badges: ["Social Media", "UGC", "Marketing"],
  },
};

export function Project() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !projects[slug]) {
    return (
      <Container>
        <Header />
        <p className="text-muted-foreground">Project not found.</p>
        <Footer />
      </Container>
    );
  }

  const MDXContent = projects[slug];
  const meta = projectMeta[slug];

  const currentIndex = projectOrder.indexOf(slug);
  const prevSlug = currentIndex > 0 ? projectOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : null;

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.tagline}
        path={`/projects/${slug}`}
        type="article"
      />
      <Container>
        <Header />
        <ProjectDetail
          title={meta.title}
          tagline={meta.tagline}
          badges={meta.badges}
        >
          <Suspense fallback={<p className="text-muted">Loading...</p>}>
            <MDXContent />
          </Suspense>
        </ProjectDetail>
        <ProjectNav
          prev={prevSlug ? { slug: prevSlug, title: projectMeta[prevSlug].title } : null}
          next={nextSlug ? { slug: nextSlug, title: projectMeta[nextSlug].title } : null}
        />
        <Footer />
      </Container>
    </>
  );
}
