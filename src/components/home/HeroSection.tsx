import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Search, Award, Briefcase, ChevronRight, CheckCircle2, Globe } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { openQuote } = useQuote();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24">
      {/* Background hero video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/BANNER.png"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      {/* Navy -> brand-blue gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1730]/95 via-[#0A1730]/85 to-[#0056B3]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-[#0A1730]/30 pointer-events-none" />

      {/* Subtle animated accent glows */}
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-[#007BFF]/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-[#007BFF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-7 space-y-7">

            {/* Top Pill Badge with Live Radar Pulse */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/25 text-xs font-semibold text-cyan-200 shadow-inner backdrop-blur-md hover:border-white/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Where Innovation Meets Excellence</span>
              <span className="text-white/40">•</span>
              <span className="text-[11px] text-white/70 font-normal">USA • Germany • India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
              Empowering Innovation, <br />
              <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">Elevating Success.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
              Transforming enterprise ideas into impactful digital reality. We are a premier IT consulting and mobile application development firm delivering tailored software, cloud architecture, and high-performance engineering squads to Fortune 500s and ambitious enterprises worldwide.
            </p>

            {/* Integrated Live Search Bar */}
            <div className="pt-1">
              <form
                onSubmit={handleSearch}
                className="p-2 rounded-2xl bg-white/12 border border-white/25 hover:border-white/40 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-2 max-w-xl transition-all duration-300"
              >
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <Search className="w-5 h-5 text-white/70 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search IT jobs (e.g., QA, Cloud, Dynamics 365, Java)..."
                    className="w-full py-2 bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-wow w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#0056B3] hover:from-[#0069D9] hover:to-[#004a99] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Careers</span>
                </button>
              </form>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 mt-2.5 pl-1">
                <span className="text-white/50">Popular:</span>
                {['QA / Performance', 'Dynamics 365', 'Full-Stack Developer', 'Cloud Architect'].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => navigate(`/jobs?q=${encodeURIComponent(kw)}`)}
                    className="hover:text-cyan-300 underline decoration-white/30 hover:decoration-cyan-300 underline-offset-4 transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openQuote()}
                className="btn-wow px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#0056B3] hover:from-[#0069D9] hover:to-[#004a99] text-white font-semibold text-sm transition-all shadow-xl shadow-[#007BFF]/30 flex items-center space-x-2 hover:-translate-y-0.5"
              >
                <span>Request Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold text-sm transition-all flex items-center space-x-2 hover:-translate-y-0.5 backdrop-blur-md"
              >
                <span>Explore Capabilities</span>
                <ChevronRight className="w-4 h-4 text-cyan-300" />
              </button>
            </div>

            {/* Quick Proof Badges - Glass Cards */}
            <div className="pt-4 grid grid-cols-3 gap-3.5 max-w-xl">
              <div className="p-3 rounded-xl bg-white/10 border border-white/20 hover:border-cyan-300/40 transition-all hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-cyan-300 text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Track Record</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">100%</div>
                <div className="text-[11px] text-white/70 truncate">Referenceable</div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/20 hover:border-cyan-300/40 transition-all hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-cyan-300 text-xs mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Scale</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">350+</div>
                <div className="text-[11px] text-white/70 truncate">Projects Done</div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/20 hover:border-cyan-300/40 transition-all hover:-translate-y-1 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-cyan-300 text-xs mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">Reach</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-300">5 Hubs</div>
                <div className="text-[11px] text-white/70 truncate">US • DE • IN</div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Accolade Badges */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative mx-auto max-w-md lg:max-w-none h-full min-h-[340px]">

              {/* Floating Badge 1: Award */}
              <div className="absolute top-6 right-2 bg-white/95 backdrop-blur-md border border-amber-300/60 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 animate-float max-w-[250px]">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-orange-500 flex-shrink-0 shadow-inner">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102039]">Best IT Consulting</div>
                  <div className="text-[10px] text-slate-500">Award Winner (Plano, TX)</div>
                </div>
              </div>

              {/* Floating Badge 2: Hiring */}
              <div className="absolute bottom-10 right-16 bg-white/95 backdrop-blur-md border border-[#007BFF]/40 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 animate-float-delayed max-w-[250px]">
                <div className="p-2.5 rounded-xl bg-[#007BFF]/15 text-[#007BFF] flex-shrink-0 shadow-inner">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102039]">We're Hiring Engineers!</div>
                  <div className="text-[10px] text-[#0069D9]">QA, Cloud, Dynamics 365</div>
                </div>
              </div>

              {/* Live delivery pill */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-emerald-300/60 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 animate-float-reverse max-w-[240px]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#102039]">Active 24/7 Delivery</div>
                  <div className="text-[10px] text-slate-500">Global Engineering Pods</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
