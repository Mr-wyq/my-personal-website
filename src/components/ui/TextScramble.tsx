"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function TextScramble({ text, className = "", delay = 0, duration = 1200 }: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const timeout = setTimeout(() => {
      const len = text.length;
      const startTime = Date.now();

      const tick = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolved = Math.floor(progress * len);

        const chars = text.split("").map((char, i) => {
          if (i < resolved) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });

        setDisplay(chars.join(""));

        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(text);
      };

      requestAnimationFrame(tick);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, duration]);

  return <span className={className}>{display || text}</span>;
}
