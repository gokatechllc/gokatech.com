import { Sparkles, ArrowRight, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CtaBannerProps {
  onOpenQuote?: () => void;
}

export default function CtaBanner({ onOpenQuote }: CtaBannerProps) {
  return (
    <section className="py-10 sm:py-12 bg-[#060D1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-[#0A1832] border border-blue-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner With an Industry Leader</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Ready to Accelerate Your Enterprise Digital Transformation?
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Connect with GOKATECH’s solutions architects to analyze your technology baselines, explore custom software engineering, or assemble dedicated engineering squads.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/20 flex items-center space-x-2"
              >
                <span>Request Project Proposal</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Contact Headquarters</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NDA & Confidentiality Assured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Architectural Discovery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Referenceable Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

