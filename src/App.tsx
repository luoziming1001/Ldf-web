/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Works from "./components/Works";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-stone-900 bg-stone-100 flex flex-col relative" id="applet-viewport-root">
      {/* Header / Navigation Bar */}
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col" id="applet-layout-main">
        {/* Hero Landing Section */}
        <Hero />

        {/* Designer Profile Dossier Biography */}
        <About />

        {/* Works Bento Grid Portfolio with customization options */}
        <Works />
      </main>

      {/* Hidden footer according to target specs */}
      <footer className="hidden" id="page-footer" />

      {/* Floating Scroll to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white shadow-2xl border border-white/10 flex items-center justify-center transition-all cursor-pointer focus:ring-2 focus:ring-stone-400"
            style={{ touchAction: "none" }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-4 h-4 animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

