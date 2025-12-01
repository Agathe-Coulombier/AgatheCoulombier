import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';
import {locales, defaultLocale, Locale} from './config';

export default getRequestConfig(async () => {
  // First check for locale cookie (user preference)
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  
  let locale: Locale = defaultLocale;
  
  if (localeCookie && locales.includes(localeCookie)) {
    // Use cookie preference if valid
    locale = localeCookie;
  } else {
    // Fall back to accept-language header detection
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language') || '';
    
    // Check if French is preferred
    if (acceptLanguage.toLowerCase().includes('fr')) {
      locale = 'fr';
    } else {
      // Default to English for any other language
      locale = 'en';
    }
  }
  
  // Validate the locale
  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
