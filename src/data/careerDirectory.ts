export interface TargetCompanyOption {
  name: string;
  category: string;
  industry: 'IT & Tech' | 'Finance & Banking' | 'FMCG & Retail' | 'Manufacturing & Auto' | 'Consulting & Analytics' | 'Startups & Unicorns';
  region: 'India' | 'Global';
  description: string;
}

export interface TargetRoleOption {
  title: string;
  department: 'Data & Analytics' | 'Marketing' | 'Finance & Accounting' | 'Human Resources' | 'Information Technology' | 'Sales & BD' | 'Customer Support' | 'Content & Creative' | 'Operations & Admin';
  icon: string;
  isFresherFriendly: boolean;
  typicalSkills: string[];
  description: string;
}

export const TARGET_COMPANY_DIRECTORY: TargetCompanyOption[] = [
  // --- Indian IT Services & Tech Giants ---
  {
    name: "Tata Consultancy Services (TCS)",
    category: "IT Services & Consulting",
    industry: "IT & Tech",
    region: "India",
    description: "Global IT services leader; largest recruiter of engineering & MCA graduates via TCS NQT."
  },
  {
    name: "Infosys",
    category: "IT Services & Enterprise Software",
    industry: "IT & Tech",
    region: "India",
    description: "Pioneer in global technology services, renowned for the Mysore Training Program for freshers."
  },
  {
    name: "Wipro",
    category: "IT Services & Digital Transformation",
    industry: "IT & Tech",
    region: "India",
    description: "Multinational IT corporation hiring across software engineering, cloud, cybersecurity, and consulting."
  },
  {
    name: "HCLTech",
    category: "IT Engineering & Cloud Services",
    industry: "IT & Tech",
    region: "India",
    description: "Next-gen tech enterprise specializing in engineering R&D, hybrid cloud, and digital workplace."
  },
  {
    name: "Tech Mahindra",
    category: "Telecom & Digital Tech",
    industry: "IT & Tech",
    region: "India",
    description: "Key IT player specializing in telecom networking, AI, 5G, and enterprise IT modernization."
  },
  {
    name: "Cognizant India",
    category: "IT & Business Process Services",
    industry: "IT & Tech",
    region: "India",
    description: "Major multinational IT company with massive presence across Chennai, Bangalore, and Hyderabad."
  },
  {
    name: "LTIMindtree",
    category: "Digital Solutions & IT Consulting",
    industry: "IT & Tech",
    region: "India",
    description: "Merged IT powerhouse under Larsen & Toubro offering end-to-end digital solutions."
  },
  {
    name: "Accenture India",
    category: "Management & Tech Consulting",
    industry: "IT & Tech",
    region: "India",
    description: "Global consulting and tech services firm with over 300,000 employees in India."
  },
  {
    name: "Capgemini India",
    category: "IT Consulting & Digital Services",
    industry: "IT & Tech",
    region: "India",
    description: "French multinational IT leader with extensive fresher campus hiring across India."
  },

  // --- Global Tech & Product Giants ---
  {
    name: "Google",
    category: "Big Tech / Search & AI",
    industry: "IT & Tech",
    region: "Global",
    description: "Global technology leader in AI, search, cloud, and distributed consumer systems."
  },
  {
    name: "Microsoft",
    category: "Enterprise Software & Cloud (Azure)",
    industry: "IT & Tech",
    region: "Global",
    description: "Global leader in enterprise cloud computing, productivity platforms, AI, and developer tools."
  },
  {
    name: "Amazon",
    category: "E-Commerce & Cloud Infrastructure",
    industry: "IT & Tech",
    region: "Global",
    description: "World's largest e-commerce and cloud provider (AWS), evaluating candidates on 16 Leadership Principles."
  },
  {
    name: "Meta",
    category: "Social Tech & AI",
    industry: "IT & Tech",
    region: "Global",
    description: "Pioneer in social connections, high-throughput real-time infrastructure, and open-source AI."
  },
  {
    name: "Apple",
    category: "Consumer Tech & Operating Systems",
    industry: "IT & Tech",
    region: "Global",
    description: "Renowned for human-centered design, hardware-software integration, and strict security."
  },
  {
    name: "Salesforce",
    category: "Enterprise SaaS & CRM",
    industry: "IT & Tech",
    region: "Global",
    description: "Global CRM leader with significant technology & engineering hubs in Hyderabad and Bangalore."
  },
  {
    name: "Cisco Systems",
    category: "Networking & Cybersecurity",
    industry: "IT & Tech",
    region: "Global",
    description: "Leading networking hardware, telecommunications, and high-performance routing solutions."
  },

  // --- Indian & Global Finance, FinTech & Banking ---
  {
    name: "HDFC Bank",
    category: "Private Sector Commercial Banking",
    industry: "Finance & Banking",
    region: "India",
    description: "India's largest private bank; popular for analysts, credit underwriters, and management trainees."
  },
  {
    name: "ICICI Bank",
    category: "Retail & Corporate Banking",
    industry: "Finance & Banking",
    region: "India",
    description: "Major financial services institution with high annual hiring for probationary officers & analysts."
  },
  {
    name: "State Bank of India (SBI)",
    category: "Public Sector Banking",
    industry: "Finance & Banking",
    region: "India",
    description: "India's largest public sector bank and premier financial institution."
  },
  {
    name: "Axis Bank",
    category: "Commercial Banking & Wealth Management",
    industry: "Finance & Banking",
    region: "India",
    description: "Third largest private sector bank offering opportunities across retail, wholesale, and digital fintech."
  },
  {
    name: "Kotak Mahindra Bank",
    category: "Banking & Financial Services",
    industry: "Finance & Banking",
    region: "India",
    description: "Prominent Indian banking firm known for digital banking innovation and wealth management."
  },
  {
    name: "JPMorgan Chase & Co.",
    category: "Investment Banking & Global Tech Center",
    industry: "Finance & Banking",
    region: "Global",
    description: "Premier global financial services powerhouse with large corporate centers in Mumbai and Bangalore."
  },
  {
    name: "Goldman Sachs",
    category: "Investment Banking & Quantitative Analysis",
    industry: "Finance & Banking",
    region: "Global",
    description: "World leader in investment banking, risk analysis, asset management, and financial engineering."
  },
  {
    name: "Morgan Stanley",
    category: "Investment Banking & Wealth Management",
    industry: "Finance & Banking",
    region: "Global",
    description: "Leading global financial institution hiring software developers, quantitative researchers, and analysts."
  },
  {
    name: "Stripe",
    category: "Fintech & Developer Payment Infra",
    industry: "Finance & Banking",
    region: "Global",
    description: "Gold standard in financial APIs, fraud protection, and developer-first online payment infrastructure."
  },

  // --- Indian & Global FMCG, Retail & Consumer Goods ---
  {
    name: "Hindustan Unilever (HUL)",
    category: "Fast Moving Consumer Goods (FMCG)",
    industry: "FMCG & Retail",
    region: "India",
    description: "India's largest consumer goods firm; benchmark employer for marketing, supply chain, and HR."
  },
  {
    name: "ITC Limited",
    category: "Diversified FMCG & Agribusiness",
    industry: "FMCG & Retail",
    region: "India",
    description: "Iconic Indian conglomerate with market-leading presence in branded packaged foods, paper, and hotels."
  },
  {
    name: "Nestle India",
    category: "Food Processing & Consumer Goods",
    industry: "FMCG & Retail",
    region: "India",
    description: "World's leading nutrition, health and wellness company with deep market footprint in India."
  },
  {
    name: "Procter & Gamble (P&G)",
    category: "Consumer Goods & Healthcare",
    industry: "FMCG & Retail",
    region: "Global",
    description: "Multinational consumer goods corporation celebrated for brand management and leadership training."
  },
  {
    name: "Britannia Industries",
    category: "Food Manufacturing & Bakery",
    industry: "FMCG & Retail",
    region: "India",
    description: "Centuried Indian food giant leading biscuits, dairy, and consumer packaged snack goods."
  },
  {
    name: "Marico",
    category: "Consumer Goods & Beauty Care",
    industry: "FMCG & Retail",
    region: "India",
    description: "Dynamic Indian FMCG firm famous for Parachute, Saffola, and progressive corporate culture."
  },
  {
    name: "Reliance Retail",
    category: "Organized Retail & Omnichannel Commerce",
    industry: "FMCG & Retail",
    region: "India",
    description: "Largest retailer in India with extensive logistics, merchandising, retail operations, and digital apps."
  },

  // --- Manufacturing, Automotive & Heavy Engineering ---
  {
    name: "Tata Motors",
    category: "Automotive & Electric Vehicles",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "Automotive trailblazer driving EV adoption, commercial vehicles, and passenger car engineering."
  },
  {
    name: "Larsen & Toubro (L&T)",
    category: "Heavy Engineering, EPC & Infrastructure",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "India's leading engineering, procurement, construction, and high-tech manufacturing multinational."
  },
  {
    name: "Mahindra & Mahindra",
    category: "Automotive, Farm Equipment & Tech",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "Global mobility and farm equipment leader known for rugged SUVs and clean energy initiatives."
  },
  {
    name: "Maruti Suzuki India",
    category: "Automobile Manufacturing",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "Market leader in the passenger vehicle segment in India with large manufacturing and R&D facilities."
  },
  {
    name: "Tata Steel",
    category: "Steel & Advanced Materials",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "One of the world's most geographically diversified steel producers with deep industrial heritage."
  },
  {
    name: "Reliance Industries (RIL)",
    category: "Energy, Petrochemicals & Telecom",
    industry: "Manufacturing & Auto",
    region: "India",
    description: "Fortune 500 conglomerate spanning green energy, petrochemicals, retail, and Jio digital connectivity."
  },

  // --- High-Growth Indian Startups & Unicorns ---
  {
    name: "Flipkart",
    category: "E-Commerce & Supply Chain Logistics",
    industry: "Startups & Unicorns",
    region: "India",
    description: "India's homegrown e-commerce pioneer, part of Walmart group, renowned for engineering and analytics."
  },
  {
    name: "Swiggy",
    category: "Hyperlocal Delivery & Quick Commerce (Instamart)",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Leading food delivery and quick-commerce platform with cutting-edge real-time dispatch systems."
  },
  {
    name: "Zomato / Blinkit",
    category: "Food Tech & Quick Commerce",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Publicly listed consumer tech giant driving restaurant discovery, deliveries, and instant commerce."
  },
  {
    name: "Razorpay",
    category: "Fintech & Payment Gateway",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Leading Indian payment aggregator and neobanking platform for businesses and developers."
  },
  {
    name: "CRED",
    category: "Consumer Fintech & Rewards",
    industry: "Startups & Unicorns",
    region: "India",
    description: "High-trust fintech platform known for sleek product design and engineering excellence."
  },
  {
    name: "Paytm (One97 Communications)",
    category: "Digital Payments & Financial Services",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Pioneering Indian mobile payments, soundbox POS tech, and digital lending platform."
  },
  {
    name: "Meesho",
    category: "Social Commerce & Value Retail",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Democratizing internet commerce for small manufacturers and millions of value-conscious consumers."
  },
  {
    name: "Ola / Ola Electric",
    category: "Mobility & EV Manufacturing",
    industry: "Startups & Unicorns",
    region: "India",
    description: "Major ride-hailing network and electric two-wheeler manufacturer with the Futurefactory."
  },

  // --- Global Consulting, Auditing & Professional Services ---
  {
    name: "McKinsey & Company",
    category: "Management & Strategy Consulting",
    industry: "Consulting & Analytics",
    region: "Global",
    description: "Premier management consulting firm advising top executives on strategic direction and leadership."
  },
  {
    name: "Boston Consulting Group (BCG)",
    category: "Strategy & Transformation Consulting",
    industry: "Consulting & Analytics",
    region: "Global",
    description: "Global consulting firm renowned for business transformation, economic modeling, and digital innovation."
  },
  {
    name: "Deloitte India",
    category: "Audit, Tax, Consulting & Advisory",
    industry: "Consulting & Analytics",
    region: "India",
    description: "Big Four accounting and professional services network hiring thousands of graduates annually."
  },
  {
    name: "PwC India",
    category: "Assurance, Tax & Advisory Services",
    industry: "Consulting & Analytics",
    region: "India",
    description: "Global Big Four firm offering extensive career tracks across finance, tech risk, and strategy."
  },
  {
    name: "EY India (Ernst & Young)",
    category: "Professional Services & Technology Consulting",
    industry: "Consulting & Analytics",
    region: "India",
    description: "Big Four leader with massive global delivery centers across Bangalore, Gurgaon, and Kochi."
  },
  {
    name: "KPMG India",
    category: "Financial Advisory & Business Consulting",
    industry: "Consulting & Analytics",
    region: "India",
    description: "Multinational professional services firm providing audit, risk advisory, and corporate tax solutions."
  }
];

export const TARGET_ROLE_DIRECTORY: TargetRoleOption[] = [
  // --- Data Analyst & Related Data Roles ---
  {
    title: "Data Analyst",
    department: "Data & Analytics",
    icon: "📊",
    isFresherFriendly: true,
    typicalSkills: ["SQL", "Excel", "Power BI", "Tableau", "Python (Pandas)"],
    description: "Extract, clean, and visualize operational data to generate business insights and management dashboards."
  },
  {
    title: "Junior Business Analyst",
    department: "Data & Analytics",
    icon: "📈",
    isFresherFriendly: true,
    typicalSkills: ["Requirement Gathering", "Excel", "SQL", "Process Flow (UML)", "Agile"],
    description: "Bridge the gap between business stakeholders and technical development teams using data-backed requirements."
  },
  {
    title: "MIS Executive",
    department: "Data & Analytics",
    icon: "📑",
    isFresherFriendly: true,
    typicalSkills: ["Advanced Excel (VLOOKUP, Pivot)", "Reporting Automation", "SQL", "Data Cleaning"],
    description: "Generate regular Management Information System (MIS) reports and operational trackers for business leadership."
  },
  {
    title: "Junior Data Engineer",
    department: "Data & Analytics",
    icon: "🗄️",
    isFresherFriendly: true,
    typicalSkills: ["SQL", "Python", "ETL Pipelines", "PostgreSQL", "Data Warehousing Basics"],
    description: "Build, maintain, and optimize data ingestion pipelines and tables for reporting and analytics."
  },

  // --- Marketing Roles ---
  {
    title: "Digital Marketing Executive",
    department: "Marketing",
    icon: "🚀",
    isFresherFriendly: true,
    typicalSkills: ["Google Ads", "Meta Ads Manager", "SEO", "Google Analytics", "Social Media"],
    description: "Plan, execute, and monitor digital acquisition campaigns, social media channels, and paid ad spend."
  },
  {
    title: "Marketing Coordinator",
    department: "Marketing",
    icon: "📣",
    isFresherFriendly: true,
    typicalSkills: ["Campaign Execution", "Event Management", "Collateral Distribution", "Vendor Coordination"],
    description: "Coordinate marketing initiatives, promotional brand events, partner communications, and sales collateral."
  },
  {
    title: "SEO Specialist / Analyst",
    department: "Marketing",
    icon: "🔍",
    isFresherFriendly: true,
    typicalSkills: ["Keyword Research", "On-Page SEO", "Google Search Console", "Ahrefs/Semrush", "Backlinks"],
    description: "Optimize web pages and content to increase organic search rankings and convert inbound visitor traffic."
  },
  {
    title: "Social Media Executive",
    department: "Marketing",
    icon: "📱",
    isFresherFriendly: true,
    typicalSkills: ["Content Calendars", "Instagram/LinkedIn Growth", "Canva", "Community Engagement", "Copywriting"],
    description: "Manage brand presence, produce engaging posts and reels, and foster active audience conversations."
  },

  // --- Finance & Accounting Roles ---
  {
    title: "Financial Analyst",
    department: "Finance & Accounting",
    icon: "💹",
    isFresherFriendly: true,
    typicalSkills: ["Financial Modeling", "Excel", "Ratio Analysis", "Valuation Basics", "Budgeting"],
    description: "Analyze financial statements, evaluate investment performance, and build revenue projections."
  },
  {
    title: "Accounts Assistant / Junior Accountant",
    department: "Finance & Accounting",
    icon: "🧾",
    isFresherFriendly: true,
    typicalSkills: ["Tally Prime", "GST Filing Basics", "Bank Reconciliation", "Invoicing", "MS Excel"],
    description: "Maintain day-to-day accounts ledgers, prepare invoices, reconcile bank statements, and assist in GST filing."
  },
  {
    title: "Billing & Audit Associate",
    department: "Finance & Accounting",
    icon: "🏛️",
    isFresherFriendly: true,
    typicalSkills: ["Accounts Payable/Receivable", "Compliance", "Vouching", "Audit Documentation"],
    description: "Verify billing records, support statutory and internal audit documentation, and verify vendor payment cycles."
  },

  // --- Human Resources Roles ---
  {
    title: "HR Assistant / Junior HR Generalist",
    department: "Human Resources",
    icon: "🤝",
    isFresherFriendly: true,
    typicalSkills: ["Employee Onboarding", "HR Policies", "Leave Management", "HRIS", "Documentation"],
    description: "Support daily HR operations, employee documentation, background verification, and new hire onboarding."
  },
  {
    title: "Recruitment Coordinator / Talent Acquisition Associate",
    department: "Human Resources",
    icon: "🎯",
    isFresherFriendly: true,
    typicalSkills: ["Resume Screening", "Naukri / LinkedIn Sourcing", "Interview Scheduling", "Candidate Pipeline"],
    description: "Source candidates from job boards, screen initial resumes, coordinate interview rounds, and manage offers."
  },
  {
    title: "HR Operations Associate",
    department: "Human Resources",
    icon: "📋",
    isFresherFriendly: true,
    typicalSkills: ["Payroll Processing Assistance", "Statutory Compliance", "Exit Formalities", "MS Office"],
    description: "Facilitate employee life-cycle documentation from joining formalities through payroll and exit interviews."
  },

  // --- Information Technology & Software ---
  {
    title: "Software Developer (Fresher)",
    department: "Information Technology",
    icon: "💻",
    isFresherFriendly: true,
    typicalSkills: ["Java / Python / C++", "Data Structures & Algorithms", "SQL", "Git", "REST APIs"],
    description: "Write clean code, build software modules, fix bugs, and collaborate in agile team sprints."
  },
  {
    title: "IT Support Engineer / Helpdesk Analyst",
    department: "Information Technology",
    icon: "🛠️",
    isFresherFriendly: true,
    typicalSkills: ["Windows/Linux OS", "Hardware Troubleshooting", "Active Directory", "Network Protocols (TCP/IP)", "Ticketing Systems"],
    description: "Diagnose user hardware, software, and network issues, manage permissions, and maintain IT assets."
  },
  {
    title: "System Analyst",
    department: "Information Technology",
    icon: "⚙️",
    isFresherFriendly: true,
    typicalSkills: ["System Specifications", "Database Diagrams", "System Testing", "User Workflows"],
    description: "Evaluate IT system capabilities, map business flows into technical specs, and coordinate testing."
  },
  {
    title: "QA Engineer / Software Tester",
    department: "Information Technology",
    icon: "🧪",
    isFresherFriendly: true,
    typicalSkills: ["Manual Testing", "Test Case Writing", "Bug Tracking (Jira)", "API Testing (Postman)", "Selenium Basics"],
    description: "Execute test cases, detect functional regressions, report detailed bug steps, and verify software quality."
  },
  {
    title: "Frontend Developer (Junior)",
    department: "Information Technology",
    icon: "🌐",
    isFresherFriendly: true,
    typicalSkills: ["HTML5", "CSS3 / Tailwind", "JavaScript / TypeScript", "React", "Responsive UI"],
    description: "Implement interactive web interfaces, connect REST endpoints, and ensure cross-browser responsiveness."
  },

  // --- Sales & Business Development ---
  {
    title: "Business Development Associate (BDA)",
    department: "Sales & BD",
    icon: "💼",
    isFresherFriendly: true,
    typicalSkills: ["Lead Generation", "Cold Calling", "Product Demonstrations", "CRM (Salesforce/HubSpot)", "Negotiation"],
    description: "Identify sales prospects, pitch product solutions, schedule demos, and achieve monthly revenue targets."
  },
  {
    title: "Inside Sales Representative",
    department: "Sales & BD",
    icon: "📞",
    isFresherFriendly: true,
    typicalSkills: ["Outbound Outreach", "Lead Qualification", "Email Sequences", "Pipeline Tracking"],
    description: "Qualify inbound leads, run outbound outreach campaigns, and transition warm accounts to senior sales closers."
  },

  // --- Customer Support & Operations ---
  {
    title: "Customer Support Executive",
    department: "Customer Support",
    icon: "🎧",
    isFresherFriendly: true,
    typicalSkills: ["Active Listening", "Zendesk / Freshdesk", "Customer Empathy", "Written English", "Problem Resolution"],
    description: "Resolve customer inquiries across chat, email, and phone with fast response times and polite resolution."
  },
  {
    title: "Operations Executive",
    department: "Operations & Admin",
    icon: "📦",
    isFresherFriendly: true,
    typicalSkills: ["Process Tracking", "Excel", "Vendor Management", "Logistics Coordination", "SLA Monitoring"],
    description: "Monitor end-to-end operational execution, resolve delivery bottlenecks, and coordinate with supply chain vendors."
  },

  // --- Content Writing & Administration ---
  {
    title: "Content Writer / Copywriter",
    department: "Content & Creative",
    icon: "✍️",
    isFresherFriendly: true,
    typicalSkills: ["SEO Copywriting", "Grammar & Proofreading", "Blog Writing", "Research Skills", "WordPress"],
    description: "Produce clear, engaging articles, website copy, newsletters, and social media captions tailored to target audiences."
  },
  {
    title: "Administrative Assistant / Office Coordinator",
    department: "Operations & Admin",
    icon: "📁",
    isFresherFriendly: true,
    typicalSkills: ["MS Office Suite", "Calendar Scheduling", "Meeting Minutes", "Office Supplies", "Communication"],
    description: "Manage executive calendars, coordinate office supplies, schedule team travel, and organize company events."
  }
];
