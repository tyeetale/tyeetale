import { externalLinks } from "./links";

export interface ProjectEntry {
  name: string;
  slug: string;
  description: string;
  href: string;
  external: boolean;
}

export const otherProjects: ProjectEntry[] = [
  {
    name: "Onsite",
    slug: "onsite",
    description: "AI business brain for contractors",
    href: externalLinks.onsite,
    external: true,
  },
  {
    name: "Mosslayer",
    slug: "mosslayer",
    description: "Agentic payments & intent mapping",
    href: externalLinks.mosslayer,
    external: true,
  },
];

export const pastProjects: ProjectEntry[] = [
  {
    name: "Metaphor3D",
    slug: "metaphor3d",
    description: "AI-generated 3D mesh assets",
    href: "/projects/metaphor3d",
    external: false,
  },
  {
    name: "Fibes",
    slug: "fibes",
    description: "UGC influencer platform",
    href: "/projects/fibes",
    external: false,
  },
];
