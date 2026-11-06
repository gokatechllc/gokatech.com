export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Enterprise' | 'Engineering' | 'Intelligence' | 'Infrastructure';
  icon: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  caseStudyHighlight: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'business-applications',
    slug: 'business-applications',
    title: 'Enterprise Business Applications & ERP',
    shortDesc: 'End-to-end ERP implementation (SAP, Dynamics 365), supply chain optimization, and automated workflow solutions tailored for global enterprises.',
    fullDesc: 'We architect and implement robust business applications that streamline mission-critical operations. Specializing in tailored ERP solutions like SAP and Microsoft Dynamics 365, we align logistics, manufacturing, finance, and human capital workflows for Fortune 500 companies and agile mid-market leaders.',
    category: 'Enterprise',
    icon: 'Briefcase',
    features: [
      'Tailored ERP solutions (SAP S/4HANA, Dynamics 365) for manufacturing & logistics',
      'End-to-end supply chain management and automated procurement',
      'Integration with legacy architectures & real-time telemetry',
      'Configuration management, baselining, and compliance audit reporting'
    ],
    technologies: ['SAP S/4HANA', 'Microsoft Dynamics 365', 'Dataverse', 'Power Automate', 'Oracle Cloud', 'C#', '.NET Core'],
    deliverables: ['Custom ERP Workflows', 'Change Control Audits', 'Automated Financial Reporting', '24/7 SLA Support'],
    caseStudyHighlight: 'Automated warehouse distribution workflows for a major retail partner, reducing operational latency by 42% across 18 regional hubs.'
  },
  {
    id: 'mobile-applications',
    slug: 'mobile-applications',
    title: 'Mobile App Engineering (iOS & Android)',
    shortDesc: 'High-performance native and cross-platform mobile apps for retail, telehealth, fintech, and enterprise field mobility.',
    fullDesc: 'Transforming consumer touchpoints and field productivity through state-of-the-art mobile experiences. From HIPAA-compliant telemedicine suites to omnichannel retail shopping applications with real-time inventory synchronization and secure blockchain payment rails.',
    category: 'Engineering',
    icon: 'Smartphone',
    features: [
      'Custom consumer & enterprise mobile apps for iOS and Android',
      'Healthcare apps supporting remote patient monitoring & telemedicine',
      'Retail mobile commerce with real-time POS and inventory sync',
      'Secure, transparent blockchain transactions and supply chain verification'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'WebSockets', 'Firebase', 'GraphQL'],
    deliverables: ['App Store & Play Store Submissions', 'Biometric Auth Integration', 'Offline-First Sync Engine', 'End-to-End Encryption'],
    caseStudyHighlight: 'Engineered a telehealth application supporting 200,000+ active patients with encrypted video consultations and vitals sync.'
  },
  {
    id: 'artificial-intelligence',
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence & Machine Learning',
    shortDesc: 'Generative AI, diagnostic neural networks, predictive analytics, and automated decision engines driving competitive business leverage.',
    fullDesc: 'Harness the transformative power of modern AI. We develop tailored ML pipelines that fuel personalized shopping recommendations, intelligent healthcare diagnostics, risk assessment in financial services, and autonomous agentic workflows.',
    category: 'Intelligence',
    icon: 'BrainCircuit',
    features: [
      'AI-driven personalized recommendation engines in e-commerce',
      'Predictive analytics & medical diagnostics for clinical decision support',
      'Robotic Process Automation (RPA) optimizing industrial manufacturing',
      'Intelligent conversational AI assistants and instant query resolution'
    ],
    technologies: ['PyTorch', 'TensorFlow', 'OpenAI APIs', 'LangChain', 'Scikit-Learn', 'Python', 'FastAPI', 'Hugging Face'],
    deliverables: ['Custom Trained ML Models', 'Inference APIs with <50ms latency', 'Automated ETL Pipelines', 'AI Governance & Compliance'],
    caseStudyHighlight: 'Deployed a predictive risk scoring engine for a fintech lending platform, reducing loan default rates by 27% within 6 months.'
  },
  {
    id: 'cloud-technologies',
    slug: 'cloud-technologies',
    title: 'Cloud Technologies & DevOps Engineering',
    shortDesc: 'Scalable multi-cloud architectures across AWS, Azure, and GCP with automated CI/CD, container orchestration, and cost optimization.',
    fullDesc: 'Accelerate digital transformation with resilient cloud infrastructure. We design, migrate, and manage scalable cloud platforms that guarantee high availability, reduce operational expenses, and provide elastic capacity for mission-critical enterprise workloads.',
    category: 'Infrastructure',
    icon: 'Cloud',
    features: [
      'Multi-cloud architecture design across AWS, Azure, and Google Cloud Platform',
      'Kubernetes orchestration, Docker containerization, and microservices',
      'Infrastructure as Code (Terraform, Pulumi, CloudFormation)',
      'Enterprise FinOps cloud cost optimization and FinOps auditing'
    ],
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'ArgoCD'],
    deliverables: ['Zero-Downtime Migration', 'Automated CI/CD Pipelines', 'Disaster Recovery Warm Standby', 'Cost Reduction Audit'],
    caseStudyHighlight: 'Migrated a legacy on-premise banking system to AWS multi-region Kubernetes, cutting monthly cloud spend by 34% while reaching 99.99% uptime.'
  },
  {
    id: 'data-science',
    slug: 'data-science',
    title: 'Data Science & Advanced Analytics',
    shortDesc: 'Big data engineering, real-time data lakes, predictive modeling, and executive intelligence dashboards.',
    fullDesc: 'Unlock hidden value within your enterprise data silos. We build scalable data pipelines, automated ETL workflows, predictive statistical models, and interactive executive dashboards that convert raw numbers into strategic market advantages.',
    category: 'Intelligence',
    icon: 'BarChart3',
    features: [
      'Predictive modeling for risk assessment and actuarial financial services',
      'Recommender engines boosting e-commerce basket sizes & retention',
      'Modern data warehouse & lakehouse architectures (Snowflake, Databricks)',
      'Real-time streaming telemetry and business intelligence visualizations'
    ],
    technologies: ['Snowflake', 'Databricks', 'Apache Spark', 'PowerBI', 'Tableau', 'dbt', 'Kafka', 'Python/R'],
    deliverables: ['Consolidated Data Lakehouse', 'Automated Financial Forecasting', 'Executive PowerBI Dashboards', 'Data Governance Policies'],
    caseStudyHighlight: 'Architected an automated claims analytics platform for an insurance provider, processing over 10M records daily with real-time fraud alerts.'
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Enterprise Cybersecurity & Compliance',
    shortDesc: 'Zero-trust architecture, threat intelligence, HIPAA/SOC2 compliance, penetration testing, and financial data encryption.',
    fullDesc: 'Protect your digital assets with battle-tested cybersecurity frameworks. We offer comprehensive security assessments, DevSecOps integration, continuous vulnerability monitoring, and regulatory compliance advisory across healthcare, banking, and government sectors.',
    category: 'Infrastructure',
    icon: 'ShieldCheck',
    features: [
      'Advanced zero-trust protocols protecting sensitive financial data in banking',
      'Healthcare HIPAA-compliant systems safeguarding patient health records (PHI)',
      'Automated vulnerability scanning, SAST/DAST in CI/CD pipelines',
      'Incident response planning, penetration testing & SOC 2 audit readiness'
    ],
    technologies: ['Zero Trust', 'CrowdStrike', 'Palo Alto Networks', 'HashiCorp Vault', 'Splunk', 'AWS GuardDuty', 'OWASP Top 10'],
    deliverables: ['Comprehensive Threat Matrix', 'SOC2 / HIPAA Gap Analysis', 'Encrypted Secret Management', '24/7 Security Operations Playbook'],
    caseStudyHighlight: 'Secured a nationwide healthcare network handling 15M+ patient records with zero breaches and full HIPAA compliance certification.'
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Full-Stack Web Development & Portals',
    shortDesc: 'Modern, high-performance web applications, enterprise portals, customer dashboards, and high-conversion e-commerce engines.',
    fullDesc: 'Building next-generation digital experiences that captivate users and drive conversion. Leveraging React, Next.js, Vite, and serverless architectures, we engineer lighting-fast web platforms with responsive designs, intuitive UX, and seamless enterprise API connectivity.',
    category: 'Engineering',
    icon: 'Globe',
    features: [
      'User-friendly enterprise portals and customer self-service dashboards',
      'Real estate platforms featuring interactive virtual tours & MLS indexing',
      'Tourism & hospitality booking engines with real-time payment gateways',
      'SEO-optimized, ultra-responsive web applications with sub-second loads'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'GraphQL'],
    deliverables: ['Custom Web Applications', 'API Microservices Gateway', 'CMS Integration', 'Automated Performance Audits'],
    caseStudyHighlight: 'Created a commercial real estate portal featuring 3D virtual tours and instant lease applications, boosting online inquiries by 180%.'
  },
  {
    id: 'product-configuration',
    slug: 'product-configuration',
    title: 'Product Configuration, Implementation & Rollout',
    shortDesc: 'Rigorous software change management, baseline audits, release engineering, and multi-location deployment support.',
    fullDesc: 'In complex enterprise environments, meticulous change management is vital. We establish Configuration Identifiers, Baselines, Change Control boards, and formal Review procedures to streamline rollouts, eliminate deployment failures, and guarantee operational continuity.',
    category: 'Enterprise',
    icon: 'Settings2',
    features: [
      'Configuration Identifiers, Baselines, and formalized Change Control',
      'Multi-site rollout coordination matching headquarters operational standards',
      'Comprehensive installation manuals, system prerequisites & training',
      'Proactive release management and post-deployment monitoring'
    ],
    technologies: ['Jira / Confluence', 'GitLab CI', 'Ansible', 'ServiceNow', 'Docker', 'Automated Testing Suites'],
    deliverables: ['Standard Operating Procedures (SOPs)', 'Configuration Audit Reports', 'Release Playbooks', 'Zero-Downtime Rollout Execution'],
    caseStudyHighlight: 'Standardized and executed multi-location software deployments across 65 client branch offices with zero recorded operational disruptions.'
  },
  {
    id: 'semiconductors',
    slug: 'semiconductors',
    title: 'Semiconductor Technologies & Embedded Systems',
    shortDesc: 'Cutting-edge firmware, IoT hardware integration, ADAS automotive safety, and UAV flight control systems.',
    fullDesc: 'Bridging software intelligence with silicon innovation. We support telecommunications, automotive, and industrial aerospace leaders with specialized embedded firmware, hardware-in-the-loop testing, and semiconductor design support.',
    category: 'Engineering',
    icon: 'Cpu',
    features: [
      'Advanced driver assistance systems (ADAS) enhancing vehicle safety',
      'Control algorithms for unmanned aerial vehicles (UAVs) in aerospace',
      'Low-power IoT device firmware engineering and edge computing',
      'Semiconductor verification, telemetry test harnesses & diagnostics'
    ],
    technologies: ['Embedded C/C++', 'RTOS', 'ARM Cortex', 'CAN Bus', 'FPGA', 'Linux Kernel', 'I2C/SPI'],
    deliverables: ['Production Firmware', 'Hardware Diagnostics Tooling', 'Safety Certification Documentation', 'Edge Telemetry Drivers'],
    caseStudyHighlight: 'Engineered sensor fusion telemetry for an autonomous drone manufacturer, enhancing navigation precision in GPS-denied environments.'
  },
  {
    id: 'managed-services',
    slug: 'managed-services',
    title: '24/7 Managed IT Services & Ongoing Support',
    shortDesc: 'Round-the-clock proactive monitoring, SLA guarantees, incident resolution, and continuous software evolution.',
    fullDesc: 'Software success requires ongoing vigilance. Our global delivery teams across North America, Germany, and India operate 24/7 follow-the-sun support, guaranteeing prompt incident resolution, proactive patch management, and continuous performance tuning.',
    category: 'Infrastructure',
    icon: 'Headphones',
    features: [
      'Global 24/7 follow-the-sun support desks (US, Germany, India)',
      'Sub-15 minute response SLAs for mission-critical incidents',
      'Proactive synthetic performance monitoring and log analytics',
      'Continuous maintenance, vulnerability patching, and version upgrades'
    ],
    technologies: ['Datadog', 'New Relic', 'PagerDuty', 'ServiceNow', 'Zendesk', 'Grafana', 'Prometheus'],
    deliverables: ['SLA Commitment Agreement', 'Monthly Health & Telemetry Reports', 'Dedicated Account Engineer', 'Continuous Upgrade Roadmaps'],
    caseStudyHighlight: 'Maintained 99.98% service uptime across 40+ client cloud services for 3 consecutive years with zero unhandled critical outages.'
  }
];

