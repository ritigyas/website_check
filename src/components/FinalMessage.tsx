import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { content } from '@/content';
import { playHeartPop, playSoftClick } from '@/lib/sound';

export default function FinalMessage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const handleReplay = () => {
    playSoftClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-5 py-24 text-center"
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 paper-texture" />

      {/* Floating decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { emoji: '♡', top: '10%', left: '10%', anim: 'animate-gentle-bounce' },
          { emoji: '✨', top: '20%', left: '85%', anim: 'animate-wobble' },
          { emoji: '💕', top: '70%', left: '15%', anim: 'animate-gentle-bounce' },
          { emoji: '🌸', top: '80%', left: '88%', anim: 'animate-wobble' },
          { emoji: '♡', top: '45%', left: '92%', anim: 'animate-gentle-bounce' },
        ].map((el, i) => (
          <span
            key={i}
            className={`absolute text-xl ${el.anim} opacity-30`}
            style={{ top: el.top, left: el.left }}
          >
            {el.emoji}
          </span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-md"
      >
        {/* Animated heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-glow"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={40} className="fill-pink-400 text-pink-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <h2 className="text-2xl font-extrabold text-pink-600 sm:text-4xl">
          {content.final.heading}
        </h2>
        <p className="mt-2 font-hand text-3xl text-pink-500 sm:text-5xl">
          {content.boyfriendName} ♡
        </p>

        {/* Subheading */}
        <p className="mt-4 text-base text-gray-500 sm:text-lg">
          {content.final.subheading}
        </p>

        {/* Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-500 shadow-soft"
        >
          {content.final.credit}
          <Heart size={14} className="fill-pink-400 text-pink-400" />
          {content.yourName} 💌
        </motion.div>

        {/* Replay button */}
        <motion.button
          onClick={handleReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-pink-200 bg-white px-6 py-3 text-sm font-bold text-pink-500 shadow-soft"
        >
          <RotateCcw size={16} />
          {content.final.replayLabel}
        </motion.button>
      </motion.div>

      {/* Bottom padding for nav */}
      <div className="h-20" />
    </section>
  );
}
