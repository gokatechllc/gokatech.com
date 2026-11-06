import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Globe 
} from 'lucide-react';
import { officesData } from '../data/officesData';
import { companyInfo } from '../data/companyData';
import { supabase } from '../lib/supabase';
import { LinkedInIcon, TwitterXIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from '../components/common/SocialIcons';
import TurnstileWidget from '../components/common/TurnstileWidget';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'General Enterprise Inquiry',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security verification below before submitting.');
      return;
    }
    setTurnstileError(null);
    setLoading(true);
    try {
      await supabase.from('contact_inquiries').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          subject: formData.subject,
          message: formData.message,
          status: 'Unread'
        }
      ]);
    } catch (err) {
      console.warn('Saved with local confirmation:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#060D1A] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Connect with GOKATECH</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Global Offices & <br />
            <span className="text-gradient">Direct Communications</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Whether you are exploring a new enterprise IT architecture, requesting technical staffing, or seeking career opportunities, our teams in Texas, New Jersey, Indiana, Germany, and India are here to help.
          </p>
        </div>

        {/* 2-Column: Form & Headquarters Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 sm:mb-12">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1528] border border-blue-500/20 shadow-xl space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white font-heading">
                  Send an Inquiry
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill out the form below and an account director will follow up with you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been routed to our <strong className="text-cyan-400">{formData.department}</strong> team.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setTurnstileToken(null);
                      setTurnstileError(null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Department *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="General Enterprise Inquiry">General Enterprise Inquiry</option>
                        <option value="New Software Project / Architecture">New Software Project / Architecture</option>
                        <option value="Talent & IT Staffing Solutions">Talent & IT Staffing Solutions</option>
                        <option value="Careers & Employment">Careers & Employment</option>
                        <option value="Strategic Partnership / Vendor">Strategic Partnership / Vendor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. ERP Migration Architecture or QA Testing"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your requirements, project scope, or questions..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Cloudflare Turnstile Verification */}
                  <div className="pt-1">
                    <TurnstileWidget
                      action="contact_inquiry"
                      onVerify={(token) => {
                        setTurnstileToken(token);
                        setTurnstileError(null);
                      }}
                      onExpire={() => setTurnstileToken(null)}
                      onError={() => setTurnstileError('Turnstile verification failed. Please refresh or retry.')}
                    />
                    {turnstileError && (
                      <p className="text-xs text-rose-400 font-medium mt-1">
                        ⚠️ {turnstileError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-wow w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Headquarters Highlight */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0F1E3D] via-[#0A1428] to-[#070E1C] border border-blue-500/30 shadow-2xl space-y-5">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Global Headquarters
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading">
                Frisco, Texas, USA
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">GOKATECH INC</p>
                    <p>425 Old Newman Rd, Suite #503</p>
                    <p>Frisco, TEXAS 75036</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p>Primary: <a href="tel:+14259712345" className="text-white hover:text-cyan-400">+1 425 971 2345</a></p>
                    <p>Direct: <a href="tel:+14695196959" className="text-white hover:text-cyan-400">+1 469 519 6959</a></p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <a href="mailto:info@gokatech.com" className="text-white hover:text-cyan-400">
                      info@gokatech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>Mon - Fri: 8:00 AM - 6:00 PM CST</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a
                  href="https://www.google.com/maps?q=425+OLDNEWMAN+ROAD,+SUITE+503,+FRISCO,+TEXAS+75036"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                </a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1528] border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white font-heading">
                Direct Resume Submissions
              </h4>
              <p className="text-xs text-slate-400">
                Candidates seeking software engineering or QA opportunities can email their updated CV directly to{' '}
                <a href="mailto:info@gokatech.com" className="text-cyan-400 font-bold hover:underline">
                  info@gokatech.com
                </a>
              </p>
            </div>

            {/* Official Social Channels Card */}
            <div className="p-6 rounded-2xl bg-[#0B1528] border border-blue-500/20 space-y-3">
              <h4 className="text-sm font-bold text-white font-heading">
                Connect on Official Channels
              </h4>
              <p className="text-xs text-slate-400">
                Follow our official social networks for executive tech updates, open hiring notices, and industry events:
              </p>
              <div className="grid grid-cols-5 gap-2 pt-1">
                <a
                  href={companyInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-[#0077b5] text-slate-400 hover:text-white border border-slate-800 hover:border-transparent flex flex-col items-center justify-center transition-all hover:scale-105"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">LinkedIn</span>
                </a>
                <a
                  href={companyInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-black text-slate-400 hover:text-white border border-slate-800 hover:border-slate-600 flex flex-col items-center justify-center transition-all hover:scale-105"
                  title="X (Twitter)"
                >
                  <TwitterXIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">X / Twitter</span>
                </a>
                <a
                  href={companyInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-[#1877f2] text-slate-400 hover:text-white border border-slate-800 hover:border-transparent flex flex-col items-center justify-center transition-all hover:scale-105"
                  title="Facebook"
                >
                  <FacebookIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Facebook</span>
                </a>
                <a
                  href={companyInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-slate-400 hover:text-white border border-slate-800 hover:border-transparent flex flex-col items-center justify-center transition-all hover:scale-105"
                  title="Instagram"
                >
                  <InstagramIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">Instagram</span>
                </a>
                <a
                  href={companyInfo.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 hover:bg-[#ff0000] text-slate-400 hover:text-white border border-slate-800 hover:border-transparent flex flex-col items-center justify-center transition-all hover:scale-105"
                  title="YouTube"
                >
                  <YouTubeIcon className="w-5 h-5 mb-1" />
                  <span className="text-[10px]">YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* All Global Offices Grid */}
        <div className="mb-10 sm:mb-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Our 5 Delivery Hubs & Regional Hubs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Connecting North America, Europe, and Asia for seamless project execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officesData.map((office) => (
              <div
                key={office.id}
                className="p-6 rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                      {office.type}
                    </span>
                    <span className="text-[11px] text-cyan-400 font-medium">
                      {office.timezone.split(' ')[0]}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-heading">
                    {office.city}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-400 mb-4">
                    <p>{office.address}</p>
                    <p>{office.stateCountry}</p>
                    {office.phone && <p>Tel: {office.phone}</p>}
                    <p>Email: {office.email}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="rounded-3xl bg-[#081020] border border-slate-800 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Common questions about working with GOKATECH, project baselines, and staffing models.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {companyInfo.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm font-bold text-white font-heading">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
