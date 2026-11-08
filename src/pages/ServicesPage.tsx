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
  Search,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { servicesData, ServiceItem } from '../data/servicesData';
import { useQuote } from '../context/QuoteContext';

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

export default function ServicesPage() {
  const { openQuote } = useQuote();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Enterprise', 'Engineering', 'Intelligence', 'Infrastructure'];

  const filteredServices = servicesData.filter((svc) => {
    const matchesCategory = selectedCategory === 'All' || svc.category === selectedCategory;
    const matchesQuery = 
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#060D1A] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Enterprise Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Capabilities & <br />
            <span className="text-gradient">Technology Services</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            We architect, develop, configure, and maintain robust business solutions across financial services, healthcare, retail, semiconductor, and logistics verticals.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-xl mb-12 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capability or technology (e.g. SAP, AI, Cloud)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc: ServiceItem) => {
            const IconComponent = iconMap[svc.icon] || Briefcase;

            return (
              <div
                key={svc.id}
                className="group relative rounded-2xl bg-[#0C1527] border border-slate-800 hover:border-blue-500/40 p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
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

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {svc.shortDesc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {svc.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {svc.technologies.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        {tech}
                      </span>
                    ))}
                    {svc.technologies.length > 4 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-500">
                        +{svc.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Link & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center space-x-1 transition-colors"
                  >
                    <span>Architecture Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => openQuote(svc.title)}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">No matching capabilities found</h3>
            <p className="text-xs text-slate-400 mb-4">
              Try searching with another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-xs text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Configuration Callout */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900/80 border border-blue-500/20 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Enterprise Product Configuration & Rollout Standards
              </span>
              <h3 className="text-2xl font-bold text-white font-heading">
                Ensuring Regulated & Structured Change Control Procedures
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                By implementing rigorous procedures such as Configuration Identifiers, Baselines, Change Control boards, Configuration Reviews, and Status Reports, we optimize the software development lifecycle, minimize rollout friction, and protect operational continuity for your stakeholders.
              </p>
            </div>
            <div className="md:col-span-4 text-md-right flex justify-start md:justify-end">
              <button
                onClick={() => openQuote('Product Configuration & Implementation')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-500/25"
              >
                Schedule Implementation Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
