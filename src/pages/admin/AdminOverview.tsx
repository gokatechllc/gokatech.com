import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareQuote, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Mail, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    quotesCount: 0,
    appsCount: 0,
    jobsCount: 0,
    staffingCount: 0,
    messagesCount: 0
  });

  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        { count: quotesCount, data: quotes },
        { count: appsCount, data: apps },
        { count: jobsCount },
        { count: staffingCount },
        { count: messagesCount }
      ] = await Promise.all([
        supabase.from('quote_requests').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
        supabase.from('job_applications').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(4),
        supabase.from('job_openings').select('*', { count: 'exact' }),
        supabase.from('staffing_requests').select('*', { count: 'exact' }),
        supabase.from('contact_inquiries').select('*', { count: 'exact' })
      ]);

      setStats({
        quotesCount: quotesCount || 0,
        appsCount: appsCount || 0,
        jobsCount: jobsCount || 0,
        staffingCount: staffingCount || 0,
        messagesCount: messagesCount || 0
      });

      if (quotes) setRecentQuotes(quotes);
      if (apps) setRecentApplications(apps);
    } catch (e) {
      console.error('Error fetching admin overview:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102039] font-heading">
            Executive Control Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time telemetry and management across GOKATECH corporate pipelines
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 hover:text-[#102039] transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync Data</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Link
          to="/admin/quotes"
          className="p-5 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-600">Quote Proposals</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#102039] font-heading">{stats.quotesCount}</div>
          <div className="text-[11px] text-blue-600 mt-1 flex items-center space-x-1">
            <span>Client RFPs</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/applications"
          className="p-5 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-600">Applications</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#102039] font-heading">{stats.appsCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
            <span>Candidates Logged</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/jobs"
          className="p-5 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-600">Open Positions</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#102039] font-heading">{stats.jobsCount}</div>
          <div className="text-[11px] text-amber-400 mt-1 flex items-center space-x-1">
            <span>Active Roles</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/staffing"
          className="p-5 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-600">Staffing Requests</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#102039] font-heading">{stats.staffingCount}</div>
          <div className="text-[11px] text-purple-400 mt-1 flex items-center space-x-1">
            <span>Employer Pods</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          to="/admin/messages"
          className="p-5 rounded-2xl bg-[#FFFFFF] border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-600">Inquiries</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#102039] font-heading">{stats.messagesCount}</div>
          <div className="text-[11px] text-rose-400 mt-1 flex items-center space-x-1">
            <span>Direct Messages</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 2-Column: Recent Quotes & Recent Job Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quotes */}
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-blue-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <MessageSquareQuote className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-[#102039] font-heading">Recent Consultation Requests</h3>
            </div>
            <Link to="/admin/quotes" className="text-xs text-blue-600 hover:underline font-medium">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentQuotes.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No quote requests recorded yet.</p>
            ) : (
              recentQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl bg-white/70 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#102039]">{q.name}</div>
                    <div className="text-slate-600 text-[11px]">{q.company || 'Private'} • {q.service}</div>
                    <div className="text-[10px] text-slate-500">Budget: {q.budget}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20 flex-shrink-0">
                    {q.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-blue-500/20 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-[#102039] font-heading">Recent Job Applicants</h3>
            </div>
            <Link to="/admin/applications" className="text-xs text-emerald-400 hover:underline font-medium">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No applications submitted yet.</p>
            ) : (
              recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-white/70 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#102039]">{app.full_name}</div>
                    <div className="text-slate-600 text-[11px]">{app.job_title}</div>
                    <div className="text-[10px] text-slate-500">Exp: {app.experience_years} • {app.email}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

