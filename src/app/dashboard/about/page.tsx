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
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Services
          </h3>
          <ul className=" grid grid-cols-2 gap-1 overflow-hidden rounded-xl ">
            {services.map((service) => (
              <li
                key={service}
                className="p-4 bg-neutral-200 dark:bg-neutral-800"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Libraries & Frameworks
          </h3>
          <ul className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl ">
            {libraries_frameworks.map((library) => (
              <li
                key={library}
                className="p-4 bg-neutral-200 dark:bg-neutral-800"
              >
                {library}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Languages
          </h3>
          <ul className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl ">
            {languages.map((language) => (
              <li
                key={language}
                className="p-4 bg-neutral-200 dark:bg-neutral-800"
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Platforms & Tools
          </h3>
          <ul className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
            {platform_tools.map((tool) => (
              <li key={tool} className="p-4 bg-neutral-200 dark:bg-neutral-800">
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Experience
          </h3>
          <ul className="flex flex-col space-y-8">
            {experience.map((exp, idx) => (
              <>
                <li
                  key={exp.company}
                  className="flex w-full items-start justify-start space-x-4"
                >
                  <div className="w-1/3 ">{exp.timeframe}</div>
                  <div className="w-2/3 flex flex-col space-y-4">
                    <div className="flex flex-col">
                      <h4 className="font-semibold">{exp.company}</h4>
                      <p className="text-neutral-500 font-medium">
                        {exp.title}
                      </p>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-400">
                      {exp.description}
                    </p>
                  </div>
                </li>
                {idx < experience.length - 1 && <Separator />}
              </>
            ))}
          </ul>
        </div>
        <div className="w-full space-y-4">
          <h3 className="dark:text-white font-semibold text-2xl text-neutral-600">
            Education
          </h3>
          <ul className="flex flex-col space-y-8">
            {education.map((edu) => (
              <>
                <li className="flex w-full items-start justify-start space-x-4">
                  <div className="w-1/3">{edu.timeframe}</div>
                  <div className="w-2/3 flex flex-col space-y-4">
                    <div className="flex flex-col">
                      <h4 className="font-semibold">{edu.school}</h4>
                      <p className="text-neutral-500 font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    <ul className="list-disc">
                      {edu.description.map((point) => (
                        <li className="text-neutral-800 dark:text-neutral-400">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <Separator />
              </>
            ))}
          </ul>
        </div>

        {/* <div className="w-full space-y-4 flex">
          <Button variant="default" asChild>
            Download Resume
          </Button>
          <Button variant="outline" asChild>
            See My Daily Reports on Twitter
          </Button>
        </div> */}
      </div>
    </main>
  );
}
