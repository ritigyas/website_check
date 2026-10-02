import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon } from 'lucide-react';
import { content } from '@/content';
import { playPop } from '@/lib/sound';

interface Photo {
  src: string;
  caption: string;
  rotation: number;
}

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const openPhoto = (index: number) => {
    playPop();
    setSelected(index);
  };

  const closePhoto = () => {
    playPop();
    setSelected(null);
  };

  return (
    <section className="relative px-5 py-20 sm:py-28">
      {/* Heading */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-12 max-w-md text-center"
      >
        <h2 className="mb-2 text-2xl font-bold text-pink-500 sm:text-3xl">
          Our little scrapbook 📸
        </h2>
        <div className="mx-auto flex items-center gap-2 text-pink-300">
          <span className="h-px w-12 bg-pink-200" />
          <span className="text-sm">♡</span>
          <span className="h-px w-12 bg-pink-200" />
        </div>
      </motion.div>

      {/* Scrapbook layout */}
      <div className="mx-auto max-w-2xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {content.photos.map((photo: Photo, i: number) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30, rotate: photo.rotation }}
              animate={inView ? { opacity: 1, y: 0, rotate: photo.rotation } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openPhoto(i)}
              className={`group relative aspect-square overflow-hidden rounded-lg border-2 border-white bg-white p-2 shadow-card ${
                i % 3 === 0 ? 'sm:mt-6' : ''
              }`}
              style={{ transform: `rotate(${photo.rotation}deg)` }}
            >
              {/* Photo or placeholder */}
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-full w-full rounded object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded bg-pink-50">
                  <ImageIcon size={28} className="mb-2 text-pink-300" />
                  <span className="text-xs font-semibold text-pink-400">
                    PHOTO_{i + 1}
                  </span>
                </div>
              )}
              {/* Tape decoration */}
              <div
                className="absolute -top-1 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-2 opacity-70"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, var(--pink-200) 0px, var(--pink-200) 6px, var(--pink-100) 6px, var(--pink-100) 12px)',
                }}
              />
              {/* Caption */}
              <p className="mt-1.5 text-center font-hand text-sm text-gray-500">
                {photo.caption}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePhoto}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm rounded-2xl bg-white p-4 shadow-2xl"
            >
              <button
                onClick={closePhoto}
                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-400 text-white shadow-lg"
                aria-label="Close"
              >
                <X size={16} />
              </button>
              {content.photos[selected].src ? (
                <img
                  src={content.photos[selected].src}
                  alt={content.photos[selected].caption}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg bg-pink-50">
                  <ImageIcon size={48} className="mb-3 text-pink-300" />
                  <span className="text-sm font-semibold text-pink-400">
                    PHOTO_{selected + 1}
                  </span>
                  <span className="mt-1 text-xs text-gray-400">
                    Replace this with your photo
                  </span>
                </div>
              )}
              <p className="mt-3 text-center font-hand text-xl text-pink-500">
                {content.photos[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
