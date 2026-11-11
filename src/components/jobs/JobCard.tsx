import { MapPin, Briefcase, Clock, DollarSign, ChevronRight, Zap } from 'lucide-react';
import { JobOpening } from '../../data/jobsData';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: JobOpening;
  onApply: (job: JobOpening) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="group relative bg-[#FFFFFF] hover:bg-[#F3F6FB] border border-slate-200 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
      {/* Top badges */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {job.department}
            </span>
            {job.featured && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
            {job.urgent && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Urgent
              </span>
            )}
          </div>
          <span className="text-xs text-slate-500">{job.postedDate}</span>
        </div>

        {/* Title */}
        <Link to={`/jobs/${job.id}`}>
          <h3 className="text-lg font-bold text-[#102039] group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
            {job.title}
          </h3>
        </Link>

        {/* Short info row */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 mb-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{job.experience}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {job.description}
        </p>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100/80 text-slate-700 border border-slate-300/50"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100/50 text-slate-500">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Footer / Action row */}
      <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center text-sm font-semibold text-emerald-400">
          <DollarSign className="w-4 h-4 mr-0.5" />
          <span>{job.salaryRange.replace('/ yr', '')}</span>
          <span className="text-[11px] text-slate-600 font-normal ml-1">/yr</span>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            to={`/jobs/${job.id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-[#102039] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center space-x-1"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => onApply(job)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all shadow-md shadow-blue-500/20"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

