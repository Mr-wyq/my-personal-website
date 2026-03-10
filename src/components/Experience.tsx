"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";

export default function Experience() {
  const { data } = useLanguage();
  const experiences = data.experience;
  const { ui } = data;

  return (
    <section id="experience" className="py-32 relative z-10 w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-black font-sans text-white mb-6">
          {ui.experience}
        </h2>
        <div className="h-1 w-20 bg-[var(--accent-purple)] mx-auto rounded-full" />
      </motion.div>

      <div className="space-y-24 relative">
        {/* Central timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent" />

        {experiences.map((exp: any, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)] z-20" />

              <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"}`}>
                <div className={`inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--accent-cyan)] font-mono text-xs mb-4`}>
                  {exp.startDate} — {exp.endDate}
                </div>
                <h3 className="text-3xl font-black text-white mb-1">
                  {exp.company}
                </h3>
                <h4 className="text-xl text-[var(--accent-purple)] font-medium mb-6">
                  {exp.position}
                </h4>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {exp.summary}
                </p>
                <div className={`flex flex-wrap gap-2 ${isEven ? "justify-start" : "md:justify-end"}`}>
                  {exp.highlights.slice(0, 2).map((h: string, i: number) => (
                    <span key={i} className="text-xs bg-white/5 px-3 py-1 rounded border border-white/5 text-gray-500">
                      {h.length > 40 ? h.substring(0, 40) + "..." : h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:block w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
