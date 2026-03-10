"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Lightbulb, Target, Users } from "lucide-react";

export default function Philosophy() {
  const { data } = useLanguage();
  const philosophy = data.philosophy;
  const { ui } = data;

  if (!philosophy) return null;

  const icons = [<Target className="w-8 h-8" />, <Lightbulb className="w-8 h-8" />, <Users className="w-8 h-8" />];

  return (
    <section id="philosophy" className="py-24 relative z-10 w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
          {ui.philosophy}
        </h2>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {philosophy.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group p-10 rounded-[2.5rem] bg-[#080808] border border-white/5 hover:border-[var(--accent-cyan)]/40 transition-all duration-500 relative overflow-hidden"
          >
            {/* Visual background decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--accent-cyan)]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 text-[var(--accent-cyan)] group-hover:bg-[var(--accent-cyan)] group-hover:text-black transition-all duration-500 shadow-xl border border-white/5">
                {icons[index % icons.length]}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
            
            <div className="absolute top-6 right-8 text-4xl font-black text-white/5 font-mono group-hover:text-[var(--accent-cyan)]/10 transition-colors">
              0{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
