"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GeometricAbstraction from "~/components/geometric/GeometricAbstraction";
import OrganicPattern from "~/components/geometric/OrganicPattern";
import IndustrialGrid from "~/components/layout/IndustrialGrid";
import FlowingTimeline from "~/components/portfolio/FlowingTimeline";
import ModularSection from "~/components/layout/ModularSection";
import { Project } from "contentlayer/generated";

interface PortfolioProps {
  projects: Project[];
}

const Portfolio = ({ projects }: PortfolioProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const sections = [
    {
      id: "hero",
      title: "Thomas Yee",
      subtitle: "Designer + Developer",
      content: "Building the future through thoughtful design and systematic thinking",
    },
    {
      id: "about",
      title: "About",
      subtitle: "Design Philosophy",
      content: "I believe in the power of systematic thinking combined with organic creativity. Every project is an opportunity to explore the intersection of industrial precision and human expression.",
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "Spatial Discovery",
      content: "Explore my work through an immersive timeline that reveals the connections between ideas, technologies, and outcomes.",
    },
  ];

  const handleSectionChange = (newSection: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSection(newSection);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-depth-surface">
      {/* Industrial Grid Background */}
      <IndustrialGrid 
        className="opacity-30" 
        spacing="lg" 
        animated={true}
      />

      {/* Geometric Abstractions */}
      <GeometricAbstraction 
        className="opacity-20" 
        intensity={0.3}
        ambient={true}
        interactive={false}
      />

      {/* Organic Patterns */}
      <OrganicPattern 
        className="opacity-10" 
        intensity={0.2}
        animated={true}
      />

      {/* Flowing Sections */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          {currentSection === 0 && (
            <motion.section
              key="hero"
              className="h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-center space-y-8 max-w-4xl mx-auto px-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <h1 className="text-display text-industrial-900 mb-4">
                    {sections[0].title}
                  </h1>
                  <p className="text-headline text-industrial-600 mb-8">
                    {sections[0].subtitle}
                  </p>
                </motion.div>

                <motion.p
                  className="text-body text-industrial-700 max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {sections[0].content}
                </motion.p>

                <motion.div
                  className="flex justify-center space-x-4 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.button
                    className="geometric-surface-elevated px-8 py-4 text-body font-medium hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(1)}
                  >
                    Explore Philosophy
                  </motion.button>
                  <motion.button
                    className="geometric-surface px-8 py-4 text-body font-medium hover:scale-105 transition-transform"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionChange(2)}
                  >
                    View Projects
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}

          {currentSection === 1 && (
            <motion.section
              key="about"
              className="h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="max-w-6xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 className="text-headline text-industrial-900 mb-4">
                        {sections[1].title}
                      </h2>
                      <p className="text-title text-industrial-600 mb-6">
                        {sections[1].subtitle}
                      </p>
                    </motion.div>

                    <motion.p
                      className="text-body text-industrial-700 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      {sections[1].content}
                    </motion.p>

                    <motion.div
                      className="flex space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <button
                        className="geometric-surface-elevated px-6 py-3 text-body font-medium hover:scale-105 transition-transform"
                        onClick={() => handleSectionChange(0)}
                      >
                        Back to Home
                      </button>
                      <button
                        className="geometric-surface px-6 py-3 text-body font-medium hover:scale-105 transition-transform"
                        onClick={() => handleSectionChange(2)}
                      >
                        View Projects
                      </button>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <ModularSection
                      variant="floating"
                      morphing={true}
                      className="p-8"
                    >
                      <div className="space-y-6">
                        <h3 className="text-title font-medium">Design Principles</h3>
                        <div className="space-y-4">
                          {[
                            "Systematic Thinking",
                            "Organic Creativity", 
                            "Industrial Precision",
                            "Human Expression"
                          ].map((principle, index) => (
                            <motion.div
                              key={principle}
                              className="flex items-center space-x-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-industrial-400 rounded-full" />
                              <span className="text-body">{principle}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </ModularSection>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 2 && (
            <motion.section
              key="projects"
              className="h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="h-full flex flex-col">
                <div className="p-8 border-b border-depth-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h2 className="text-headline text-industrial-900 mb-2">
                      {sections[2].title}
                    </h2>
                    <p className="text-title text-industrial-600 mb-4">
                      {sections[2].subtitle}
                    </p>
                    <p className="text-body text-industrial-700">
                      {sections[2].content}
                    </p>
                  </motion.div>
                </div>

                <div className="flex-1 relative">
                  <FlowingTimeline projects={projects} />
                </div>

                <div className="p-8 border-t border-depth-border">
                  <button
                    className="geometric-surface-elevated px-6 py-3 text-body font-medium hover:scale-105 transition-transform"
                    onClick={() => handleSectionChange(0)}
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Section Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSection === index
                  ? "bg-industrial-900 scale-125"
                  : "bg-industrial-300 hover:bg-industrial-500"
              }`}
              onClick={() => handleSectionChange(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Portfolio;