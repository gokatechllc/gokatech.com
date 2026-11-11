import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, CheckCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { officesData } from '../../data/officesData';
import { companyInfo } from '../../data/companyData';
import { LinkedInIcon, TwitterXIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from '../common/SocialIcons';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#EEF2F9] border-t border-slate-200 text-slate-700 pt-8 sm:pt-10 pb-6 relative overflow-hidden">
      {/* Decorative top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter / CTA Grid */}
        <div className="rounded-3xl bg-gradient-to-r from-[#EAF2FB] via-white to-[#EAF2FB] border border-blue-100 p-6 sm:p-8 mb-10 sm:mb-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                <Award className="w-3.5 h-3.5" />
                <span>Enterprise Engineering Insights</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#102039]">
                Stay Ahead of Digital Transformation
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                Subscribe to receive our quarterly executive briefings on cloud modernization, AI/ML deployment, ERP baselines, and enterprise technology trends.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-600 text-sm font-medium bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/20">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your corporate email..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/90 border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="p-1 rounded-xl bg-white border border-slate-300">
                <img src="/assets/logo.png" alt="GOKATECH" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-[#102039] font-heading">
                  GOKA<span className="text-blue-600">TECH</span>
                </div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">
                  Where Innovation Meets Excellence
                </div>
              </div>
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed">
              GOKATECH INC is a premier Mobile App Development, Enterprise IT Consulting, and Staffing firm. We empower Fortune 500 enterprises and hyper-growth leaders across the United States, Germany, and India with business-driven digital solutions.
            </p>

            {/* Award Badge Mini */}
            <div className="p-3 rounded-xl bg-white/60 border border-slate-200 flex items-center space-x-3">
              <img src="/assets/awards.png" alt="Plano Texas IT Award" className="h-12 w-auto object-contain flex-shrink-0" />
              <div className="text-xs">
                <div className="font-semibold text-amber-600">Best IT Consulting Award Winner</div>
                <div className="text-slate-600 text-[11px]">Honored in Texas for 2015, 2016 & 2017</div>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-4 text-xs text-slate-600">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>100% Referenceable</span>
              </span>
              <span>•</span>
              <span>Fortune 500 Trusted</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-2.5">
                Official Channels
              </span>
              <div className="flex items-center space-x-2">
                <a
                  href={companyInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-[#0077b5] text-slate-400 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GOKATECH on LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-white text-slate-600 hover:text-[#102039] border border-slate-200 hover:border-slate-300 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GOKATECH on X (Twitter)"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-[#1877f2] text-slate-400 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GOKATECH on Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-slate-400 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GOKATECH on Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyInfo.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white hover:bg-[#ff0000] text-slate-400 hover:text-white border border-slate-200 hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                  title="GOKATECH on YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#102039] uppercase tracking-wider font-heading">
              Capabilities & Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-slate-600 hover:text-blue-600 transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-blue-500 text-[10px]">&rsaquo;</span>
                    <span className="line-clamp-1">{s.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-blue-600 hover:underline font-medium inline-block pt-1">
                  View All 10 Capabilities &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation & Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-[#102039] uppercase tracking-wider font-heading">
              Explore & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-[#102039] transition-colors">
                  About GOKATECH
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Associates & Partners
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-slate-600 hover:text-[#102039] transition-colors flex items-center space-x-1">
                  <span>Job Board</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link to="/employers" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Employer Staffing
                </Link>
              </li>
              <li>
                <Link to="/employee-portal" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Employee Document Portal
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Global Locations & Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-[#102039] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Headquarters & Delivery Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#102039] uppercase tracking-wider font-heading">
              Our Headquarters
            </h4>
            <div className="text-xs space-y-2 text-slate-600">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong className="text-slate-800">GOKATECH INC</strong><br />
                  425 Old Newman Rd, Suite #503<br />
                  Frisco, TEXAS 75036, USA
                </p>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="tel:+14259712345" className="hover:text-blue-600 transition-colors">
                  +1 425 971 2345 / +1 469 519 6959
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:info@gokatech.com" className="hover:text-blue-600 transition-colors">
                  info@gokatech.com
                </a>
              </div>

              <div className="pt-2 text-[11px] text-slate-500">
                Delivery Hubs: Edison, NJ • Indianapolis, IN • Cologne, Germany • Hyderabad, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            Copyright © {new Date().getFullYear()} All Rights Reserved by <span className="text-slate-700 font-semibold">GOKATECH INC</span>.
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/about" className="hover:text-slate-700 transition-colors">Company Story</Link>
            <Link to="/partners" className="hover:text-slate-700 transition-colors">Client Portfolio</Link>
            <Link to="/jobs" className="hover:text-slate-700 transition-colors">Careers</Link>
            <Link to="/terms" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-700 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-slate-500">
            <span>Powered by React <a href='https://www.kkrgenaiinnovations.com/' target='_blank'>KKRGENAI Innovations</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

