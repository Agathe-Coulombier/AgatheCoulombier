'use client';
import { useState, useEffect } from 'react';

export default function Crosshair() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const customCursorArea = document.querySelector('.custom-cursor-area');
    if (customCursorArea) {
      customCursorArea.addEventListener('mousemove', handleMouseMove as EventListener);
      customCursorArea.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (customCursorArea) {
        customCursorArea.removeEventListener('mousemove', handleMouseMove as EventListener);
        customCursorArea.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 text-sand-100 text-2xl font-light"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      +
    </div>
  );
}
