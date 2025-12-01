'use client';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Project 1',
    description: 'A modern web application built with Next.js and TypeScript.',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
  },
  {
    title: 'Project 2',
    description: 'E-commerce platform with seamless user experience.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    title: 'Project 3',
    description: 'Creative portfolio showcasing interactive animations.',
    tags: ['WebGL', 'Three.js', 'GSAP'],
    link: '#',
  },
];

export default function Projects() {
  const t = useTranslations();

  return (
    <section id="portfolio" className="min-h-screen bg-ink-900 text-sand-100 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
        >
          {t('projects.title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl text-sand-300 mb-16 max-w-2xl"
        >
          {t('projects.description')}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-ink-800 rounded-lg overflow-hidden hover:bg-ink-700 transition-colors group"
            >
              <div className="aspect-video bg-ink-700 group-hover:bg-ink-600 transition-colors" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-sand-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 bg-ink-600 rounded-full text-sand-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
