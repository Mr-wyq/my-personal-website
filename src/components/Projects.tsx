"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Maximize2, Cpu, Layers, Database, Layout, X, ShieldAlert, ArrowRight, Target, CheckCircle2, Building2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import TiltCard from "@/components/ui/TiltCard";

const ICON_MAP: Record<string, any> = {
  Layout: Layout,
  Database: Database,
  Cpu: Cpu,
  Layers: Layers
};

export default function Projects() {
  const { data } = useLanguage();
  const projects: any[] = data.projects ?? [];
  const { ui } = data;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  return (
    <section id="projects" className="section max-w-7xl mx-auto px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="text-mono text-[var(--cyan)] uppercase mb-4 tracking-[0.3em]">// {data.ui.productPortfolio || "Portfolio"}</p>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">{ui.projects}</h2>
      </motion.div>

      {/* ─── BALANCED MASONRY GRID LAYOUT ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {projects.map((p: any, i: number) => {
          const isUpcoming = p.status === "upcoming";
          const Icon = ICON_MAP[p.icon] || Layout;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="h-[400px] col-span-1"
            >
              <TiltCard className="h-full" intensity={4}>
                <div
                  className={`glass rounded-[2rem] overflow-hidden h-full flex flex-col group relative ${
                    isUpcoming ? "opacity-50" : "cursor-pointer border border-white/5 hover:border-[var(--cyan)]/40 hover:shadow-[0_0_50px_rgba(0,255,136,0.1)]"
                  } transition-all duration-700`}
                  onClick={() => !isUpcoming && setSelectedProject(p)}
                >
                  {/* Background Ambient Glow */}
                  <div className="absolute -inset-20 bg-gradient-to-br from-[var(--cyan)]/10 to-transparent opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none" />

                  {/* Top Header */}
                  <div className="relative z-10 p-8 flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 text-white group-hover:text-[var(--cyan)] transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    {!isUpcoming && (
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500 hover:bg-white/20">
                        <ArrowRight className="w-4 h-4 text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="relative z-10 px-8 pb-8 mt-auto flex flex-col gap-4">
                    <div>
                      <p className="text-mono text-[var(--cyan)] text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                        {p.company}
                      </p>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--cyan)] transition-all leading-tight drop-shadow-lg">
                        {p.name}
                      </h3>
                    </div>
                    
                    <p className="text-[var(--gray-light)] font-light leading-relaxed text-sm line-clamp-3">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {p.technologies.slice(0, 3).map((t: string, j: number) => (
                        <span key={j} className="text-[10px] font-mono text-white/50 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-md uppercase group-hover:border-white/20 group-hover:text-white transition-colors">
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-[10px] font-mono text-[var(--cyan)] px-2.5 py-1 bg-[var(--cyan)]/10 border border-[var(--cyan)]/20 rounded-md uppercase">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* ─── OFFCANVAS DRAWER (SECURE SANDBOX) ─── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-[100] bg-[#050510]/80 backdrop-blur-md"
            />

            {/* The Drawer Panel */}
            <motion.div
              initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(0,0,0,0.5)" }}
              animate={{ x: 0, boxShadow: "-10px 0 50px rgba(0,0,0,0.8)" }}
              exit={{ x: "100%", boxShadow: "0px 0 0px rgba(0,0,0,0)" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[101] w-full md:w-[85vw] lg:w-[75vw] xl:w-[65vw] bg-[#0A0A0F] border-l border-white/10 flex flex-col"
            >
              {/* Header: Fixed */}
              <div className="flex-shrink-0 flex items-center justify-between p-6 border-b border-white/10 bg-[#050510]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 flex items-center justify-center text-[var(--cyan)]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-none">{selectedProject.name}</h2>
                    <p className="text-[10px] font-mono text-[var(--cyan)] tracking-widest uppercase mt-1">
                      Secure Sandbox Environment
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[var(--gray-light)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area: Secure Reader */}
              <div 
                className="flex-1 overflow-y-auto relative p-6 md:p-12 hide-scrollbar selection:bg-transparent"
                onContextMenu={(e) => { e.preventDefault(); return false; }} // Disable right click
                onDragStart={(e) => e.preventDefault()} // Disable drag
                style={{ 
                  userSelect: "none", 
                  WebkitUserSelect: "none",
                  WebkitTouchCallout: "none" 
                }}
                onKeyDownCapture={(e) => {
                  // Advanced Key Blocker
                  if (e.ctrlKey || e.metaKey || e.altKey) {
                    const blockKeys = ['c', 'v', 'x', 'p', 's', 'a', 'i', 'j', 'u'];
                    if (blockKeys.includes(e.key.toLowerCase())) {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }
                }}
                tabIndex={0}
              >
                {/* 🛡️ Universal Watermark Layer */}
                <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden flex flex-wrap justify-center items-center opacity-[0.015] grayscale mix-blend-overlay">
                  {Array.from({length: 40}).map((_, idx) => (
                    <span key={idx} className="text-2xl md:text-5xl font-black text-white whitespace-nowrap -rotate-[30deg] m-12 md:m-24 tracking-tighter italic">
                      RICH INTERNAL EXCLUSIVE · DO NOT DISTRIBUTE OR REPRODUCE
                    </span>
                  ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12">
                  
                  {/* Meta Information Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--cyan)]/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-white/50" />
                      </div>
                      <div>
                        <p className="text-mono text-[var(--gray)] uppercase text-[10px] tracking-widest mb-1">{data.ui.company || "Company"}</p>
                        <p className="text-white text-lg font-medium">{selectedProject.company}</p>
                      </div>
                    </div>

                    {selectedProject.officialLink ? (
                      <a href={selectedProject.officialLink} target="_blank" rel="noopener noreferrer" className="relative z-20 group flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 hover:bg-[var(--cyan)] text-[var(--cyan)] hover:text-black transition-all pointer-events-auto shrink-0 w-fit">
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        <span className="font-bold text-sm tracking-wide">{data.ui.visit || "Product Live Site"}</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    ) : (
                      <div className="relative z-20 flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 shrink-0 w-fit">
                        <div className="w-2 h-2 rounded-full bg-[var(--gray)]" />
                        <span className="text-[var(--gray-light)] font-medium text-sm tracking-wide">{data.ui.internalAsset || "Internal Enterprise Asset"}</span>
                      </div>
                    )}
                  </div>

                  {/* Executive Summary */}
                  <div className="space-y-6 relative z-10">
                    <h4 className="text-white font-medium pl-4 border-l-2 border-[var(--cyan)] text-lg md:text-xl relative inline-block flex items-center gap-2">
                       {data.ui.overview || "Executive Summary"}
                    </h4>
                    <p className="text-[var(--gray-light)] text-lg md:text-xl leading-relaxed font-light">{selectedProject.description}</p>
                  </div>

                  {/* Core Tags */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {selectedProject.technologies.map((t: string) => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-[var(--gray-light)] uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                  {/* Deep Project Details (The 10k words zone) */}
                  <div className="space-y-16 relative z-10">
                    
                    {/* Background & Challenge */}
                    {selectedProject.details?.background && (
                      <div className="space-y-6">
                        <h4 className="text-white font-medium pl-4 border-l-2 border-[var(--cyan)] text-lg md:text-xl relative inline-block">
                          {data.ui.bgChallenge || "Background & Challenge"}
                        </h4>
                        <p className="text-[var(--gray-light)] text-base md:text-lg leading-relaxed font-light">
                          {selectedProject.details.background}
                        </p>
                      </div>
                    )}

                    {/* Core Work Action items */}
                    {selectedProject.details?.work && (
                      <div className="space-y-6">
                        <h4 className="text-white font-medium pl-4 border-l-2 border-[var(--cyan)] text-lg md:text-xl relative inline-block">
                          {data.ui.coreWork || "Execution Strategy"}
                        </h4>
                        <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6 relative z-10">
                          {selectedProject.details.work.split('\n').filter(Boolean).map((line: string, lIdx: number) => {
                            // Basic Markdown bold replacement
                            const parts = line.split(/\*\*(.*?)\*\*/g);
                            return (
                              <div key={lIdx} className="flex items-start gap-4">
                                <div className="mt-1 shrink-0 flex items-center justify-center">
                                  <Target className="w-5 h-5 text-[var(--cyan)]" />
                                </div>
                                <p className="text-[var(--gray-light)] text-base md:text-lg leading-relaxed font-light">
                                  {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-medium">{part}</strong> : part)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Business Value / Results */}
                    {selectedProject.details?.results && (
                      <div className="space-y-6">
                        <h4 className="text-white font-medium pl-4 border-l-2 border-[#00FF88] text-lg md:text-xl relative inline-block">
                          {data.ui.results || "Business Value"}
                        </h4>
                        <div className="p-6 md:p-8 rounded-2xl bg-[#00FF88]/5 border border-[#00FF88]/10 relative overflow-hidden space-y-6">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00FF88]/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
                          {selectedProject.details.results.split('\n').filter(Boolean).map((line: string, lIdx: number) => {
                            const parts = line.split(/\*\*(.*?)\*\*/g);
                            return (
                              <div key={lIdx} className="flex items-start gap-4 relative z-10">
                                <CheckCircle2 className="w-5 h-5 text-[#00FF88] shrink-0 mt-1" />
                                <p className="text-white/90 text-base md:text-lg leading-relaxed font-light">
                                  {parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#00FF88] font-medium tracking-wide">{part}</strong> : part)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Phantom Encrypted Images, Videos & Secure External Docs */}
                    {(selectedProject.details?.images?.length > 0 || selectedProject.details?.externalDocLink || selectedProject.details?.videoLink) && (
                      <div className="space-y-8 pt-8">
                         <h4 className="text-white font-medium text-lg md:text-xl flex items-center gap-3">
                           <ShieldAlert className="w-5 h-5 text-[var(--gray)]" />
                           {data.ui.visuals || "Encrypted Visual Assets"}
                         </h4>

                         {/* Dedicated External Secure Link Action Button */}
                         {selectedProject.details?.externalDocLink && (
                           <div className="p-6 rounded-2xl bg-[var(--cyan)]/[0.03] border border-[var(--cyan)]/20 flex flex-col sm:flex-row items-center justify-between gap-6 group hover:bg-[var(--cyan)]/[0.05] transition-colors relative z-20" style={{ pointerEvents: 'auto' }}>
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-[var(--cyan)]/10 flex items-center justify-center text-[var(--cyan)] shrink-0">
                                 <Database className="w-6 h-6" />
                               </div>
                               <div>
                                 <h5 className="text-white font-medium">{selectedProject.details.externalDocName || data.ui.docVaultTitle || "Classified Document Vault"}</h5>
                                 <p className="text-[var(--gray)] text-sm mt-1">{data.ui.docVaultDesc || "External Secure Access (e.g. Tencent Docs)"}</p>
                               </div>
                             </div>
                             
                             <a 
                               href={selectedProject.details.externalDocLink} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className="px-6 py-3 rounded-lg bg-[var(--cyan)] text-black font-bold text-sm tracking-wide hover:bg-white hover:shadow-[0_0_20px_var(--cyan)] transition-all flex items-center gap-2 shrink-0"
                             >
                               {data.ui.viewDocInfo || "Request Access"}
                               <ExternalLink className="w-4 h-4" />
                             </a>
                           </div>
                         )}

                         {/* Dedicated Video Asset Injection */}
                         {selectedProject.details?.videoLink && (
                           <div className="space-y-4">
                             <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] p-2 md:p-4 shadow-2xl">
                               <div className="relative w-full overflow-hidden rounded-xl pt-[56.25%] bg-black/50">
                                 <iframe 
                                   src={selectedProject.details.videoLink}
                                   scrolling="no" 
                                   allowFullScreen
                                   className="absolute top-0 left-0 w-full h-full border-0"
                                 ></iframe>
                               </div>
                               <p className="text-center mt-4 text-[12px] font-mono text-[var(--cyan)] uppercase tracking-widest">
                                 ► {selectedProject.details.videoTitle || "Media Asset"}
                               </p>
                             </div>
                           </div>
                         )}

                         {/* Image Array */}
                         {selectedProject.details?.images?.length > 0 && (
                           <div className="grid grid-cols-1 gap-8">
                             {selectedProject.details.images.map((img: string, k: number) => (
                               <div key={k} className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] p-2 md:p-4">
                                 {/* Image rendering with drag disabled */}
                                 <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                    <img 
                                      src={img} 
                                      alt="Classified Architecture" 
                                      className="w-full h-auto object-contain select-none"
                                      draggable={false}
                                    />
                                    {/* Absolute blocking overlay to stop right-click save and dragging */}
                                    <div className="absolute inset-0 z-20" draggable={false} />
                                 </div>
                                 <p className="text-center mt-4 text-[10px] font-mono text-[var(--gray)] uppercase tracking-widest">
                                   {data.ui.figPrefix || "Fig"} {k + 1}. {data.ui.figSuffix || "Authorized Viewer Only"}
                                 </p>
                               </div>
                             ))}
                           </div>
                         )}
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
