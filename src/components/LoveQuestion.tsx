import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { content } from '@/content';
import { playPop, playHeartPop } from '@/lib/sound';

export default function LoveQuestion() {
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const [noClicks, setNoClicks] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const handleYes = () => {
    playHeartPop();
    setAnswer('yes');
  };

  const handleNo = () => {
    playPop();
    const newClicks = noClicks + 1;
    setNoClicks(newClicks);

    // Move the NO button around
    const maxX = window.innerWidth * 0.3;
    const maxY = 120;
    setNoPos({
      x: (Math.random() - 0.5) * maxX,
      y: (Math.random() - 0.5) * maxY,
    });

    if (newClicks >= 4) {
      setAnswer('no');
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 1500);
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="mb-2 text-lg text-gray-400">Okay, one important question...</p>
        <h2 className="mb-10 text-2xl font-bold text-pink-500 sm:text-3xl">
          {content.loveQuestion.question}
        </h2>

        <AnimatePresence mode="wait">
          {answer === null && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex items-center justify-center gap-4"
            >
              <motion.button
                onClick={handleYes}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="rounded-full bg-pink-400 px-8 py-4 text-lg font-bold text-white shadow-glow"
              >
                YES ♡
              </motion.button>

              <motion.button
                onClick={handleNo}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-400 shadow-soft"
              >
                NO 😭
              </motion.button>
            </motion.div>
          )}

          {answer === 'yes' && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative"
            >
              {/* Floating hearts */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: (Math.random() - 0.5) * 300,
                    y: -(100 + Math.random() * 200),
                  }}
                  transition={{ duration: 2, delay: i * 0.1, ease: 'easeOut' }}
                >
                  {['♡', '💕', '✨', '💗'][Math.floor(Math.random() * 4)]}
                </motion.span>
              ))}
              <p className="font-hand text-3xl text-pink-500 sm:text-4xl">
                {content.loveQuestion.yesAnswer}
              </p>
            </motion.div>
          )}

          {answer === 'no' && (
            <motion.div
              key="no"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="font-hand text-3xl text-pink-500"
              >
                {content.loveQuestion.noFirstResponse}
              </motion.p>

              <AnimatePresence>
                {showFinalMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6"
                  >
                    <p className="mb-3 text-lg text-gray-400">
                      {content.loveQuestion.noSecondResponse}
                    </p>
                    <p className="font-hand text-xl leading-relaxed text-pink-500 sm:text-2xl">
                      {content.loveQuestion.noFinalMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
