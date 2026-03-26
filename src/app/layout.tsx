import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rich.ai | AI 产品经理",
  description: "Rich – AI 产品经理。四年产品沉淀，主导多款 AI 项目 0-1 落地。期待与优秀团队共同探索 AI 落地的无限可能。",
  keywords: ["AI 产品经理", "AI PM", "Rich", "产品作品集", "LLM", "商业化落地"],
  openGraph: {
    title: "Rich.ai | AI 产品经理",
    description: "Rich – AI 产品经理。四年产品沉淀，主导多款 AI 项目 0-1 落地。",
    type: "website",
  },
  icons: {
    icon: "/icon.png?v=3",
    shortcut: "/icon.png?v=3",
    apple: "/icon.png?v=3"
  }
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter, var(--font-sans))" }}>
        <LanguageProvider>
          {children}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
