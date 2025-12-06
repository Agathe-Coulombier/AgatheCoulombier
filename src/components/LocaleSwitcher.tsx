'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Locale, locales } from '@/i18n/config';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    // Set a cookie for the locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    startTransition(() => {
      router.refresh();
    });
  };

  const wordVariants = {
    hidden: { 
      x: -30, 
      opacity: 0,
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="flex items-center text-sm font-medium font-futuralt text-sm md:text-base lg:text-lg"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
    >
      {locales.map((loc, index) => (
        <motion.span key={loc} className="flex items-center" variants={wordVariants}>
          <button
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`uppercase transition-colors ${
              locale === loc
                ? 'text-wave-100 md:text-wave-600 font-bold'
                : 'text-wave-50 hover:text-wave-100 md:text-wave-500 md:hover:text-wave-600 font-black'
            } ${isPending ? 'opacity-50' : ''}`}
          >
            {loc}
          </button>
          {index < locales.length - 1 && (
            <span className="text-wave-50 md:text-wave-600 mx-2 font-black">/</span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}
