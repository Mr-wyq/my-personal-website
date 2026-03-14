"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import zhData from "../../data/resume.json";
import enData from "../../data/resume-en.json";

type Language = "zh" | "en";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    data: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("zh");

    useEffect(() => {
        const savedLang = localStorage.getItem("resume_lang") as Language;
        if (savedLang && (savedLang === "zh" || savedLang === "en")) {
            setLanguage(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === "zh" ? "en" : "zh";
        setLanguage(newLang);
        localStorage.setItem("resume_lang", newLang);
    };

    const data = language === "zh" ? zhData : enData;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, data }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
