"use client";
import { useRef, useState, MouseEvent } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export default function MagneticButton({ children, className = "", onClick, href, strength = 0.3 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const Tag = href ? "a" : "button";

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      <Tag
        href={href}
        onClick={onClick}
        className={className}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: pos.x === 0 ? "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.1s linear",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
