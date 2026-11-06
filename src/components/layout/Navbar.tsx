import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, Briefcase, Phone, Award } from 'lucide-react';
import { servicesData } from '../../data/servicesData';

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Capabilities & Services', path: '/services', hasDropdown: true },
    { name: 'Partners & Clients', path: '/partners' },
    { name: 'Jobs & Careers', path: '/jobs', badge: 'Hiring' },
    { name: 'Employers', path: '/employers' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070F1E]/95 backdrop-blur-md shadow-xl border-b border-blue-500/10 py-3'
          : 'bg-[#070F1E]/80 backdrop-blur-sm border-b border-slate-800/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-slate-900/90 border border-slate-700/60 group-hover:border-blue-500/40 transition-all shadow-md">
              <img
                src="/assets/logo.png"
                alt="GOKATECH"
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback in case of image load delay
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="hidden group-only:inline-block font-extrabold text-white text-lg tracking-wider">
                GOKA<span className="text-cyan-400">TECH</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-white font-heading leading-tight">
                GOKA<span className="text-cyan-400">TECH</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Where Innovation Meets Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                        isActive || location.pathname.startsWith('/services')
                          ? 'text-cyan-400 bg-blue-500/10'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Link>

                    {/* Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-96 rounded-2xl bg-[#0B1528] border border-blue-500/20 shadow-2xl p-3 z-50 animate-fade-in">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                          <span>Core Capabilities</span>
                          <span className="text-cyan-400 font-normal">10 Services</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto py-2 space-y-1">
                          {servicesData.map((svc) => (
                            <Link
                              key={svc.id}
                              to={`/services/${svc.slug}`}
                              className="block p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group/item"
                            >
                              <div className="text-xs font-semibold text-white group-hover/item:text-cyan-400 transition-colors">
                                {svc.title}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {svc.shortDesc}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-slate-800 px-3">
                          <Link
                            to="/services"
                            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center justify-between py-1"
                          >
                            <span>Explore All Capabilities</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-cyan-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/jobs"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Job Board</span>
            </Link>

            <button
              onClick={onOpenQuote}
              className="btn-wow px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-2 border-t border-slate-800 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2.5 rounded-xl text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-cyan-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
              <Link
                to="/employee-portal"
                className="py-2.5 px-3 rounded-xl bg-slate-800 text-center text-xs font-semibold text-slate-300"
              >
                Employee Portal
              </Link>
              <button
                onClick={onOpenQuote}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-center text-xs font-semibold text-white"
              >
                Request Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

