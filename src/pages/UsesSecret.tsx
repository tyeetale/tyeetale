import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function UsesSecret() {
  return (
    <>
      <Helmet>
        <title>Uses — tyeetale</title>
        <meta name="robots" content="noindex" />
        <meta name="description" content="What Thomas Yee uses to build." />
      </Helmet>
      <Container>
        <Header />

        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Uses</h1>
        <p className="text-muted-foreground text-sm mb-10">
          Software and tools I use to build things.
        </p>

        <Section title="Editor & Terminal">
          <Item name="Cursor" description="AI-native code editor. Primary IDE." />
          <Item name="VS Code" description="Fallback for specific extensions." />
          <Item name="Warp" description="Terminal with AI built in." />
          <Item name="Git" description="Version control. GitHub for hosting." />
        </Section>

        <Section title="Languages">
          <Item name="TypeScript" description="Default for everything frontend and backend." />
          <Item name="Python" description="Data engineering, ML pipelines, scripts." />
          <Item name="SQL" description="PostgreSQL, BigQuery, analytical queries." />
        </Section>

        <Section title="Frameworks & Libraries">
          <Item name="React" description="UI framework of choice." />
          <Item name="Vite" description="Build tool. Fast, no config bloat." />
          <Item name="TailwindCSS" description="Styling. Utility-first." />
          <Item name="Next.js" description="When SSR or edge rendering is needed." />
          <Item name="FastAPI" description="Python APIs." />
          <Item name="React Native" description="Mobile when needed." />
        </Section>

        <Section title="Infrastructure & Data">
          <Item name="Vercel" description="Frontend deployments." />
          <Item name="Cloudflare Workers" description="Edge compute, AI inference." />
          <Item name="Supabase" description="Database, auth, realtime." />
          <Item name="GCP / BigQuery" description="Data warehousing, production infra." />
          <Item name="AWS" description="S3, Lambda, enterprise infra." />
          <Item name="Docker" description="Containerization for services." />
        </Section>

        <Section title="AI & ML">
          <Item name="OpenAI / Claude / Llama" description="LLMs for product features and workflows." />
          <Item name="Workers AI" description="Edge inference, free tier models." />
          <Item name="LangChain / LlamaIndex" description="When orchestration is needed." />
        </Section>

        <Section title="Design & Productivity">
          <Item name="Figma" description="Design, prototyping, collaboration." />
          <Item name="Notion" description="Documentation, planning." />
          <Item name="Linear" description="Project management." />
          <Item name="Arc" description="Browser." />
        </Section>

        <Footer />
      </Container>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-2.5">{children}</div>
    </section>
  );
}

function Item({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-foreground text-[0.9rem]">{name}</span>
      <span className="text-muted text-[0.8rem] text-right">{description}</span>
    </div>
  );
}
