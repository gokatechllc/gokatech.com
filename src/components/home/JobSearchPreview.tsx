import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, MapPin, ArrowRight, Sparkles, Building, Filter } from 'lucide-react';
import { jobsData, JobOpening, jobDepartments } from '../../data/jobsData';
import JobCard from '../jobs/JobCard';
import JobApplyModal from '../jobs/JobApplyModal';

export default function JobSearchPreview() {
  const [selectedDept, setSelectedDept] = useState<string>('All Departments');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeJobForModal, setActiveJobForModal] = useState<JobOpening | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const handleApplyClick = (job: JobOpening) => {
    setActiveJobForModal(job);
    setApplyModalOpen(true);
  };

  const filteredJobs = jobsData.filter((job) => {
    const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
    const matchesQuery = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesQuery;
  });

  return (
    <section className="py-10 sm:py-14 bg-[#050C18] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JobAway Career Portal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
              Find Your Next Career at <br />
              <span className="text-gradient">GOKATECH Global</span>
            </h2>
            <p className="text-sm text-slate-400">
              Join a high-performance culture that values innovation, collaboration, and personal growth. Work on trailblazing projects across North America, Germany, and India.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/employers"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              For Employers / Staffing
            </Link>
            <Link
              to="/jobs"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center space-x-1.5"
            >
              <span>View All Open Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Search & Department Filter Bar */}
        <div className="p-4 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-xl mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, skill (e.g. LoadRunner, Java, Dynamics 365, AWS)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Department Select */}
            <div className="md:col-span-4 relative">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
              >
                {jobDepartments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Department Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800">
            {jobDepartments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  selectedDept === dept
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.slice(0, 6).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApplyClick}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Briefcase className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No matching open roles found</h3>
            <p className="text-xs text-slate-400 mb-4">
              Try adjusting your search criteria or submit a general application directly.
            </p>
            <button
              onClick={() => {
                setSelectedDept('All Departments');
                setSearchTerm('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-white hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Career Growth Perks Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900/80 to-cyan-950/40 border border-slate-800 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Work on Trailblazing Projects</h4>
              <p className="text-xs text-slate-400">Collaborate with Fortune 500 enterprises on cutting-edge cloud, AI, and ERP solutions.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Culture of Collaboration</h4>
              <p className="text-xs text-slate-400">Join a supportive global network spanning Frisco TX, Edison NJ, Cologne, and Hyderabad.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Direct Resume Submission</h4>
              <p className="text-xs text-slate-400">Don't see your exact role? Send your CV directly to <a href="mailto:info@gokatech.com" className="text-cyan-400 hover:underline">info@gokatech.com</a>.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <JobApplyModal
        job={activeJobForModal}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </section>
  );
}

