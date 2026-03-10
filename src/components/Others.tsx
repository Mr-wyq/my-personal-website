"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Heart, Award } from "lucide-react";

export default function Others() {
    const { data } = useLanguage();
    const others = data.others;
    const { ui } = data;

    if (!others) return null;

    return (
        <section id="others" className="py-20 relative z-10 w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-sans flex items-center gap-4 text-white">
                    <span className="text-[var(--accent-purple)] font-mono text-xl">05.</span>
                    {ui.others}<span className="text-[var(--accent-purple)]">_</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-[var(--accent-purple)]/50 to-transparent mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--card-bg)] backdrop-blur-md rounded-2xl p-6 border border-[var(--card-border)] space-y-6"
                >
                    <div className="flex items-center gap-3 text-[var(--accent-cyan)]">
                        <Heart className="w-6 h-6" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Hobbies / 兴趣爱好</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {others.hobbies.map((hobby: string, idx: number) => (
                            <span key={idx} className="px-4 py-2 bg-white/5 rounded-full text-gray-300 border border-white/10 hover:border-[var(--accent-cyan)]/50 transition-colors">
                                {hobby}
                            </span>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[var(--card-bg)] backdrop-blur-md rounded-2xl p-6 border border-[var(--card-border)] space-y-6"
                >
                    <div className="flex items-center gap-3 text-[var(--accent-purple)]">
                        <Award className="w-6 h-6" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider">Certificates / 证书荣誉</h3>
                    </div>
                    <div className="space-y-4">
                        {others.certs.map((cert: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-300">
                                <span className="text-[var(--accent-purple)]">✦</span>
                                {cert}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
