'use client';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import WaveDivider from '@/components/WaveDivider';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import LiquidDistortionCanvas from '@/components/LiquidDistortionCanvas';
import CrossText from '@/components/CrossText';
import Crosshair from '@/components/Crosshair';
import './wavy-hover.css';

export default function Hero() {
  const t = useTranslations();
  return (
    <section className="relative min-h-screen overflow-hidden bg-sand-50 text-ink-900 custom-cursor-area">
      <Crosshair />
      <div className="absolute inset-0 z-0">
        <LiquidDistortionCanvas imageSrc="/waves/Water_reflexions_cph_april22-3.jpg" />
      </div>
      <div className="noise" />

      {/* Language switcher - Always top right on all screens */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 lg:top-24 lg:right-24 z-20 text-sand-300">
        <LocaleSwitcher />
      </div>

      {/* Main content */}
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Left side - Content */}
        <div className="w-full lg:w-3/4 h-2/3 lg:h-full flex flex-col pt-20 px-6 md:pl-12 md:pt-24 md:pb-0 lg:pl-16 lg:pl-24 lg:py-24 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-10 md:mb-12 text-sand-100"
          >
            {t('hero.job')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-secondary-light text-sand-300"
          >
            {t('hero.name')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-ink-500 mb-10 md:mb-12 lg:mb-52 max-w-md text-sand-300"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* Call to action section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-4 text-2xl md:text-4xl mt-auto lg:mt-0"
          >
            <a href="#contact" className="font-semibold text-sand-100 hover:text-sand-300 flex items-center gap-2 size-fit border-b-4 border-sand-100 hover:border-sand-300">
              <span className="inline-block pb-1">
                <CrossText text={`${t('cta.letsmeet')} ↘`} />
              </span>
            </a>
            <a
              href="#portfolio"
              className="inline-block font-bold transition text-accent hover:text-accent-light"
            >
              <CrossText className="" text={t('cta.portfolio')} />
            </a>
          </motion.div>
        </div>


        {/* Navigation - Bottom right */}
        <div className="w-full lg:w-1/4 h-1/3 lg:h-full flex flex-col p-6 pt-6 md:p-12 lg:p-1 lg:pr-24 lg:py-24 z-10 items-end">
          <div className="w-full flex flex-col lg:mt-auto justify-end items-end">
            <motion.nav
              className=""
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ul className="space-y-3 text-right md:space-y-4 text-2xl md:text-3xl font-medium text-justify-end text-sand-100">
                <li><a href="#about" className="text-sand-100 hover:text-sand-300 transition"><CrossText text={t('nav.about')} /></a></li>
                <li><a href="#portfolio" className="text-sand-100 hover:text-sand-300 transition"><CrossText text={t('nav.projects')} /></a></li>
                <li><a href="#contact" className="text-sand-100 hover:text-sand-300 transition"><CrossText text={t('nav.contact')} /></a></li>
              </ul>
            </motion.nav>
          </div>
        </div>
      </div>

      {/* Wave divider in a soft sand tone */}
      <div className="text-sand-300">
        <WaveDivider className="w-full h-[120px]" />
      </div>
    </section>
  );
}
