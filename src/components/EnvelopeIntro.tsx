import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content';
import { playEnvelope, playPop, playSparkle, unlockAudio } from '@/lib/sound';

interface EnvelopeIntroProps {
  onOpen: () => void;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
}

let particleId = 0;

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
  const [opened, setOpened] = useState(false);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  const handleOpen = () => {
    unlockAudio();
    playEnvelope();
    playPop();

    // Spawn floating particles
    const newParticles: FloatingParticle[] = Array.from({ length: 20 }, () => ({
      id: particleId++,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 30,
      emoji: ['♡', '✨', '💕', '🌟'][Math.floor(Math.random() * 4)],
      duration: 1.5 + Math.random(),
    }));
    setParticles(newParticles);
    playSparkle();

    setTimeout(() => {
      setOpened(true);
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!opened && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-rose-50 to-pink-50 paper-texture"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Floating particles on open */}
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="pointer-events-none absolute text-2xl"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -120 }}
              transition={{ duration: p.duration, ease: 'easeOut' }}
            >
              {p.emoji}
            </motion.span>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6 text-center"
          >
            <p className="font-hand text-3xl text-pink-500 sm:text-4xl">
              {content.intro.line1}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mb-10 text-center"
          >
            <p className="text-base text-gray-500 sm:text-lg">{content.intro.line2}</p>
          </motion.div>

          {/* Envelope */}
          <motion.button
            onClick={handleOpen}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open envelope"
          >
            <div className="relative h-36 w-48 sm:h-44 sm:w-56">
              {/* Envelope body */}
              <div className="absolute inset-0 rounded-lg bg-white shadow-card" />
              {/* Envelope flap */}
              <motion.div
                className="absolute left-0 right-0 top-0 h-0 w-0"
                style={{
                  borderLeft: '96px solid transparent',
                  borderRight: '96px solid transparent',
                  borderTop: '70px solid var(--pink-200)',
                  transformOrigin: 'top center',
                }}
                animate={particles.length > 0 ? { rotateX: 180 } : {}}
                transition={{ duration: 0.6, ease: 'easeIn' }}
              />
              {/* Heart seal */}
              <motion.div
                className="absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2 text-4xl"
                animate={particles.length > 0 ? { scale: 0, opacity: 0 } : { scale: [1, 1.15, 1] }}
                transition={
                  particles.length > 0
                    ? { duration: 0.3 }
                    : { duration: 1.5, repeat: Infinity }
                }
              >
                💗
              </motion.div>
              {/* Letter peeking out */}
              <motion.div
                className="absolute left-2 right-2 top-2 bottom-2 rounded bg-cream"
                animate={particles.length > 0 ? { y: -30 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>

            <motion.p
              className="mt-6 font-hand text-xl text-pink-500"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {content.intro.buttonLabel}
            </motion.p>
          </motion.button>

          {/* Decorative floating elements */}
          <div className="pointer-events-none absolute left-8 top-20 text-2xl opacity-40 animate-gentle-bounce">
            ✨
          </div>
          <div className="pointer-events-none absolute right-10 top-32 text-xl opacity-40 animate-wobble">
            ♡
          </div>
          <div className="pointer-events-none absolute bottom-24 left-12 text-xl opacity-30 animate-gentle-bounce">
            🌸
          </div>
          <div className="pointer-events-none absolute bottom-16 right-16 text-2xl opacity-30 animate-wobble">
            ✨
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
