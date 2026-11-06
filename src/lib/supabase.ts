/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kzdmqmtikduhvinsherz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_gLKZwhV5yO0QNeqtzT5H1A_zGkwp2Ik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuoteRequestRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  status: string;
}

export interface JobApplicationRow {
  id: string;
  created_at: string;
  job_id: string;
  job_title: string;
  full_name: string;
  email: string;
  phone?: string;
  experience_years?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  resume_file_name?: string;
  cover_note?: string;
  status: string;
}

export interface ContactInquiryRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  subject?: string;
  message: string;
  status: string;
}

export interface StaffingRequestRow {
  id: string;
  created_at: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  roles_needed?: string;
  count?: string;
  timeline?: string;
  model?: string;
  description?: string;
  status: string;
}

export interface JobOpeningRow {
  id: string;
  created_at?: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary_range: string;
  posted_date: string;
  is_urgent: boolean;
  is_featured: boolean;
  status: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
}

export interface EmployeeDocumentRow {
  id: string;
  created_at: string;
  employee_id: string;
  name: string;
  type: string;
  expiration_date?: string;
  file_name?: string;
  status: string;
}
