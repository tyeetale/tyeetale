import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    badges: z.array(z.string()),
    topics: z.array(z.string()).optional(),
    connections: z.array(z.string()).optional(),
  }),
});

export const collections = { projects };
