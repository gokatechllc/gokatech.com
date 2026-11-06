import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquareQuote, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Mail, 
  FileText, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  Database 
} from 'lucide-react';

export default function AdminLayout() {
  const [session, setSession] = useState<{ email: string; name: string; role: string } | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('gokatech_admin_session');
    if (!raw) {
      navigate('/admin/login');
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('gokatech_admin_session');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Quote Requests', path: '/admin/quotes', icon: MessageSquareQuote },
    { name: 'Job Applications', path: '/admin/applications', icon: UserCheck },
    { name: 'Job Openings', path: '/admin/jobs', icon: Briefcase },
    { name: 'Staffing Requests', path: '/admin/staffing', icon: Building2 },
    { name: 'Inquiries & Messages', path: '/admin/messages', icon: Mail },
    { name: 'Employee Documents', path: '/admin/documents', icon: FileText }
  ];

  if (!session) return null;

  return (
    <div className="min-h-screen flex bg-[#060D1A] text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#081020] border-r border-slate-800 flex-shrink-0">
        {/* Brand */}
        <div className="p-6 border-b border-slate-800/80">
          <Link to="/admin" className="flex items-center space-x-3">
            <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-700">
              <img src="/assets/logo.png" alt="GOKATECH" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <div className="text-base font-extrabold text-white font-heading">
                GOKA<span className="text-cyan-400">TECH</span>
              </div>
              <div className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                Admin Console
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Database Status Indicator */}
        <div className="p-4 mx-3 mb-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-[11px]">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Cloud Connected</span>
          </div>
          <div className="text-slate-500 text-[10px] truncate">
            kzdmqmtikduhvinsherz.supabase.co
          </div>
        </div>

        {/* Bottom User & Logout */}
        <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 font-bold text-xs">
              GA
            </div>
            <div className="text-xs">
              <div className="text-white font-semibold line-clamp-1">{session.name}</div>
              <div className="text-[10px] text-slate-500">{session.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-[#081020]/90 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          {/* Mobile hamburger */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-extrabold text-white text-base">GOKATECH Admin</span>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Super Administrator Mode</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors hidden sm:flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <div className="relative w-72 bg-[#081020] border-r border-slate-800 flex flex-col p-4 space-y-4 z-10">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-white text-sm">GOKATECH Admin</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      location.pathname === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

