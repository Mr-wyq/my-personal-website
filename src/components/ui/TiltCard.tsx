"use client";
import { useRef, useState, useCallback, useEffect, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = "", intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glow: { x: 50, y: 50 } });

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x: dy * intensity, y: dx * -intensity, glow: { x: glowX, y: glowY } });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, glow: { x: 50, y: 50 } });
  }, []);

  return (
    <div ref={ref} className={`tilt-host ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.1s linear",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Glow highlight */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", zIndex: 1,
          background: `radial-gradient(circle at ${tilt.glow.x}% ${tilt.glow.y}%, rgba(6,182,212,0.08), transparent 60%)`,
          transition: "opacity 0.3s",
        }} />
        {children}
      </div>
    </div>
  );
}
