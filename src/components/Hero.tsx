import React from "react";
import { useScroll, useTransform, motion } from "motion/react";
// @ts-ignore
import heroBg from "../assets/hero-bg.svg";

export default function Hero() {
  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToWorks = () => {
    const el = document.getElementById("works");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-700"
      style={{ fontWeight: "normal" }}
    >
      {/* Background container */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none transition-all duration-700">
        <img
          src={heroBg}
          alt="Minimalist plaster design portfolio background"
          className="w-full h-full object-cover transition-all duration-500 scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Main typography & call-to-actions */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto w-full relative z-20 flex flex-col items-center text-center space-y-10"
      >
        <motion.div
          style={{ opacity: textOpacity }}
          className="flex flex-col items-center text-center space-y-8 w-full"
          id="hero-typography-block"
        >
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="font-serif italic font-semibold text-[3.2rem] sm:text-[5.5rem] lg:text-[6.8rem] leading-[1.05] tracking-tight text-stone-900 drop-shadow-[0_2px_4px_rgba(255,255,255,0.45)]">
              Design Portfolio
            </h1>
            <p
              className="font-serif text-stone-950 max-w-2xl mx-auto text-justify text-sm sm:text-base md:text-[18px] leading-[1.8] sm:leading-[1.9] font-bold"
              style={{
                fontStyle: "italic",
                textDecorationLine: "none",
                textAlignLast: "center"
              }}
            >
              这里是骆东方的作品集设计网站。主要专注3C数码产品的电商视觉设计，精通C4D、OC/KeyShot渲染及PS后期，擅长结合AIGC技术，将产品融入到各种场景。从视觉策划到材质精准还原，高效打磨极具质感与极简美学的卖点图，为产品注入视觉生命力。
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 w-full" id="hero-action-buttons">
            <button
              onClick={scrollToWorks}
              className="relative px-10 py-4 bg-stone-900 hover:bg-stone-850 hover:shadow-xl text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-transparent"
            >
              <span>查看作品集</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

