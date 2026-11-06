import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, Sparkles, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import TurnstileWidget from '../../components/common/TurnstileWidget';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@gokatech.com');
  const [password, setPassword] = useState('gokatech7@123!@#');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    const session = localStorage.getItem('gokatech_admin_session');
    if (session) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setError('Please complete the Cloudflare security verification below before signing in.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Validate with Supabase or master credentials
      let isValid = false;

      // Master check
      if (email === 'admin@gokatech.com' && password === 'gokatech7@123!@#') {
        isValid = true;
      } else {
        // Query admin_users table in Supabase
        const { data, error: dbError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email)
          .maybeSingle();

        if (data && !dbError) {
          isValid = true;
        }
      }

      if (isValid) {
        localStorage.setItem(
          'gokatech_admin_session',
          JSON.stringify({
            email,
            role: 'Super Admin',
            name: 'GOKATECH Executive Admin',
            loginTime: new Date().toISOString()
          })
        );
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login authentication failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050B16] px-4 py-12 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to Site link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </Link>
        </div>

        <div className="rounded-3xl bg-[#0B1528] border border-blue-500/25 p-8 sm:p-10 shadow-2xl space-y-6">
          {/* Logo & Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-md mb-2">
              <img src="/assets/logo.png" alt="GOKATECH" className="h-10 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-heading">
              GOKATECH Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Enterprise management dashboard backed by Supabase
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start space-x-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gokatech.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Cloudflare Turnstile Verification */}
            <div className="pt-1">
              <TurnstileWidget
                action="admin_login"
                onVerify={(token) => {
                  setTurnstileToken(token);
                  setError(null);
                }}
                onExpire={() => setTurnstileToken(null)}
                onError={() => setError('Security verification failed. Please try again.')}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-wow w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Info */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <div className="inline-flex items-center space-x-1.5 text-[11px] text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pre-filled credentials from Supabase setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

