"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { GraduationCap, BookOpen, FileText } from "lucide-react";

export default function Education() {
  const { data }: any = useLanguage();
  const edu = data.education;
  const { ui } = data;

  if (!edu) return null;

  return (
    <section id="education" className="section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-mono text-[var(--cyan)] uppercase mb-4">// {ui.academicBackground || "学术背景"}</p>
        <h2 className="text-section-title text-white">{ui.education || "教育背景"}</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* The Grand Dossier Card */}
        <div className="glass rounded-[2.5rem] p-1 md:p-1 relative overflow-hidden group hover:border-[var(--cyan)]/30 transition-all duration-700">
          <div className="bg-[#050510]/50 rounded-[2.4rem] p-8 md:p-12 lg:p-16 flex flex-col relative z-10">
            
            {/* Top Timeline Bar */}
            <div className="w-full flex flex-col mb-12">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[var(--cyan)] font-mono font-bold text-lg md:text-2xl tracking-wider">{edu.startDate}</span>
                <span className="text-[var(--cyan)] font-mono font-bold text-lg md:text-2xl tracking-wider">{edu.endDate}</span>
              </div>
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--cyan)] via-[var(--purple)] to-[var(--blue)] shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                />
              </div>
            </div>

            {/* Left/Center/Right Content */}
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
              
              {/* Left: School & Degree (w-1/4) */}
              <div className="lg:w-1/4 flex flex-col w-full">
                <div className="w-16 h-16 rounded-2xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--cyan)]/20 transition-all duration-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                  <GraduationCap className="w-8 h-8 text-[var(--cyan)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-widest mb-4">
                  {edu.university}
                </h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--cyan)]/10 border border-[var(--cyan)]/20 self-start">
                  <span className="w-2 h-2 rounded-full bg-[var(--cyan)] animate-pulse" />
                  <span className="text-[var(--cyan)] font-bold text-[13px] tracking-widest">
                    {edu.degree}
                  </span>
                </div>
              </div>

              {/* Center: Major & Courses (w-1/3) */}
              <div className="lg:w-1/3 flex flex-col lg:border-x border-white/5 lg:px-8 w-full mt-2 lg:mt-0">
                <div className="w-14 h-14 rounded-2xl bg-[var(--purple)]/10 border border-[var(--purple)]/20 flex items-center justify-center mb-6">
                  <BookOpen className="w-6 h-6 text-[var(--purple)]" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-6">
                  {edu.major}
                </h4>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {edu.coreCourses?.map((course: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-[var(--gray-light)] cursor-default hover:text-white hover:border-white/20 transition-colors">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Thesis (w-5/12 or Remaining) */}
              <div className="lg:w-5/12 flex flex-col w-full mt-2 lg:mt-0">
                <div className="w-14 h-14 rounded-2xl bg-[var(--blue)]/10 border border-[var(--blue)]/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-[var(--blue)]" />
                </div>
                <div className="glass p-6 md:p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group-hover:bg-white/[0.04] transition-colors h-full flex items-center">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--blue)]/50" />
                  <p className="text-white md:text-lg font-medium leading-relaxed italic">
                    {edu.thesis}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative background effects */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--cyan)]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--blue)]/5 rounded-full blur-[80px] pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
