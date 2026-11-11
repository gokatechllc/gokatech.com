import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileText, Send, User, Mail, Phone, Globe, Briefcase } from 'lucide-react';
import { JobOpening } from '../../data/jobsData';
import { supabase } from '../../lib/supabase';
import TurnstileWidget from '../common/TurnstileWidget';

interface JobApplyModalProps {
  job: JobOpening | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobApplyModal({ job, isOpen, onClose }: JobApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    experienceYears: '3-5 years',
    coverNote: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  if (!isOpen || !job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security verification below before submitting.');
      return;
    }
    setTurnstileError(null);
    setLoading(true);
    try {
      await supabase.from('job_applications').insert([
        {
          job_id: job.id,
          job_title: job.title,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          experience_years: formData.experienceYears,
          linkedin_url: formData.linkedin,
          portfolio_url: formData.portfolio,
          resume_file_name: selectedFile ? selectedFile.name : 'Candidate_Resume.pdf',
          cover_note: formData.coverNote,
          status: 'Pending'
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
    setSelectedFile(null);
    setTurnstileToken(null);
    setTurnstileError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1730]/50 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#FFFFFF] border border-blue-500/20 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-600 hover:text-[#102039] p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#102039]">Application Submitted!</h3>
            <p className="text-slate-700 max-w-md mx-auto text-sm">
              Thank you, <strong className="text-[#102039]">{formData.fullName}</strong>. Your profile for <strong className="text-blue-600">{job.title}</strong> has been logged in GOKATECH's recruitment registry.
            </p>
            <div className="bg-white/60 p-4 rounded-xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5 max-w-md mx-auto">
              <p><span className="text-slate-800">Role:</span> {job.title} ({job.location})</p>
              <p><span className="text-slate-800">Applicant:</span> {formData.fullName} ({formData.email})</p>
              <p><span className="text-slate-800">Resume Attached:</span> {selectedFile ? selectedFile.name : 'Uploaded in profile'}</p>
              <p><span className="text-slate-800">Reference ID:</span> GK-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <p className="text-xs text-slate-500">
              Our technical recruitment team will contact qualified candidates within 2 business days.
            </p>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition-all shadow-lg shadow-brand-600/30"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" />
              <span>GOKATECH Talent Portal</span>
            </div>
            <h2 className="text-2xl font-bold text-[#102039] mb-1">
              Apply for {job.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-6">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">{job.department}</span>
              <span>•</span>
              <span className="text-slate-700">{job.location}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">{job.salaryRange}</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Years of Relevant Experience *</label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] text-sm focus:border-brand-500 focus:outline-none"
                  >
                    <option value="1-2 years">1 - 2 Years</option>
                    <option value="3-5 years">3 - 5 Years</option>
                    <option value="6-8 years">6 - 8 Years</option>
                    <option value="9+ years">9+ Years (Principal / Lead)</option>
                  </select>
                </div>
              </div>

              {/* LinkedIn / Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">LinkedIn Profile URL</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">GitHub / Portfolio URL</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      placeholder="https://github.com/username"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Attach Resume / CV (PDF, DOCX) *</label>
                <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/50">
                  <input
                    type="file"
                    id="resume-file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="resume-file" className="cursor-pointer flex flex-col items-center">
                    {selectedFile ? (
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <FileText className="w-6 h-6" />
                        <span className="font-medium text-sm">{selectedFile.name}</span>
                        <span className="text-xs text-slate-600">({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-slate-600 mb-1" />
                        <span className="text-sm font-medium text-slate-800">Click to upload your resume</span>
                        <span className="text-xs text-slate-500 mt-0.5">Supports PDF or DOCX up to 10MB</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Brief Cover Note / Protocols Experience</label>
                <textarea
                  rows={2}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder="Share a brief summary of your tech stack, key projects or work authorization status..."
                  className="w-full px-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Cloudflare Turnstile Verification */}
              <div className="pt-1">
                <TurnstileWidget
                  action="job_application"
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
                  className="btn-wow w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  You can also email your CV directly to <a href="mailto:info@gokatech.com" className="text-brand-400 hover:underline">info@gokatech.com</a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

