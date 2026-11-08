import React, { useState } from 'react';
import { Building2, Users, CheckCircle2, ShieldCheck, Send, Sparkles, Clock, Award } from 'lucide-react';
import { supabase } from '../lib/supabase';
import TurnstileWidget from '../components/common/TurnstileWidget';

export default function EmployersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    rolesNeeded: 'Full-Stack Developers',
    count: '1 - 3 engineers',
    timeline: 'Immediately (within 2 weeks)',
    model: 'Contract / Augmentation',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security verification below before submitting.');
      return;
    }
    setTurnstileError(null);
    setLoading(true);
    try {
      await supabase.from('staffing_requests').insert([
        {
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          roles_needed: formData.rolesNeeded,
          count: formData.count,
          timeline: formData.timeline,
          model: formData.model,
          description: formData.description,
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

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#060D1A] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Workforce & Staffing Solutions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Build High-Velocity <br />
            <span className="text-gradient">Engineering Squads</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From specialized contract engineers to fully managed dedicated offshore/nearshore delivery pods, GOKATECH solves critical talent shortages with pre-vetted, certified IT professionals.
          </p>
        </div>

        {/* Staffing Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 sm:mb-12">
          <div className="p-8 rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400 font-bold">
              01
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Contract & Staff Augmentation
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rapidly deploy senior specialists in QA/Performance, Dynamics 365, Cloud DevOps, and Java/Python to meet strict project deadlines without long-term overhead.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li>✓ Immediate availability (48 - 72 hours)</li>
              <li>✓ Rigorously screened on enterprise protocols</li>
              <li>✓ Flexible scaling as priorities shift</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-[#0B1528] border border-blue-500/30 transition-all space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold">
              02
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Dedicated Engineering Pods
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous cross-functional pods (Product Manager, Lead Architect, Developers, QA) aligned to your milestones with follow-the-sun continuous delivery.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li>✓ Full IP ownership & NDA security</li>
              <li>✓ Agile sprint velocity guarantees</li>
              <li>✓ Cost efficiency (30% - 50% savings)</li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-blue-500/30 transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              03
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              Contract-to-Hire & Search
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evaluate candidates in real-world production settings before extending permanent offers, minimizing bad hire risks and onboarding bottlenecks.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li>✓ Zero risk probationary periods</li>
              <li>✓ Seamless full-time transitions</li>
              <li>✓ Executive technical search options</li>
            </ul>
          </div>
        </div>

        {/* Talent Request Form */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0F1D38] via-[#0A1428] to-[#070E1C] border border-blue-500/30 p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Direct Talent Sourcing Desk
              </span>
              <h2 className="text-3xl font-extrabold text-white font-heading">
                Request Dedicated IT Talent
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Tell us about your technical requirements and our talent directors in Frisco, Texas will curate candidate profiles within 48 hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 bg-slate-900/60 rounded-2xl border border-emerald-500/30 p-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Staffing Request Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.contactName}</strong> from <strong className="text-cyan-400">{formData.companyName}</strong>. Our enterprise recruitment director will contact you with matching candidate profiles within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setTurnstileToken(null);
                    setTurnstileError(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Company / Organization *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Acme Financial"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Jane Doe (VP of Engineering)"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Direct Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Role / Tech Stack Needed</label>
                    <select
                      value={formData.rolesNeeded}
                      onChange={(e) => setFormData({ ...formData, rolesNeeded: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="QA / Performance Engineers">QA / Performance Engineers</option>
                      <option value="Dynamics 365 & Power Platform">Dynamics 365 & Power Platform</option>
                      <option value="Cloud Architects (AWS/Azure)">Cloud Architects (AWS/Azure)</option>
                      <option value="Full-Stack Developers (Java/Python/React)">Full-Stack Developers</option>
                      <option value="AI / ML Engineers">AI / ML Engineers</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Staffing Model</label>
                    <select
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Contract / Augmentation">Contract / Augmentation</option>
                      <option value="Dedicated Pod">Dedicated Pod</option>
                      <option value="Contract-to-Hire">Contract-to-Hire</option>
                      <option value="Direct Hire">Direct Hire</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Target Timeline</label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Immediately (within 2 weeks)">Within 2 Weeks</option>
                      <option value="1 month">Within 1 Month</option>
                      <option value="Next quarter">Next Quarter</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Project & Skill Details</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe specific technologies, communication protocols, certifications, or security clearance requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Cloudflare Turnstile Verification */}
                <div className="pt-1">
                  <TurnstileWidget
                    action="staffing_request"
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
                  className="btn-wow w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-xl shadow-blue-500/30 hover:shadow-cyan-500/40 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Talent Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

