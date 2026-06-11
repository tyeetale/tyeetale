import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";
import { Projects } from "@/pages/Projects";
import { QR } from "@/pages/QR";
import { Graph } from "@/pages/Graph";
import { Uses } from "@/pages/Uses";
import { Building } from "@/pages/Building";
import { Notes } from "@/pages/Notes";
import { Experiments } from "@/pages/Experiments";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Building />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/tools" element={<Uses />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/experiments" element={<Experiments />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
