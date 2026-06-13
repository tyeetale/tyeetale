import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const projects = await getCollection('projects');
  return rss({
    title: 'tyeetale',
    description: 'Thomas Yee — operator and builder. AI systems, data infrastructure, and products.',
    site: context.site!,
    items: projects.map((project) => ({
      title: project.data.title,
      description: project.data.tagline,
      link: `/projects/${project.id.replace('.mdx', '')}/`,
    })),
  });
}
