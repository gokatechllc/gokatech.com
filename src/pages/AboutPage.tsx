import { Award, ShieldCheck, CheckCircle2, Globe, Users, Trophy, Sparkles, Building, ArrowRight } from 'lucide-react';
import { companyInfo } from '../data/companyData';
import { officesData } from '../data/officesData';
import { Link } from 'react-router-dom';
import { useQuote } from '../context/QuoteContext';

export default function AboutPage() {
  const { openQuote } = useQuote();
  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#F7F9FC] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs & Title */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About GOKATECH INC</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102039] tracking-tight font-heading leading-tight">
            Where Innovation <br />
            <span className="text-gradient">Meets Enterprise Excellence</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            From humble beginnings as an agile startup to an internationally recognized IT consulting leader, GOKATECH empowers Fortune 500 organizations and hyper-growth enterprises to stay ahead in an ever-evolving digital landscape.
          </p>
        </div>

        {/* Story Section with Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 sm:mb-12">
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102039] font-heading">
              Our Journey & Evolution
            </h2>
            <p>
              GOKATECH INC is a premier Mobile App Development and IT consulting firm, delivering transformative technology and management solutions to clients across the United States, Germany, India, and beyond. With deep expertise in designing, building, and implementing business-driven solutions, we empower organizations to thrive in the modern cloud and AI era.
            </p>
            <p>
              At GOKATECH, we help our clients unlock competitive advantages by harnessing cutting-edge, internet-based technologies. Our solutions enhance agility in responding to market dynamics, foster stronger connections with customers, suppliers, and partners, boost productivity, and optimize IT costs.
            </p>
            <p>
              Operating from a robust network of offices across North America (Frisco TX, Edison NJ, Indianapolis IN) and global delivery centers in Germany (Cologne) and India (Hyderabad), we bring together the best of local executive intimacy and scalable global engineering bandwidth.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => openQuote()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Partner with GOKATECH</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/partners"
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-[#102039] font-semibold text-xs transition-colors"
              >
                View Client Portfolio
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group">
              <img
                src="/assets/Abt.jpg"
                alt="GOKATECH Collaborative Engineering"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F7F9FC] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-300/60 text-xs">
                <span className="text-blue-600 font-bold block mb-1">100% Referenceable Guarantee</span>
                <span className="text-slate-700">Every engagement is backed by tangible deliverables and measured business ROI.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 sm:p-8 rounded-3xl bg-[#F3F6FB] border border-blue-500/20 mb-10 sm:mb-12 shadow-xl">
          {companyInfo.stats.map((s, idx) => (
            <div key={idx} className="text-center p-2">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#102039] font-heading mb-1">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-slate-700">{s.label}</div>
              {s.suffix && <div className="text-[10px] text-blue-600 mt-0.5">{s.suffix}</div>}
            </div>
          ))}
        </div>

        {/* Texas Award Spotlight Full Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F3F6FB] via-[#F3F6FB] to-[#EAF1FB] border border-amber-500/30 p-6 sm:p-10 mb-10 sm:mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center">
              <img
                src="/assets/awards.png"
                alt="Best City IT Consulting Services Award"
                className="h-48 sm:h-56 w-auto mx-auto object-contain drop-shadow-[0_15px_30px_rgba(245,158,11,0.3)] mb-4"
              />
              <span className="text-xs font-bold text-amber-300 tracking-wider uppercase">
                Best City IT Consulting Services Winner
              </span>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>Award Recognition</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#102039] font-heading">
                Best IT Consulting Firm in Plano & North Texas (2015, 2016, 2017)
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                We’re proud to announce that GOKATECH INC has been honored with the <strong>"Best City IT Consulting Services" Award for 2015, 2016, and 2017</strong>. This recognition celebrates our unwavering commitment to delivering innovative IT solutions, exceptional service, and impactful results to businesses across Texas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                  <span className="font-bold text-[#102039] block mb-1">Customer-Centric Approach</span>
                  <span className="text-slate-600">Building long-lasting relationships through personalized, business-driven IT architectures.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                  <span className="font-bold text-[#102039] block mb-1">Expertise & Innovation</span>
                  <span className="text-slate-600">Delivering cutting-edge technologies that drive scalable enterprise growth.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                  <span className="font-bold text-[#102039] block mb-1">Local Roots, Global Reach</span>
                  <span className="text-slate-600">Deep understanding of local Texas business dynamics backed by worldwide delivery pods.</span>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                  <span className="font-bold text-[#102039] block mb-1">Commitment to Excellence</span>
                  <span className="text-slate-600">Consistently exceeding client expectations in IT consulting, engineering, and staffing.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Differentiators */}
        <div className="mb-10 sm:mb-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102039] font-heading">
              Our Core Differentiators
            </h2>
            <p className="text-sm text-slate-600">
              Why the world’s leading enterprises partner with GOKATECH for mission-critical software initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-slate-200 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-[#102039] mb-2 font-heading">{diff.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Hubs Summary */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-slate-200 p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102039] font-heading">
              A Global Presence Designed for 24/7 Continuity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Follow-the-sun operations ensuring zero downtime and continuous delivery for our partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {officesData.map((office) => (
              <div
                key={office.id}
                className="p-4 rounded-xl bg-white/60 border border-slate-200 text-center space-y-1.5"
              >
                <div className="text-xs font-semibold text-blue-600">{office.city}</div>
                <div className="text-[11px] text-slate-600">{office.stateCountry}</div>
                <div className="text-[10px] text-slate-500 pt-1">{office.timezone}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
