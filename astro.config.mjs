import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tyeetale.vercel.app',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) => 
        !page.includes('/experiments') &&
        !page.includes('/graph') &&
        !page.includes('/notes') &&
        !page.includes('/qr') &&
        !page.includes('/uses'),
    }),
  ],
});
