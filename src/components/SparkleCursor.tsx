import { useEffect, useRef, useCallback } from 'react';
// (Sparkle interface and sparklesRef are kept for potential future use)
import { playSoftClick } from '@/lib/sound';

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

let sparkleId = 0;

export default function SparkleCursor() {
  const lastSpawn = useRef(0);

  const spawnSparkle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const id = sparkleId++;
    const el = document.createElement('span');
    el.textContent = '✨';
    el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      font-size: ${10 + Math.random() * 8}px;
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      transition: all 0.6s ease-out;
      transform: translate(-50%, -50%) scale(1);
    `;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.opacity = '0';
      el.style.transform = `translate(-50%, ${-30 - Math.random() * 20}px) scale(0)`;
    });

    setTimeout(() => el.remove(), 600);
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      spawnSparkle(e.clientX, e.clientY);
    };
    const handleClick = (e: MouseEvent) => {
      spawnSparkle(e.clientX, e.clientY);
      playSoftClick();
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('click', handleClick);
    };
  }, [spawnSparkle]);

  return null;
}
