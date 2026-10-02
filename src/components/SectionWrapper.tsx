import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { playChime } from '@/lib/sound';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  playSoundOnView?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  playSoundOnView = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  if (inView && playSoundOnView) {
    // Play once when section enters viewport
    playChime();
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative px-5 py-20 sm:py-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
