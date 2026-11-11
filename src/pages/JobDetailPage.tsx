import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Building2, 
  Share2, 
  FileText 
} from 'lucide-react';
import { jobsData, JobOpening } from '../data/jobsData';
import JobApplyModal from '../components/jobs/JobApplyModal';

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const job = jobsData.find((j) => j.id === id) || jobsData[0];
  const relatedJobs = jobsData.filter((j) => j.id !== job.id && j.department === job.department).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#F7F9FC] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            to="/jobs"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Job Openings</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 text-xs text-slate-600 hover:text-[#102039] px-3 py-1.5 rounded-lg bg-white border border-slate-200 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Position'}</span>
          </button>
        </div>

        {/* Job Header Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#F3F6FB] via-[#FFFFFF] to-[#FFFFFF] border border-blue-500/20 p-6 sm:p-10 mb-8 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 border border-blue-500/25">
                {job.department}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {job.type}
              </span>
              {job.urgent && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Immediate Hire
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102039] tracking-tight font-heading leading-tight">
              {job.title}
            </h1>

            {/* Quick Specs */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-700 pt-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Experience: {job.experience}</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                <DollarSign className="w-4 h-4" />
                <span>Compensation: {job.salaryRange}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm transition-all shadow-xl shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Apply for this Position</span>
                <Send className="w-4 h-4" />
              </button>

              <a
                href="mailto:info@gokatech.com"
                className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-[#102039] font-semibold text-xs transition-colors"
              >
                Email CV to info@gokatech.com
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Description & Responsibilities */}
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-[#102039] font-heading">
                Position Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-[#102039] font-heading">
                Key Responsibilities & Scope
              </h2>
              <div className="space-y-3">
                {job.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Skills */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-[#102039] font-heading">
                Qualifications & Technical Skills Required
              </h2>
              <div className="space-y-3">
                {job.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Skills badges */}
              <div className="pt-4 border-t border-slate-200/80">
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-3">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-[#102039] font-heading">
                Compensation, Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((b, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/60 border border-slate-200 text-xs text-slate-700 font-medium">
                    ✓ {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Quick Apply & Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#F3F6FB] to-[#FFFFFF] border border-blue-500/30 space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-600/30 flex items-center justify-center text-blue-600 mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#102039] font-heading">
                  Ready to Apply?
                </h3>
                <p className="text-xs text-slate-700 mt-1">
                  Upload your CV or portfolio directly to our Frisco, TX technical hiring desk.
                </p>
              </div>

              <button
                onClick={() => setApplyModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/25"
              >
                Submit Application Now
              </button>
            </div>

            {/* Related Jobs */}
            {relatedJobs.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-[#102039] font-heading uppercase tracking-wider">
                  Similar Positions
                </h3>
                <div className="space-y-3">
                  {relatedJobs.map((rj) => (
                    <Link
                      key={rj.id}
                      to={`/jobs/${rj.id}`}
                      className="block p-3.5 rounded-xl bg-white/60 hover:bg-white border border-slate-200 transition-colors group"
                    >
                      <h4 className="text-xs font-bold text-[#102039] group-hover:text-blue-600 transition-colors line-clamp-1">
                        {rj.title}
                      </h4>
                      <div className="text-[11px] text-slate-600 mt-1">
                        {rj.location} • {rj.type}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <JobApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
