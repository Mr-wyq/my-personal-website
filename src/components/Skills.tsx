"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Skills() {
  const { data } = useLanguage();
  const skillsData = data.skills;
  const { ui } = data;

  const categories = [
    { key: "tools", label: ui.skillsTools },
    { key: "core", label: ui.skillsCore }
  ];

  return (
    <section id="skills" className="py-32 relative z-10 w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black font-sans text-white mb-6 uppercase tracking-tight">
          {ui.capabilities}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, index) => {
          const skills = (skillsData as any)[cat.key];
          if (!skills) return null;

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group p-10 rounded-[2.5rem] bg-[#080808] border border-white/5 hover:border-[var(--accent-cyan)]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card background effect */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent-cyan)]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                <span className="w-2 h-10 bg-[var(--accent-cyan)] rounded-full shadow-[0_0_15px_var(--accent-cyan)]" />
                {cat.label}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {skills.map((skill: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-300 text-sm hover:bg-[var(--accent-cyan)]/10 hover:border-[var(--accent-cyan)]/30 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
