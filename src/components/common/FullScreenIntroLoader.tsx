import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function FullScreenIntroLoader() {
  // Always active on initial mount / page reload
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING ENTERPRISE RUNTIME...');

  useEffect(() => {
    // Lock scroll during intro loading effect
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const duration = 1600; // 1.6s smooth duration for page reload

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 30) {
        setStatusText('INITIALIZING ENTERPRISE RUNTIME...');
      } else if (rawProgress < 65) {
        setStatusText('CONNECTING GLOBAL HUBS: US • DE • IN...');
      } else if (rawProgress < 90) {
        setStatusText('CONFIGURING HIGH-VELOCITY PODS...');
      } else {
        setStatusText('SYSTEMS READY • WELCOME');
      }

      if (rawProgress >= 100) {
        clearInterval(interval);

        // Short pause at 100% then trigger exit dissolve
        setTimeout(() => {
          setExiting(true);
          document.body.style.overflow = '';

          // Remove from DOM after CSS transition finishes
          setTimeout(() => {
            setVisible(false);
          }, 650);
        }, 180);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const handleSkip = () => {
    setExiting(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setVisible(false);
    }, 350);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#EEF2F9] text-[#102039] overflow-hidden transition-all duration-700 ease-out select-none ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-live="polite"
    >
      {/* Dynamic Ambient Background Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Center Intro Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        
        {/* Animated Glowing Logo Orb */}
        <div className="relative mb-6">
          {/* Outer Pulsing Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 rounded-3xl opacity-30 blur-xl animate-pulse-glow" />

          {/* Rotating Circular SVG Track */}
          <svg className="absolute -inset-3 w-28 h-28 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="url(#intro-loader-gradient)"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray={289}
              strokeDashoffset={289 - (progress / 100) * 289}
              strokeLinecap="round"
              className="transition-all duration-75 ease-out"
            />
            <defs>
              <linearGradient id="intro-loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007BFF" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Emblem Box */}
          <div className="relative w-22 h-22 p-3.5 rounded-2xl bg-[#F3F6FB] border border-blue-600/30 shadow-2xl flex items-center justify-center backdrop-blur-md">
            <img
              src="/assets/logo.png"
              alt="GOKATECH"
              className="h-12 w-auto object-contain transform hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-1 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-[#102039]">
            GOKA<span className="text-gradient">TECH</span> <span className="text-xs text-blue-600 font-mono tracking-widest uppercase ml-1">INC</span>
          </h1>
          <p className="text-xs text-slate-600 tracking-wider font-medium">
            Where Innovation Meets Excellence
          </p>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-full max-w-[280px] space-y-2.5">
          <div className="relative w-full h-1.5 rounded-full bg-white border border-slate-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Percentage & Status Indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-600 tracking-wider truncate max-w-[200px]">
              {statusText}
            </span>
            <span className="text-blue-600 font-bold ml-2">
              {progress}%
            </span>
          </div>
        </div>

        {/* Triple Crown & Global Reach Footnote */}
        <div className="mt-8 flex items-center space-x-2 text-[10px] text-slate-500 bg-white/60 px-3.5 py-1.5 rounded-full border border-slate-200/80">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>Texas IT Consulting Award Winner • 5 Global Hubs</span>
        </div>

        {/* Quick Skip Option */}
        <button
          onClick={handleSkip}
          className="mt-6 text-[10px] text-slate-500 hover:text-slate-700 transition-colors uppercase tracking-widest font-mono"
        >
          [Skip Intro]
        </button>

      </div>
    </div>
  );
}
