import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnvelopeIntro from '@/components/EnvelopeIntro';
import Hero from '@/components/Hero';
import LoveLetter from '@/components/LoveLetter';
import MemoryCards from '@/components/MemoryCards';
import PhotoGallery from '@/components/PhotoGallery';
import ReasonsSection from '@/components/ReasonsSection';
import LoveQuestion from '@/components/LoveQuestion';
import Timeline from '@/components/Timeline';
import SurpriseSection from '@/components/SurpriseSection';
import FinalMessage from '@/components/FinalMessage';
import MusicToggle from '@/components/MusicToggle';
import FloatingHearts from '@/components/FloatingHearts';
import SparkleCursor from '@/components/SparkleCursor';
import FloatingNav from '@/components/FloatingNav';
import { playPop, playHeartPop, unlockAudio } from '@/lib/sound';

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [showEgg, setShowEgg] = useState(false);

  // Heart logo easter egg — click 5 times to reveal secret message
  const handleHeartClick = () => {
    unlockAudio();
    playPop();
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);

    if (newCount >= 5) {
      playHeartPop();
      setShowEgg(true);
      setHeartClicks(0);
      setTimeout(() => setShowEgg(false), 5000);
    }
  };

  useEffect(() => {
    if (introDone) {
      // Smooth scroll to top after intro
      window.scrollTo({ top: 0 });
    }
  }, [introDone]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream">
      {/* Sparkle cursor effect (desktop + touch) */}
      <SparkleCursor />

      {/* Floating background hearts */}
      {introDone && <FloatingHearts count={6} />}

      {/* Music toggle */}
      <MusicToggle />

      {/* Heart logo (top-left) — also easter egg trigger */}
      {introDone && (
        <button
          onClick={handleHeartClick}
          className="fixed left-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white/90 shadow-soft backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          aria-label="Home"
        >
          <span className="text-xl">♡</span>
        </button>
      )}

      {/* Easter egg message */}
      <AnimatePresence>
        {showEgg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed left-1/2 top-20 z-[70] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-card"
          >
            <p className="font-hand text-xl text-pink-500">
              Psst... I love you more than you know. 🤭♡
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope intro */}
      <EnvelopeIntro onOpen={() => setIntroDone(true)} />

      {/* Main content — only show after intro */}
      <AnimatePresence>
        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Hero />
            <LoveLetter />
            <MemoryCards />
            <PhotoGallery />
            <ReasonsSection />
            <LoveQuestion />
            <Timeline />
            <SurpriseSection />
            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating navigation */}
      {introDone && <FloatingNav />}
    </div>
  );
}
