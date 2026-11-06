import { useEffect, useState } from 'react';

export default function GlobalSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Only activate spotlight on devices with fine pointer (mouse/trackpad)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setOpacity(1);
      });
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Primary Cyan-Blue Cursor Spotlight */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-[90px] transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.09) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)',
        }}
      />

      {/* Secondary Inner Bright Core */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-[40px] transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 80%)',
        }}
      />
    </div>
  );
}

