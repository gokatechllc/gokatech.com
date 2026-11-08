import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Smartphone, 
  BrainCircuit, 
  Cloud, 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  Settings2, 
  Cpu, 
  Headphones, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { servicesData, ServiceItem } from '../../data/servicesData';
import { useQuote } from '../../context/QuoteContext';

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Smartphone,
  BrainCircuit,
  Cloud,
  BarChart3,
  ShieldCheck,
  Globe,
  Settings2,
  Cpu,
  Headphones
};

export default function ServicesGrid() {
  const { openQuote } = useQuote();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Enterprise', 'Engineering', 'Intelligence', 'Infrastructure'];

  const filteredServices = selectedCategory === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <section className="py-10 sm:py-14 bg-[#070F1E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Technology Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Transformative Capabilities <br />
            <span className="text-gradient">Engineered for Enterprise Impact</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From custom business ERP applications and cloud infrastructure to cutting-edge AI and mobile apps, our solutions enhance agility, optimize IT expenditure, and build sustainable competitive advantage.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
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
                {cat} {cat === 'All' ? `(${servicesData.length})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc: ServiceItem) => {
            const IconComponent = iconMap[svc.icon] || Briefcase;

            return (
              <div
                key={svc.id}
                className="group relative rounded-2xl bg-[#0C1527] border border-slate-800 hover:border-cyan-400/60 p-7 transition-all duration-400 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
              >
                {/* Glowing Top Accent Beam on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div>
                  {/* Top Icon & Category */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 p-3.5 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
                      {svc.category}
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/services/${svc.slug}`}>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 font-heading">
                      {svc.title}
                    </h3>
                  </Link>

                  {/* Short Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {svc.shortDesc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {svc.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Link & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center space-x-1 transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => openQuote(svc.title)}
                    className="text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Need a custom engineering architecture or dedicated team?</h4>
            <p className="text-xs text-slate-400">Our solution architects in Frisco, TX provide comprehensive assessments within 24 hours.</p>
          </div>
          <button
            onClick={() => openQuote()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md flex-shrink-0"
          >
            Schedule Technical Assessment
          </button>
        </div>
      </div>
    </section>
  );
}

