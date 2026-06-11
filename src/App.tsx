import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";
import { QR } from "@/pages/QR";
import { Graph } from "@/pages/Graph";
import { Uses } from "@/pages/Uses";
import { Building } from "@/pages/Building";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/building" element={<Building />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
