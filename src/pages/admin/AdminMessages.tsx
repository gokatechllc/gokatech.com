import { useState, useEffect } from 'react';
import { 
  Mail, 
  Search, 
  Trash2, 
  Eye, 
  RefreshCw, 
  Phone, 
  X, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { supabase, ContactInquiryRow } from '../../lib/supabase';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactInquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMsg, setSelectedMsg] = useState<ContactInquiryRow | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await supabase
        .from('contact_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      setMessages(messages.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this message inquiry?')) return;
    try {
      await supabase.from('contact_inquiries').delete().eq('id', id);
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMsg?.id === id) setSelectedMsg(null);
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const openMessageModal = (msg: ContactInquiryRow) => {
    setSelectedMsg(msg);
    if (msg.status === 'Unread') {
      handleStatusChange(msg.id, 'Read');
    }
  };

  const filteredMessages = messages.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.department && m.department.toLowerCase().includes(search.toLowerCase())) ||
      (m.subject && m.subject.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-heading">
            Contact Inquiries & Communications
          </h1>
          <p className="text-xs text-slate-400">
            Messages dispatched from the public website contact portal
          </p>
        </div>

        <button
          onClick={fetchMessages}
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
            placeholder="Search sender, email, department..."
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
            <option value="All">All Inquiries</option>
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
            <option value="Responded">Responded</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Sender</th>
                <th className="py-3.5 px-4">Department / Subject</th>
                <th className="py-3.5 px-4">Message Snippet</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No contact messages recorded yet.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center space-x-1.5">
                        {m.status === 'Unread' && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                        )}
                        <span>{m.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{m.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-cyan-300 block">{m.department}</span>
                      <span className="text-[10px] text-slate-400">{m.subject || 'Inquiry'}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-400">
                      {m.message}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={m.status}
                        onChange={(e) => handleStatusChange(m.id, e.target.value)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          m.status === 'Unread'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : m.status === 'Read'
                            ? 'bg-blue-500/10 text-cyan-400 border-blue-500/30'
                            : m.status === 'Responded'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                        <option value="Responded">Responded</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => openMessageModal(m)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Read Full Message"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Message"
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

      {/* Message Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1528] border border-blue-500/30 p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setSelectedMsg(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white font-heading">
              Contact Inquiry
            </h3>

            <div className="space-y-1.5 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <p><strong className="text-slate-400">From:</strong> <span className="text-white font-bold">{selectedMsg.name}</span></p>
              <p><strong className="text-slate-400">Email:</strong> <a href={`mailto:${selectedMsg.email}`} className="text-cyan-400 hover:underline">{selectedMsg.email}</a></p>
              <p><strong className="text-slate-400">Phone:</strong> <span className="text-slate-200">{selectedMsg.phone || 'N/A'}</span></p>
              <p><strong className="text-slate-400">Department:</strong> <span className="text-cyan-300 font-semibold">{selectedMsg.department}</span></p>
              <p><strong className="text-slate-400">Subject:</strong> <span className="text-white">{selectedMsg.subject || 'General Inquiry'}</span></p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message Content</label>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {selectedMsg.message}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <a
                href={`mailto:${selectedMsg.email}?subject=RE: ${encodeURIComponent(selectedMsg.subject || 'GOKATECH Inquiry')}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>

              <button
                onClick={() => setSelectedMsg(null)}
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

