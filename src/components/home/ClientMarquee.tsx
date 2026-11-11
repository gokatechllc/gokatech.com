import { partnersData } from '../../data/partnersData';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientMarquee() {
  // Duplicate for seamless loop
  const marqueeItems = [...partnersData, ...partnersData];

  return (
    <section className="py-6 sm:py-8 bg-[#EEF2F9] border-y border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Trusted by Fortune 500 Leaders & Global Technology Partners</span>
          </div>
          <Link
            to="/partners"
            className="text-xs text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            View All Partners & Associates &rarr;
          </Link>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden mask-marquee">
        {/* Left and right fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#EEF2F9] via-[#EEF2F9]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#EEF2F9] via-[#EEF2F9]/90 to-transparent z-10 pointer-events-none" />

        <div className="flex space-x-6 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap py-3">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-blue-600/20 hover:border-blue-600 transition-all duration-300 h-16 min-w-[170px] group flex-shrink-0 hover:-translate-y-1"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="max-h-9 max-w-[130px] object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to text label if image can't be rendered
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xs font-bold text-slate-800">${item.name}</span>`;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

