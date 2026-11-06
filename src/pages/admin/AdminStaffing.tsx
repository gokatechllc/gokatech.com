import { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Mail, 
  Phone, 
  Users, 
  Clock, 
  X 
} from 'lucide-react';
import { supabase, StaffingRequestRow } from '../../lib/supabase';

export default function AdminStaffing() {
  const [requests, setRequests] = useState<StaffingRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReq, setSelectedReq] = useState<StaffingRequestRow | null>(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('staffing_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err) {
      console.error('Error fetching staffing requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await supabase
        .from('staffing_requests')
        .update({ status: newStatus })
        .eq('id', id);

      setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this staffing request?')) return;
    try {
      await supabase.from('staffing_requests').delete().eq('id', id);
      setRequests(requests.filter(r => r.id !== id));
      if (selectedReq?.id === id) setSelectedReq(null);
    } catch (err) {
      console.error('Failed to delete staffing request:', err);
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = 
      r.company_name.toLowerCase().includes(search.toLowerCase()) ||
      r.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      (r.roles_needed && r.roles_needed.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Enterprise Staffing Requests
          </h1>
          <p className="text-xs text-slate-400">
            Workforce augmentation & dedicated pod requests submitted by businesses
          </p>
        </div>

        <button
          onClick={fetchRequests}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white self-start sm:self-auto"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, contact, roles..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-cyan-400 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Matching Profiles">Matching Profiles</option>
            <option value="In Discussions">In Discussions</option>
            <option value="Placed">Placed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Company & Contact</th>
                <th className="py-3.5 px-4">Roles Required</th>
                <th className="py-3.5 px-4">Model / Size</th>
                <th className="py-3.5 px-4">Timeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No staffing requests recorded yet.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{r.company_name}</div>
                      <div className="text-[11px] text-slate-400">{r.contact_name}</div>
                      <div className="text-[10px] text-slate-500">{r.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-cyan-300">{r.roles_needed}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{r.model}</div>
                      <div className="text-[10px] text-slate-500">{r.count}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {r.timeline}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border bg-blue-500/10 text-cyan-400 border-blue-500/30 focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Matching Profiles">Matching Profiles</option>
                        <option value="In Discussions">In Discussions</option>
                        <option value="Placed">Placed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedReq(r)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="View Full Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Request"
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

      {/* Details Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1528] border border-blue-500/30 p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedReq(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-heading">
              Staffing Request Details
            </h3>

            <div className="space-y-2 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <p><strong className="text-slate-400">Company:</strong> <span className="text-white font-bold">{selectedReq.company_name}</span></p>
              <p><strong className="text-slate-400">Contact Person:</strong> <span className="text-white">{selectedReq.contact_name}</span></p>
              <p><strong className="text-slate-400">Email:</strong> <a href={`mailto:${selectedReq.email}`} className="text-cyan-400 hover:underline">{selectedReq.email}</a></p>
              <p><strong className="text-slate-400">Phone:</strong> <a href={`tel:${selectedReq.phone}`} className="text-cyan-400 hover:underline">{selectedReq.phone || 'N/A'}</a></p>
              <p><strong className="text-slate-400">Roles Needed:</strong> <span className="text-cyan-300 font-semibold">{selectedReq.roles_needed}</span></p>
              <p><strong className="text-slate-400">Team Size:</strong> <span className="text-slate-200">{selectedReq.count}</span></p>
              <p><strong className="text-slate-400">Staffing Model:</strong> <span className="text-slate-200">{selectedReq.model}</span></p>
              <p><strong className="text-slate-400">Target Timeline:</strong> <span className="text-slate-200">{selectedReq.timeline}</span></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project & Skills Specifications</label>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                {selectedReq.description || 'No detailed specifications submitted.'}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedReq(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
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

