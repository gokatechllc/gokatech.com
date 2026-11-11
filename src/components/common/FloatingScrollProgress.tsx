import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function FloatingScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(Math.round(progress));

      if (currentScroll > 240) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 transform ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-slate-100 text-blue-600 hover:text-[#102039] border border-blue-600/30 hover:border-blue-600 shadow-xl shadow-blue-50/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
        title={`Scroll to top (${scrollProgress}%)`}
        aria-label="Scroll back to top"
      >
        {/* Glowing circular SVG progress ring */}
        <svg className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="currentColor"
            strokeWidth="2.5"
            fill="transparent"
            className="text-slate-800/80"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="url(#gradient-ring)"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />
          <defs>
            <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#007BFF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow Icon with Hover Bounce */}
        <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />

        {/* Ambient Ring Glow */}
        <div className="absolute inset-0 rounded-full bg-blue-600/10 blur-sm pointer-events-none group-hover:bg-blue-600/25 transition-all" />
      </button>
    </div>
  );
}

