import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Vercel
  output: undefined, // Let Vercel handle this automatically
};

export default withNextIntl(nextConfig);
