"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Heart, Award, Star } from "lucide-react";

export default function Hobbies() {
  const { data }: any = useLanguage();
  const { ui, others } = data;

  if (!others) return null;

  return (
    <section id="hobbies" className="section max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-mono text-[var(--blue)] uppercase mb-4">// {ui.lifestyle}</p>
        <h2 className="text-section-title text-white">{ui.hobbies}</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hobbies */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl space-y-6"
        >
          <div className="flex items-center gap-3 text-[var(--cyan)]">
            <Heart className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">{ui.personalInterests}</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {others.hobbies?.map((hobby: string) => (
              <span key={hobby} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[var(--gray-light)] hover:text-white hover:border-[var(--cyan)]/30 transition-all cursor-default">
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Certs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl space-y-6"
        >
          <div className="flex items-center gap-3 text-[var(--purple)]">
            <Award className="w-5 h-5" />
            <h3 className="text-xl font-bold text-white">{ui.honorsAwards}</h3>
          </div>
          <div className="space-y-4">
            {others.certs?.map((cert: string) => (
              <div key={cert} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 group">
                <Star className="w-4 h-4 text-[var(--purple)] group-hover:scale-125 transition-transform" />
                <span className="text-[var(--gray-light)] group-hover:text-white transition-colors">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
