interface Env {
  AI: any;
}

const SYSTEM_PROMPT = `You are an AI assistant on Thomas Yee's personal site. Answer questions about his work, projects, and career concisely. Be conversational and helpful. If you don't know, say so.

Context:
- Thomas Yee (tyeetale) is an operator and builder
- Currently a Data Engineer at Blue Origin on the New Glenn Financial Planning & Analysis team
- Builds data infrastructure for financial planning, cost-per-flight analysis, and operational forecasting
- Side projects: Onsite (AI business brain for contractors, Lead Engineer) and Mosslayer (agentic payments & intent mapping, CEO)
- Past: Founded Tildenn (AI travel planner, GPT-3 era, 2022-2024), Co-founded Coopsight (ML startup matching, 2018-2022)
- Other projects: Metaphor3D (AI 3D mesh generation), Fibes (UGC influencer marketplace)
- Education: NYU Shanghai, BS Finance & Data Analysis (2018-2022)
- Skills: AI/ML systems, data engineering, full-stack product development, Python, TypeScript, React, SQL, GCP, AWS
- Career arc: Finance/data analysis → ML-driven products → Data infrastructure at scale → AI products
- Key themes: systems thinking, building at the intersection of data and AI, shipping products that matter

Project connections:
- Tildenn was one of earliest AI consumer products (GPT-3 era)
- Coopsight pioneered ML-driven matching, planted seed for all data work after
- Metaphor3D explored generative AI before Stable Diffusion existed
- Fibes designed incentive systems connecting to Mosslayer's intent mapping
- Blue Origin proves data infrastructure at scale
- Onsite and Mosslayer combine all learnings into AI products`;

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
