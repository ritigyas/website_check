import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { content } from '@/content';
import { playChime } from '@/lib/sound';

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (inView) {
    playChime();
  }

  return (
    <section id="letter" className="relative px-5 py-20 sm:py-28">
      {/* Section heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-10 max-w-md text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-pink-500 sm:text-3xl">
          {content.letter.heading}
        </h2>
        <div className="mx-auto flex items-center gap-2 text-pink-300">
          <span className="h-px w-12 bg-pink-200" />
          <span className="text-sm">♡</span>
          <span className="h-px w-12 bg-pink-200" />
        </div>
      </motion.div>

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={inView ? { opacity: 1, y: 0, rotate: -1.5 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-lg"
      >
        {/* Washi tape top */}
        <div
          className="absolute -top-4 left-1/2 h-8 w-32 -translate-x-1/2 rotate-2 opacity-80"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--pink-200) 0px, var(--pink-200) 8px, var(--pink-100) 8px, var(--pink-100) 16px)',
          }}
        />

        {/* Card */}
        <div className="relative rounded-2xl bg-white p-8 shadow-card sm:p-10">
          {/* Decorative corners */}
          <span className="absolute left-3 top-3 text-xs opacity-40">✿</span>
          <span className="absolute right-3 top-3 text-xs opacity-40">✿</span>
          <span className="absolute bottom-3 left-3 text-xs opacity-40">♡</span>
          <span className="absolute bottom-3 right-3 text-xs opacity-40">♡</span>

          {/* Greeting */}
          <p className="font-hand text-2xl text-pink-500 sm:text-3xl">
            {content.letter.greeting} {content.boyfriendName},
          </p>

          {/* Body */}
          <div className="mt-4 space-y-1">
            {content.letter.body.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="font-hand text-lg leading-relaxed text-gray-600 sm:text-xl"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Signoff */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 + content.letter.body.length * 0.15 + 0.2, duration: 0.6 }}
            className="mt-6"
          >
            <p className="font-hand text-lg text-gray-500">
              {content.letter.signoff}
            </p>
            <p className="font-hand text-2xl text-pink-500">
              {content.yourName} ♡
            </p>
          </motion.div>

          {/* Doodle decorations */}
          <div className="mt-6 flex items-center gap-2 opacity-50">
            <span className="text-sm">⭐</span>
            <span className="text-sm">🌸</span>
            <span className="text-sm">♡</span>
            <span className="text-sm">✨</span>
            <span className="text-sm">🎀</span>
          </div>
        </div>

        {/* Sticker decorations */}
        <span className="absolute -right-3 -top-3 text-2xl animate-wobble">🎀</span>
        <span className="absolute -bottom-4 -right-4 text-xl animate-gentle-bounce">♡</span>
        <span className="absolute -left-3 bottom-10 text-lg animate-wobble">✨</span>
      </motion.div>
    </section>
  );
}
