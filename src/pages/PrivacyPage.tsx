import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Globe, 
  Server, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Printer, 
  ChevronRight, 
  Mail, 
  Phone, 
  Building, 
  ArrowRight,
  UserCheck,
  KeyRound
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyData';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  const sections = [
    { id: 'introduction', title: '1. Introduction & Global Scope' },
    { id: 'data-collection', title: '2. Information We Collect' },
    { id: 'purposes-processing', title: '3. Legal Bases & Use of Data' },
    { id: 'security-architecture', title: '4. Enterprise Security & Storage' },
    { id: 'gdpr-ccpa', title: '5. GDPR, CCPA & Global Transfers' },
    { id: 'candidate-retention', title: '6. Applicant & Employee Data' },
    { id: 'retention-periods', title: '7. Data Retention Schedules' },
    { id: 'data-subject-rights', title: '8. Your Rights & Choices' },
    { id: 'subprocessors', title: '9. Sub-processors & Third Parties' },
    { id: 'cookies-telemetry', title: '10. Cookies & Tracking Controls' },
    { id: 'minors', title: '11. Protection of Minors' },
    { id: 'dpo-contact', title: '12. Data Protection Officer & Contact' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#F7F9FC] min-h-screen text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-600 mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-500">Legal & Governance</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-600 font-medium">Privacy Policy</span>
        </div>

        {/* Page Header Hero */}
        <div className="relative mb-8 sm:mb-10 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#EAF2FB] via-white to-[#F2F7FD] border border-blue-100 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-xs font-semibold text-blue-600">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise Data Governance & Protection</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102039] tracking-tight font-heading">
              GOKATECH <br />
              <span className="text-gradient">Enterprise Privacy Policy</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              At GOKATECH INC, protecting the confidentiality, integrity, and security of corporate client assets, job applicants, and enterprise users is fundamental to our engineering mission. This Privacy Policy outlines how we collect, process, protect, and safeguard your personal and business data.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Last Updated: <strong>November 1, 2026</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-200">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Compliance: <strong>GDPR • CCPA / CPRA • DPDP Act</strong></span>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-700" />
                <span>Print Policy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Table of Contents */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 backdrop-blur-md">
                <h3 className="text-sm font-bold text-[#102039] uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Privacy Sections</span>
                </h3>
                <nav className="space-y-1">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                        activeSection === sec.id
                          ? 'bg-blue-700/20 text-blue-500 font-semibold border-l-2 border-blue-600'
                          : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      {activeSection === sec.id && (
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Data Rights Inquiries Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#EAF2FB] to-[#F2F7FD] border border-blue-100 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-600 border border-blue-600/30">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#102039] font-heading">Data Subject Rights?</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    To request access, download, or deletion of your personal records or candidate CV, contact our Data Protection Officer directly.
                  </p>
                </div>
                <div className="space-y-2 pt-1 text-xs">
                  <a
                    href="mailto:privacy@gokatech.com"
                    className="flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>privacy@gokatech.com</span>
                  </a>
                  <a
                    href="mailto:dpo@gokatech.com"
                    className="flex items-center space-x-2 text-slate-700 hover:text-[#102039]"
                  >
                    <KeyRound className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                    <span>dpo@gokatech.com</span>
                  </a>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <Link
                    to="/terms"
                    className="text-xs text-slate-600 hover:text-blue-600 flex items-center justify-between group"
                  >
                    <span>Read Terms & Conditions</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Detailed Sections */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Introduction */}
            <section id="introduction" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">01</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Introduction & Global Scope</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  <strong>GOKATECH INC</strong> ("GOKATECH", "we", "us", or "our") is a multinational Mobile App Development, Enterprise IT Consulting, and Strategic Staffing organization headquartered in Frisco, Texas, United States. We operate an interconnected network of regional consulting offices and global delivery centers across:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-medium text-slate-800">
                  <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Frisco, Texas (HQ)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Edison, New Jersey</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Indianapolis, Indiana</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Cologne, Germany (EU)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/70 border border-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Hyderabad, India (ODC)</span>
                  </div>
                </div>
                <p className="pt-2">
                  This Enterprise Privacy Policy describes our practices regarding the collection, processing, transfer, and retention of personal information through our public web presence (<code className="text-blue-600 text-xs bg-white px-1.5 py-0.5 rounded">gokatech.com</code>), employer portals, employee document vaults, recruitment job boards, and cloud consulting engagements.
                </p>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section id="data-collection" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">02</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Categories of Information We Collect</h2>
              </div>
              <div className="text-sm space-y-4 leading-relaxed text-slate-700">
                <p>
                  We collect information through multiple distinct channels depending on how you interact with GOKATECH:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-[#102039] uppercase tracking-wider text-blue-500">
                      A. Corporate & Client Inquiries
                    </h4>
                    <p className="text-xs text-slate-700">
                      When requesting a project quote, technical baseline consultation, or staffing request, we collect your full name, business email address, direct phone number, company name, industry vertical, technical requirements, estimated timeline, and project budget parameters.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-[#102039] uppercase tracking-wider text-blue-500">
                      B. Job Applicants & Career Candidates
                    </h4>
                    <p className="text-xs text-slate-700">
                      When applying for open positions via our Job Board, we collect your curriculum vitae (CV)/resume, portfolio links (GitHub, LinkedIn), contact numbers, educational history, work experience, certifications, salary expectations, immigration work authorization status (e.g. US Citizen, Green Card, H-1B, OPT/CPT), and references.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-[#102039] uppercase tracking-wider text-blue-500">
                      C. Employee Document Portal Records
                    </h4>
                    <p className="text-xs text-slate-700">
                      For engaged consultants and direct employees, our secure document repository manages onboarding forms (e.g. W-4, I-9, direct deposit banking instructions, photo identification, NDA acknowledgments, and state compliance forms). These records are encrypted under stringent role-based access protocols.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/60 border border-slate-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-[#102039] uppercase tracking-wider text-blue-500">
                      D. Automatically Logged Telemetry
                    </h4>
                    <p className="text-xs text-slate-700">
                      When you access our online systems, our edge infrastructure automatically logs network IP addresses, browser user-agent signatures, referrer URLs, operating system metadata, and timestamped page navigation metrics to detect DDoS attacks, prevent fraud, and ensure platform uptime.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Legal Bases */}
            <section id="purposes-processing" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">03</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Lawful Bases & Purposes of Data Processing</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  We process your data strictly under recognized lawful bases pursuant to applicable international data protection statutes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200 space-y-1.5">
                    <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Contractual Necessity</span>
                    </div>
                    <p className="text-slate-600">
                      To draft, negotiate, and execute Statements of Work, deliver contracted IT solutions, invoice deliverables, and honor SLA commitments.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200 space-y-1.5">
                    <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Talent Evaluation</span>
                    </div>
                    <p className="text-slate-600">
                      To assess candidate qualifications for engineering openings, conduct technical screenings, and match consultants with client requirements.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200 space-y-1.5">
                    <div className="flex items-center space-x-2 text-blue-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Legal Compliance</span>
                    </div>
                    <p className="text-slate-600">
                      To fulfill employment tax obligations, USCIS verification, OFAC sanctions screening, and statutory audits in the US, Germany, and India.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200 space-y-1.5">
                    <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Legitimate Business Interests</span>
                    </div>
                    <p className="text-slate-600">
                      To safeguard our cyber perimeter against intrusion, enhance website responsiveness, and maintain business continuity.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Security Architecture */}
            <section id="security-architecture" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">04</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Enterprise Security & Storage Architecture</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  As an enterprise IT consulting firm recognized for engineering rigor, GOKATECH implements a defense-in-depth security architecture designed to prevent unauthorized access, alteration, or disclosure:
                </p>
                <div className="space-y-2.5 pt-1 text-xs">
                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 border border-slate-200">
                    <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#102039] block">Cryptographic Encryption (Transit & Rest):</strong>
                      <span className="text-slate-600">All browser and API transmissions are enforced over TLS 1.3 encryption. Backend database clusters and file storage systems utilize AES-256 bit encryption at rest with automated key rotation.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 border border-slate-200">
                    <Database className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#102039] block">PostgreSQL Row-Level Security (RLS):</strong>
                      <span className="text-slate-600">Our Supabase enterprise database enforces granular Row-Level Security (RLS) policies. Only authenticated administrators with multi-factor authentication (MFA) can inspect quotes, applications, or staffing requests.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-xl bg-white/60 border border-slate-200">
                    <Server className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#102039] block">Zero-Trust Network Isolation:</strong>
                      <span className="text-slate-600">Client source repositories and development sandboxes are isolated within dedicated Virtual Private Clouds (VPCs) with strict IP whitelisting and continuous intrusion monitoring.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. GDPR & CCPA */}
            <section id="gdpr-ccpa" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">05</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">GDPR, CCPA & Multi-Jurisdictional Cross-Border Transfers</h2>
              </div>
              <div className="text-sm space-y-4 leading-relaxed text-slate-700">
                <p>
                  Because GOKATECH serves global enterprises and maintains an office in Cologne, Germany alongside offshore centers in Hyderabad, India, our data flows comply with multi-jurisdictional privacy standards:
                </p>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-xs">
                  <h4 className="font-bold text-[#102039] flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>European Economic Area (EEA) / GDPR Notice:</span>
                  </h4>
                  <p className="text-blue-200">
                    For individuals located in the EU or UK, data transfers to our US headquarters or India delivery center are conducted pursuant to European Commission Standard Contractual Clauses (SCCs) to guarantee an equivalent level of data protection. You have the right to lodge a complaint with your local supervisory authority.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-600/20 space-y-2 text-xs">
                  <h4 className="font-bold text-[#102039] flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>California Consumer Privacy Act (CCPA / CPRA):</span>
                  </h4>
                  <p className="text-slate-700">
                    If you are a California resident, you have statutory rights including: (1) Right to Know what personal information has been collected; (2) Right to Delete personal information; (3) Right to Correct inaccurate data; and (4) Right to Non-Discrimination for exercising your rights.
                  </p>
                  <p className="text-blue-500 font-semibold pt-1">
                    GOKATECH DOES NOT SELL OR SHARE PERSONAL INFORMATION FOR MONETARY OR COMMERCIAL CONSIDERATION.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Candidate & Employee Data */}
            <section id="candidate-retention" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">06</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Applicant, Candidate & Employee Records</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  When you submit your application through our Job Board or send your resume to <code className="text-blue-600 text-xs bg-white px-1.5 py-0.5 rounded">careers@gokatech.com</code>, your information is processed solely for recruitment, skill verification, and potential client placement matching.
                </p>
                <p>
                  <strong>Pre-Employment Background Checks:</strong> Certain enterprise client contracts (notably in financial services, healthcare, and federal infrastructure) mandate background checks (criminal history, education verification, drug screening). Such checks are conducted exclusively with your prior explicit written authorization through accredited third-party screening partners.
                </p>
                <p>
                  <strong>Right to Remove Candidate Profile:</strong> Candidates may request the permanent removal of their resume and candidate profile from our applicant database at any time by emailing <a href="mailto:careers@gokatech.com" className="text-blue-600 hover:underline">careers@gokatech.com</a>.
                </p>
              </div>
            </section>

            {/* 7. Retention Periods */}
            <section id="retention-periods" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">07</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Data Retention Schedules</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  We retain personal information only for as long as necessary to fulfill the purposes for which it was gathered, or as required by applicable legal, tax, or regulatory standards:
                </p>
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-white text-slate-600 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3 border-b border-slate-200">Data Category</th>
                        <th className="p-3 border-b border-slate-200">Retention Period</th>
                        <th className="p-3 border-b border-slate-200">Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      <tr>
                        <td className="p-3 font-medium text-[#102039]">Client Project Artifacts & SOWs</td>
                        <td className="p-3">7 Years post completion</td>
                        <td className="p-3 text-slate-600">Statutory tax, commercial audit & warranty obligations</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-[#102039]">Job Applicant Resumes & Portfolios</td>
                        <td className="p-3">24 Months (or until deletion request)</td>
                        <td className="p-3 text-slate-600">Candidate talent matching for recurring technical roles</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-[#102039]">Employee Onboarding Documents (W4, I-9)</td>
                        <td className="p-3">7 Years post employment</td>
                        <td className="p-3 text-slate-600">IRS and US Department of Labor legal compliance</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-[#102039]">General Web Contact Inquiries</td>
                        <td className="p-3">12 Months</td>
                        <td className="p-3 text-slate-600">Sales pipeline management and service follow-up</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 8. Your Rights */}
            <section id="data-subject-rights" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">08</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Your Data Subject Rights & Choices</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  Regardless of geographic residence, GOKATECH extends comprehensive data governance rights to all individuals:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block font-medium">Right to Access & Portability</strong>
                    <span className="text-slate-600">Request a machine-readable copy (JSON/CSV) of the personal information we maintain concerning you.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block font-medium">Right to Rectification</strong>
                    <span className="text-slate-600">Request immediate correction of any inaccurate, incomplete, or out-of-date personal information.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block font-medium">Right to Erasure ("To Be Forgotten")</strong>
                    <span className="text-slate-600">Request total expungement of your personal data, subject to legitimate statutory retention requirements.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block font-medium">Right to Restrict or Object</strong>
                    <span className="text-slate-600">Object to data processing based on legitimate interests or revoke previously granted consent at any time.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-2">
                  To exercise any of these rights, email our team at <a href="mailto:privacy@gokatech.com" className="text-blue-600 hover:underline">privacy@gokatech.com</a>. We respond to all verified requests within thirty (30) days without charge.
                </p>
              </div>
            </section>

            {/* 9. Sub-processors */}
            <section id="subprocessors" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">09</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Sub-processors & Third-Party Infrastructure</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  To deliver scalable enterprise web platforms and secure storage, GOKATECH engages reputable technology vendors who act strictly as data processors under binding Data Processing Agreements (DPAs):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block">Supabase Inc.</strong>
                    <span className="text-slate-600 text-[11px] block mt-1">Managed PostgreSQL Cloud Database & Row-Level Security infrastructure.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block">Vercel Inc.</strong>
                    <span className="text-slate-600 text-[11px] block mt-1">Global Edge Network, CDN caching, and serverless hosting operations.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/60 border border-slate-200">
                    <strong className="text-[#102039] block">AWS / Azure / GCP</strong>
                    <span className="text-slate-600 text-[11px] block mt-1">Secure isolated client cloud compute sandboxes and backup vaults.</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 pt-2">
                  None of our sub-processors are permitted to use your personal information for their own marketing or secondary purposes.
                </p>
              </div>
            </section>

            {/* 10. Cookies & Telemetry */}
            <section id="cookies-telemetry" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">10</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Cookies & Telemetry Controls</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  Our digital assets utilize strictly essential cookies and performance cookies to maintain authenticated sessions (e.g. employee document portal and admin dashboard) and monitor server latency.
                </p>
                <p>
                  We do not employ cross-site tracking pixels or invasive third-party behavioral advertising cookies. You may disable cookies via your browser preferences; however, disabling strictly essential session tokens may limit your ability to access administrative or portal features.
                </p>
              </div>
            </section>

            {/* 11. Protection of Minors */}
            <section id="minors" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">11</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Protection of Minors</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  Our services, employment opportunities, and corporate platforms are designed exclusively for enterprise clients and professional candidates aged 18 and older. We do not knowingly solicit or collect personal information from individuals under the age of 18. If we discover that personal information has been inadvertently collected from a minor, we will delete such data expeditiously.
                </p>
              </div>
            </section>

            {/* 12. DPO & Contact */}
            <section id="dpo-contact" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center font-bold text-sm">12</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Data Protection Officer & Privacy Contacts</h2>
              </div>
              <div className="text-sm space-y-4 leading-relaxed text-slate-700">
                <p>
                  For any privacy questions, data subject access requests, or regulatory communications regarding GOKATECH INC's data governance practices, please reach out to our designated Data Protection Officer:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2">
                    <strong className="text-[#102039] block font-heading">Data Protection Officer (DPO)</strong>
                    <p className="text-slate-600">
                      GOKATECH INC<br />
                      Attn: Global Data Privacy Office<br />
                      425 Old Newman Rd, Suite #503<br />
                      Frisco, TEXAS 75036, USA
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2">
                    <strong className="text-[#102039] block font-heading">Direct Privacy Contacts</strong>
                    <p className="text-slate-600">
                      Primary Privacy Email: <a href="mailto:privacy@gokatech.com" className="text-blue-600 hover:underline">privacy@gokatech.com</a><br />
                      DPO Direct: <a href="mailto:dpo@gokatech.com" className="text-blue-600 hover:underline">dpo@gokatech.com</a><br />
                      Headquarters Tel: <a href="tel:+14259712345" className="text-slate-700 hover:text-[#102039]">+1 425 971 2345</a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/80">
                  <Link
                    to="/terms"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    <span>Review Terms of Service & MSA</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-1 text-xs text-slate-600 hover:text-[#102039] transition-colors"
                  >
                    <span>View Global Delivery Centers</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

