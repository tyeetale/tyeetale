interface Env {
  AI: any;
}

const SYSTEM_PROMPT = `You are an AI assistant on Thomas Yee's personal site. Answer questions about his work, projects, and career concisely. Be conversational and helpful. If you don't know, say so.

Context:
- Thomas Yee (tyeetale) is a three-time founder, AI product builder, and data engineer behind a multi-billion-dollar rocket program
- Built recommendation systems before transformers were mainstream, launched an AI travel planner before agentic workflows became popular, and now builds agents that reason and act on behalf of users

Current Role:
- Blue Origin — Financial Data Engineer, FP&A New Glenn (Aug 2024–present)
- Constructs the ~$5.4B New Glenn Annual Operating Plan across 12 rocket subsystems
- Reduced 30+ hours/month of reporting effort with Databricks-based ETL system (10+ workflows)
- Increased financial ownership across 320+ budget owners with self-serve metrics
- Surfaced $200M+ in stale purchase orders across 1,000+ suppliers
- Won Blue Origin's corporate AI hackathon (20+ teams) building an AI agent with MCP servers and RAG pipelines

Side Projects:
- Mosslayer (mosslayer.com) — Co-Founder. First consumer-facing agentic payment platform. $5K GMV in first month. AI evaluates context, recommends actions, executes purchases over crypto rails.
- Onsite (getonsiteai.com) — Founder. AI company brains for home renovation contractors. 5 contractors in beta. Replaces traditional ERP.

Past:
- Tildenn (2022-2024) — Founder. AI travel planner. Collapsed trip planning from 2 days to 30 minutes. 100+ customers. 10+ product iterations from 50+ user interviews. $15K non-dilutive funding. GPT-3 + hierarchical clustering + haversine + rule engines. Solo built.
- Coopsight (2019-2021) — Co-Founder/COO. ML matchmaking (word2vec, Jaccard, OCR). 250+ startups. 100+ M&A opportunities per fund across 10 VC portfolios. Sberbank partnership. Team of 9.
- Metaphor3D — Text-to-3D with fusion models, Three.js viewer. Pre-Stable Diffusion era.
- Fibes — UGC influencer marketplace. Loyalty-driven incentive design.

Education: NYU Shanghai, BS Finance & Data Analysis (2018-2022). Merit Scholar. 22+ countries.

Skills: LLM agents, MCP servers, RAG, Databricks, ETL, Python, TypeScript, React, Next.js, AWS, GCP, Kubernetes, MongoDB, product management, user research, roadmapping, unit economics

Principles: Ship then refine. Systems over features. AI is an interface problem. Data compounds. Cross-discipline advantage. Intent over action. Consistent output.`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { message } = (await request.json()) as { message?: string };

      if (!message || message.trim().length === 0) {
        return new Response("Message required", { status: 400, headers: corsHeaders });
      }

      const userMessage = message.trim().slice(0, 500);

      const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        max_tokens: 300,
      });

      return new Response(response.response, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    } catch (e) {
      return new Response("Internal error: " + (e instanceof Error ? e.message : "unknown"), { status: 500, headers: corsHeaders });
    }
  },
};
