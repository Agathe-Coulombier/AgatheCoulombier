'use client';
import { useState, useRef, useCallback } from 'react';

interface CrossTextProps {
  text: string;
  className?: string;
}

export default function CrossText({ text, className = '' }: CrossTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <span
          className="absolute pointer-events-none z-20 text-accent font-bold"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
            fontSize: '1.5em',
            opacity: 0.8,
          }}
        >
          +
        </span>
      )}
    </span>
  );
}
