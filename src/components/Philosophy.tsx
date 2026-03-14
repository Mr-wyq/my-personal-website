"use client";
 
import { motion } from "framer-motion";
import { Route, RefreshCcw, Layers, Grid } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import TiltCard from "@/components/ui/TiltCard";
 
const ICONS = [Route, RefreshCcw, Layers, Grid];
const COLORS = ["var(--cyan)", "var(--purple)", "var(--green)", "var(--blue)"];
const BG_COLORS = [
  "rgba(6,182,212,0.08)", 
  "rgba(139,92,246,0.08)", 
  "rgba(16,185,129,0.08)",
  "rgba(59,130,246,0.08)"
];
 
export default function Philosophy() {
  const { data } = useLanguage();
  const philosophy: any[] = data.philosophy ?? [];
  const { ui } = data;
 
  if (!philosophy.length) return null;
 
  return (
    <section id="philosophy" className="section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="text-mono text-[var(--cyan)] uppercase mb-4 tracking-[0.3em]">
          // {data.ui.mentalModel || "Mental Model"}
        </p>
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
          {ui.philosophy}
        </h2>
      </motion.div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {philosophy.map((item: any, i: number) => {
          const Icon = ICONS[i % ICONS.length];
          const color = COLORS[i % COLORS.length];
          const bg = BG_COLORS[i % BG_COLORS.length];
 
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <TiltCard className="h-full" intensity={5}>
                <div className="glass p-10 rounded-[2.5rem] h-full relative overflow-hidden flex flex-col gap-8 border border-white/5 hover:border-white/10 transition-all duration-500">
                  {/* Big number watermark */}
                  <span className="absolute -top-4 -right-4 text-[12rem] font-black text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-all duration-700 italic">
                    {i + 1}
                  </span>
 
                  <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                    {/* Icon Container */}
                    <div
                      className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500 shadow-2xl"
                      style={{ background: bg, border: `1px solid ${color}30` }}
                    >
                      <div className="absolute inset-0 blur-2xl opacity-20 bg-current rounded-full" style={{ color }} />
                      <Icon className="w-10 h-10 relative z-10" style={{ color }} />
                    </div>
 
                    {/* Content */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-current" style={{ color }} />
                        <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                      </div>
                      <p className="text-[var(--gray-light)] leading-relaxed text-lg font-light opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
 
                  {/* Bottom accent glow */}
                  <div 
                    className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
