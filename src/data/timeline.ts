import { externalLinks } from "./links";

export interface TimelineEntry {
  dateRange: string;
  company: string;
  href: string;
  external: boolean;
  title: string;
  description: string;
  current: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    dateRange: "2024 / now",
    company: "Blue Origin",
    href: externalLinks.blueOrigin,
    external: true,
    title: "Data Engineer",
    description: "Data infrastructure for New Glenn financial planning & cost analysis",
    current: true,
  },
  {
    dateRange: "2022 / 2024",
    company: "Tildenn",
    href: "/projects/tildenn",
    external: false,
    title: "Founder & Engineer",
    description: "AI travel planner, built at the dawn of GPT-3",
    current: false,
  },
  {
    dateRange: "2018 / 2022",
    company: "Coopsight",
    href: "/projects/coopsight",
    external: false,
    title: "Software Engineer",
    description: "ML-powered startup ecosystem matching",
    current: false,
  },
  {
    dateRange: "2018 / 2022",
    company: "NYU Shanghai",
    href: externalLinks.nyuShanghai,
    external: true,
    title: "BS Finance, Data Analysis",
    description: "Business Analytics & Marketing, Merit Scholar",
    current: false,
  },
];
