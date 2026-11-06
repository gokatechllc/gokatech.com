export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Hybrid' | 'Remote';
  experience: string;
  salaryRange: string;
  postedDate: string;
  urgent?: boolean;
  featured?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
}

export const jobsData: JobOpening[] = [
  {
    id: 'goka-qa-perf-01',
    title: 'QA Engineer / Performance Engineer',
    department: 'Quality Assurance & Testing',
    location: 'Frisco, TX (Hybrid / Remote)',
    type: 'Full-time',
    experience: '3 - 5+ Years',
    salaryRange: '$95,000 - $125,000 / yr',
    postedDate: 'Just now',
    featured: true,
    urgent: true,
    description: 'GOKATECH INC is seeking an experienced QA / Performance Engineer to conduct comprehensive end-to-end performance verification, load testing, and SDLC protocol compliance for enterprise clients.',
    responsibilities: [
      'Design, script, and execute robust performance, load, stress, and endurance test suites.',
      'Configure test harnesses across HTTP/S, MQ, JMS, SOAP, and JDBC communication protocols.',
      'Analyze performance bottlenecks in backend databases, microservices, and network latency.',
      'Collaborate with developers and DevOps squads to integrate automated performance regression checks into CI/CD pipelines.',
      'Document comprehensive defect analysis and present mitigation strategies to client leadership.'
    ],
    requirements: [
      'Sound knowledge of diverse communication and data protocols: HTTP/S, MQ, JMS, SOAP, JDBC.',
      'Demonstrated expertise in LoadRunner / JMeter (recording, request-response parameter correlation, scenario scheduling, and distributed agent setup).',
      'Solid command of SDLC methodologies (Agile, Scrum, Waterfall) and software testing lifecycles.',
      'Proficiency with monitoring and APM tools such as Dynatrace, AppDynamics, or Datadog.',
      'Bachelor’s or Associate degree in Computer Science, IT, or equivalent experience.'
    ],
    skills: ['LoadRunner', 'JMeter', 'HTTP/S & SOAP', 'MQ / JMS', 'JDBC', 'Dynatrace', 'Agile / SDLC', 'SQL'],
    benefits: [
      'Competitive Health, Dental, and Vision Insurance',
      '401(k) Retirement Plan with Company Match',
      'Flexible Hybrid Work Schedule (Frisco TX Hub)',
      'Generous PTO, Paid Holidays, and Sick Days',
      'Certification and Continuing Education Sponsorship'
    ]
  },
  {
    id: 'goka-soft-dev-02',
    title: 'Senior Software Developer (Full-Stack / Cloud)',
    department: 'Software Engineering',
    location: 'Frisco, TX / Remote USA',
    type: 'Full-time',
    experience: '4 - 7+ Years',
    salaryRange: '$120,000 - $155,000 / yr',
    postedDate: '1 day ago',
    featured: true,
    urgent: false,
    description: 'We are looking for a talented Senior Software Developer to engineer scalable enterprise software components, cloud-native backend services, and high-performance user interfaces for Fortune 500 partner projects.',
    responsibilities: [
      'Architect, code, test, and maintain enterprise software components and web applications.',
      'Design RESTful and GraphQL APIs connecting diverse distributed cloud systems.',
      'Deploy and monitor containerized microservices across AWS, Azure, and Google Cloud Platform.',
      'Conduct code reviews, mentor junior engineers, and drive best practices in test-driven development.',
      'Optimize query execution plans and database performance on relational and NoSQL engines.'
    ],
    requirements: [
      'Proven expertise in Java, Python, and modern JavaScript / TypeScript.',
      'Hands-on experience with cloud platforms: AWS, Azure, or Google Cloud Platform (GCP).',
      'Strong knowledge of containerization with Docker and orchestration via Kubernetes.',
      'Experience building and consuming high-throughput REST APIs and message queues (Kafka, RabbitMQ).',
      'Bachelor’s or Associate Degree in Computer Science or related engineering discipline (+2 years professional IT experience minimum).'
    ],
    skills: ['Java', 'Python', 'TypeScript', 'AWS / Azure / GCP', 'Docker & Kubernetes', 'REST APIs', 'PostgreSQL', 'Microservices'],
    benefits: [
      'Comprehensive Medical, Dental, and Vision Coverage',
      'Performance-based Annual Bonuses',
      'Flexible Remote / In-Office arrangements',
      '401(k) with Employer Matching',
      'Professional Tech Upskilling allowance'
    ]
  },
  {
    id: 'goka-dyn-365-03',
    title: 'Microsoft Dynamics 365 Developer',
    department: 'Business Applications & ERP',
    location: 'Frisco, TX / Remote USA',
    type: 'Full-time',
    experience: '4 - 6+ Years',
    salaryRange: '$115,000 - $145,000 / yr',
    postedDate: '2 days ago',
    featured: true,
    urgent: true,
    description: 'Seeking an experienced Dynamics 365 Developer to design, develop, customize, integrate, and support Microsoft Dynamics 365 and Power Platform solutions for enterprise clients.',
    responsibilities: [
      'Design, develop, customize, and enhance Microsoft Dynamics 365 CRM and ERP modules.',
      'Develop scalable solutions utilizing Microsoft Dataverse, Power Apps, and Power Automate workflows.',
      'Create and maintain plugins, custom APIs, business rules, workflows, and Dynamics 365 extensions using C# and .NET.',
      'Develop client-side customizations using JavaScript / TypeScript and Dynamics 365 Client APIs.',
      'Build seamless integrations between Dynamics 365 and external systems using REST/OData APIs, Azure webhooks, and custom connectors.'
    ],
    requirements: [
      'Strong hands-on experience in Dynamics 365 CE / CRM and Microsoft Power Platform.',
      'Demonstrated expertise with Microsoft Dataverse, Power Apps (Canvas & Model-Driven), and Power Automate.',
      'Solid programming proficiency in C#, .NET, JavaScript, and TypeScript.',
      'Proven track record building REST / OData APIs and connecting external enterprise platforms.',
      'Microsoft Certified: Power Platform Developer or Dynamics 365 Fundamentals preferred.'
    ],
    skills: ['Microsoft Dynamics 365', 'Power Platform', 'Dataverse', 'Power Automate', 'C#', '.NET Core', 'REST / OData APIs', 'JavaScript'],
    benefits: [
      'Top-tier Healthcare, Vision & Dental Coverage',
      'Remote Work Flexibility with Global Collaboration',
      'Annual Technology & Home Office Stipend',
      'Career Advancement Path to Solution Architect',
      'Company Paid Microsoft Certifications'
    ]
  },
  {
    id: 'goka-cloud-devops-04',
    title: 'Cloud Solutions Architect & DevOps Lead',
    department: 'Cloud Infrastructure',
    location: 'Frisco, TX / Edison, NJ / Remote',
    type: 'Full-time',
    experience: '6 - 10+ Years',
    salaryRange: '$140,000 - $180,000 / yr',
    postedDate: '3 days ago',
    featured: false,
    urgent: false,
    description: 'Architect multi-cloud infrastructures, automate deployment pipelines, and lead high-availability cloud transformations across enterprise Fortune 500 partner environments.',
    responsibilities: [
      'Architect resilient, multi-region cloud infrastructures on AWS, Azure, and Google Cloud.',
      'Implement Infrastructure as Code (Terraform) and GitOps deployment pipelines (ArgoCD, GitLab CI).',
      'Manage production Kubernetes clusters, observability stacks (Prometheus, Grafana), and disaster recovery.',
      'Conduct cloud cost optimization audits and implement automated FinOps governance.'
    ],
    requirements: [
      '6+ years in cloud engineering and DevOps architecture.',
      'Expertise in Terraform, Kubernetes, Docker, and CI/CD pipelines.',
      'Deep understanding of network security, VPC peering, and zero-trust policies.',
      'AWS Solutions Architect or Azure Solutions Architect Expert certification.'
    ],
    skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD', 'FinOps', 'Prometheus'],
    benefits: ['Comprehensive Medical/Dental', '401(k) Match', 'Relocation Assistance', 'Executive Bonus Plan']
  },
  {
    id: 'goka-aiml-eng-05',
    title: 'AI / Machine Learning Engineer',
    department: 'Artificial Intelligence',
    location: 'Frisco, TX / Cologne, Germany / Remote',
    type: 'Full-time',
    experience: '3 - 6+ Years',
    salaryRange: '$125,000 - $160,000 / yr',
    postedDate: '4 days ago',
    featured: false,
    urgent: false,
    description: 'Design and deploy production-grade machine learning models, generative AI applications, and computer vision systems for healthcare, finance, and industrial sectors.',
    responsibilities: [
      'Build and train state-of-the-art predictive models and generative AI systems.',
      'Optimize model inference speed and containerize pipelines with Triton and FastAPI.',
      'Design automated data validation and feature engineering pipelines.',
      'Collaborate with client product teams to integrate AI models into user-facing web and mobile apps.'
    ],
    requirements: [
      'Proficiency in Python, PyTorch, TensorFlow, and Scikit-learn.',
      'Experience with LLMs, vector databases (Pinecone, Qdrant), and LangChain / LlamaIndex.',
      'Solid mathematical foundation in linear algebra, statistics, and optimization algorithms.'
    ],
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs & RAG', 'LangChain', 'FastAPI', 'Docker', 'MLOps'],
    benefits: ['Full Healthcare & Life Insurance', 'Stock Incentive Options', 'Remote Work Autonomy', 'Conference Travel Budget']
  },
  {
    id: 'goka-mobile-dev-06',
    title: 'Lead Mobile Developer (React Native / Flutter)',
    department: 'Software Engineering',
    location: 'Hyderabad, India / Remote',
    type: 'Full-time',
    experience: '5 - 8+ Years',
    salaryRange: 'Competitive Local / Expat Package',
    postedDate: '5 days ago',
    featured: false,
    urgent: false,
    description: 'Drive the development of cutting-edge mobile apps for retail and telehealth clients, mentoring a talented squad of mobile engineers in our Hyderabad delivery center.',
    responsibilities: [
      'Architect and build high-performance mobile apps using React Native and Flutter.',
      'Optimize native bridge performance for iOS (Swift) and Android (Kotlin).',
      'Implement real-time features using WebSockets and background synchronization.',
      'Ensure compliance with App Store and Google Play security and publishing guidelines.'
    ],
    requirements: [
      '5+ years of mobile app development experience with released commercial apps.',
      'Strong grasp of state management (Redux Toolkit, Zustand, Bloc).',
      'Experience with mobile security, biometric login, and offline data persistence.'
    ],
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'TypeScript', 'Redux', 'REST/GraphQL'],
    benefits: ['International Project Exposure', 'Annual Performance Bonus', 'Comprehensive Family Health Insurance', 'Flexible Hybrid Schedule']
  }
];

export const jobDepartments = [
  'All Departments',
  'Software Engineering',
  'Quality Assurance & Testing',
  'Business Applications & ERP',
  'Cloud Infrastructure',
  'Artificial Intelligence'
];

export const jobLocations = [
  'All Locations',
  'Frisco, TX',
  'Edison, NJ',
  'Remote USA',
  'Cologne, Germany',
  'Hyderabad, India'
];

export const jobTypes = [
  'All Types',
  'Full-time',
  'Contract',
  'Hybrid',
  'Remote'
];

