"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { GraduationCap } from "lucide-react";

export default function Education() {
    const { data } = useLanguage();
    const edu = data.education;
    const { ui } = data;

    if (!edu) return null;

    return (
        <section id="education" className="py-20 relative z-10 w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-sans flex items-center gap-4 text-white">
                    <span className="text-[var(--accent-cyan)] font-mono text-xl">04.</span>
                    {ui.education}<span className="text-[var(--accent-cyan)]">_</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-[var(--accent-cyan)]/50 to-transparent mt-4" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--card-bg)] backdrop-blur-md rounded-2xl p-8 border border-[var(--card-border)] flex flex-col md:flex-row gap-8 items-start md:items-center"
            >
                <div className="p-4 bg-[var(--accent-cyan)]/10 rounded-2xl text-[var(--accent-cyan)]">
                    <GraduationCap className="w-10 h-10" />
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <div>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                                {edu.university}
                            </h3>
                            <p className="text-[var(--accent-cyan)] font-mono">
                                {edu.major} • {edu.degree}
                            </p>
                        </div>
                        <span className="text-gray-500 font-mono text-sm">
                            {edu.startDate} — {edu.endDate}
                        </span>
                    </div>

                    <div className="h-px bg-white/5 w-full" />

                    <p className="text-gray-400 leading-relaxed italic pr-4">
                        {edu.courses}
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
