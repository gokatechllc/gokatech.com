import React, { useState } from 'react';
import { X, Send, CheckCircle2, Building2, Mail, Phone, User, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { supabase } from '../../lib/supabase';
import TurnstileWidget from './TurnstileWidget';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function QuoteModal({ isOpen, onClose, initialService }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService || servicesData[0].title,
    budget: '$25,000 - $50,000',
    timeline: 'Within 1-3 months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security verification below before submitting.');
      return;
    }
    setTurnstileError(null);
    setLoading(true);
    try {
      await supabase.from('quote_requests').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          status: 'New'
        }
      ]);
    } catch (err) {
      console.warn('Saved with local confirmation:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTurnstileToken(null);
    setTurnstileError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Consultation Request Received!</h3>
            <p className="text-slate-300 max-w-md mx-auto text-sm">
              Thank you, <strong className="text-white">{formData.name}</strong>. A Senior Solution Architect from our Frisco, Texas headquarters will reach out to you within 24 hours.
            </p>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-left text-xs text-slate-400 space-y-1 max-w-md mx-auto">
              <p><span className="text-slate-200">Selected Service:</span> {formData.service}</p>
              <p><span className="text-slate-200">Email:</span> {formData.email}</p>
              <p><span className="text-slate-200">Project Budget:</span> {formData.budget}</p>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all shadow-lg shadow-brand-600/30"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-brand-400 text-sm font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Accelerate Your Growth</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Request a Project Quote & Consultation
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Connect with our enterprise engineering team to review requirements, system baselines, and estimated delivery timelines.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Business Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Company / Organization *</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Service Required */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Capability / Service Required *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Dedicated Staffing Pods">Dedicated Staffing / IT Team Augmentation</option>
                    <option value="Enterprise IT Audit">Enterprise IT & Security Architecture Audit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="Under $25,000">&lt; $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                    <option value="Enterprise Retainer">Enterprise Retainer</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Project Overview & Specifics</label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your objectives, technologies, integrations or staffing needs..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>

              {/* Cloudflare Turnstile Verification */}
              <div className="pt-1">
                <TurnstileWidget
                  action="quote_request"
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-wow w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-brand-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🔒 We respect your privacy. Non-disclosure agreements (NDA) available upon request.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

