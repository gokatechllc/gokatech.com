import { Quote, Star, Sparkles } from 'lucide-react';
import { companyInfo } from '../../data/companyData';

export default function Testimonials() {
  return (
    <section className="py-10 sm:py-14 bg-[#070F1E] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            What Enterprise Leaders Say <br />
            <span className="text-gradient">About Working with GOKATECH</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Our commitment to excellence has earned recognition from global technology vendors, industry authorities, and 100% referenceable enterprise partners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {companyInfo.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-[#0C1527] border border-slate-800 p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-500/20" />
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center space-x-3.5">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-cyan-400/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">{item.author}</h4>
                  <p className="text-xs text-cyan-400 font-medium">{item.role}</p>
                  <p className="text-[11px] text-slate-400">{item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

