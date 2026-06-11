import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";
import { QR } from "@/pages/QR";
import { Graph } from "@/pages/Graph";

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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
