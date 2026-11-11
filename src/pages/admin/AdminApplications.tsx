import { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Search, 
  Trash2, 
  Eye, 
  Download, 
  RefreshCw, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  X,
  ExternalLink 
} from 'lucide-react';
import { supabase, JobApplicationRow } from '../../lib/supabase';

export default function AdminApplications() {
  const [applications, setApplications] = useState<JobApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState<JobApplicationRow | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', id);

      setApplications(applications.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this candidate application?')) return;
    try {
      await supabase.from('job_applications').delete().eq('id', id);
      setApplications(applications.filter(a => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
    } catch (err) {
      console.error('Failed to delete application:', err);
    }
  };

  const filteredApps = applications.filter(a => {
    const matchesSearch = 
      a.full_name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.job_title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['ID,Date,Candidate Name,Job Title,Email,Phone,Experience,LinkedIn,Resume,Status,Cover Note'];
    const rows = filteredApps.map(a => 
      `"${a.id}","${a.created_at}","${a.full_name}","${a.job_title}","${a.email}","${a.phone || ''}","${a.experience_years || ''}","${a.linkedin_url || ''}","${a.resume_file_name || ''}","${a.status}","${(a.cover_note || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gokatech_candidates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#102039] font-heading">
            Candidate Job Applications
          </h1>
          <p className="text-xs text-slate-600">
            Engineers and specialists applying via the GOKATECH talent portal
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs text-slate-700 hover:text-[#102039] transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchApplications}
            className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-[#102039]"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidate name, email, job..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] placeholder-slate-500 text-xs focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-600">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-[#102039] text-xs focus:border-blue-600 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Screening">Screening</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Extended">Offer Extended</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl bg-[#FFFFFF] border border-blue-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/90 text-slate-600 border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Applied Role</th>
                <th className="py-3.5 px-4">Experience</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 text-slate-700">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No candidate applications matching criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((a) => (
                  <tr key={a.id} className="hover:bg-white/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#102039]">{a.full_name}</div>
                      <div className="text-[11px] text-slate-600">{a.email}</div>
                      <div className="text-[10px] text-slate-500">{a.phone || 'No phone'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-blue-500">{a.job_title}</span>
                      <div className="text-[10px] text-slate-500 mt-0.5 flex items-center space-x-1">
                        <FileText className="w-3 h-3 text-slate-600" />
                        <span>{a.resume_file_name || 'Resume.pdf'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {a.experience_years || 'Experienced'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          a.status === 'Shortlisted'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : a.status === 'Interview Scheduled'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                            : a.status === 'Offer Extended'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : a.status === 'Rejected'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Screening">Screening</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Offer Extended">Offer Extended</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedApp(a)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-[#102039] hover:bg-slate-200 transition-colors"
                        title="View Candidate Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Application"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-blue-500/30 p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-slate-600 hover:text-[#102039]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#102039] font-heading">
              Candidate Application Details
            </h3>

            <div className="space-y-2 text-xs bg-white/80 p-4 rounded-xl border border-slate-200">
              <p><strong className="text-slate-600">Candidate Name:</strong> <span className="text-[#102039] font-bold">{selectedApp.full_name}</span></p>
              <p><strong className="text-slate-600">Role:</strong> <span className="text-blue-600 font-semibold">{selectedApp.job_title}</span></p>
              <p><strong className="text-slate-600">Email:</strong> <a href={`mailto:${selectedApp.email}`} className="text-blue-600 hover:underline">{selectedApp.email}</a></p>
              <p><strong className="text-slate-600">Phone:</strong> <a href={`tel:${selectedApp.phone}`} className="text-blue-600 hover:underline">{selectedApp.phone || 'N/A'}</a></p>
              <p><strong className="text-slate-600">Experience:</strong> <span className="text-slate-800">{selectedApp.experience_years}</span></p>
              <p><strong className="text-slate-600">Resume File:</strong> <span className="text-emerald-400 font-mono">{selectedApp.resume_file_name}</span></p>
              
              {selectedApp.linkedin_url && (
                <p>
                  <strong className="text-slate-600">LinkedIn:</strong>{' '}
                  <a href={selectedApp.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center space-x-1">
                    <span>{selectedApp.linkedin_url}</span>
                    <ExternalLink className="w-3 h-3 ml-1 inline" />
                  </a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate Cover Note</label>
              <div className="p-3.5 rounded-xl bg-white/70 border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-36 overflow-y-auto">
                {selectedApp.cover_note || 'No cover note submitted.'}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <a
                href={`mailto:${selectedApp.email}?subject=GOKATECH Interview Invitation: ${encodeURIComponent(selectedApp.job_title)}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Candidate</span>
              </a>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#102039] text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

