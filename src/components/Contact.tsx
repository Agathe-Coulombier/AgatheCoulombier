'use client';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations();

  return (
    <section id="contact" className="min-h-screen bg-sand-200 text-ink-900 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
        >
          {t('contact.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl text-ink-600 mb-16 max-w-2xl"
        >
          {t('contact.description')}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
          onSubmit={(e: React.FormEvent) => e.preventDefault()}
        >
          <div>
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-sand-100 border border-sand-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-ink-900"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium mb-2">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-3 bg-sand-100 border border-sand-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-ink-900 resize-none"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="px-8 py-4 bg-accent text-sand-100 font-semibold rounded-lg hover:bg-accent-dark transition-colors text-lg"
          >
            {t('contact.send')}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap gap-6"
        >
          <a
            href="mailto:contact@agatheCoulombier.com"
            className="text-lg text-ink-600 hover:text-accent transition-colors"
            title="Email"
          >
            contact@agatheCoulombier.com
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-ink-600 hover:text-accent transition-colors"
            title="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-ink-600 hover:text-accent transition-colors"
            title="LinkedIn"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
