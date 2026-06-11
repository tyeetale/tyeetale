import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function Experiments() {
  return (
    <>
      <Helmet>
        <title>Experiments — tyeetale</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header />
        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Experiments</h1>
        <p className="text-muted-foreground text-sm mb-4">
          You found it. Playful things, web experiments, and widgets that don't belong anywhere else.
        </p>
        <p className="text-muted text-xs mb-10">
          This page is unlisted. You're here because you clicked enough times.
        </p>

        {/* Placeholder grid for future experiments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="border border-border rounded-lg p-6 flex items-center justify-center min-h-[120px]">
            <span className="text-muted text-sm">Widget 1 — coming soon</span>
          </div>
          <div className="border border-border rounded-lg p-6 flex items-center justify-center min-h-[120px]">
            <span className="text-muted text-sm">Widget 2 — coming soon</span>
          </div>
        </div>

        <Footer />
      </Container>
    </>
  );
}
