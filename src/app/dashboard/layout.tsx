import LogoIcon from "@/components/logoIcon";
import NavPages from "@/components/navPages";
import NavSocial from "@/components/navSocial";
import { Badge } from "@/components/ui/badge";
import DarkLightToggle from "@/components/ui/darkLightToggle";
import { ReactNode } from "react";
import { TbCircleFilled } from "react-icons/tb";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen h-screen bg-stone-200 dark:bg-neutral-800">
      <nav className="w-1/5 flex flex-col h-full items-center justify-between p-8">
        <aside className="flex-col space-y-8 items-center flex">
          <LogoIcon />
          <aside className="text-center space-y-2">
            <h2 className="font-bold text-xl">Thomas Yee</h2>
            <p className="font-medium text-lg text-neutral-500">
              Developer + Analyst
            </p>
            <Badge className="bg-green-200 hover:bg-green-200 dark:bg-green-500 dark:hover:bg-green-500">
              <TbCircleFilled className="mr-2 h-2 w-2 text-green-500 dark:text-white" />
              <span className="text-green-500 dark:text-white">
                Available for Work
              </span>
            </Badge>
          </aside>
          <NavSocial className="space-x-1" />
          <NavPages className="flex flex-col space-y-8 w-full" />
        </aside>
        <DarkLightToggle />
      </nav>
      <main className="w-4/5 h-full p-4">{children}</main>
    </div>
  );
}
