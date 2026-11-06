import { MapPin, Phone, Mail, Globe, ExternalLink, Clock } from 'lucide-react';
import { officesData } from '../../data/officesData';

export default function GlobalPresence() {
  return (
    <section className="py-10 sm:py-14 bg-[#050B16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Globe className="w-3.5 h-3.5" />
            <span>24/7 Follow-the-Sun Delivery Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Our Global Delivery Hubs & <br />
            <span className="text-gradient">Regional Headquarters</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Headquartered in Frisco, Texas, with strategic delivery centers across North America, Europe, and Asia, GOKATECH brings together localized account management with scalable global engineering power.
          </p>
        </div>

        {/* Global Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {officesData.map((office) => {
            const isHQ = office.type === 'Global Headquarters';

            return (
              <div
                key={office.id}
                className={`relative rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between ${
                  isHQ
                    ? 'bg-gradient-to-b from-[#0F1E3D] to-[#0A1428] border-2 border-blue-500/40 shadow-2xl shadow-blue-500/15'
                    : 'bg-[#0B1528] border border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        isHQ
                          ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/30'
                          : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                      }`}
                    >
                      {office.type}
                    </span>
                    {isHQ && (
                      <span className="text-xs font-semibold text-amber-400 flex items-center space-x-1">
                        ★ Flagship
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading">
                    {office.city}
                  </h3>

                  <div className="space-y-3 text-xs text-slate-300 mb-6">
                    <div className="flex items-start space-x-2.5">
                      <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">{office.address}</p>
                        <p className="text-slate-400">{office.stateCountry}</p>
                      </div>
                    </div>

                    {office.phone && (
                      <div className="flex items-center space-x-2.5">
                        <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className="hover:text-cyan-400 transition-colors">
                          {office.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center space-x-2.5">
                      <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-cyan-400 transition-colors">
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-center space-x-2.5 text-slate-400 text-[11px] pt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                      <span>{office.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* Directions link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between transition-colors group"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

