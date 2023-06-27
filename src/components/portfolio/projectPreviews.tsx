import Image from "next/image";

export const projects: {
  title: string;
  href: string;
  previewImage: string;
  description: string;
}[] = [
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
];

const ProjectPreviews = () => {
  return (
    <section className="w-2/3 mx-auto flex flex-col justify-start space-y-4 max-h-[calc(100vh-8rem)] overflow-y-scroll overflow-hidden top-0 grow-0">
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.href}
          className="w-full bg-zinc-100 h-fit rounded-3xl relative aspect-video border"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-zinc-100 rounded-3xl">
            <Image
              src={project.previewImage}
              fill={true}
              className="aspect-video min-h-[400px]"
              alt={`${project.title} preview`}
            />
          </div>
          {project.title}
        </a>
      ))}
    </section>
  );
};

export default ProjectPreviews;
