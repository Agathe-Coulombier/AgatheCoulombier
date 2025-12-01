import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
import {locales, defaultLocale, Locale} from './config';

export default getRequestConfig(async () => {
  // Get the accept-language header
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  
  // Parse the accept-language header to detect user's preferred language
  let locale: Locale = defaultLocale;
  
  // Check if French is preferred
  if (acceptLanguage.toLowerCase().includes('fr')) {
    locale = 'fr';
  } else {
    // Default to English for any other language
    locale = 'en';
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
