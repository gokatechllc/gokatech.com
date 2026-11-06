import { useState } from 'react';
import { ShieldCheck, Building2, ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { partnersData, Partner } from '../data/partnersData';
import { Link } from 'react-router-dom';

interface PartnersPageProps {
  onOpenQuote?: () => void;
}

export default function PartnersPage({ onOpenQuote }: PartnersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Enterprise Client', 'Strategic Partner', 'Staffing Network'];

  const filteredPartners = selectedCategory === 'All'
    ? partnersData
    : partnersData.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#060D1A] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Associates & Strategic Alliances</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Our Partners & <br />
            <span className="text-gradient">Enterprise Associates</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From Fortune 500 financial and healthcare institutions to global technology vendors and premier staffing alliances, we cultivate 100% referenceable partnerships built on trust, engineering rigor, and measurable outcomes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat === 'All' ? 'All Partners & Clients' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
          {filteredPartners.map((partner: Partner, idx: number) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#0C1527] border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between group"
            >
              <div>
                {/* Logo & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-16 w-36 px-4 py-2 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-10 max-w-[120px] object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-xs font-bold text-slate-800">${partner.name}</span>`;
                        }
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/60">
                    {partner.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1 font-heading">
                  {partner.name}
                </h3>
                <span className="text-xs text-cyan-400 font-medium block mb-3">
                  {partner.industry}
                </span>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Engagement</span>
                </span>
                <span className="text-[11px]">100% Referenceable</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/20 p-6 sm:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white font-heading">
              Interested in joining our partner or vendor network?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We collaborate with premier technology solution providers, cloud platforms, and staffing vendors.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-500/25 flex-shrink-0"
          >
            Initiate Partnership Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}
