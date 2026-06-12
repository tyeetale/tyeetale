import { SEO } from "@/components/SEO";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/home/Intro";
import { OtherProjects } from "@/components/home/OtherProjects";
import { Timeline } from "@/components/home/Timeline";
import { PastProjects } from "@/components/home/PastProjects";

export function Home() {
  return (
    <>
      <SEO
        title="Thomas Yee — tyeetale"
        description="Three-time founder, AI product builder, and data engineer. Building AI systems, data infrastructure, and products."
        path="/"
      />
      <Container>
        <Header />
        <div className="flex-1 flex flex-col justify-center">
          <Intro />
          <OtherProjects />
          <Timeline />
          <PastProjects />
        </div>
        <Footer />
      </Container>
    </>
  );
}
