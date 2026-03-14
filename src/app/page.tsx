"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Hobbies from "@/components/Hobbies";
import { useLanguage } from "@/components/LanguageContext";
import MagneticButton from "@/components/ui/MagneticButton";
import { Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data } = useLanguage();

  return (
    <main className="min-h-screen relative">
      {/* Static background orbs for depth */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* ── HERO ── */}
        <Hero />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── PHILOSOPHY ── */}
        <Philosophy />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── EXPERIENCE ── */}
        <Experience />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── PROJECTS ── */}
        <Projects />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── SKILLS ── */}
        <Skills />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── EDUCATION ── */}
        <Education />

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ── HOBBIES ── */}
        <Hobbies />

        {/* ── CTA SECTION ── */}
        <section className="section max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-[2.5rem] p-16 md:p-24 text-center relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/5 via-transparent to-[var(--purple)]/5 pointer-events-none" />
            <div className="absolute inset-px rounded-[2.4rem] border border-[var(--cyan)]/10 pointer-events-none" />

            {/* Main Title Centered */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-14 relative tracking-tighter leading-[1.2] flex flex-col gap-3 md:gap-5 items-center">
              <span>{data.ui.ctaTitle1 || "Let's Build"}</span>
              <span className="gradient-text-cyan">{data.ui.ctaTitle2 || "Something"}</span>
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton
                href={`mailto:${data.basics.email}`}
                className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold text-base hover:bg-[var(--cyan)] transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <Mail className="w-5 h-5" />
                {data.ui.contact}
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-12 border-t border-white/[0.05] text-center">
          <p className="text-mono text-[var(--gray)] uppercase tracking-widest text-xs">
            © {new Date().getFullYear()} &nbsp;·&nbsp; Rich &nbsp;·&nbsp; Built with Precision
          </p>
        </footer>
      </div>
    </main>
  );
}
