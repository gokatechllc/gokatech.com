export interface Partner {
  name: string;
  category: 'Enterprise Client' | 'Strategic Partner' | 'Staffing Network';
  logo: string;
  industry: string;
  partnershipYears?: string;
  description?: string;
}

export const partnersData: Partner[] = [
  {
    name: 'Wells Fargo',
    category: 'Enterprise Client',
    logo: '/assets/clients/Wells_Fargo.png',
    industry: 'Banking & Financial Services',
    description: 'Enterprise consulting for banking compliance, distributed transactional workflows, and high-security customer data management.'
  },
  {
    name: 'Deloitte',
    category: 'Strategic Partner',
    logo: '/assets/clients/Deloitte-Logo.jpg',
    industry: 'Management & Technology Consulting',
    description: 'Joint technology modernization projects, ERP rollout implementations, and specialized staff augmentation programs.'
  },
  {
    name: 'Verizon',
    category: 'Enterprise Client',
    logo: '/assets/clients/Verizon-Logo.png',
    industry: 'Telecommunications',
    description: 'Next-generation network operations automation, customer portal engineering, and cloud microservices integration.'
  },
  {
    name: 'AT&T',
    category: 'Enterprise Client',
    logo: '/assets/clients/Color-ATT-Logo.jpg',
    industry: 'Telecommunications & Media',
    description: 'Enterprise data pipeline architecture, billing integration, and automated network infrastructure testing.'
  },
  {
    name: 'United Healthcare',
    category: 'Enterprise Client',
    logo: '/assets/clients/United-Healthcare-Logo.png',
    industry: 'Healthcare & Insurance',
    description: 'HIPAA-compliant telemedicine platforms, claims processing automation, and secure patient records integration.'
  },
  {
    name: 'CVS Health',
    category: 'Enterprise Client',
    logo: '/assets/clients/CVS-Symbol.png',
    industry: 'Healthcare & Retail Pharmacy',
    description: 'Digital pharmacy mobile solutions, real-time inventory synchronization, and omnichannel pharmacy customer portals.'
  },
  {
    name: 'Vanguard',
    category: 'Enterprise Client',
    logo: '/assets/clients/Vanguard-logo.jpg',
    industry: 'Investment Management',
    description: 'High-throughput portfolio analytics, predictive actuarial modeling, and automated cloud infrastructure.'
  },
  {
    name: 'Erie Insurance',
    category: 'Enterprise Client',
    logo: '/assets/clients/erie_insurance.png',
    industry: 'Property & Casualty Insurance',
    description: 'Automated policy lifecycle management, claims fraud scoring engines, and legacy mainframe modernization.'
  },
  {
    name: 'CBRE',
    category: 'Enterprise Client',
    logo: '/assets/clients/cbre.png',
    industry: 'Commercial Real Estate',
    description: 'Digital property management platform with real-time leasing analytics and interactive 3D virtual tour integrations.'
  },
  {
    name: 'Apex Systems',
    category: 'Staffing Network',
    logo: '/assets/clients/Apex.png',
    industry: 'Technology Workforce Solutions',
    description: 'Premier partner for top-tier IT talent acquisition, contract engineering squads, and national staffing deployments.'
  },
  {
    name: 'Artech Information Systems',
    category: 'Staffing Network',
    logo: '/assets/clients/Artech-Logo.png',
    industry: 'Workforce & Consulting',
    description: 'Strategic collaboration in placing high-caliber engineers and software developers across Fortune 500 accounts.'
  },
  {
    name: 'Birlasoft',
    category: 'Strategic Partner',
    logo: '/assets/clients/Birlasoft_logo.png',
    industry: 'Enterprise Digital Solutions',
    description: 'Co-innovation in manufacturing ERP, cloud migrations, and digital business transformation.'
  },
  {
    name: 'Persistent Systems',
    category: 'Strategic Partner',
    logo: '/assets/clients/Persistent.png',
    industry: 'Digital Product Engineering',
    description: 'Partnership in software product engineering, healthcare platforms, and cloud-native acceleration.'
  },
  {
    name: 'ValueMomentum',
    category: 'Strategic Partner',
    logo: '/assets/clients/ValueMomentum-Logo-1.png',
    industry: 'Insurance & Banking IT',
    description: 'Collaborative development of core insurance processing suites, rating engines, and underwriting automation.'
  },
  {
    name: 'Wissen Technology',
    category: 'Strategic Partner',
    logo: '/assets/clients/WissenLogoBlue.png',
    industry: 'Banking & High-Frequency Tech',
    description: 'Ultra-low latency architecture consulting and high-performance financial software engineering.'
  },
  {
    name: 'Pyramid Consulting',
    category: 'Staffing Network',
    logo: '/assets/clients/Pyramid_Consulting_Horz.png',
    industry: 'Global Staffing Solutions',
    description: 'Talent supply chain partner delivering qualified engineering resources across North America.'
  },
  {
    name: 'Diverse Lynx',
    category: 'Staffing Network',
    logo: '/assets/clients/diverselynx.jpg',
    industry: 'IT Talent & Solutions',
    description: 'Nationwide engineering recruitment and rapid deployment of certified technical specialists.'
  },
  {
    name: 'Halftone Systems',
    category: 'Strategic Partner',
    logo: '/assets/clients/Halftone.png',
    industry: 'Cloud & Data Architecture',
    description: 'Collaboration on cloud migration architectures and data engineering pipelines.'
  }
];

