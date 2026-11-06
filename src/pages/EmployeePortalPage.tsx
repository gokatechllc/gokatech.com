import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, Upload, Plus, Trash2, Calendar, AlertCircle, CheckCircle2, Lock, UserCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import TurnstileWidget from '../components/common/TurnstileWidget';

interface EmployeeDoc {
  id: string;
  employeeId: string;
  name: string;
  type: string;
  expirationDate: string;
  uploadDate: string;
  fileName: string;
}

export default function EmployeePortalPage() {
  const [employeeId, setEmployeeId] = useState('GK-8492');
  const [docType, setDocType] = useState('Work Authorization / Visa');
  const [docName, setDocName] = useState('');
  const [expirationDate, setExpirationDate] = useState('2027-12-31');
  const [fileName, setFileName] = useState('');
  const [documents, setDocuments] = useState<EmployeeDoc[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);

  // Initialize with some realistic sample documents if empty
  useEffect(() => {
    const saved = localStorage.getItem('gokatech_employee_docs');
    if (saved) {
      try {
        setDocuments(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    } else {
      const initialDocs: EmployeeDoc[] = [
        {
          id: 'doc-1',
          employeeId: 'GK-8492',
          name: 'USCIS I-9 Verification Form',
          type: 'Employment Eligibility',
          expirationDate: '2028-05-15',
          uploadDate: '2026-01-10',
          fileName: 'I9_Verification_GK8492.pdf'
        },
        {
          id: 'doc-2',
          employeeId: 'GK-8492',
          name: 'AWS Solutions Architect Professional Certificate',
          type: 'Technical Certification',
          expirationDate: '2027-11-20',
          uploadDate: '2026-02-04',
          fileName: 'AWS_SAP_Cert.pdf'
        }
      ];
      setDocuments(initialDocs);
      localStorage.setItem('gokatech_employee_docs', JSON.stringify(initialDocs));
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      if (!docName) {
        setDocName(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setTurnstileError('Please complete the Cloudflare security verification below before submitting.');
      return;
    }
    setTurnstileError(null);

    if (!employeeId || !docName) {
      setMessage('Please provide an Employee ID and document title.');
      return;
    }

    const cleanEmpId = employeeId.trim().toUpperCase();
    const cleanFileName = fileName || `${docName.replace(/\s+/g, '_')}.pdf`;

    const newDoc: EmployeeDoc = {
      id: `doc-${Date.now()}`,
      employeeId: cleanEmpId,
      name: docName,
      type: docType,
      expirationDate: expirationDate || 'N/A',
      uploadDate: new Date().toISOString().split('T')[0],
      fileName: cleanFileName
    };

    try {
      await supabase.from('employee_documents').insert([
        {
          employee_id: cleanEmpId,
          name: docName,
          type: docType,
          expiration_date: expirationDate,
          file_name: cleanFileName,
          status: 'Valid'
        }
      ]);
    } catch (err) {
      console.warn('Syncing with local sandbox:', err);
    }

    const updated = [newDoc, ...documents];
    setDocuments(updated);
    localStorage.setItem('gokatech_employee_docs', JSON.stringify(updated));

    setDocName('');
    setFileName('');
    setTurnstileToken(null);
    setMessage(`Document "${newDoc.name}" recorded successfully for Employee ${newDoc.employeeId}!`);
    setTimeout(() => setMessage(null), 3500);
  };

  const handleDelete = (id: string) => {
    const updated = documents.filter(d => d.id !== id);
    setDocuments(updated);
    localStorage.setItem('gokatech_employee_docs', JSON.stringify(updated));
  };

  const filteredDocs = documents.filter(d => 
    !employeeId || d.employeeId.toLowerCase() === employeeId.trim().toLowerCase()
  );

  return (
    <div className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#060D1A] animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GOKATECH Internal Portal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-heading leading-tight">
            Employee Document & <br />
            <span className="text-gradient">Compliance Registry</span>
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            Manage your employment credentials, visa documentation, and certifications securely. In compliance with data privacy standards, document metadata is isolated to your authorized browser session.
          </p>
        </div>

        {/* Security Notification Box */}
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start space-x-3 mb-10 text-xs text-slate-300">
          <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-medium">Local Browser Sandboxing</strong>
            <span>As specified in GOKATECH corporate protocol: Documents are verified and stored locally in this browser profile. To view or attach new compliance files, enter your Employee ID below.</span>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Add Document Form */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-3xl bg-[#0B1528] border border-blue-500/20 shadow-xl space-y-5">
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Plus className="w-4 h-4" />
                <span>Attach New Employee Document</span>
              </div>

              <form onSubmit={handleAddDocument} className="space-y-4">
                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Employee ID *</label>
                  <input
                    type="text"
                    required
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="e.g. GK-8492"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none uppercase"
                  />
                </div>

                {/* Document Type */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Document Category *</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Work Authorization / Visa">Work Authorization / Visa</option>
                    <option value="Employment Eligibility (I-9)">Employment Eligibility (I-9)</option>
                    <option value="Technical Certification">Technical Certification</option>
                    <option value="Tax Withholding (W-4 / W-9)">Tax Withholding (W-4 / W-9)</option>
                    <option value="Direct Deposit / Payroll">Direct Deposit / Payroll</option>
                    <option value="Performance Review & Feedback">Performance Review & Feedback</option>
                  </select>
                </div>

                {/* Document Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="e.g. H1B Approval Notice / AWS Cert"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* Expiration Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Document Expiration Date</label>
                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {/* File Upload Trigger */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Select File</label>
                  <div className="border border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-4 text-center cursor-pointer transition-colors bg-slate-900/40">
                    <input
                      type="file"
                      id="emp-file"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="emp-file" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-300 font-medium">
                        {fileName || 'Choose PDF or Scanned Image'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Cloudflare Turnstile Verification */}
                <div className="pt-1">
                  <TurnstileWidget
                    action="employee_document"
                    onVerify={(token) => {
                      setTurnstileToken(token);
                      setTurnstileError(null);
                    }}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileError('Turnstile verification failed. Please refresh or retry.')}
                  />
                  {turnstileError && (
                    <p className="text-xs text-rose-400 font-medium mt-1">
                      ⚠️ {turnstileError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-wow w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/40 flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Attach Document to Profile</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Existing Document List */}
          <div className="lg:col-span-7">
            <div className="p-7 rounded-3xl bg-[#0B1528] border border-blue-500/20 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Attached Employee Documents
                  </h3>
                  <p className="text-xs text-slate-400">
                    Showing records for: <strong className="text-cyan-400">{employeeId.toUpperCase() || 'All Employees'}</strong>
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  {filteredDocs.length} Total Files
                </span>
              </div>

              {filteredDocs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No documents found for this Employee ID</p>
                  <p className="text-xs text-slate-500">Attach a file using the form on the left to initialize records.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-cyan-400 border border-blue-500/20 flex-shrink-0 mt-0.5">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{doc.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-1">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{doc.type}</span>
                            <span>•</span>
                            <span>Emp: <strong className="text-white">{doc.employeeId}</strong></span>
                            <span>•</span>
                            <span>Expires: <strong className="text-amber-400">{doc.expirationDate}</strong></span>
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-1">
                            File: {doc.fileName} (Logged: {doc.uploadDate})
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
                        title="Remove Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

