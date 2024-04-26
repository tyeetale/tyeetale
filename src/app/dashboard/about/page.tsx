import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function About() {
  const services = [
    "End-to-End Product Design",
    "Product Strategy",
    "Branding & Visual Identity Design",
    "User Experience Design",
    "Web & Mobile Development",
    "Analytics & Forecasting",
  ];

  const libraries_frameworks = [
    "Next.js",
    "React.js",
    "TailwindCSS",
    "Node.js",
    "React Native",
    "Webpack",
    "Express.js",
    "Vue.js",
    "Sveltekit",
    "Python Flask / Django",
  ];

  const languages = [
    "HTML / XML / HTMX",
    "CSS / SCSS / LESS",
    "JavaScript / TypeScript",
    "Python",
    "R",
    "SQL - PostgreSQL, MySQL, SQLite",
  ];

  const platform_tools = [
    "Google Cloud Platform (GCP)",
    "Amazon Web Services (AWS)",
    "Supabase",
    "MongoDB",
    "Firebase",
    "Docker",
    "Expo",
    "Vercel",
    "Google Analytics",
    "Git",
    "Postman",
    "RStudio",
    "Framer",
    "Figma",
    "Notion",
    "ChatGPT, Llama & Gemini",
    "JIRA / Scrum, Kanban, Agile Software",
    "Microsoft Suite (Word, Powerpoint, Excel, etc.)",
  ];

  const experience = [
    {
      timeframe: "March 2022 - Present",
      company: "Tildenn",
      title: "Software Engineer",
      description: "Full Stack Web Development",
    },
    {
      timeframe: "2018 - 2022",
      company: "Coopsight",
      title: "Software Engineer",
      description: "Full Stack Web Development",
    },
    {
      timeframe: "2018 - 2018",
      company: "The Weitzman Group",
      title: "Financial Analyst Intern",
      description: "Full Stack Web Development",
    },
  ];

  const education = [
    {
      timeframe: "2018 - 2022",
      school: "New York University (NYU)",
      degree: "Bachelor of Science in Business & Finance",
      description: [
        "Dual Concentration in Business Analytics & Marketing",
        " Merit Scholarship (2018-2022)",
        "GPA: 3.5/4.0",
      ],
    },
  ];

  return (
    <main className="bg-white dark:bg-neutral-900 h-full rounded-2xl shadow-lg p-24 pb-0">
      <div className="w-full h-full flex flex-col space-y-16 items-start">
        <div className="w-full h-full flex justify-between">
          <div className="w-3/5 flex flex-col space-y-4">
            <h1 className="font-semibold text-4xl">Thomas Yee</h1>
            <h2 className="font-semibold text-3xl text-neutral-500 dark:text-neutral-300">
              Consistent Output + Improvement
            </h2>
            <div className="w-full text-2xl font-light text-neutral-500 break-words flex flex-col space-y-8 my-8 dark:text-neutral-400">
              <p>
                Hi, I'm Thomas, a developer and analyst with over 5 years of
                experience. I enjoy building cool things from scratch, ranging
                from ideas, products, or marketing strategies.
              </p>
              <p>
                I'm an extreme generalist focused on adapting and scaling my
                work across different mediums, infrastructures, and tech stacks.{" "}
              </p>
              <p>
                My goal in life is to maximize my potential and to output more
                with purpose and meaningful impact.
              </p>
              <p>
                Don’t be surprised to find me in the wild traveling when not
                improving myself, as I love being an adventurer, seeking new
                experiences and perspectives. Feel free to chat with me about
                all things food, culture, and tech 😊
              </p>
            </div>
          </div>
          <div className="w-80 h-80 relative">
            <Image
              src="/thomas.png"
              alt="Thomas Yee"
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Services
          </h3>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Libraries & Frameworks
          </h3>
          <ul>
            {libraries_frameworks.map((library) => (
              <li key={library}>{library}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Languages
          </h3>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Platforms & Tools
          </h3>
          <ul>
            {platform_tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Experience
          </h3>
          <ul>
            {experience.map((exp) => (
              <li key={exp.timeframe}>
                {exp.timeframe} - {exp.company} - {exp.title} -{" "}
                {exp.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-xl text-neutral-600 dark:text-neutral-500">
            Education
          </h3>
          <ul>
            {education.map((edu) => (
              <li key={edu.timeframe}>
                {edu.timeframe} - {edu.school} - {edu.degree} -{" "}
                <ul>
                  {edu.description.map((desc) => (
                    <li key={desc}>{desc}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <Separator />
      </div>
    </main>
  );
}
