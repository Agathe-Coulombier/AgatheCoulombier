import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-goudy',
});

export const metadata: Metadata = {
  title: 'Agathe Coulombier',
  description: 'Portfolio of Agathe Coulombier, a passionate web developer creating beautiful and functional websites.',
  keywords: ['web developer', 'portfolio', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Agathe Coulombier' }],
  openGraph: {
    title: 'Agathe Coulombier',
    description: 'Portfolio of Agathe Coulombier, a passionate web developer.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/waves/background-logo.png" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
