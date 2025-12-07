'use client';
import { useState, useEffect } from 'react';

export default function Crosshair() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isCtaHover, setIsCtaHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouchDevice();

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore if touch device
      if (isTouchDevice) return;
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleCtaEnter = () => setIsCtaHover(true);
    const handleCtaLeave = () => setIsCtaHover(false);

    const customCursorArea = document.querySelector('.custom-cursor-area');
    if (customCursorArea) {
      customCursorArea.addEventListener('mousemove', handleMouseMove as EventListener);
      customCursorArea.addEventListener('mouseleave', handleMouseLeave);
    }

    // Listen for CTA hover events
    const ctaElements = document.querySelectorAll('.cta-hover-target');
    ctaElements.forEach(el => {
      el.addEventListener('mouseenter', handleCtaEnter);
      el.addEventListener('mouseleave', handleCtaLeave);
    });

    return () => {
      if (customCursorArea) {
        customCursorArea.removeEventListener('mousemove', handleMouseMove as EventListener);
        customCursorArea.removeEventListener('mouseleave', handleMouseLeave);
      }
      ctaElements.forEach(el => {
        el.removeEventListener('mouseenter', handleCtaEnter);
        el.removeEventListener('mouseleave', handleCtaLeave);
      });
    };
  }, [isTouchDevice]);

  // Don't render anything on touch devices
  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontSize: isCtaHover ? '4rem' : '2rem',
        fontWeight: 300,
        mixBlendMode: 'difference',
        transition: 'font-size 0.2s ease-out',
      }}
    >
      +
    </div>
  );
}
