'use client';
import { motion } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import WaveDivider from '@/components/WaveDivider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import LiquidDistortionCanvas from '@/components/LiquidDistortionCanvas';
import AnimatedWords from '@/components/AnimatedWords';
import Crosshair from '@/components/Crosshair';

export default function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  
  // Hero title lines for staggered animation
  const heroLines = [
    t('hero.line1'),
    t('hero.line2'),
    t('hero.line3'),
    t('hero.line4'),
    t('hero.line5'),
    t('hero.line6'),
  ];

  // Navigation items
  const navItems = [
    { href: '#about', title: 'About', text: t('nav.about') },
    { href: '#portfolio', title: 'Projects', text: t('nav.projects') },
    { href: '#contact', title: 'Contact', text: t('nav.contact') },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-sand-50 text-ink-900 custom-cursor-area">
      <Crosshair />
      <div className="absolute inset-0 z-0">
        <LiquidDistortionCanvas imageSrc="/waves/Ondelettes_cph_mai22-94.jpg" />
      </div>
      <div className="noise" />

      {/* Language switcher - Centered on phone, top-right on tablet+ */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 md:top-12 md:right-12 lg:top-24 lg:right-20 z-20 cta-hover-target">
        <LocaleSwitcher />
      </div>

      {/* Main content - uses viewport height */}
      <div className="h-[100dvh] flex flex-col lg:flex-row relative">
        {/* Hero Title - centered in viewport on mobile, takes 3/4 on desktop */}
        <div className="w-full lg:w-3/4 h-full flex items-center px-6 md:pl-12 lg:pl-20 z-10">
          <h1 className="flex flex-col font-futuralt font-black uppercase gap-2 md:gap-4 lg:gap-6 leading-tight">
            {heroLines.map((line, index) => (
              <span
                key={`${locale}-${index}`}
                className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl text-wave-50 md:text-wave-100"
                style={{
                  textShadow: '4px 2px 0 var(--wave-600), 0 0 40px var(--wave-900)',
                }}
              >
                <AnimatedWords 
                  text={line} 
                  direction="left" 
                  delay={index * 0.2}
                  staggerDelay={0.2}
                />
              </span>
            ))}
          </h1>
        </div>

        {/* Navigation - Centered on phone, bottom-right on tablet+ */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-8 md:bottom-12 md:right-12 lg:bottom-24 lg:right-20 z-10">
          <nav>
            <ul className="text-right space-y-1 text-xl md:text-2xl lg:text-3xl uppercase text-wave-100 md:text-wave-600">
              {navItems.map((item, index) => (
                <li key={`${locale}-nav-${index}`}>
                  <a 
                    href={item.href} 
                    title={item.title} 
                    className="transition cta-hover-target font-futuralt font-black inline-block"
                  >
                    <AnimatedWords 
                      text={item.text} 
                      direction="right" 
                      delay={0.8 + index * 0.1}
                      staggerDelay={0.05}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Wave divider in a soft sand tone */}
      <div className="text-sand-300">
        <WaveDivider className="w-full h-[120px]" />
      </div>
    </section>
  );
}
