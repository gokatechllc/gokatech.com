import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  Mail, 
  Phone, 
  ArrowRight, 
  Printer, 
  Sparkles, 
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyData';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('acceptance');

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'scope-of-services', title: '2. Scope of Services & SOWs' },
    { id: 'intellectual-property', title: '3. Intellectual Property Rights' },
    { id: 'client-responsibilities', title: '4. Client Responsibilities' },
    { id: 'payment-terms', title: '5. Fees, Invoicing & Payment' },
    { id: 'confidentiality', title: '6. Confidentiality & Non-Disclosure' },
    { id: 'warranties', title: '7. Warranties & Disclaimers' },
    { id: 'limitation-of-liability', title: '8. Limitation of Liability' },
    { id: 'term-termination', title: '9. Term & Termination' },
    { id: 'non-solicitation', title: '10. Non-Solicitation of Personnel' },
    { id: 'governing-law', title: '11. Governing Law & Arbitration' },
    { id: 'contact-legal', title: '12. Legal Inquiries & Notices' }
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
          <span className="text-blue-600 font-medium">Terms & Conditions</span>
        </div>

        {/* Page Header Hero */}
        <div className="relative mb-8 sm:mb-10 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#EAF2FB] via-white to-[#F2F7FD] border border-blue-100 shadow-lg overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600">
              <Scale className="w-3.5 h-3.5" />
              <span>GOKATECH Enterprise Terms of Service</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102039] tracking-tight font-heading">
              Terms & Conditions <br />
              <span className="text-gradient">Master Service Agreement (MSA)</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              These Terms & Conditions govern your access to and engagement with GOKATECH INC software development, IT consulting, cloud engineering, and staffing services. Please review these contractual provisions carefully before engaging our services or using our digital platforms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Effective Date: <strong>November 1, 2026</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/60 px-3 py-1.5 rounded-lg border border-slate-200">
                <Building className="w-3.5 h-3.5 text-blue-600" />
                <span>Jurisdiction: <strong>Collin County, Texas, USA</strong></span>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-slate-700" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Table of Contents (Sticky on Desktop) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 backdrop-blur-md">
                <h3 className="text-sm font-bold text-[#102039] uppercase tracking-wider mb-4 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Table of Contents</span>
                </h3>
                <nav className="space-y-1">
                  {sections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center justify-between ${
                        activeSection === sec.id
                          ? 'bg-blue-600/20 text-blue-500 font-semibold border-l-2 border-blue-600'
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

              {/* Help & Inquiries Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#EAF2FB] to-[#F2F7FD] border border-blue-100 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#102039] font-heading">Contractual Inquiries?</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Custom Master Service Agreements (MSAs), Enterprise NDAs, or Vendor Compliance Packets can be addressed directly by our corporate counsel.
                  </p>
                </div>
                <div className="space-y-2 pt-1 text-xs">
                  <a
                    href="mailto:legal@gokatech.com"
                    className="flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>legal@gokatech.com</span>
                  </a>
                  <a
                    href="tel:+14259712345"
                    className="flex items-center space-x-2 text-slate-700 hover:text-[#102039]"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>+1 425 971 2345</span>
                  </a>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <Link
                    to="/privacy"
                    className="text-xs text-slate-600 hover:text-blue-600 flex items-center justify-between group"
                  >
                    <span>Read Privacy Policy</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Detailed Sections */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Acceptance */}
            <section id="acceptance" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">01</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Acceptance of Terms</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  This Master Service Agreement & Terms of Service ("Agreement") is executed by and between <strong>GOKATECH INC</strong>, a Texas corporation with its principal executive offices located at 425 Old Newman Rd #503, Frisco, TEXAS 75036 ("GOKATECH", "we", "us", or "our"), and the entity or individual accessing our digital services or executing a Statement of Work ("Client", "you", or "your").
                </p>
                <p>
                  By browsing our website (<code className="text-blue-600 text-xs bg-white px-1.5 py-0.5 rounded">gokatech.com</code>), submitting inquiries or project requests, submitting resumes, onboarding via our employer or employee portals, or signing a formal proposal or Statement of Work (SOW), you confirm that you have read, understood, and agreed to be legally bound by all terms, conditions, and disclaimers contained herein.
                </p>
                <p>
                  If you are entering into this Agreement on behalf of a company, corporation, or other legal entity, you represent and warrant that you possess full corporate authority to bind such entity to these provisions.
                </p>
              </div>
            </section>

            {/* 2. Scope of Services */}
            <section id="scope-of-services" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">02</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Scope of Services & Statements of Work (SOW)</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  GOKATECH delivers specialized information technology capabilities, including but not limited to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
                  {[
                    'Enterprise Web & Mobile App Development',
                    'Cloud Migration, Architecture & DevOps',
                    'Enterprise AI, ML & Predictive Automation',
                    'Strategic IT Staff Augmentation & Contract Placements',
                    'Custom ERP, CRM & Legacy Integration',
                    'Cybersecurity Baseline Assessments & Hardening',
                    'Quality Engineering & Automated Test Frameworks',
                    '24/7 Managed Cloud Infrastructure & SLA Support'
                  ].map((srv, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-white/60 p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-800">{srv}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-2">
                  Specific deliverables, engineering sprint schedules, key performance indicators (KPIs), billable hourly rates, milestone payments, and acceptance criteria shall be memorialized in mutually executed Statements of Work (SOWs) or Work Authorizations. In the event of a direct conflict between the terms of this Master Agreement and any specific SOW, the specific terms of the SOW shall govern solely with respect to that project.
                </p>
              </div>
            </section>

            {/* 3. Intellectual Property */}
            <section id="intellectual-property" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">03</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Intellectual Property Rights</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 space-y-1">
                  <span className="font-bold text-[#102039] block">Work Product Ownership Principle:</span>
                  Upon full and final payment of all undisputed fees due under the applicable SOW, all custom source code, documentation, and specific deliverables authored exclusively for the Client ("Work Product") shall become the proprietary property of the Client.
                </div>
                <p>
                  <strong>GOKATECH Background IP & Accelerators:</strong> GOKATECH retains sole and exclusive ownership of all pre-existing software, generic frameworks, architectural accelerators, algorithmic libraries, templates, and know-how developed prior to or independently of this Agreement ("Pre-Existing Technology"). To the extent such Pre-Existing Technology is embedded within a client deliverable, GOKATECH grants the Client a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, execute, reproduce, and display such technology solely as an integrated part of the deliverable.
                </p>
                <p>
                  <strong>Open Source Software:</strong> Solutions may incorporate open-source software libraries licensed under permissive terms (such as MIT, Apache 2.0, or BSD). Neither party shall incorporate open-source software with reciprocal ("copyleft") restrictions (e.g., AGPL/GPL) into proprietary deliverables without prior written stakeholder authorization.
                </p>
              </div>
            </section>

            {/* 4. Client Responsibilities */}
            <section id="client-responsibilities" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">04</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Client Responsibilities & Prerequisites</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  To ensure on-time milestone delivery and adherence to engineering schedules, the Client agrees to:
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>Designate a qualified Product Owner or Technical Lead empowered to make timely architectural decisions and approve sprint milestones.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>Furnish requisite staging environment access, third-party API credentials, sample test datasets, and security clearances in a timely manner.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>Conduct User Acceptance Testing (UAT) within ten (10) business days of milestone handover. If no formal written defect notice is delivered within this period, deliverables shall be deemed accepted.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 font-bold">&bull;</span>
                    <span>Ensure that all materials, source codes, logos, and datasets provided to GOKATECH do not infringe upon any third-party copyrights, patents, or trade secrets.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Payment Terms */}
            <section id="payment-terms" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">05</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Fees, Invoicing & Payment Terms</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  <strong>Billing Models:</strong> Professional services may be billed on a Time & Materials (T&M) basis, fixed-price milestone schedules, or dedicated monthly retainer squads, as defined in each SOW.
                </p>
                <p>
                  <strong>Payment Timing:</strong> Invoices are rendered semi-monthly or monthly and are payable within <strong>Net 30 days</strong> from the invoice date (or Net 15 where specifically agreed in an SOW). All payments shall be remitted in United States Dollars (USD), or Euros (EUR) for engagements contracted through our Cologne, Germany hub.
                </p>
                <p>
                  <strong>Late Payments:</strong> Undisputed amounts overdue beyond the agreed payment term shall accrue interest at the lesser rate of 1.5% per month or the maximum statutory rate permitted under Texas state law. GOKATECH reserves the right to pause engineering services or withhold source code release for accounts in arrears beyond 45 days.
                </p>
                <p>
                  <strong>Taxes:</strong> All quoted rates exclude federal, state, local, or value-added taxes (VAT/GST). The Client is responsible for paying all applicable taxes associated with purchases under this Agreement, excluding taxes based on GOKATECH's net corporate income.
                </p>
              </div>
            </section>

            {/* 6. Confidentiality */}
            <section id="confidentiality" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">06</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Confidentiality & Non-Disclosure</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  Each party ("Recipient") agrees that all information disclosed by the other party ("Discloser") marked as proprietary or confidential, or which by its nature reasonably should be understood to be confidential—including source code, system architectures, customer lists, pricing proposals, and trade secrets—shall be protected with the same degree of care as its own confidential information, but in no event less than reasonable care.
                </p>
                <p>
                  Confidential information shall not include information that: (a) becomes publicly available without breach of this Agreement; (b) was already known to the Recipient prior to disclosure; (c) is independently developed without reference to the Discloser's confidential information; or (d) is required to be disclosed by valid subpoena or judicial order, subject to prompt prior notification.
                </p>
                <p>
                  These confidentiality covenants survive termination of this Agreement for a period of five (5) years, with trade secrets protected in perpetuity under applicable law.
                </p>
              </div>
            </section>

            {/* 7. Warranties */}
            <section id="warranties" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">07</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Warranties & Disclaimers</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  <strong>Professional Standard of Care:</strong> GOKATECH represents and warrants that all engineering, consulting, and staffing services will be performed in a professional, workmanlike manner in accordance with prevailing software engineering best practices and industry standards.
                </p>
                <p>
                  <strong>Warranty Period:</strong> Custom software deliverables carry a thirty (30) day defect warranty from formal acceptance, during which GOKATECH shall rectify verified functional deviations from documented SOW specifications at no additional cost.
                </p>
                <div className="p-4 rounded-xl bg-white/80 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <span className="font-bold text-slate-800 block uppercase tracking-wider text-[11px]">Disclaimer:</span>
                  <p>
                    EXCEPT AS EXPRESSLY SET FORTH HEREIN, GOKATECH MAKES NO WARRANTIES, STATUTORY, EXPRESS, OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. GOKATECH DOES NOT WARRANT THAT SOFTWARE OPERATION WILL BE UNINTERRUPTED OR ENTIRELY BUG-FREE, OR THAT IT WILL SATISFY REQUIREMENTS NOT EXPLICITLY CAPTURED IN AN SOW.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Limitation of Liability */}
            <section id="limitation-of-liability" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">08</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Limitation of Liability</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Consequential Damages Waiver:</strong> NEITHER PARTY SHALL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES (INCLUDING LOSS OF PROFITS, DATA, USE, GOODWILL, OR BUSINESS INTERRUPTION) ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Aggregate Monetary Cap:</strong> GOKATECH'S MAXIMUM AGGREGATE LIABILITY ARISING UNDER ANY SOW OR THIS AGREEMENT, REGARDLESS OF THE LEGAL THEORY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE), SHALL BE LIMITED TO THE TOTAL FEES ACTUALLY RECEIVED BY GOKATECH FROM CLIENT UNDER THE SPECIFIC SOW GIVING RISE TO THE CLAIM IN THE SIX (6) MONTHS PRECEDING THE OCCURRENCE.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 9. Term & Termination */}
            <section id="term-termination" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">09</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Term, Termination & Transition</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  <strong>Duration:</strong> This Agreement commences upon initial acceptance and remains active until terminated by either party in accordance with this Section.
                </p>
                <p>
                  <strong>Termination for Convenience:</strong> Unless otherwise specified in an SOW, either party may terminate an active SOW or this Agreement without cause upon thirty (30) days prior written notice. Client remains liable for all work completed, hours logged, and non-cancelable third-party commitments incurred up to the effective termination date.
                </p>
                <p>
                  <strong>Termination for Cause:</strong> Either party may immediately terminate this Agreement upon written notice if the other party: (a) materially breaches any material provision and fails to remedy such breach within thirty (30) days of written notice; or (b) becomes insolvent, files for bankruptcy, or enters receivership.
                </p>
                <p>
                  <strong>Transition Assistance:</strong> Upon termination, GOKATECH shall reasonably cooperate to deliver existing completed work product, repositories, documentation, and access credentials, subject to receipt of all undisputed payments.
                </p>
              </div>
            </section>

            {/* 10. Non-Solicitation */}
            <section id="non-solicitation" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">10</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Non-Solicitation of Engineering Personnel</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  During the term of this Agreement and for a period of twelve (12) months following its completion or termination, neither party shall directly or indirectly solicit, induce, recruit, or hire any employee, consultant, or subcontractor of the other party who was directly involved in the performance of services, without the express written consent of the other party.
                </p>
                <p>
                  This covenant shall not preclude employment resulting from general, public employment advertisements not specifically targeted at the personnel of either party. In the event of an unapproved direct hire, the hiring party agrees to pay liquidated damages equal to 30% of the candidate's first-year annualized compensation to offset recruitment and retraining costs.
                </p>
              </div>
            </section>

            {/* 11. Governing Law */}
            <section id="governing-law" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">11</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Governing Law, Jurisdiction & Arbitration</h2>
              </div>
              <div className="text-sm space-y-3 leading-relaxed text-slate-700">
                <p>
                  This Agreement, and all claims or causes of action arising out of or relating hereto, shall be governed by, construed, and enforced in accordance with the laws of the <strong>State of Texas</strong> and applicable federal laws of the United States, without regard to conflict of law principles.
                </p>
                <p>
                  <strong>Dispute Resolution Process:</strong> The parties agree to first attempt in good faith to resolve any dispute through informal executive mediation between authorized C-level officers. If unresolved within thirty (30) days, the dispute shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules, conducted in <strong>Collin County, Texas</strong>.
                </p>
                <p>
                  Judgment on any arbitration award may be entered in any court having competent jurisdiction. The prevailing party shall be entitled to recover reasonable attorneys' fees and administrative arbitration expenses.
                </p>
              </div>
            </section>

            {/* 12. Legal Inquiries */}
            <section id="contact-legal" className="p-8 rounded-2xl bg-white/50 border border-slate-200/80 space-y-4">
              <div className="flex items-center space-x-3 text-blue-600">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-sm">12</span>
                <h2 className="text-xl font-bold text-[#102039] font-heading">Legal Inquiries & Official Notices</h2>
              </div>
              <div className="text-sm space-y-4 leading-relaxed text-slate-700">
                <p>
                  Formal legal notices, contract notices, or inquiries regarding this Master Service Agreement should be transmitted in writing via certified mail or registered email to:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2">
                    <strong className="text-[#102039] block font-heading">Corporate Headquarters</strong>
                    <p className="text-slate-600">
                      GOKATECH INC<br />
                      Attn: Office of the General Counsel<br />
                      425 Old Newman Rd, Suite #503<br />
                      Frisco, TEXAS 75036, USA
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/80 border border-slate-200 space-y-2">
                    <strong className="text-[#102039] block font-heading">Electronic Inquiries</strong>
                    <p className="text-slate-600">
                      Legal Desk: <a href="mailto:legal@gokatech.com" className="text-blue-600 hover:underline">legal@gokatech.com</a><br />
                      General Inquiries: <a href="mailto:info@gokatech.com" className="text-blue-600 hover:underline">info@gokatech.com</a><br />
                      Executive Phone: <a href="tel:+14259712345" className="text-slate-700 hover:text-[#102039]">+1 425 971 2345</a>
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4 items-center justify-between border-t border-slate-200/80">
                  <Link
                    to="/privacy"
                    className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    <span>Proceed to GOKATECH Privacy Policy</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center space-x-1 text-xs text-slate-600 hover:text-[#102039] transition-colors"
                  >
                    <span>Contact Global Delivery Offices</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
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

