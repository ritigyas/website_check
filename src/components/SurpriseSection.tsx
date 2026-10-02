import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { content } from '@/content';
import { playHeartPop, playWhoosh, playSparkle } from '@/lib/sound';

export default function SurpriseSection() {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const handleOpen = () => {
    playWhoosh();
    playHeartPop();
    setTimeout(() => playSparkle(), 400);
    setOpened(true);
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20"
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="mb-8 text-xl text-gray-500 sm:text-2xl">
              {content.surprise.intro}
            </p>
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-pink-400 px-8 py-4 text-lg font-bold text-white shadow-glow"
            >
              {content.surprise.buttonLabel}
            </motion.button>

            {/* Decorative */}
            <div className="mt-8 text-3xl animate-gentle-bounce">💗</div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative text-center"
          >
            {/* Heart particles */}
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute text-xl"
                style={{ left: '50%', top: '50%' }}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                }}
                transition={{ duration: 3, delay: i * 0.1, ease: 'easeOut', repeat: Infinity }}
              >
                {['♡', '✨', '💕', '💗'][Math.floor(Math.random() * 4)]}
              </motion.span>
            ))}

            {/* Large animated heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-pink-100 shadow-glow"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={56} className="fill-pink-400 text-pink-400" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Message */}
            <div className="space-y-1">
              {content.surprise.message.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.4, duration: 0.6 }}
                  className="font-hand text-2xl text-pink-500 sm:text-3xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
