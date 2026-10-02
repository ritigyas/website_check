import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { content } from '@/content';
import { playHeartPop } from '@/lib/sound';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-center"
    >
      {/* Background floating elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { emoji: '♡', top: '15%', left: '8%', size: 'text-2xl', anim: 'animate-gentle-bounce' },
          { emoji: '✨', top: '25%', left: '85%', size: 'text-xl', anim: 'animate-wobble' },
          { emoji: '💕', top: '65%', left: '12%', size: 'text-3xl', anim: 'animate-gentle-bounce' },
          { emoji: '🌟', top: '75%', left: '88%', size: 'text-lg', anim: 'animate-wobble' },
          { emoji: '♡', top: '40%', left: '92%', size: 'text-xl', anim: 'animate-gentle-bounce' },
          { emoji: '🌸', top: '50%', left: '5%', size: 'text-2xl', anim: 'animate-wobble' },
        ].map((el, i) => (
          <span
            key={i}
            className={`absolute ${el.size} ${el.anim} opacity-30`}
            style={{ top: el.top, left: el.left }}
          >
            {el.emoji}
          </span>
        ))}
      </div>

      {/* Animated heart */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        className="relative mb-6"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-100 shadow-glow sm:h-28 sm:w-28"
          onClick={playHeartPop}
        >
          <Heart
            size={48}
            className="fill-pink-400 text-pink-400"
            strokeWidth={1.5}
          />
        </motion.div>
        {/* Sparkles around heart */}
        <span className="absolute -right-3 -top-2 text-lg animate-sparkle-pulse">✨</span>
        <span className="absolute -left-4 top-8 text-sm animate-sparkle-pulse" style={{ animationDelay: '0.5s' }}>
          ✨
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-3xl font-extrabold leading-tight text-pink-600 sm:text-5xl md:text-6xl"
      >
        {content.hero.heading}
        <br />
        <span className="font-hand text-4xl text-pink-500 sm:text-6xl md:text-7xl">
          {content.boyfriendName}
        </span>{' '}
        ♡
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mt-6 max-w-md text-base text-gray-500 sm:text-lg"
      >
        {content.hero.subheading}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-1"
      >
        <p className="text-sm text-pink-400">{content.hero.scrollHint}</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-1"
        >
          <ChevronDown size={24} className="text-pink-400" />
        </motion.div>
        <Heart size={14} className="mt-1 fill-pink-300 text-pink-300 animate-gentle-bounce" />
      </motion.div>
    </section>
  );
}
