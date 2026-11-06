import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Search, Award, Briefcase, ChevronRight, CheckCircle2, Globe, Users } from 'lucide-react';
import { companyInfo } from '../../data/companyData';

interface HeroSectionProps {
  onOpenQuote?: () => void;
}

export default function HeroSection({ onOpenQuote }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/jobs');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-16 bg-[#060D1A]">
      {/* Dynamic Animated Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Cyber Grid Pattern Overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Top Pill Badge with Live Radar Pulse */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300 shadow-inner backdrop-blur-md hover:border-cyan-400/50 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Where Innovation Meets Excellence</span>
              <span className="text-slate-500">•</span>
              <span className="text-[11px] text-slate-400 font-normal">USA • Germany • India</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading">
              Empowering Innovation, <br />
              <span className="text-gradient">Elevating Success.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Transforming enterprise ideas into impactful digital reality. We are a premier IT consulting and mobile application development firm delivering tailored software, cloud architecture, and high-performance engineering squads to Fortune 500s and ambitious enterprises worldwide.
            </p>

            {/* Integrated JobAway-Style Live Search Bar */}
            <div className="pt-1">
              <form
                onSubmit={handleSearch}
                className="p-2 rounded-2xl bg-[#0B1528]/90 border border-blue-500/30 hover:border-cyan-400/50 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-2 max-w-xl transition-all duration-300"
              >
                <div className="relative flex-1 w-full flex items-center pl-3">
                  <Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search IT jobs (e.g., QA, Cloud, Dynamics 365, Java)..."
                    className="w-full py-2 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-wow w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Careers</span>
                </button>
              </form>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2.5 pl-1">
                <span className="text-slate-500">Popular:</span>
                {['QA / Performance', 'Dynamics 365', 'Full-Stack Developer', 'Cloud Architect'].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => navigate(`/jobs?q=${encodeURIComponent(kw)}`)}
                    className="hover:text-cyan-400 underline decoration-slate-600 hover:decoration-cyan-400 underline-offset-4 transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons with WOW Effects */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuote}
                className="btn-wow px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/40 flex items-center space-x-2 hover:-translate-y-0.5"
              >
                <span>Request Project Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/services')}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-white font-semibold text-sm transition-all flex items-center space-x-2 hover:-translate-y-0.5"
              >
                <span>Explore Capabilities</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Proof Badges - Upgraded to Glass Cards */}
            <div className="pt-4 grid grid-cols-3 gap-3.5 max-w-xl">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 text-xs mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Track Record</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">100%</div>
                <div className="text-[11px] text-slate-400 truncate">Referenceable</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 text-xs mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Scale</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">350+</div>
                <div className="text-[11px] text-slate-400 truncate">Projects Done</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
                <div className="flex items-center space-x-1.5 text-cyan-400 text-xs mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Reach</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">5 Hubs</div>
                <div className="text-[11px] text-slate-400 truncate">US • DE • IN</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase with Banner & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Animated Rotating Gradient Glow Frame */}
              <div className="border-glow-wrapper shadow-2xl">
                <div className="rounded-[22px] overflow-hidden bg-[#0A1222] border border-slate-800/90">
                  <img
                    src="/assets/BANNER.png"
                    alt="GOKATECH Enterprise Solutions"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="p-6 bg-gradient-to-t from-[#091120] to-[#0A1222]/80 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-semibold text-white">Enterprise Engineering Pods</span>
                      <span className="text-emerald-400 flex items-center space-x-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active 24/7 Delivery</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "Our team is always behind your success." Agile squads delivering high performance, reduced IT overhead, and rock-solid configuration integrity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Texas Award Badge with Glow */}
              <div className="absolute -top-6 -left-6 sm:-left-8 bg-[#0D1B2E]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 animate-float max-w-[240px] hover:scale-105 transition-transform duration-300">
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 flex-shrink-0 shadow-inner">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-300">Best IT Consulting</div>
                  <div className="text-[10px] text-slate-400">Award Winner (Plano, TX)</div>
                </div>
              </div>

              {/* Floating Badge 2: Careers Hiring Pill with Glow */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#0D1B2E]/95 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-3.5 shadow-2xl flex items-center space-x-3 animate-float-delayed max-w-[250px] hover:scale-105 transition-transform duration-300">
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 flex-shrink-0 shadow-inner">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">We're Hiring Engineers!</div>
                  <div className="text-[10px] text-cyan-300">QA, Cloud, Dynamics 365</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
