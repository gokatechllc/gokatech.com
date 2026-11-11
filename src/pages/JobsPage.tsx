import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  Filter, 
  RotateCcw, 
  Send, 
  Heart, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { 
  jobsData, 
  JobOpening, 
  jobDepartments, 
  jobLocations, 
  jobTypes 
} from '../data/jobsData';
import JobCard from '../components/jobs/JobCard';
import JobApplyModal from '../components/jobs/JobApplyModal';
import { supabase } from '../lib/supabase';

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [allJobs, setAllJobs] = useState<JobOpening[]>(jobsData);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedType, setSelectedType] = useState('All Types');

  const [activeJobForModal, setActiveJobForModal] = useState<JobOpening | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    const loadSupabaseJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('job_openings')
          .select('*')
          .eq('status', 'Active');

        if (data && data.length > 0 && !error) {
          const mapped: JobOpening[] = data.map(d => ({
            id: d.id,
            title: d.title,
            department: d.department,
            location: d.location,
            type: d.type,
            experience: d.experience,
            salaryRange: d.salary_range,
            postedDate: d.posted_date,
            urgent: d.is_urgent,
            featured: d.is_featured,
            description: d.description,
            responsibilities: d.responsibilities || [],
            requirements: d.requirements || [],
            skills: d.skills || [],
            benefits: d.benefits || []
          }));
          setAllJobs(mapped);
        }
      } catch (err) {
        console.warn('Using default job dataset:', err);
      }
    };
    loadSupabaseJobs();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleApplyClick = (job: JobOpening) => {
    setActiveJobForModal(job);
    setApplyModalOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDept('All Departments');
    setSelectedLocation('All Locations');
    setSelectedType('All Types');
    setSearchParams({});
  };

  const filteredJobs = allJobs.filter((job) => {
    const matchesQuery = 
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All Departments' || job.department === selectedDept;
    const matchesLocation = selectedLocation === 'All Locations' || job.location.includes(selectedLocation.replace(', TX', '').replace(', NJ', ''));
    const matchesType = selectedType === 'All Types' || job.type === selectedType;

    return matchesQuery && matchesDept && matchesLocation && matchesType;
  });

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#F7F9FC] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JobAway Career & Staffing Portal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102039] tracking-tight font-heading leading-tight">
            Explore Open Careers & <br />
            <span className="text-gradient">Engineering Roles</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Be part of transformative projects that push technical boundaries. Join our global team of passionate developers, architects, and QA engineers across the USA, Germany, and India.
          </p>
        </div>

        {/* JobAway Style Comprehensive Filter Box */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-blue-500/20 shadow-2xl mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Query */}
            <div className="md:col-span-5 relative">
              <Search className="w-5 h-5 text-slate-600 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, skill (LoadRunner, Dynamics, Python, AWS)..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>

            {/* Department */}
            <div className="md:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-[#102039] text-sm focus:border-blue-600 focus:outline-none"
              >
                {jobDepartments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white border border-slate-300 text-[#102039] text-sm focus:border-blue-600 focus:outline-none"
              >
                {jobLocations.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Job Type */}
            <div className="md:col-span-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-white border border-slate-300 text-[#102039] text-sm focus:border-blue-600 focus:outline-none"
              >
                {jobTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filters pill counter & reset button */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div>
              Showing <strong className="text-[#102039]">{filteredJobs.length}</strong> available openings
              {searchQuery && <span> matching "<span className="text-blue-600">{searchQuery}</span>"</span>}
            </div>

            {(searchQuery || selectedDept !== 'All Departments' || selectedLocation !== 'All Locations' || selectedType !== 'All Types') && (
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-500 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={handleApplyClick}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-slate-200 mb-20 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-[#102039]">No job openings found</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We couldn't find any positions matching your specific criteria. Try adjusting your search filters or send your resume for general consideration.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Culture & Why Choose GOKATECH */}
        <div className="rounded-3xl bg-gradient-to-br from-[#EAF2FB] via-white to-[#F2F7FD] border border-blue-100 p-8 sm:p-12 mb-20 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#102039] font-heading">
              Why Choose a Career at GOKATECH?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700">
              We shape the future of technology while creating a workplace that champions innovation, collaboration, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/70 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-[#102039]">Work on Trailblazing Projects</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Be part of transformative software architectures that push boundaries and solve real-world problems for Fortune 500 leaders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-[#102039]">A Culture of Collaboration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join a global team of passionate, supportive, and forward-thinking engineers across North America, Germany, and India.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-[#102039]">Growth That Empowers You</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fuel your career with certifications, mentorship programs, and leadership pathways tailored to unlock your true potential.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/80 text-center">
            <p className="text-xs text-slate-600">
              Ready to transform your career? Send your updated profile to{' '}
              <a href="mailto:info@gokatech.com" className="text-blue-600 font-bold hover:underline">
                info@gokatech.com
              </a>{' '}
              or apply to any open opening above!
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <JobApplyModal
        job={activeJobForModal}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
}
