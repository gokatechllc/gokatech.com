import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PartnersPage from './pages/PartnersPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import EmployersPage from './pages/EmployersPage';
import EmployeePortalPage from './pages/EmployeePortalPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminQuotes from './pages/admin/AdminQuotes';
import AdminApplications from './pages/admin/AdminApplications';
import AdminJobsManager from './pages/admin/AdminJobsManager';
import AdminStaffing from './pages/admin/AdminStaffing';
import AdminMessages from './pages/admin/AdminMessages';
import AdminDocuments from './pages/admin/AdminDocuments';

export default function App() {
  return (
    <Routes>
      {/* Admin Portal Routes (No Public Header/Footer) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="quotes" element={<AdminQuotes />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="jobs" element={<AdminJobsManager />} />
        <Route path="staffing" element={<AdminStaffing />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="documents" element={<AdminDocuments />} />
      </Route>

      {/* Public Website Routes (Wrapped with Layout) */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              
              {/* Legacy Gokatech URL support */}
              <Route path="/portfolio" element={<Navigate to="/partners" replace />} />
              <Route path="/portfolio.html" element={<Navigate to="/partners" replace />} />
              <Route path="/about.html" element={<Navigate to="/about" replace />} />
              <Route path="/services.html" element={<Navigate to="/services" replace />} />
              
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/careers" element={<Navigate to="/jobs" replace />} />
              <Route path="/careers.html" element={<Navigate to="/jobs" replace />} />
              <Route path="/Jobs_with_postings.html" element={<Navigate to="/jobs" replace />} />

              <Route path="/employers" element={<EmployersPage />} />
              <Route path="/code7.html" element={<Navigate to="/employers" replace />} />

              <Route path="/employee-portal" element={<EmployeePortalPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contact.html" element={<Navigate to="/contact" replace />} />

              {/* Legal, Governance & Terms Routes */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
              <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
              <Route path="/terms.html" element={<Navigate to="/terms" replace />} />

              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
              <Route path="/privacy.html" element={<Navigate to="/privacy" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
