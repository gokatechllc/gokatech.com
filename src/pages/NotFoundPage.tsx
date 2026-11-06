import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Briefcase } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-14 sm:py-20 bg-[#060D1A] text-center animate-fade-in">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        <div className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 font-heading">
          404
        </div>
        <h1 className="text-3xl font-bold text-white font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400">
          The page or resource you are looking for has been relocated or is currently under architectural review.
        </p>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-xs flex items-center space-x-2 shadow-lg shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/jobs"
            className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs flex items-center space-x-2 hover:bg-slate-800 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Browse Job Openings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

