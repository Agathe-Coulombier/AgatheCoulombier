'use client';
import { motion } from 'motion/react';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  direction?: 'left' | 'right'; // 'left' = words come from right, 'right' = words come from left
  delay?: number;
  staggerDelay?: number;
}

export default function AnimatedWords({ 
  text, 
  className = '', 
  direction = 'left',
  delay = 0,
  staggerDelay = 0.08,
}: AnimatedWordsProps) {
  const words = text.split(' ');
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      x: direction === 'left' ? 50 : -50, 
      opacity: 0,
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 8,
        stiffness: 80,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-3"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
