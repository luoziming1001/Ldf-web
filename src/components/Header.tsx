import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Globe } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai",
      };
      setTimeStr(now.toLocaleTimeString("zh-CN", options) + " (GMT+8)");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection as backup or primary
      const sections = ["hero", "about", "works"];
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "首页", id: "hero" },
    { label: "关于我", id: "about" },
    { label: "作品集", id: "works" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out py-4 px-4 sm:px-6 lg:px-8 ${
          scrolled ? "bg-white/70 backdrop-blur-md shadow-sm border-b border-stone-200/40 translate-y-0" : "translate-y-2"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full" id="nav-wrapper">
          {/* Logo Section */}
          <div className="flex-1 flex justify-start" id="nav-left-col">
            <div
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 cursor-pointer group"
              id="nav-logo-container"
            >
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center border border-stone-700 shadow-sm transition-transform duration-500 group-hover:rotate-180">
                <span className="text-white font-serif text-sm font-bold tracking-tight">L</span>
              </div>
            </div>
          </div>

          {/* Center Navigation Pills */}
          <div className="hidden md:flex flex-initial justify-center" id="nav-center-col">
            <nav
              className="flex items-center gap-1 p-1.5 rounded-full bg-stone-150/40 backdrop-blur-md border border-stone-200/50 shadow-md"
              id="nav-pill-capsule"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    activeSection === item.id ? "text-white" : "text-stone-700 hover:text-stone-950"
                  }`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-stone-900 rounded-full -z-10 shadow-md shadow-stone-900/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Clock Section / Mobile Trigger */}
          <div className="flex-1 flex justify-end items-center" id="nav-right-col">
            <div className="hidden lg:flex items-center text-right font-mono" id="nav-info-badge">
              <div className="flex flex-col">
                <span className="text-[9px] text-stone-500 leading-tight flex items-center gap-1 justify-end font-semibold uppercase">
                  <Globe className="w-3 h-3 text-stone-400 animate-spin-slow" /> BEIJING TIME
                </span>
                <span className="text-[11px] text-stone-800 font-medium tracking-tight">
                  {timeStr || "00:00:00"}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center" id="nav-mobile-trigger-container">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full bg-white/70 border border-stone-200/60 shadow-md text-stone-700 hover:text-stone-950 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 mx-4 p-5 z-40 rounded-3xl bg-white/95 backdrop-blur-lg border border-stone-200/80 shadow-2xl md:hidden"
            id="mobile-navigation-overlay"
          >
            <div className="flex flex-col gap-3">
              <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mb-1 border-b border-stone-200 pb-1.5 font-bold">
                目录指南 // NAVIGATION DIRECTORY
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-between transition-all ${
                    activeSection === item.id
                      ? "bg-stone-900 text-white shadow-md"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform ${
                      activeSection === item.id ? "translate-x-0.5 -translate-y-0.5 text-white/80" : "text-stone-400"
                    }`}
                  />
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-stone-200/60 flex flex-col gap-2 font-mono text-[10px] text-stone-500">
                <div className="flex justify-between items-center px-2">
                  <span>设计协作状态 // STATUS</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    进行中 / 接受预约
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span>微调响应时间区 // ZONE</span>
                  <span>{timeStr.split(" ")[1] || "GMT+8"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
