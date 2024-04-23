"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
  TbMail,
  TbMoon,
  TbPencil,
  TbStar,
  TbSun,
  TbUser,
} from "react-icons/tb";

export default function Landing() {
  const { setTheme, theme } = useTheme();

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-12 bg-neutral-200 dark:bg-neutral-950">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <nav className="flex items-center justify-center space-x-4">
          <Link
            href={"/dashboard/about"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-blue-500 hover:bg-blue-200 hover:text-blue-500 dark:hover:text-blue-500"
            )}
          >
            <TbUser className="mr-2 h-4 w-4" /> About
          </Link>
          <Link
            href={"/dashboard/projects"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-orange-500 hover:bg-orange-200 hover:text-orange-500 dark:hover:text-orange-500"
            )}
          >
            <TbStar className="mr-2 h-4 w-4" /> Projects
          </Link>
          <Link
            href={"/dashboard/blog"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-purple-500 hover:bg-purple-200 hover:text-purple-500 dark:hover:text-purple-500"
            )}
          >
            <TbPencil className="mr-2 h-4 w-4" /> Blog
          </Link>
          <Link
            href={"/dashboard/contact"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500 dark:text-neutral-300 dark:hover:text-neutral-300"
            )}
          >
            <TbMail className="mr-2 h-4 w-4" /> Contact
          </Link>
        </nav>
        <section>
          <CardContainer className="relative min-w-96">
            <CardBody className="bg-gradient-to-br from-cyan-50 from-10% via-yellow-50 via-30% to-purple-50 justify-center relative flex flex-col group/card h-96 shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:from-black/[0.1] dark:via-bg-neutral-900 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-12 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-black dark:text-white py-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="88"
                  height="88"
                  fill="none"
                  viewBox="0 0 120 120"
                >
                  <path
                    fill="#fff"
                    d="M100.465 63.784c-.52-4.569.152-14.117.197-14.697.286-3.667-3.477-22.14-6.725-20.806-5.45-4.313-10.662-1.274-17.449-1.73-14.096-.945-33.855-14.277-44.74-4.79-5.383 4.926-5.86 27.593-5.44 35.054-4.89 7.072-15.989 14.157-9.895 22.424 2.071 2.642 10.446 4.657 13.048 6.658 5.234 4.221 5.917 16.06 12.922 16.06 13.998 12.579 41.913 11.771 55.666-2.536 10.635-10.361 4.769-22.428 2.899-35.637 1.207-10.37.531 8.911-.483 0z"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeWidth="7.2"
                    d="M15.212 61.746c-4.732 0 .562 4.575 1.115 6.18-4.103 5.65-3.118 15.234 3.594 18.434 1.65.787 3.485 1.231 5.318 1.171.956-.034 1.954-.164 2.86-.478.451-.157.898-.358 1.248-.679.84 4.447 2.76 8.543 5.173 12.395 1.36 2.166 3.414 4.55 5.24 6.349 2.093 2.001 8.24 5.404 16.08 3.002m-.347-1.099c-.64 3.282 2.33 5.325 5.163 6.117 3.224.902 6.582.483 9.841-.014l.563-.087c8.444-1.309 15.03-4.13 22.663-7.919 3.38-1.676 6.521-3.934 8.825-6.948 2.567-3.362 3.362-7.34 3.137-11.506-.251-4.59-.975-9.194-1.555-13.751l-.181-1.41c-.543-4.226 2.886-9.409 2.251-13.623-1.215-8.074-5.079-15.238-7.258-23.116"
                  ></path>
                  <path
                    stroke="#fff"
                    strokeWidth="7.2"
                    d="M15.399 62.551c-5.41-12.752.805-27.854 4.588-33.811-.483-.161-1.521-.821-1.811-2.174-.29-1.352 1.73-2.576 2.777-3.019-.2-.724-.362-2.366.604-3.14.966-.772 4.106-.321 5.555 0C36.53 10.869 59.957 7.005 64.908 6.4c3.96-.483 9.78 1.329 12.196 2.295l.242-.363c2.318 1.74 14.41 4.348 20.165 5.434.484.242 1.498.87 1.691 1.45.193.579-.564 1.77-.966 2.294.604-.242 1.956-.46 2.536.603.579 1.063.402 2.456.241 3.02.483-.403 1.667-.604 2.536 1.81.87 2.416-1.087 7.206-2.173 9.299 0 1.167-.073 3.622-.363 4.105-.174.291-.46.637-.845.919"
                  ></path>
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M26.548 71.86c-2.294-.196-4.154.582-5.837 2.067-.167.145.016.372.2.34 1.669-.294 3.642.037 5.236.551 1.775.575 2.73 1.782 4.159 2.852 1.57 1.174 3.75-1.118 2.68-2.68-1.354-1.978-4.132-2.932-6.438-3.13z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#000"
                    d="M96.518 33.668c.43 6.714 1.335 13.391 2.198 20.066l.205 1.597c1.023 7.985.544 15.978 1.359 23.986.073.71.159 1.432.246 2.16v.003c.388 3.253.793 6.647.08 9.802-.705 3.132-2.704 5.567-5.194 7.513-5.852 4.582-11.74 7.605-18.884 9.46-3.825.993-7.962 1.983-11.935 1.937-1.423-.017-2.932-.188-4.234-.802-1.111-.522-1.81-1.461-2.447-2.472l-.123-.197c-.53-.857-2.081-.809-2.296.3-.64 3.282 2.33 5.325 5.163 6.117 3.224.902 6.582.483 9.841-.014l.563-.087c8.444-1.309 15.03-4.13 22.663-7.919 3.38-1.676 6.521-3.934 8.825-6.948 2.567-3.362 3.362-7.34 3.137-11.506-.251-4.59-.975-9.194-1.555-13.751l-.181-1.41c-.543-4.226.338-8.45-.297-12.665-1.215-8.074-2.531-16.196-4.71-24.074l-2.424-1.096zM15.212 61.746c.336 1.485.562 4.575 1.115 6.18-4.103 5.65-3.118 15.234 3.594 18.434 1.65.787 3.485 1.232 5.318 1.171.956-.034 1.954-.164 2.86-.478.451-.157.898-.357 1.248-.679.84 4.447 2.76 8.543 5.173 12.395 1.36 2.166 2.937 4.33 4.763 6.129 1.93 1.898 5.26 3.753 7.612 1.418.802-.795.544-2.029-.338-2.618-1.652-1.111-3.4-1.792-4.86-3.205-1.622-1.572-3.158-3.27-4.607-5.002-2.067-2.468-3.883-5.16-5.66-7.864l-1.448-2.209a.224.224 0 00.008-.022l.014-.046.01-.066.036-.226.003-.007.028-.059.058-.132c.444-.852-.109-1.833-1.075-1.874-.31 0-.353-.01-.13-.03l.092-.009a2.091 2.091 0 00-1.075-.29c-.452 0-.881.155-1.314.261-.637.157-1.205.268-1.862.266a7.12 7.12 0 01-3.784-1.11c-2.628-1.658-3.386-5.21-2.961-8.118.12-.824.447-1.915.73-2.64.787-1.84 2.117-3.33 4.008-4.376a7.484 7.484 0 013.867-.927c.004.035.01.071.017.107l.002.009c.145.755.504 1.136 1.025 1.593l.187.163c.713.608 1.626.552 2.2-.02l.015.02c.184-.182.643-.773.778-.94.306-.512.425-1.053.427-1.845.002-.817-.405-2.656-.427-3.475l-15.647.121z"
                  ></path>
                  <path
                    fill="#000"
                    d="M15.399 62.551h15.577c-.282-3.462-.676-10.481 0-10.868.845-.483 6.52-1.207 8.09-4.83 1.57-3.623-4.467-10.989.966-19.2 7.165 1.53 22.823 4.589 28.136 4.589 6.642 0 26.445-.604 27.774-2.174-.08 1.973-.121 6.038.362 6.52.362.403 1.328 1.208 2.294 1.208a2.64 2.64 0 001.57-.53c.385-.282.671-.628.845-.919.29-.483.363-2.938.363-4.105 1.086-2.093 3.043-6.883 2.173-9.298-.869-2.415-2.053-2.214-2.536-1.812.161-.563.338-1.956-.241-3.019-.58-1.062-1.932-.845-2.536-.603.402-.524 1.16-1.715.966-2.295-.193-.58-1.207-1.207-1.69-1.449-5.757-1.086-17.848-3.695-20.166-5.434l-.242.363c-2.415-.966-8.235-2.778-12.196-2.295-4.951.604-28.377 4.468-37.796 14.008-1.45-.322-4.589-.773-5.555 0-.966.773-.805 2.415-.604 3.14-1.046.442-3.067 1.666-2.777 3.018.29 1.353 1.328 2.013 1.811 2.174C16.204 34.697 9.99 49.8 15.4 62.55z"
                  ></path>
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M57.384 59.703c.234-2.895 4.657-3.552 5.097-.688.394 2.566-.07 4.924-1.23 7.234-1.107 2.207-3.892 1.177-4.103-.832-.208-1.986-.06-3.17.09-4.376.053-.43.107-.864.146-1.338zm36.245-2.326c-1.067-.31-1.957.24-2.574 1.044-.07.093-.129.185-.181.276-1.925 1.764-1.2 5.338.314 7.128.93 1.098 2.985.782 3.621-.465 1.171-2.295 2.153-7.012-1.18-7.983zM81.223 77.994c2.279-3.18-.948-6.172-3.066-7.456-.555-.396.955-2.112 2.141-1.909 10.34 4.9 4.12 20.733-9.63 10.587-1.636-1.316.346-4.214 2.11-3.087l.281.216c1.982 1.527 5.61 4.322 8.165 1.649zM69.913 96.08a11.411 11.411 0 01-4.797-3.679c-.427-.568-.538-1.167-.448-1.716.1-.617.466-1.175.966-1.55.5-.376 1.127-.562 1.732-.467.527.082 1.05.37 1.465.965l.087.119a7.555 7.555 0 002.769 2.316 6.26 6.26 0 003.428.6c2.306-.259 3.895-1.502 5.585-3.19.21-.214.42-.434.63-.657a.99.99 0 01.522-.4c.228-.077.485-.072.72.01.228.079.432.229.568.428.13.19.203.424.179.693-.155 1.75-1.073 3.311-2.376 4.537-1.448 1.362-3.367 2.304-5.174 2.634-1.99.364-4.019.103-5.856-.643z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#000"
                    stroke="#000"
                    strokeWidth="0.242"
                    d="M47.505 47.436l-.079 5.772c1.106-1.005 4.058-3.238 7.019-4.131 3.701-1.117 14.058.701 15.07 1.68.81.783 4.865-4.187 2.855-5.233-2.01-1.046-19.182-1.511-24.865 1.912zM81.843 44.667c-2.484 2.113-.535 4.167 0 5.374.534 1.208 3.98-2.84 6.94-3.733 3.701-1.117 10.954 1.547 11.967 2.526.81.783 1.647-4.871-.363-5.917-2.01-1.046-16.06-.362-18.544 1.75z"
                  ></path>
                  <path
                    fill="#000"
                    d="M99.762 63.903c-.683 1.859-1.723 3.794-2.994 5.358-5.142 4.355-10.14 1.944-12.677-3.958-.964-4.171 1.596-8.664 4.308-11.733 3.918-3.926 10.31-1.865 12.112 2.802.109.605.175 1.208.207 1.81-.038 1.953-.273 3.623-.956 5.48v.241zM50.33 60.155c6.775-8.059 19.449-8.49 19.126 3.913C68 79.768 43.494 75.914 50.33 60.155zm51.563-6.723a11.335 11.335 0 00-.789-1.163c-.106-.063-.167-.624-.558-.666-5.223-5.762-14.399-2.493-17.714 3.249a9.386 9.386 0 00-1.464 2.474c-3.266-.6-7.075-.483-10.113.75-3.012-7.866-12.133-8.568-18.143-5.207-3.739 1.839-6.163 5.689-9.799 7.804-8.546.615-17.719-1.3-26.111.844-6.62 1.376-1.086 4.728.024 2.491 7.912-2.338 17.286-.362 25.502-.889.854 1.445 2.492 2.627 4.125 2.577 1.763 15.63 24.558 13.039 25.344-.856.892-1.41 2.001-2.76 3.589-3.638.608-.126 1.195-.29 1.731-.543.918-.13 2.33.26 3.175 1.023 2.89 17.345 19.544 15.325 22.52.13.059-.06.224-.287.351-.65 1.019-1.347 3.513-1.848 3.114-4.121-.354-2.275-3.227-2.248-4.784-3.608z"
                  ></path>
                </svg>
              </CardItem>{" "}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-black dark:text-white"
              >
                👋 Hello World, I’m Thomas!
              </CardItem>{" "}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-neutral-300"
              >
                Consistent Output + Improvement.
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-800 dark:text-neutral-400 text-s max-w-sm mt-2"
              >
                Developer & Analyst with over 5+ years of startup experience,
                creating simple fun user experiences for multiple industries,
                infrastructures, and tech stacks.
              </CardItem>
            </CardBody>
          </CardContainer>
          <aside className="flex items-center justify-center space-x-12">
            <Link
              href={"https://github.com/tyeetale"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
              )}
            >
              <TbBrandGithub size={24} />
            </Link>

            <Link
              href={"https://www.linkedin.com/in/tyeetyee/"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
              )}
            >
              <TbBrandLinkedin size={24} />
            </Link>
            <Link
              href={"https://twitter.com/tyeetale"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
              )}
            >
              <TbBrandX size={24} />
            </Link>
            <Link
              href={"https://www.instagram.com/tyeetale/"}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
              )}
            >
              <TbBrandInstagram size={24} />
            </Link>
          </aside>
        </section>
        <section className="flex items-center justify-center space-x-12">
          <Button
            variant="link"
            color="neutral-700"
            className="text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-100 dark:hover:text-neutral-100"
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <TbMoon size={24} /> : <TbSun size={24} />}
          </Button>
        </section>
      </div>
    </main>
  );
}
