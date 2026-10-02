import { useState, useEffect } from 'react';
import { Home, Camera, Mail, Heart } from 'lucide-react';
import { playSoftClick } from '@/lib/sound';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'memories', label: 'Memories', icon: Camera },
  { id: 'letter', label: 'Letter', icon: Mail },
  { id: 'us', label: 'Us', icon: Heart },
];

export default function FloatingNav() {
  const [activeId, setActiveId] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    playSoftClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-pink-200 bg-white/90 px-2 py-2 shadow-card backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-pink-100 text-pink-600'
                  : 'text-gray-400 hover:bg-pink-50 hover:text-pink-400'
              }`}
              aria-label={item.label}
            >
              <Icon size={16} strokeWidth={2.5} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
