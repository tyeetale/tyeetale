import { SEO } from "@/components/SEO";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function Notes() {
  return (
    <>
      <SEO
        title="Notes"
        description="Thoughts on building, AI, and systems thinking by Thomas Yee."
        path="/notes"
        noindex={true}
      />
      <Container>
        <Header />
        <div className="flex-1 flex flex-col justify-center items-center text-center py-20">
          <h1 className="font-heading font-bold text-xl text-foreground mb-3">Notes</h1>
          <p className="text-muted-foreground text-sm max-w-[300px]">
            Thoughts on building, AI, and systems thinking. Writing in progress.
          </p>
          <span className="text-muted text-xs mt-6 border border-border px-3 py-1 rounded-full">
            coming soon
          </span>
        </div>
        <Footer />
      </Container>
    </>
  );
}
