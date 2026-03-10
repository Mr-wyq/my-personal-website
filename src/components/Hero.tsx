"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Mail, ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { data } = useLanguage();
  const { name, title, summary, profiles, email, avatar, stats } = data.basics;
  const { ui } = data;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const getIcon = (network: string) => {
    switch (network.toLowerCase()) {
      case "github": return <Github className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-16 overflow-hidden">
      {/* Background Parallax Blobs */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--accent-cyan)]/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob z-0 pointer-events-none" 
      />
      
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Avatar & Stats Command Center */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-8"
        >
          <div className="relative group">
            {/* Animated Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
            
            <div className="relative w-64 h-80 md:w-80 md:h-[450px] rounded-2xl overflow-hidden border border-white/10 glass-panel shadow-2xl">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
              
              {/* Scanline Effect */}
              <div className="scanline"></div>
              
              {/* Floating ID Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-tighter">Status: Authorized</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse"></div>
                </div>
                <div className="text-white font-bold tracking-tight uppercase text-lg">{name} // 001</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            {stats.map((stat: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-3 rounded-xl bg-white/5 border border-white/5 text-center hover:border-[var(--accent-cyan)]/30 transition-colors"
              >
                <div className="text-xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Intro & Call to Action */}
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/20 backdrop-blur-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span className="text-[var(--accent-cyan)] font-mono text-xs uppercase tracking-[0.2em]">
              {ui.systemInit}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]">Intelligence</span><br />
              Driven Products.
            </h1>
            <h3 className="text-2xl md:text-3xl text-gray-400 font-medium">
              {title}
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl font-sans"
          >
            {summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 pt-4"
          >
            <a
              href={`mailto:${email}`}
              className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-bold hover:bg-[var(--accent-cyan)] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <Mail className="w-5 h-5" />
              {ui.contact}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-4">
              {profiles.map((profile) => (
                <a
                  key={profile.network}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 hover:border-[var(--accent-cyan)]/50 hover:bg-white/5 transition-all duration-300"
                >
                  <span className="text-gray-400 group-hover:text-[var(--accent-cyan)] group-hover:scale-110 transition-all duration-300">
                    {getIcon(profile.network)}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
