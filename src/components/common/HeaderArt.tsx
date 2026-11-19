/**
 * On-brand decorative header illustrations (inline SVG, brand-blue palette).
 * Used to fill the empty right side of left-aligned page headers.
 * Purely decorative — marked aria-hidden by the wrapper.
 */
import React from 'react';

type ArtProps = { className?: string };

const WRAP = 'w-full h-auto select-none pointer-events-none';

/** Shared soft background glow + card used by every illustration. */
const Defs = () => (
  <defs>
    <linearGradient id="ha-blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor="#3396ff" />
      <stop offset="1" stopColor="#0056B3" />
    </linearGradient>
    <linearGradient id="ha-soft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="1" stopColor="#eaf2fb" />
    </linearGradient>
  </defs>
);

/* ------------------------------------------------------------------ */
/* Contact — global offices / network                                  */
/* ------------------------------------------------------------------ */
export const ContactArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="300" cy="200" r="150" fill="#007BFF" opacity="0.06" />
    {/* globe */}
    <circle cx="300" cy="200" r="118" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    <ellipse cx="300" cy="200" rx="118" ry="44" stroke="#99cbff" strokeWidth="1.5" opacity="0.8" />
    <ellipse cx="300" cy="200" rx="80" ry="118" stroke="#99cbff" strokeWidth="1.5" opacity="0.8" />
    <ellipse cx="300" cy="200" rx="38" ry="118" stroke="#99cbff" strokeWidth="1.2" opacity="0.6" />
    <line x1="182" y1="200" x2="418" y2="200" stroke="#99cbff" strokeWidth="1.5" opacity="0.8" />
    {/* connection arcs */}
    <path d="M220 130 Q300 60 392 150" stroke="#007BFF" strokeWidth="2" strokeDasharray="4 6" opacity="0.7" />
    <path d="M210 270 Q320 350 400 258" stroke="#007BFF" strokeWidth="2" strokeDasharray="4 6" opacity="0.7" />
    {/* location pins */}
    {[
      { x: 220, y: 130 }, { x: 392, y: 150 }, { x: 210, y: 270 }, { x: 400, y: 258 },
    ].map((p, i) => (
      <g key={i}>
        <path d={`M${p.x} ${p.y - 26} a16 16 0 1 1 0 0.1 Z`} fill="url(#ha-blue)" />
        <path d={`M${p.x} ${p.y + 4} l-11 -16 a14 14 0 1 1 22 0 Z`} fill="url(#ha-blue)" />
        <circle cx={p.x} cy={p.y - 12} r="5" fill="#ffffff" />
      </g>
    ))}
    {/* floating message chip */}
    <g>
      <rect x="360" y="70" width="110" height="44" rx="12" fill="#ffffff" stroke="#cce5ff" strokeWidth="1.5" />
      <circle cx="384" cy="92" r="10" fill="#007BFF" opacity="0.15" />
      <path d="M380 92 l3 3 6 -7" stroke="#007BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="402" y="85" width="56" height="5" rx="2.5" fill="#99cbff" />
      <rect x="402" y="96" width="38" height="5" rx="2.5" fill="#cce5ff" />
    </g>
    <circle cx="150" cy="300" r="7" fill="#FC9D04" />
    <circle cx="455" cy="330" r="5" fill="#007BFF" opacity="0.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Services — layered capability cards                                 */
/* ------------------------------------------------------------------ */
export const ServicesArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="270" cy="200" r="150" fill="#007BFF" opacity="0.06" />
    {/* stacked layers */}
    <rect x="150" y="250" width="240" height="60" rx="16" fill="#cce5ff" opacity="0.7" />
    <rect x="135" y="190" width="270" height="64" rx="16" fill="#99cbff" opacity="0.85" />
    <rect x="120" y="120" width="300" height="78" rx="18" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    {/* top card content: icon tiles */}
    {[0, 1, 2, 3].map((i) => (
      <g key={i} transform={`translate(${142 + i * 66}, 142)`}>
        <rect width="46" height="34" rx="9" fill="#007BFF" opacity={0.12 + i * 0.04} />
        <circle cx="14" cy="17" r="5" fill="#007BFF" />
        <rect x="24" y="12" width="16" height="4" rx="2" fill="#0056B3" opacity="0.6" />
        <rect x="24" y="20" width="12" height="4" rx="2" fill="#66b0ff" />
      </g>
    ))}
    {/* floating chips */}
    <g>
      <rect x="350" y="70" width="104" height="40" rx="12" fill="#ffffff" stroke="#cce5ff" strokeWidth="1.5" />
      <circle cx="372" cy="90" r="9" fill="#FC9D04" opacity="0.2" />
      <path d="M368 90 l3 3 5 -6" stroke="#FC9D04" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="388" y="84" width="52" height="5" rx="2.5" fill="#99cbff" />
      <rect x="388" y="95" width="34" height="5" rx="2.5" fill="#cce5ff" />
    </g>
    <circle cx="110" cy="320" r="7" fill="#FC9D04" />
    <circle cx="430" cy="300" r="6" fill="#007BFF" opacity="0.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Partners — connected network / alliance                             */
/* ------------------------------------------------------------------ */
export const PartnersArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="280" cy="200" r="150" fill="#007BFF" opacity="0.06" />
    {/* links */}
    {[
      ['280,200', '150,120'], ['280,200', '420,120'], ['280,200', '150,300'],
      ['280,200', '430,290'], ['150,120', '420,120'], ['150,300', '430,290'],
    ].map((l, i) => {
      const [a, b] = l;
      const [x1, y1] = a.split(',');
      const [x2, y2] = b.split(',');
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#99cbff" strokeWidth="2" strokeDasharray="3 6" />;
    })}
    {/* outer nodes */}
    {[
      { x: 150, y: 120 }, { x: 420, y: 120 }, { x: 150, y: 300 }, { x: 430, y: 290 },
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="30" fill="#ffffff" stroke="#cce5ff" strokeWidth="2" />
        <circle cx={p.x} cy={p.y - 6} r="9" fill="#66b0ff" />
        <path d={`M${p.x - 14} ${p.y + 18} a14 10 0 0 1 28 0 Z`} fill="#cce5ff" />
      </g>
    ))}
    {/* center hub */}
    <circle cx="280" cy="200" r="44" fill="url(#ha-blue)" />
    <path d="M264 200 l10 10 20 -22" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="470" cy="340" r="6" fill="#FC9D04" />
    <circle cx="110" cy="210" r="7" fill="#FC9D04" opacity="0.9" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Jobs — careers / search                                             */
/* ------------------------------------------------------------------ */
export const JobsArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="280" cy="200" r="150" fill="#007BFF" opacity="0.06" />
    {/* briefcase */}
    <rect x="175" y="170" width="230" height="140" rx="20" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    <rect x="175" y="170" width="230" height="40" rx="20" fill="#99cbff" opacity="0.6" />
    <path d="M250 170 v-18 a14 14 0 0 1 14 -14 h52 a14 14 0 0 1 14 14 v18" stroke="#007BFF" strokeWidth="4" fill="none" />
    <rect x="262" y="226" width="56" height="20" rx="6" fill="#007BFF" opacity="0.18" />
    {/* role chips */}
    <rect x="195" y="266" width="90" height="12" rx="6" fill="#cce5ff" />
    <rect x="300" y="266" width="86" height="12" rx="6" fill="#cce5ff" />
    {/* search magnifier */}
    <g>
      <circle cx="370" cy="130" r="34" fill="#ffffff" stroke="#007BFF" strokeWidth="5" />
      <line x1="394" y1="154" x2="420" y2="180" stroke="#0056B3" strokeWidth="7" strokeLinecap="round" />
      <path d="M356 130 l9 9 18 -20" stroke="#007BFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <circle cx="130" cy="140" r="7" fill="#FC9D04" />
    <circle cx="150" cy="320" r="6" fill="#007BFF" opacity="0.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Employers — team / staffing                                         */
/* ------------------------------------------------------------------ */
export const EmployersArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="280" cy="200" r="150" fill="#007BFF" opacity="0.06" />
    {/* panel */}
    <rect x="150" y="130" width="280" height="160" rx="20" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    {/* team avatars row */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${186 + i * 58}, 180)`}>
        <circle cx="0" cy="0" r="24" fill="#ffffff" stroke="#cce5ff" strokeWidth="2" />
        <circle cx="0" cy="-6" r="8" fill={i === 1 ? '#007BFF' : '#66b0ff'} />
        <path d="M-13 15 a13 9 0 0 1 26 0 Z" fill="#cce5ff" />
      </g>
    ))}
    {/* add / staffing badge */}
    <g transform="translate(360, 172)">
      <circle cx="0" cy="0" r="22" fill="url(#ha-blue)" />
      <line x1="-9" y1="0" x2="9" y2="0" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="-9" x2="0" y2="9" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </g>
    {/* progress lines */}
    <rect x="186" y="236" width="208" height="10" rx="5" fill="#eaf2fb" />
    <rect x="186" y="236" width="128" height="10" rx="5" fill="#007BFF" opacity="0.8" />
    <rect x="186" y="256" width="150" height="8" rx="4" fill="#cce5ff" />
    <circle cx="120" cy="300" r="7" fill="#FC9D04" />
    <circle cx="450" cy="120" r="6" fill="#007BFF" opacity="0.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* About — company / growth / recognition                              */
/* ------------------------------------------------------------------ */
export const AboutArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 400" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <Defs />
    <circle cx="275" cy="205" r="150" fill="#007BFF" opacity="0.06" />
    {/* ground line */}
    <line x1="120" y1="312" x2="430" y2="312" stroke="#cce5ff" strokeWidth="2" />
    {/* buildings */}
    <rect x="150" y="196" width="78" height="116" rx="10" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    <rect x="236" y="150" width="88" height="162" rx="10" fill="#ffffff" stroke="#99cbff" strokeWidth="2" />
    <rect x="332" y="224" width="70" height="88" rx="10" fill="url(#ha-soft)" stroke="#cce5ff" strokeWidth="2" />
    {/* windows on tall building */}
    {[0,1,2,3].map((r)=>[0,1,2].map((c)=>(
      <rect key={`${r}-${c}`} x={250 + c*24} y={168 + r*30} width="14" height="16" rx="3" fill="#66b0ff" opacity={0.5 + ((r+c)%2)*0.35} />
    )))}
    {/* windows small buildings */}
    {[0,1,2].map((r)=>(
      <rect key={`l${r}`} x="166" y={212 + r*28} width="46" height="12" rx="3" fill="#cce5ff" />
    ))}
    {[0,1].map((r)=>(
      <rect key={`r${r}`} x="346" y={240 + r*26} width="42" height="12" rx="3" fill="#cce5ff" />
    ))}
    {/* growth arrow */}
    <path d="M150 150 L205 118 L255 132 L330 78" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 7" opacity="0.7" />
    <path d="M330 78 l-20 2 m20 -2 l-4 20" stroke="#007BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    {/* award badge */}
    <g transform="translate(378, 118)">
      <circle cx="0" cy="0" r="26" fill="url(#ha-blue)" />
      <path d="M0 -12 l3.3 7 7.7 .6 -5.9 5 1.9 7.5 -7 -4 -7 4 1.9 -7.5 -5.9 -5 7.7 -.6 Z" fill="#ffffff" />
    </g>
    <circle cx="110" cy="130" r="7" fill="#FC9D04" />
    <circle cx="430" cy="340" r="6" fill="#007BFF" opacity="0.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Hero — glass analytics dashboard (tuned for the DARK video hero)    */
/* ------------------------------------------------------------------ */
export const HeroArt: React.FC<ArtProps> = ({ className = '' }) => (
  <svg viewBox="0 0 520 440" className={`${WRAP} ${className}`} role="img" aria-hidden="true" fill="none">
    <defs>
      <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#66b0ff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#66b0ff" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hero-bar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#99cbff" />
        <stop offset="1" stopColor="#007BFF" />
      </linearGradient>
    </defs>

    {/* ambient ring */}
    <circle cx="270" cy="220" r="170" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1.5" />
    <circle cx="270" cy="220" r="130" stroke="#66b0ff" strokeOpacity="0.15" strokeWidth="1.5" strokeDasharray="2 8" />

    {/* main glass dashboard panel */}
    <rect x="96" y="96" width="348" height="248" rx="22" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" />
    {/* window dots */}
    <circle cx="124" cy="124" r="5" fill="#66b0ff" />
    <circle cx="142" cy="124" r="5" fill="#ffffff" fillOpacity="0.4" />
    <circle cx="160" cy="124" r="5" fill="#ffffff" fillOpacity="0.25" />
    <rect x="360" y="118" width="60" height="12" rx="6" fill="#ffffff" fillOpacity="0.12" />

    {/* area/line chart */}
    <path d="M124 250 L168 222 L212 236 L256 194 L300 210 L344 168 L344 300 L124 300 Z" fill="url(#hero-area)" />
    <path d="M124 250 L168 222 L212 236 L256 194 L300 210 L344 168" stroke="#99cbff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {[['124','250'],['168','222'],['212','236'],['256','194'],['300','210'],['344','168']].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r="4" fill="#ffffff" />
    ))}

    {/* mini bars */}
    {[0,1,2,3,4].map((i)=>(
      <rect key={i} x={124 + i*44} y={318 - (i%3)*10} width="26" height={14 + (i%3)*10} rx="5" fill="url(#hero-bar)" opacity="0.9" />
    ))}

    {/* side stat rail */}
    <rect x="360" y="150" width="60" height="150" rx="12" fill="#ffffff" fillOpacity="0.06" />
    <circle cx="390" cy="188" r="20" stroke="#66b0ff" strokeWidth="5" fill="none" strokeOpacity="0.4" />
    <path d="M390 168 a20 20 0 0 1 17 30" stroke="#66b0ff" strokeWidth="5" strokeLinecap="round" fill="none" />
    <rect x="372" y="224" width="36" height="6" rx="3" fill="#ffffff" fillOpacity="0.4" />
    <rect x="372" y="238" width="24" height="6" rx="3" fill="#ffffff" fillOpacity="0.25" />
    <rect x="372" y="262" width="36" height="6" rx="3" fill="#ffffff" fillOpacity="0.4" />
    <rect x="372" y="276" width="28" height="6" rx="3" fill="#ffffff" fillOpacity="0.25" />

    {/* floating accents */}
    <circle cx="70" cy="150" r="6" fill="#FC9D04" />
    <circle cx="470" cy="360" r="5" fill="#66b0ff" />
    <circle cx="80" cy="330" r="4" fill="#ffffff" fillOpacity="0.5" />
  </svg>
);

export default { ContactArt, ServicesArt, PartnersArt, JobsArt, EmployersArt, AboutArt, HeroArt };
