"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Globe, Cpu, Layers, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoverLogo, setHoverLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { data, language, toggleLanguage } = useLanguage();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: data.ui.philosophy,   href: "#philosophy" },
    { label: data.ui.experience,   href: "#experience" },
    { label: data.ui.projects,     href: "#projects" },
    { label: data.ui.capabilities, href: "#skills" },
    { label: data.ui.education,    href: "#education" },
    { label: data.ui.hobbies,      href: "#hobbies" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-[60] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-[#050510]/80 backdrop-blur-2xl border-b border-white/10 shadow-lg" 
          : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        
        {/* ─── LOGO (RICH.AI) ─── */}
        <a
          href="#"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
          className="relative flex items-center gap-3 group"
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
             {/* Logo background hex/ring */}
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--blue)] opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:opacity-30 ${scrolled ? 'scale-90' : 'scale-100'}`} />
            <div className="absolute inset-px rounded-[10px] bg-[#050510] border border-white/10" />
            
            {/* Animated Logo Icon */}
            <AnimatePresence mode="wait">
              {hoverLogo ? (
                <motion.div
                  key="layers"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Layers className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="cpu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Cpu className="w-6 h-6 text-[var(--cyan)]" />
                  <span className="absolute inset-0 bg-[var(--cyan)]/20 blur-md animate-pulse rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.span
            key={hoverLogo ? "hover-text" : "normal-text"}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className={`font-bold tracking-tight text-white leading-none ${scrolled ? 'text-lg' : 'text-xl'}`}
          >
            {hoverLogo ? data.ui.logoHover : data.ui.logo}
          </motion.span>
        </a>

        {/* ─── NAV LINKS (DESKTOP) ─── */}
        <nav className="hidden lg:flex items-center gap-8 ml-auto mr-12">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm font-medium text-[var(--gray-light)] hover:text-white transition-all group"
            >
              <span className="text-[var(--cyan)] font-mono text-[10px] mr-2 opacity-40 group-hover:opacity-100 transition-opacity">
                {data.ui.navPrefix}{i + 1}
              </span>
              {link.label}
              <span className="absolute -bottom-1 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          ))}
        </nav>

        {/* ─── ACTIONS ─── */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center w-12 h-10 rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-white hover:border-[var(--cyan)]/50 transition-all active:scale-95"
          >
            {language === "zh" ? "EN" : "ZH"}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050510] border-t border-white/10 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-medium text-[var(--gray-light)] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${data.basics.email}`}
                className="block w-full py-4 rounded-xl bg-[var(--cyan)] text-black text-center font-bold"
              >
                {data.ui.connect}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
