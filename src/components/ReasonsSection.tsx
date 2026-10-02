import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { content } from '@/content';
import { playChime } from '@/lib/sound';

export default function ReasonsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="us" className="relative px-5 py-20 sm:py-28">
      {/* Heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-md text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-pink-500 sm:text-3xl">
          Reasons why I love you ♡
        </h2>
        <p className="text-sm text-gray-400">keep scrolling, they just keep going...</p>
      </motion.div>

      {/* Reason bubbles */}
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
        {content.reasons.map((reason, i) => {
          const isEven = i % 2 === 0;
          return (
            <ReasonBubble
              key={i}
              text={reason}
              index={i}
              isEven={isEven}
              inView={inView}
            />
          );
        })}
      </div>
    </section>
  );
}

function ReasonBubble({
  text,
  index,
  isEven,
  inView,
}: {
  text: string;
  index: number;
  isEven: boolean;
  inView: boolean;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const localInView = useInView(localRef, { once: true, amount: 0.5 });

  if (localInView) {
    playChime();
  }

  return (
    <motion.div
      ref={localRef}
      initial={{ opacity: 0, x: isEven ? -40 : 40, scale: 0.8 }}
      animate={localInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      className={`relative max-w-md rounded-2xl border border-pink-100 bg-white px-6 py-4 shadow-soft ${
        isEven ? 'self-start' : 'self-end'
      }`}
    >
      {/* Heart bullet */}
      <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-sm">
        {isEven ? '💕' : '♡'}
      </span>

      <p className="font-hand text-lg leading-relaxed text-gray-600">
        {text}
      </p>

      {/* Tiny number */}
      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-pink-400">
        {index + 1}
      </span>
    </motion.div>
  );
}
