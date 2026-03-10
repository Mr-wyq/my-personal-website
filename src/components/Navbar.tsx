"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";
import { Globe, Cpu } from "lucide-react";

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoverLogo, setHoverLogo] = useState(false);
    const { scrollY } = useScroll();
    const { data, language, toggleLanguage } = useLanguage();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    const getLogo = () => {
        return data.ui.logo || "Init";
    };

    const getHoverLogoText = () => {
        return data.ui.logoHover || "Greetings";
    };

    const navLinks = [
        { name: data.ui.philosophy, href: "#philosophy" },
        { name: data.ui.experience, href: "#experience" },
        { name: data.ui.projects, href: "#projects" },
        { name: data.ui.capabilities, href: "#skills" },
        { name: data.ui.education, href: "#education" },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            initial="visible"
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled
                    ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-black/20"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                <a
                    href="#"
                    className="relative flex items-center gap-3 group overflow-visible"
                    onMouseEnter={() => setHoverLogo(true)}
                    onMouseLeave={() => setHoverLogo(false)}
                >
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                        <div className="relative px-3 py-1 bg-black rounded border border-white/10 flex items-center justify-center gap-2 min-w-[100px] h-8 transition-all duration-300 group-hover:border-[var(--accent-cyan)]/50">
                            <Cpu className={`w-4 h-4 transition-colors ${hoverLogo ? "text-[var(--accent-purple)]" : "text-[var(--accent-cyan)]"}`} />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={hoverLogo ? "hover" : "default"}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-white font-mono text-sm font-bold whitespace-nowrap"
                                >
                                    {hoverLogo ? getHoverLogoText() : getLogo()}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-mono text-sm text-gray-400 hover:text-[var(--accent-cyan)] transition-colors flex items-center gap-1"
                        >
                            <span className="text-[var(--accent-purple)] opacity-70">
                                0{index + 1}.
                            </span>
                            {link.name}
                        </a>
                    ))}

                    <div className="w-px h-6 bg-gray-800 mx-2"></div>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono border border-white/10 hover:border-[var(--accent-cyan)]/30 px-3 py-1.5 rounded-full bg-white/5 group/btn"
                        title="Toggle Language"
                    >
                        <Globe className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
                        <span className="min-w-[2ch]">
                            {language === "zh" ? "EN" : "中"}
                        </span>
                    </button>

                    <a
                        href={data.basics.profiles.find((p: any) => p.network === "LinkedIn")?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] font-mono text-sm rounded hover:bg-[var(--accent-cyan)]/10 transition-colors ml-2"
                    >
                        {data.ui.connect}
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
