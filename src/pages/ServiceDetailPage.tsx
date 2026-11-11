import { useParams, Link, useNavigate } from 'react-router-dom';
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
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Send 
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
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

export default function ServiceDetailPage() {
  const { openQuote } = useQuote();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = servicesData.find((s) => s.slug === slug) || servicesData[0];
  const IconComponent = iconMap[service.icon] || Briefcase;

  const relatedServices = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#F7F9FC] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-5">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Capabilities</span>
          </Link>
        </div>

        {/* Hero Banner for this Capability */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F3F6FB] via-[#FFFFFF] to-[#FFFFFF] border border-blue-500/20 p-6 sm:p-10 mb-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-600">
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                {service.category} Tier Capability
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102039] tracking-tight font-heading leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
              {service.fullDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openQuote(service.title)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Request Project Proposal</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <Link
                to="/partners"
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-[#102039] font-semibold text-xs transition-colors"
              >
                View Client Case References
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Main Left Column: Features & Case Study */}
          <div className="lg:col-span-8 space-y-12">
            {/* Core Architectural Features */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-6">
              <h2 className="text-2xl font-bold text-[#102039] font-heading">
                Key Deliverables & Architectural Focus
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/60 border border-slate-200/80">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Impact Case Highlight */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-[#EAF2FB] to-[#F2F7FD] border border-blue-100 space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enterprise Case Study Highlight</span>
              </div>
              <h3 className="text-xl font-bold text-[#102039] font-heading">
                Measurable Impact & Client ROI
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                "{service.caseStudyHighlight}"
              </p>
            </div>

            {/* Standard Deliverables Checklist */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-[#102039] font-heading">
                Standard Engagement Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-3 rounded-lg bg-white/40 border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Tech Stack & Inquire Box */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Box */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#102039] font-heading">
                Technology Stack Utilized
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Instant Inquire Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#EAF2FB] to-[#F2F7FD] border border-blue-100 text-center space-y-4">
              <h3 className="text-lg font-bold text-[#102039] font-heading">
                Need {service.title}?
              </h3>
              <p className="text-xs text-slate-700">
                Our team in Frisco, Texas will formulate a tailored architectural roadmap and cost estimate.
              </p>
              <button
                onClick={() => openQuote(service.title)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25"
              >
                Inquire About This Service
              </button>
            </div>
          </div>
        </div>

        {/* Related Capabilities */}
        <div>
          <h3 className="text-xl font-bold text-[#102039] font-heading mb-6">
            Explore Related Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.id}
                to={`/services/${rel.slug}`}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-slate-200 hover:border-blue-500/30 transition-all hover:shadow-xl group"
              >
                <span className="text-[10px] font-semibold uppercase text-blue-600 block mb-1">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-[#102039] group-hover:text-blue-600 transition-colors mb-2 font-heading">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {rel.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
