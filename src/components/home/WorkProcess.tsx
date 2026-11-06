import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../../data/companyData';

export default function WorkProcess() {
  return (
    <section className="py-10 sm:py-14 bg-[#060D1A] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Delivery Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            How We Execute <br />
            <span className="text-gradient">From Concept to Global Scale</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A user-centric, business-driven engineering process that eliminates deployment risks, enforces strict baseline configuration control, and maximizes client ROI.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companyInfo.processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="relative rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-cyan-400/50 p-7 transition-all duration-400 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-2 group flex flex-col justify-between overflow-hidden"
            >
              {/* Glowing Top Accent Beam on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-slate-700 group-hover:text-cyan-400/80 transition-colors font-heading">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xs font-bold text-cyan-400">
                    ✓
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors font-heading">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress connector indicator */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Phase 0{idx + 1} of 04</span>
                <span className="text-cyan-500 font-semibold group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Assurance Banner */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-[#091122] border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Product Configuration & Installation Guarantee
            </div>
            <h4 className="text-lg font-bold text-white">
              Standardized Rollouts Across All Target Environments
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We roll out identical operational baselines to remote client headquarters and branch facilities, providing clear setup documentation, hands-on user guidance, and 24/7 post-deployment monitoring.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="/services/product-configuration"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors inline-block"
            >
              Learn About Change Control
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

