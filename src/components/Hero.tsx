"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, ArrowUpRight, MapPin, Briefcase, Linkedin } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import TextScramble from "@/components/ui/TextScramble";
import CountUp from "@/components/ui/CountUp";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const { data, language } = useLanguage();
  const { basics } = data;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const taglines = [basics.title];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* Ambient orbs */}
      <motion.div style={{ y }} className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--cyan)] glow-orb animate-blob" />
      <motion.div style={{ y }} className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[var(--purple)] glow-orb animate-blob animation-delay-2000" />
      <motion.div style={{ y }} className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-[var(--blue)] glow-orb animate-blob animation-delay-4000" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16">

        {/* ─── LEFT: Text Content ─── */}
        <motion.div style={{ opacity }} className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-[var(--gray-light)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-[#00FF88] opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-[#00FF88]" />
            </span>
            {basics.location} · {basics.title}
          </motion.div>
          {/* Name & Vision Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-display text-white leading-none">
              <TextScramble text={basics.name} delay={200} duration={1000} />
            </h1>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="group flex items-center gap-4"
            >
              <div className="h-px w-12 bg-gradient-to-r from-[var(--cyan)] to-transparent" />
              <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-[var(--cyan)] uppercase italic">
                {basics.vision}
              </p>
            </motion.div>
          </motion.div>
          {/* Summary - V2.6 Clean & Bold List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-4"
          >
            {basics.summary.split('\n').map((line: string, idx: number) => {
              const [tag, content] = line.split('：');
              return (
                <div key={idx} className="group/item relative">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--cyan)] opacity-40">0{idx + 1}</span>
                      <span className="text-sm font-bold tracking-widest text-white/60 group-hover/item:text-[var(--cyan)] transition-colors italic">
                        {tag}
                      </span>
                      <div className="h-px flex-1 bg-white/5 group-hover/item:bg-[var(--cyan)]/20 transition-all" />
                    </div>
                    <p className="text-lg text-white/90 leading-relaxed font-light pl-8 border-l border-white/5 group-hover/item:border-[var(--cyan)]/30 transition-all">
                      {content}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <MagneticButton
              href={`mailto:${basics.email}`}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#00FF88] text-black font-bold text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,136,0.3)]"
            >
              <Mail className="w-4 h-4" />
              {data.ui.contact}
            </MagneticButton>

            {basics.profiles.map((p: any) => (
              <MagneticButton
                key={p.network}
                href={p.url}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-[var(--gray-light)] hover:text-white hover:border-white/30 font-bold text-sm transition-all"
              >
                {p.network.toLowerCase() === 'linkedin' ? (
                  <Linkedin className="w-4 h-4" />
                ) : (
                  <Github className="w-4 h-4" />
                )}
                {p.network}
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Avatar Panel ─── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative group/avatar">
            {/* Rotating gradient ring */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[var(--cyan)] via-[var(--purple)] to-[var(--blue)] opacity-25 blur-md animate-blob" />

            {/* Avatar frame */}
            <div className="relative w-full max-w-[280px] md:max-w-[360px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl mx-auto">
              <img
                src={basics.avatar}
                alt={basics.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/avatar:scale-105 grayscale group-hover/avatar:grayscale-0"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent" />

              {/* ID badge - V2.8 Balanced Minimalist Plate */}
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="glass p-4 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl group/badge"
                >
                  <div className="relative z-10 flex items-center justify-between gap-4">
                    {/* Left: Identity */}
                    <div className="space-y-1">
                      <div className="text-white font-black text-2xl tracking-tighter leading-none uppercase italic">
                        {basics.name}
                      </div>
                      <p className="text-[11px] text-[#00FF88] font-medium leading-tight tracking-wider opacity-90">
                        {basics.vision}
                      </p>
                    </div>

                    {/* Right: Abstract Tech Decor (No Text) */}
                    <div className="flex items-end gap-1 px-1 opacity-40 group-hover/badge:opacity-100 transition-opacity">
                      {[0.4, 0.7, 0.3, 0.9, 0.5].map((scale, i) => (
                        <motion.div 
                          key={i} 
                          animate={{ height: [8, 16, 8] }} 
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-[1.5px] bg-[#00FF88] rounded-full" 
                          style={{ height: `${scale * 16}px` }} 
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-mono text-[var(--gray)] uppercase">{data.ui.scroll || "Scroll"}</span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--cyan)] to-transparent" />
      </motion.div>
    </section>
  );
}
