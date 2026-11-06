import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  MapPin, 
  DollarSign, 
  Clock, 
  Zap 
} from 'lucide-react';
import { supabase, JobOpeningRow } from '../../lib/supabase';
import { jobDepartments, jobLocations, jobTypes } from '../../data/jobsData';

export default function AdminJobsManager() {
  const [jobs, setJobs] = useState<JobOpeningRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpeningRow | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<JobOpeningRow>>({
    id: '',
    title: '',
    department: 'Software Engineering',
    location: 'Frisco, TX (Hybrid / Remote)',
    type: 'Full-time',
    experience: '3 - 5+ Years',
    salary_range: '$100,000 - $130,000 / yr',
    posted_date: 'Just now',
    is_urgent: false,
    is_featured: false,
    status: 'Active',
    description: '',
    skills: [],
    responsibilities: [],
    requirements: [],
    benefits: []
  });

  const [skillsInput, setSkillsInput] = useState('');
  const [respInput, setRespInput] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_openings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      id: `goka-${Date.now()}`,
      title: '',
      department: 'Software Engineering',
      location: 'Frisco, TX (Hybrid / Remote)',
      type: 'Full-time',
      experience: '3 - 5+ Years',
      salary_range: '$100,000 - $130,000 / yr',
      posted_date: 'Just now',
      is_urgent: false,
      is_featured: false,
      status: 'Active',
      description: '',
      skills: ['Java', 'Python', 'AWS', 'Docker'],
      responsibilities: ['Architect and develop scalable backend modules.'],
      requirements: ['3+ years in enterprise IT software engineering.'],
      benefits: ['Medical, Dental, Vision', '401(k) Match', 'Flexible Schedule']
    });
    setSkillsInput('Java, Python, AWS, Docker');
    setRespInput('Architect and develop scalable backend modules.');
    setIsModalOpen(true);
  };

  const openEditModal = (job: JobOpeningRow) => {
    setEditingJob(job);
    setFormData({ ...job });
    setSkillsInput((job.skills || []).join(', '));
    setRespInput((job.responsibilities || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const skills = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const responsibilities = respInput.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...formData,
      skills,
      responsibilities
    };

    try {
      if (editingJob) {
        await supabase
          .from('job_openings')
          .update(payload)
          .eq('id', editingJob.id);
      } else {
        await supabase
          .from('job_openings')
          .insert([payload]);
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleStatusToggle = async (job: JobOpeningRow) => {
    const newStatus = job.status === 'Active' ? 'Closed' : 'Active';
    try {
      await supabase
        .from('job_openings')
        .update({ status: newStatus })
        .eq('id', job.id);

      setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm('Delete this job opening permanently?')) return;
    try {
      await supabase.from('job_openings').delete().eq('id', id);
      setJobs(jobs.filter(j => j.id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.department.toLowerCase().includes(search.toLowerCase()) ||
    j.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Job Openings Management
          </h1>
          <p className="text-xs text-slate-400">
            Publish, edit, and close technical openings displayed live on the GOKATECH careers portal
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Opening</span>
          </button>
          <button
            onClick={fetchJobs}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job title, department, location..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-2xl bg-[#0B1528] border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                  {job.department}
                </span>

                <button
                  onClick={() => handleStatusToggle(job)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {job.status}
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-2 font-heading">
                {job.title}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-400 mb-4">
                <div className="flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400">{job.salary_range}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {(job.skills || []).slice(0, 4).map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">ID: {job.id}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(job)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Edit Job"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteJob(job.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Delete Job"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add / Edit Job */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0B1528] border border-blue-500/30 p-6 sm:p-8 space-y-4 shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-heading">
              {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
            </h3>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Lead Cloud Architect"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    {jobDepartments.filter(d => d !== 'All Departments').map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary_range}
                    onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Required Skills (comma-separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Java, Python, Docker, Kubernetes, AWS"
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={respInput}
                  onChange={(e) => setRespInput(e.target.value)}
                  placeholder="Architect scalable microservices..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Job Description Overview</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="GOKATECH is seeking an experienced engineer to lead enterprise client engagements..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_urgent}
                    onChange={(e) => setFormData({ ...formData, is_urgent: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>Urgent Hire</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
                >
                  Save Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

