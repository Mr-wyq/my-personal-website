"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Boxes, BrainCircuit, Cpu, Wrench } from "lucide-react";

export default function Skills() {
  const { data } = useLanguage();
  const skills = data.skills;
  const { ui } = data;

  const categories = [
    {
      id: "product",
      title: ui.skillsProduct || "产品能力",
      icon: Boxes,
      color: "var(--purple)",
      items: skills.product || [],
      description: "Business & Strategy",
    },
    {
      id: "ai",
      title: ui.skillsAi || "AI 能力",
      icon: BrainCircuit,
      color: "var(--cyan)",
      items: skills.ai || [],
      description: "Agent & Engineering",
    },
    {
      id: "tech",
      title: ui.skillsTech || "技术能力",
      icon: Cpu,
      color: "var(--blue)",
      items: skills.tech || [],
      description: "Architecture & Data",
    },
    {
      id: "tools",
      title: ui.skillsTools || "工具能力",
      icon: Wrench,
      color: "var(--gray)",
      items: skills.tools || [],
      description: "Execution & Prototyping",
    },
  ];

  return (
    <section id="skills" className="section max-w-7xl mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <p className="text-mono text-[var(--cyan)] uppercase mb-4">// {ui.skillMatrix || "Skill Matrix"}</p>
        <h2 className="text-section-title text-white">{ui.capabilities || "核心技能"}</h2>
      </motion.div>

      {/* Horizontal Glass Cards Layout */}
      <div className="flex flex-col gap-6">
        {categories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-500 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
            >
              {/* Dynamic Gradient Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at left, ${category.color}, transparent 60%)`
                }}
              />

              {/* Left Column: Icon & Title */}
              <div className="flex items-center gap-5 w-full md:w-64 shrink-0 relative z-10">
                 <div 
                   className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg"
                   style={{ color: category.color }}
                 >
                   <Icon className="w-7 h-7" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
                   <p className="text-xs font-mono uppercase mt-1 opacity-70" style={{ color: category.color }}>{category.description}</p>
                 </div>
              </div>

              {/* Divider (Desktop Only) */}
              <div className="hidden md:block w-px h-12 bg-white/10 shrink-0 relative z-10" />

              {/* Right Column: Skill Pills */}
              <div className="flex flex-wrap gap-3 relative z-10 w-full mt-2 md:mt-0">
                {category.items.map((skill: string, sIdx: number) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 rounded-xl text-[13px] md:text-sm font-medium text-[var(--gray-light)] bg-black/40 border border-white/5 group-hover:border-white/15 group-hover:text-white transition-colors cursor-default shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
