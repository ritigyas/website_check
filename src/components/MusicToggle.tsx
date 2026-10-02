import { useState, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';
import {
  setMuted,
  startMusic,
  stopMusic,
  isMusicPlaying,
  playSoftClick,
} from '@/lib/sound';

export default function MusicToggle() {
  const [musicOn, setMusicOn] = useState(false);

  const toggle = () => {
    playSoftClick();
    if (musicOn) {
      stopMusic();
      setMuted(true);
      setMusicOn(false);
    } else {
      setMuted(false);
      startMusic();
      setMusicOn(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-pink-200 bg-white/90 shadow-soft backdrop-blur-md transition-all hover:scale-110 active:scale-95"
      aria-label={musicOn ? 'Turn music off' : 'Turn music on'}
    >
      {musicOn ? (
        <Music2 size={18} className="text-pink-500" />
      ) : (
        <Music size={18} className="text-gray-400" />
      )}
      {musicOn && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-400" />
      )}
    </button>
  );
}
