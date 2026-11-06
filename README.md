# GOKATECH INC - Official Website & Talent Portal

> **Where Innovation Meets Excellence**  
> A premier Mobile App Development, Enterprise IT Consulting, and Staffing platform.

Built with **React 18**, **Vite 6**, **TypeScript**, **Tailwind CSS**, **Supabase Backend**, and **Vercel** deployment support.

---

## 🌟 Overview & Design Fusion

This project reimagines and modernizes **[gokatech.com](https://gokatech.com)** by fusing the authentic corporate branding, official logo, Texas IT Consulting Awards, and Fortune 500 partner network of GOKATECH with high-end design patterns inspired by:

1. **[Miiler Tech & Agency Theme](https://html.storebuild.shop/miiler-demo/)**:
   - Modern dark/light glassmorphic contrast with deep navy (`#060D1A`), electric blue, and gold accents
   - High-impact hero section with floating metric badges ("100% Referenceable", "Triple Crown Award Winner", "5 Global Hubs")
   - Enterprise client logo marquee ticker featuring 32 authentic partner logos
   - Interactive 10-capability services grid with filter pills
   - 4-phase delivery methodology (`01 Strategy`, `02 Architecture`, `03 Agile Build`, `04 Cloud Launch`)
   - Interactive Request a Quote & Technical Audit modal

2. **[JobAway Career & Staffing Theme](https://jobaway.pixcelsthemes.com/)**:
   - Integrated live career search bar right in the hero & dedicated `/jobs` portal
   - Filter by department, location (Frisco TX, Edison NJ, Remote, Germany, India), and job type (Full-time, Contract, Remote, Hybrid)
   - Sleek job cards with salary ranges, experience requirements, skill badges, and urgent/featured tags
   - Interactive job application modal with resume upload, candidate contact info, and instant submission verification
   - Dedicated employer staffing request hub (`/employers`)

---

## ⚡ Supabase Backend & Database Architecture

The application connects to **Supabase** (`https://kzdmqmtikduhvinsherz.supabase.co`) with real-time PostgreSQL storage:

- **`quote_requests`**: Stores client consultation requests, budgets, selected capabilities, and statuses.
- **`job_applications`**: Stores applicant resumes, contact information, portfolio links, and screening states.
- **`job_openings`**: Live job board catalog with real-time CRUD management directly from the admin panel.
- **`staffing_requests`**: Corporate workforce augmentation and dedicated engineering pod requests.
- **`contact_inquiries`**: Direct website communication inquiries routed by department.
- **`employee_documents`**: Employee compliance registry for work authorizations, I-9, and certifications.
- **`admin_users`**: Secure administrator access credentials.

---

## 🛡️ Cloudflare Turnstile Bot & Spam Protection

All public and internal forms across the application are protected by **Cloudflare Turnstile**:

- **Site Key**: `0x4AAAAAAFzeyC3yJiAmD_LY`
- **Secret Key**: `0x4AAAAAAFzeyCTZjGl6FrI_YHdoE2_B5h4`
- **Protected Forms**:
  1. 💼 **Request a Quote Modal** (`QuoteModal.tsx`) - Client RFPs & project audits
  2. 📝 **Job Application Modal** (`JobApplyModal.tsx`) - Career applications & CV uploads
  3. 📬 **Contact Inquiry Form** (`ContactPage.tsx`) - Direct inquiries to Texas, Germany, and India hubs
  4. 👥 **Employer Staffing Request** (`EmployersPage.tsx`) - Dedicated engineering pod requests
  5. 📁 **Employee Portal Document Vault** (`EmployeePortalPage.tsx`) - Internal work authorization uploads
  6. 🔑 **Admin Dashboard Login** (`AdminLogin.tsx`) - Protection against credential stuffing & brute-force
- **Vercel Serverless Function**: Server-side token verification endpoint provided at `/api/verify-turnstile`.

---

## 🛡️ Admin Dashboard & Control Center

Access the executive admin portal directly at:
- **URL**: [`/admin`](http://localhost:3000/admin) (or [`/admin/login`](http://localhost:3000/admin/login))
- **Default Email**: `admin@gokatech.com`
- **Default Password**: `gokatech7@123!@#`

### Admin Features:
- 📊 **Overview**: Real-time KPI counters and recent activity feeds.
- 💬 **Quote Proposals**: Review incoming client RFPs, change statuses (*New, In Review, Proposal Sent, Closed*), and export to CSV.
- 💼 **Job Candidates**: Screen applicants, view cover notes, inspect resumes, and update recruitment states (*Screening, Shortlisted, Interview Scheduled, Offer Extended*).
- 🚀 **Job Manager**: Post new jobs, edit salary/responsibilities, toggle active/closed status, and set urgent/featured badges.
- 🏢 **Staffing Inquiries**: Review corporate team staffing requests and model requirements.
- 📬 **Messages**: Read and respond to contact inquiries.
- 📁 **Compliance**: Manage employee verification documents and track expiration dates.

---

## 🏢 Company Profile & Details

- **Company Name**: GOKATECH INC
- **Headquarters**: 425 Old Newman Rd #503, Frisco, TEXAS 75036, USA
- **Contact**: +1 425 971 2345 / +1 469 519 6959 | `info@gokatech.com`
- **Global Delivery Network**:
  - **Frisco, TX, USA** (Global Headquarters)
  - **Edison, NJ, USA** (Regional Technology Hub)
  - **Indianapolis, IN, USA** (Midwest Delivery Center)
  - **Cologne (Köln), Germany** (European Delivery Hub)
  - **Hyderabad, Telangana, India** (APAC R&D Center)
- **Awards & Honors**:
  - **Best City IT Consulting Services Award** for Plano, Texas (2015, 2016, 2017)
  - 100% Referenceable Enterprise Client Track Record
- **Client & Partner Roster**:
  - Wells Fargo, Deloitte, Verizon, AT&T, CVS Health, United Healthcare, Vanguard, Erie Insurance, CBRE, Apex Systems, Artech, Birlasoft, Persistent Systems, ValueMomentum, Wissen, Pyramid Consulting, etc.

---

## 🧭 Pages & Multi-Page Architecture

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home Page** | Flagship landing page blending Miiler agency aesthetics & JobAway career preview |
| `/about` | **About Us** | Company history, leadership differentiators, Texas IT awards, global reach |
| `/services` | **Capabilities** | Explorer of all 10 core technology capabilities with category filters |
| `/services/:slug` | **Service Detail** | In-depth architectural breakdown, tech stack chips, and instant quote booking |
| `/partners` | **Partners & Clients** | All 18+ Fortune 500 associates with authentic logos from `/assets/clients/` |
| `/jobs` | **Job Board** | Full JobAway-inspired career portal with dynamic search, filters & live Supabase sync |
| `/jobs/:id` | **Job Detail** | Detailed JD, protocol requirements, compensation & application form |
| `/employers` | **Employer Staffing** | IT staff augmentation, dedicated engineering pods, contract-to-hire |
| `/employee-portal` | **Employee Portal** | Document management & compliance tracker (I-9, Visa, Certs) |
| `/contact` | **Contact & Hubs** | Direct communication form, 5 global office cards with Google Maps links & FAQs |
| `/terms` | **Terms & Conditions** | Master Service Agreement (MSA), IP ownership, SOWs, Collin County Texas jurisdiction, arbitration |
| `/privacy` | **Privacy Policy** | Enterprise data governance, GDPR (Germany), CCPA/CPRA, DPDP Act (India), encryption, retention schedules |
| `/admin` | **Admin Dashboard** | Complete Supabase management console for quotes, candidates, jobs, and staffing |
| `*` | **404 Not Found** | Clean error page with fast redirection links |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v25)
- npm 9+

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Runs the Vite development server with hot module replacement at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Compiles TypeScript and outputs optimized, minified production assets to `dist/`.

### Preview Production Build
```bash
npm run preview
```

---

## ☁️ Vercel Deployment

This project includes complete out-of-the-box support for **Vercel**:
- Configured in `vercel.json` with SPA route rewrites:
  ```json
  {
    "version": 2,
    "rewrites": [
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```
- Deploy using the Vercel CLI:
  ```bash
  npx vercel
  ```
  or connect your GitHub repository directly to Vercel (framework preset automatically detected as **Vite**).
