import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const EMOJIS = ['♡', '💕', '✨', '♡', '🌟', '♡'];

export default function FloatingHearts({ count = 8 }: { count?: number }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const generated: FloatingHeart[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 18,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 6,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            animation: `floatHeart ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
            color: 'var(--pink-300)',
            opacity: 0,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
