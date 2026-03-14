"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { ArrowRight, Building2, Calendar, LayoutGrid, MapPin } from "lucide-react";

export default function Experience() {
  const { data } = useLanguage();
  const experiences: any[] = data.experience ?? [];
  const { ui } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!experiences.length) return null;

  return (
    <section id="experience" className="section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="text-mono text-[var(--purple)] uppercase mb-4 tracking-[0.3em]">
          // {data.ui.careerJourney || "Career Journey"}
        </p>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
          {ui.experience}
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Side: Master Timeline */}
        <div className="lg:w-1/3 flex-shrink-0 relative">
          {/* Vertical track line (Desktop only) */}
          <div className="absolute left-[15px] top-4 bottom-4 w-px bg-white/10 hidden lg:block" />
          
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 relative z-10 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar snap-x">
            {experiences.map((exp: any, i: number) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveIndex(i);
                    // On mobile, scroll slightly down to the detail panel
                    if (window.innerWidth < 1024) {
                      document.getElementById('experience-details')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  className={`relative flex items-center lg:items-start gap-3 lg:gap-6 text-left p-4 lg:p-6 rounded-2xl transition-all duration-300 group flex-shrink-0 w-[260px] lg:w-auto snap-start ${
                    isActive 
                      ? "bg-[var(--purple)]/10 lg:bg-white/5 border border-[var(--purple)]/30 lg:border-white/10 shadow-lg lg:shadow-2xl" 
                      : "bg-white/[0.02] hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  {/* Timeline Dot (Desktop) */}
                  <div className="relative mt-1 hidden lg:block">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${
                      isActive ? "bg-[var(--purple)]/20" : "bg-white/5"
                    }`}>
                      <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        isActive ? "bg-[var(--purple)] shadow-[0_0_15px_var(--purple)] scale-150" : "bg-white/30"
                      }`} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 lg:gap-3 text-[10px] lg:text-xs font-mono mb-1 lg:mb-2">
                      <Calendar className={`w-3 h-3 lg:w-3.5 lg:h-3.5 ${isActive ? "text-[var(--purple)]" : "text-[var(--gray)]"}`} />
                      <span className={isActive ? "text-[var(--purple)]" : "text-[var(--gray)]"}>
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                    <h3 className={`text-base lg:text-xl font-bold transition-colors line-clamp-1 ${
                      isActive ? "text-white" : "text-[var(--gray-light)] group-hover:text-white"
                    }`}>
                      {exp.company}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detail Panel */}
        <div id="experience-details" className="lg:w-2/3 flex-1 relative lg:min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)", position: "absolute", top: 0, left: 0, width: "100%" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="glass rounded-[2.5rem] p-8 md:p-12 border border-white/10 relative overflow-hidden h-full flex flex-col"
            >
              {/* Background Glow */}
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--purple)]/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full gap-8">
                {/* Header Information */}
                <div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
                    <div>
                      {experiences[activeIndex].website ? (
                        <a 
                          href={experiences[activeIndex].website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-4 hover:opacity-80 transition-opacity"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover/link:bg-[var(--purple)]/10 group-hover/link:border-[var(--purple)]/30 transition-all">
                            <Building2 className="w-6 h-6 text-white group-hover/link:text-[var(--purple)] transition-colors" />
                          </div>
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                              {experiences[activeIndex].company}
                              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[var(--purple)]" />
                            </h3>
                            <p className="text-xl text-[var(--purple)] font-medium mt-2">{experiences[activeIndex].position}</p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white uppercase italic tracking-tight">
                              {experiences[activeIndex].company}
                            </h3>
                            <p className="text-xl text-[var(--purple)] font-medium mt-2">{experiences[activeIndex].position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Location Badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-[var(--gray-light)] whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 text-[var(--purple)]" />
                      {data.ui.currentLocation || "Shenzhen"}
                    </div>
                  </div>
                </div>

                {/* Summary / Mission */}
                <div className="p-6 rounded-2xl bg-[#0F1117]/50 border border-white/5 relative overflow-hidden group/summary">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--purple)] opacity-50 group-hover/summary:opacity-100 transition-opacity" />
                  <p className="text-[var(--gray-light)] text-lg leading-relaxed font-light">
                    {experiences[activeIndex].summary}
                  </p>
                </div>

                {/* Hardcore Highlights */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5 text-[var(--purple)]" />
                    <h4 className="text-mono text-xs uppercase text-[var(--gray)] tracking-[0.2em]">
                      {data.ui.keyAccomplishments || "Core Impacts"}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {experiences[activeIndex].highlights.map((h: string, j: number) => {
                      // Extract title if formatted as "Title: Description"
                      const parts = h.split('：');
                      const title = parts.length > 1 ? parts[0] : null;
                      const text = parts.length > 1 ? parts.slice(1).join('：') : h;
                      
                      return (
                        <div key={j} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                          <div className="mt-1 w-6 h-6 rounded-full bg-[var(--purple)]/10 flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)]" />
                          </div>
                          <div>
                            {title && <span className="text-white font-bold block mb-1.5">{title}</span>}
                            <span className="text-[var(--gray-light)] text-base leading-relaxed opacity-90">
                              {text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
