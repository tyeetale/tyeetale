import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function Building() {
  return (
    <>
      <Helmet>
        <title>About — tyeetale</title>
        <meta name="description" content="How Thomas Yee thinks about building products, systems, and teams." />
      </Helmet>
      <Container>
        <Header />

        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Building</h1>
        <p className="text-muted-foreground text-sm mb-10">
          How I think about making things. Principles that stay, interests that evolve.
        </p>

        {/* Principles */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-6">
            Principles
          </h2>
          <div className="flex flex-col gap-6">
            <Principle
              title="Ship, then refine"
              body="A working thing in someone's hands teaches more than a perfect thing in your head. Get it out, watch how it breaks, fix what matters."
            />
            <Principle
              title="Systems over features"
              body="Features solve one problem. Systems solve categories of problems. I always ask: what's the system that makes this feature trivial to build?"
            />
            <Principle
              title="AI is an interface problem"
              body="Models are commoditizing. The hard part is designing the interface that makes AI output useful. A great model with bad UX is just a chatbot."
            />
            <Principle
              title="Data compounds"
              body="Every data pipeline you build, every connection you surface, every pattern you capture — it compounds. Build the infrastructure to learn from your own systems."
            />
            <Principle
              title="Cross-discipline advantage"
              body="The best products happen at intersections. Finance informs how I think about data. Design informs how I think about systems. Engineering makes it all real."
            />
            <Principle
              title="Intent over action"
              body="Understanding what someone is trying to do matters more than what they asked for. Map intent first, then figure out the action."
            />
          </div>
        </section>

        {/* Current Interests */}
        <section className="mb-12">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-6">
            Currently Exploring
          </h2>
          <div className="flex flex-col gap-4">
            <Interest
              topic="Agentic systems"
              detail="How do you build AI agents that reliably act on behalf of users? What does trust look like when the agent holds your wallet?"
            />
            <Interest
              topic="Intent mapping"
              detail="Going from 'what the user said' to 'what they actually need' to 'what action to take.' The gap between these three is where most AI products fail."
            />
            <Interest
              topic="Data infrastructure at human scale"
              detail="Most data pipelines are built for dashboards no one reads. How do you build systems where the data surfaces insights at the moment they matter?"
            />
            <Interest
              topic="AI-native UX patterns"
              detail="We're still designing AI products with forms and buttons. What does interaction look like when the system can anticipate, suggest, and act?"
            />
            <Interest
              topic="Cost of intelligence"
              detail="Running AI at scale is expensive. How do you architect systems where the right model runs at the right time for the right cost?"
            />
          </div>
        </section>

        <Footer />
      </Container>
    </>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-foreground text-[0.95rem] font-medium mb-1">{title}</h3>
      <p className="text-muted-foreground text-[0.85rem] leading-relaxed">{body}</p>
    </div>
  );
}

function Interest({ topic, detail }: { topic: string; detail: string }) {
  return (
    <div>
      <h3 className="text-foreground text-[0.95rem] font-medium mb-1">{topic}</h3>
      <p className="text-muted text-[0.85rem] leading-relaxed">{detail}</p>
    </div>
  );
}
