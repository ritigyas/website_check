import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Smile, Heart, Coffee, Laugh, Compass, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { content } from '@/content';
import { playPop, playSparkle } from '@/lib/sound';

const ICONS: Record<string, LucideIcon> = {
  Smile,
  Heart,
  Coffee,
  Laugh,
  Compass,
  Sparkles,
};

interface CardState {
  flipped: boolean;
}

export default function MemoryCards() {
  const [cards, setCards] = useState<CardState[]>(
    content.memoryCards.map(() => ({ flipped: false })),
  );
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const toggleCard = (index: number) => {
    playPop();
    if (!cards[index].flipped) playSparkle();
    setCards((prev) =>
      prev.map((c, i) => (i === index ? { flipped: !c.flipped } : c)),
    );
  };

  return (
    <section id="memories" className="relative px-5 py-20 sm:py-28">
      {/* Heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-md text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-pink-500 sm:text-3xl">
          Some of my favorite things about us ♡
        </h2>
        <p className="text-sm text-gray-400">tap each card to see more</p>
      </motion.div>

      {/* Cards grid */}
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
        {content.memoryCards.map((card, i) => {
          const Icon = ICONS[card.icon] || Heart;
          const isFlipped = cards[i]?.flipped;

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -2 : 2 }}
              animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleCard(i)}
              className="relative min-h-[180px] overflow-hidden rounded-2xl border border-pink-100 bg-white p-6 text-left shadow-soft transition-shadow hover:shadow-card"
            >
              {/* Decorative corner */}
              <span className="absolute right-3 top-3 text-xs opacity-30">
                {isFlipped ? '♡' : '✨'}
              </span>

              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-full flex-col items-center justify-center text-center"
                  >
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                      <Icon size={26} className="text-pink-400" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-pink-500">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">{card.short}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-full flex-col items-center justify-center text-center"
                  >
                    <p className="font-hand text-lg leading-relaxed text-gray-600">
                      {card.long}
                    </p>
                    <span className="mt-3 text-sm text-pink-300">tap to go back ♡</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
