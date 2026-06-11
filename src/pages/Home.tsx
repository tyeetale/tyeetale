import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Thomas Yee — tyeetale</title>
        <meta
          name="description"
          content="Thomas Yee — operator and builder. AI systems, data infrastructure, and products."
        />
        <meta property="og:title" content="Thomas Yee — tyeetale" />
        <meta
          property="og:description"
          content="Operator and builder. AI systems, data infrastructure, and products."
        />
        <meta property="og:image" content="/og.png" />
        <meta property="og:type" content="website" />
      </Helmet>
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
