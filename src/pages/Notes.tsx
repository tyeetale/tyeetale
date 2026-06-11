import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function Notes() {
  return (
    <>
      <Helmet>
        <title>Notes — tyeetale</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header />
        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Notes</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Thoughts and writing. Coming soon.
        </p>
        <Footer />
      </Container>
    </>
  );
}
