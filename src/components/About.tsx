'use client';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations();

  return (
    <section id="about" className="min-h-screen bg-sand-300 text-ink-900 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
        >
          {t('about.title')}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl leading-relaxed text-ink-700"
        >
          {t('about.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-sand-200 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Frontend</h3>
            <ul className="space-y-2 text-ink-600">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div className="bg-sand-200 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Backend</h3>
            <ul className="space-y-2 text-ink-600">
              <li>Node.js</li>
              <li>Python</li>
              <li>PostgreSQL</li>
              <li>REST APIs</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
