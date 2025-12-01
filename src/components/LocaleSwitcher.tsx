'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Locale, locales } from '@/i18n/config';

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    // Set a cookie for the locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          <button
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`uppercase transition-colors ${
              locale === loc
                ? 'text-sand-100 font-bold'
                : 'text-sand-400 hover:text-sand-200'
            } ${isPending ? 'opacity-50' : ''}`}
          >
            {loc}
          </button>
          {index < locales.length - 1 && (
            <span className="text-sand-400 mx-2">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
