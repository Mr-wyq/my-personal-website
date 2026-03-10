"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Database, Search, Layout, ChevronDown, ChevronUp, Image as ImageIcon, Briefcase, Globe } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Projects() {
    const { data } = useLanguage();
    const projects = data.projects;
    const { ui } = data;
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const getProjectIcon = (iconName: string) => {
        switch (iconName) {
            case "Search": return <Search className="w-6 h-6" />;
            case "Database": return <Database className="w-6 h-6" />;
            case "Layout": return <Layout className="w-6 h-6" />;
            default: return <ExternalLink className="w-6 h-6" />;
        }
    };

    return (
        <section id="projects" className="py-20 relative z-10 w-full max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-sans flex items-center gap-4 text-white">
                    <span className="text-[var(--accent-purple)] font-mono text-xl">02.</span>
                    {ui.projects}<span className="text-[var(--accent-purple)]">_</span>
                </h2>
                <div className="h-px w-full bg-gradient-to-r from-[var(--accent-purple)]/50 to-transparent mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 gap-8">
                {projects.map((project: any, index: number) => {
                    const isUpcoming = project.status === "upcoming";

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`group bg-[var(--card-bg)] backdrop-blur-md rounded-2xl border border-[var(--card-border)] hover:border-[var(--accent-cyan)]/50 transition-all duration-300 overflow-hidden ${expandedIndex === index ? "ring-1 ring-[var(--accent-cyan)]/30" : ""
                                } ${isUpcoming ? "opacity-60 grayscale hover:grayscale-0 transition-all" : ""}`}
                        >
                            <div
                                className="p-6 md:p-8 cursor-pointer"
                                onClick={() => !isUpcoming && setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                    <div className="flex items-start gap-6 flex-1">
                                        <div className="p-4 bg-gray-800/50 rounded-xl text-[var(--accent-cyan)] group-hover:scale-110 transition-transform duration-300 relative">
                                            {getProjectIcon(project.icon)}
                                            {isUpcoming && (
                                                <span className="absolute -top-2 -right-2 bg-[var(--accent-purple)] text-white text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-tighter">
                                                    Plan
                                                </span>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">
                                                    {project.name}
                                                </h3>
                                                {isUpcoming && (
                                                    <span className="text-xs font-mono text-[var(--accent-purple)] border border-[var(--accent-purple)]/30 px-2 py-0.5 rounded">
                                                        {ui.toBeUpdated}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-[var(--accent-purple)] font-mono">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                <span>{ui.associatedWith}: {project.company}</span>
                                            </div>

                                            <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.technologies.map((tech: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs font-mono text-[var(--accent-purple)] bg-[var(--accent-purple)]/10 px-2 py-1 rounded border border-[var(--accent-purple)]/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 self-end md:self-start">
                                        {project.officialLink && (
                                            <a
                                                href={project.officialLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-all"
                                                onClick={(e) => e.stopPropagation()}
                                                title={ui.visitWebsite}
                                            >
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        )}
                                        {!isUpcoming && (
                                            <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/10 transition-all">
                                                {expandedIndex === index ? <ChevronUp /> : <ChevronDown />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedIndex === index && !isUpcoming && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-4 border-t border-white/5 space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-mono text-[var(--accent-cyan)] uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] blink" />
                                                        {ui.projectDetail} // 背景
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed italic border-l-2 border-gray-700 pl-4">
                                                        {project.details.background}
                                                    </p>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-mono text-[var(--accent-purple)] uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
                                                        {ui.projectDetail} // 工作
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {project.details.work}
                                                    </p>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-sm font-mono text-green-400 uppercase tracking-widest flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-green-400" />
                                                        {ui.mainAchievements}
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed font-medium">
                                                        {project.details.results}
                                                    </p>
                                                </div>
                                            </div>

                                            {project.details.images && project.details.images.length > 0 && (
                                                <div className="space-y-4">
                                                    <h4 className="text-sm font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                                        <ImageIcon className="w-4 h-4" /> 资料附件 / ATTACHMENTS
                                                    </h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {project.details.images.map((img: string, i: number) => (
                                                            <div key={i} className="aspect-video bg-gray-900 rounded-lg border border-white/5 flex items-center justify-center overflow-hidden group/img relative">
                                                                <div className="absolute inset-0 bg-[var(--accent-cyan)]/10 opacity-0 group-hover/img:opacity-100 transition-opacity z-10" />
                                                                <img src={img} alt="Project asset" className="object-cover w-full h-full opacity-60 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
