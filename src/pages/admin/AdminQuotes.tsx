import { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Search, 
  Trash2, 
  Eye, 
  Download, 
  RefreshCw, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  X,
  CheckCircle2
} from 'lucide-react';
import { supabase, QuoteRequestRow } from '../../lib/supabase';

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestRow | null>(null);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (err) {
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await supabase
        .from('quote_requests')
        .update({ status: newStatus })
        .eq('id', id);

      setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    try {
      await supabase.from('quote_requests').delete().eq('id', id);
      setQuotes(quotes.filter(q => q.id !== id));
      if (selectedQuote?.id === id) setSelectedQuote(null);
    } catch (err) {
      console.error('Failed to delete quote:', err);
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = 
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      (q.company && q.company.toLowerCase().includes(search.toLowerCase())) ||
      (q.service && q.service.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['ID,Date,Name,Email,Phone,Company,Service,Budget,Timeline,Status,Message'];
    const rows = filteredQuotes.map(q => 
      `"${q.id}","${q.created_at}","${q.name}","${q.email}","${q.phone || ''}","${q.company || ''}","${q.service || ''}","${q.budget || ''}","${q.timeline || ''}","${q.status}","${(q.message || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gokatech_quotes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Client Quote & Consultation Requests
          </h1>
          <p className="text-xs text-slate-400">
            Inbound prospective client RFPs submitted via web consultation modals
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchQuotes}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, company, service..."
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
            <option value="In Review">In Review</option>
            <option value="Contacted">Contacted</option>
            <option value="Proposal Sent">Proposal Sent</option>
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
                <th className="py-3.5 px-4">Client</th>
                <th className="py-3.5 px-4">Capability</th>
                <th className="py-3.5 px-4">Budget / Timeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No quote requests matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{q.name}</div>
                      <div className="text-[11px] text-slate-400">{q.company || 'Private'}</div>
                      <div className="text-[10px] text-slate-500">{q.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-cyan-300">{q.service}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{q.budget}</div>
                      <div className="text-[10px] text-slate-500">{q.timeline}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          q.status === 'New'
                            ? 'bg-blue-500/10 text-cyan-400 border-blue-500/30'
                            : q.status === 'In Review'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : q.status === 'Proposal Sent'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                            : q.status === 'Closed'
                            ? 'bg-slate-800 text-slate-400 border-slate-700'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(q.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
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
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1528] border border-blue-500/30 p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedQuote(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-heading">
              Quote Request Details
            </h3>

            <div className="space-y-2 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <p><strong className="text-slate-400">Client:</strong> <span className="text-white font-medium">{selectedQuote.name}</span></p>
              <p><strong className="text-slate-400">Company:</strong> <span className="text-white">{selectedQuote.company || 'N/A'}</span></p>
              <p><strong className="text-slate-400">Email:</strong> <a href={`mailto:${selectedQuote.email}`} className="text-cyan-400 hover:underline">{selectedQuote.email}</a></p>
              <p><strong className="text-slate-400">Phone:</strong> <a href={`tel:${selectedQuote.phone}`} className="text-cyan-400 hover:underline">{selectedQuote.phone || 'N/A'}</a></p>
              <p><strong className="text-slate-400">Service:</strong> <span className="text-cyan-300 font-semibold">{selectedQuote.service}</span></p>
              <p><strong className="text-slate-400">Budget:</strong> <span className="text-emerald-400 font-medium">{selectedQuote.budget}</span></p>
              <p><strong className="text-slate-400">Timeline:</strong> <span className="text-white">{selectedQuote.timeline}</span></p>
              <p><strong className="text-slate-400">Date Received:</strong> <span className="text-slate-400">{new Date(selectedQuote.created_at).toLocaleString()}</span></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Message</label>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                {selectedQuote.message || 'No additional message provided.'}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
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

