import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tyeetale",
  description: "Consistent Output",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} maxSize={100}>
          <nav>hi</nav>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={300}> {children}</ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
