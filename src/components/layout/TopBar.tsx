import { Phone, Mail, MapPin, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../../data/companyData';
import { LinkedInIcon, TwitterXIcon, FacebookIcon, InstagramIcon, YouTubeIcon } from '../common/SocialIcons';

interface TopBarProps {
  onOpenQuote: () => void;
}

export default function TopBar({ onOpenQuote }: TopBarProps) {
  return (
    <div className="bg-[#EEF2F9] border-b border-slate-200/80 text-xs text-slate-600 hidden lg:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Left: Contact Info */}
        <div className="flex items-center space-x-6">
          <a
            href="tel:+14259712345"
            className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-500" />
            <span>+1 425 971 2345</span>
          </a>
          <a
            href="mailto:info@gokatech.com"
            className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>info@gokatech.com</span>
          </a>
          <div className="flex items-center space-x-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-blue-500" />
            <span>HQ: Frisco, Texas 75036</span>
          </div>

          {/* Social Links on TopBar */}
          <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
            <a
              href={companyInfo.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              title="GOKATECH on LinkedIn"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.socialMedia.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              title="GOKATECH on X (Twitter)"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              title="GOKATECH on Facebook"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              title="GOKATECH on Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={companyInfo.socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-600 transition-colors"
              title="GOKATECH on YouTube"
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right: Accolades & Quick Links */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1 text-amber-400">
            <Award className="w-3.5 h-3.5" />
            <span className="font-medium">Best IT Consulting Award Winner (Texas)</span>
          </div>
          <span className="text-slate-700">|</span>
          <Link to="/employee-portal" className="hover:text-blue-600 transition-colors flex items-center space-x-1">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Employee Portal</span>
          </Link>
          <span className="text-slate-700">|</span>
          <button
            onClick={onOpenQuote}
            className="text-blue-600 hover:text-blue-500 font-semibold transition-colors"
          >
            Request IT Audit
          </button>
        </div>
      </div>
    </div>
  );
}

