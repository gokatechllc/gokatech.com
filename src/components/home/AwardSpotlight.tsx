import { Award, ShieldCheck, CheckCircle2, Trophy, Star } from 'lucide-react';
import { companyInfo } from '../../data/companyData';

export default function AwardSpotlight() {
  return (
    <section className="py-10 sm:py-14 bg-[#070F1E] border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B172F] via-[#091224] to-[#0D1E3A] border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative glowing sphere */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Award Image / Trophy Visual */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
                <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                <img
                  src={companyInfo.awards.badgeImage}
                  alt="Best City IT Consulting Services Award"
                  className="relative h-44 sm:h-52 w-auto object-contain drop-shadow-[0_15px_25px_rgba(245,158,11,0.25)]"
                  onError={(e) => {
                    // Fallback trophy icon if image doesn't render
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex items-center space-x-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Triple Crown Winner (2015, 2016, 2017)
              </span>
            </div>

            {/* Content Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-400">
                <Trophy className="w-4 h-4" />
                <span>Industry Recognition & Excellence</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
                Recognized as the Best IT Consulting Firm in Plano & North Texas
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                GOKATECH INC was honored with the prestigious <strong>"Best City IT Consulting Services" Award</strong> for three consecutive years. This recognition celebrates our unwavering commitment to delivering innovative IT solutions, exceptional service, and measurable business impact across Texas and nationwide.
              </p>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-medium">Customer-Centric Approach</strong>
                    <span className="text-slate-400">Building long-lasting relationships through personalized IT strategies.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-medium">100% Referenceable Clients</strong>
                    <span className="text-slate-400">Proven track record with Fortune 500s, startups, and mid-market leaders.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-medium">Certified Technical Talent</strong>
                    <span className="text-slate-400">A global roster of certified architects, developers, and QA engineers.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-medium">Optimized IT Costs</strong>
                    <span className="text-slate-400">Maximizing return on investment with agile sprints and lean delivery pods.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

