import { CompanyIntel, InterviewConfig, InterviewReport, Question } from '../types';

export const DEFAULT_CONFIG: InterviewConfig = {
  role: 'Senior Product Designer',
  level: 'Senior / Lead',
  difficulty: 'Medium',
  company: 'Global Tech Corp',
  durationMinutes: 30,
  customNotes: 'Focus on design system architecture, stakeholder alignment, and quantitative metric impact.'
};

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Walk me through a recent complex project where you had to balance aggressive business deadlines with technical design debt.",
    category: "System Design & Trade-offs",
    recommendedDurationSec: 180,
    starFocus: "Situation & Action",
    keySkill: "Strategic Execution",
    difficulty: "Medium",
    expectedAnswerType: "system-design",
    idealAnswerPoints: [
      "Explicit trade-offs between MVP release and architecture debt",
      "Stakeholder alignment and phased rollout strategy",
      "Quantifiable efficiency or debt reduction post-launch"
    ]
  },
  {
    id: 2,
    question: "Describe a situation where user research contradicted the business direction proposed by executive leadership. How did you advocate for the user?",
    category: "Stakeholder Alignment & Data",
    recommendedDurationSec: 150,
    starFocus: "Action & Result",
    keySkill: "Influence & Communication",
    difficulty: "Medium",
    expectedAnswerType: "behavioral",
    idealAnswerPoints: [
      "Specific contradiction between user research and leadership directive",
      "Objective data/evidence used to advocate for the user",
      "Compromise or outcome reached with positive business metrics"
    ]
  },
  {
    id: 3,
    question: "How do you establish quantitative success metrics for a major product revamp before launch, and how do you pivot if initial telemetry is negative?",
    category: "Data-Driven Decisions",
    recommendedDurationSec: 210,
    starFocus: "Task & Result",
    keySkill: "Analytics & Adaptability",
    difficulty: "Medium",
    expectedAnswerType: "conceptual",
    idealAnswerPoints: [
      "Defining North Star and guardrail counter-metrics upfront",
      "Telemetry and funnel tracking methodology",
      "Structured rollback or iteration framework on negative signals"
    ]
  },
  {
    id: 4,
    question: "Explain your methodology for conducting an end-to-end design system audit across disparate web and mobile applications.",
    category: "Design Systems & Architecture",
    recommendedDurationSec: 180,
    starFocus: "Action & Result",
    keySkill: "Systems Thinking",
    difficulty: "Medium",
    expectedAnswerType: "system-design",
    idealAnswerPoints: [
      "Inventory tooling and component tokenization approach",
      "Cross-functional synchronization between designers and engineers",
      "Deprecation strategy for legacy UI patterns"
    ]
  },
  {
    id: 5,
    question: "How do you manage conflicting priorities when engineering demands technical refactoring while marketing requests immediate growth experiments?",
    category: "Stakeholder Alignment & Negotiation",
    recommendedDurationSec: 180,
    starFocus: "Situation & Result",
    keySkill: "Prioritization & Diplomacy",
    difficulty: "Medium",
    expectedAnswerType: "behavioral",
    idealAnswerPoints: [
      "Framework for quantifying opportunity cost and technical risk",
      "Shared sprint capacity allocation (e.g. 70/20/10 model)",
      "Transparent cadence and executive trade-off sign-off"
    ]
  }
];

export const SAMPLE_REPORT: InterviewReport = {
  id: "rep_98421",
  candidateName: "Alex Rivera",
  date: "Today, 10:45 AM",
  role: "Senior Product Designer",
  company: "Global Tech Corp",
  marksObtained: 420,
  totalPossibleMarks: 500,
  overallPercentage: 84.0,
  verdict: "Good",
  overallScore: 84,
  matchRating: "Good Match for Senior Roles (84.0% Marks Pool)",
  metrics: {
    communication: 90,
    technical: 82,
    toneAndConfidence: 81
  },
  dimensionalScores: {
    relevance: 91,
    starStructure: 88,
    quantifiableImpact: 76,
    technicalPrecision: 82,
    seniorityCalibration: 86
  },
  actionPlans: [
    {
      id: 1,
      title: "Elaborate on Technical Trade-offs",
      description: "When describing design decisions, explicitly mention how memory, rendering performance, or developer implementation speed impacted your choices.",
      priority: "High",
      category: "Technical"
    },
    {
      id: 2,
      title: "Pacing Control During Complex Spikes",
      description: "Your speech speed accelerated to 175 WPM on Question 2. Aim for a steady 130-150 WPM rhythm when explaining high-friction conflict resolution.",
      priority: "Medium",
      category: "Pacing"
    },
    {
      id: 3,
      title: "Tighten STAR Result Quantifications",
      description: "You set up the situation and actions brilliantly, but forgot to state concrete percentage impact metrics on question 3.",
      priority: "High",
      category: "STAR Method"
    }
  ],
  transcripts: [
    {
      questionId: 1,
      questionText: "Walk me through a recent complex project where you had to balance aggressive business deadlines with technical design debt.",
      category: "System Design & Trade-offs",
      candidateAnswer: "In my previous role at Acme Health, we were building a multi-tenant dashboard. We had a 6-week hard deadline before our Q3 press release. I advocated for a modular component architecture while deferring custom micro-interactions to v1.1. This allowed engineers to reuse 80% of existing library elements, launching 3 days ahead of schedule and reducing engineering churn by 25%.",
      status: "answered",
      timeSec: 142,
      score: 88,
      strengths: [
        "Clearly articulated pragmatic trade-offs between MVP release scope and v1.1 polish",
        "Cited concrete quantitative metrics (80% reuse, 3 days ahead, 25% churn reduction)"
      ],
      gaps: [
        "Could have detailed how technical debt was logged and tracked in the engineering backlog after launch"
      ],
      justification: "The candidate provides a structured, highly relevant answer demonstrating sound engineering pragmatism and concrete metric outcomes. Gaps are minor and limited to post-launch debt reconciliation.",
      aiNotes: "Excellent STAR execution. The clear distinction between MVP scope and v1.1 polish showed strong pragmatic prioritization.",
      componentScores: {
        relevance: 94,
        technicalAccuracy: 88,
        depthAndCompleteness: 85,
        clarityAndStructure: 92,
        examples: 88
      },
      dimensionalScores: {
        relevance: 94,
        starStructure: 92,
        quantifiableImpact: 88,
        technicalPrecision: 82,
        seniorityCalibration: 85
      },
      starAnalysis: {
        situation: "Multi-tenant dashboard launch with strict 6-week deadline before Q3 press release.",
        task: "Deliver full scope without introducing catastrophic long-term design debt.",
        action: "Advocated for modular component reusability and disciplined v1.0 vs v1.1 scope segregation.",
        result: "Reused 80% of elements, launched 3 days ahead of schedule, reduced engineering churn by 25%."
      },
      scoreBoosterRewrite: "To achieve 95+, mention specific architectural patterns (e.g., headless token architecture) and team synchronization ceremonies.",
      highlights: [
        { text: "modular component architecture", type: "positive", label: "Strong Technical Concept" },
        { text: "reusing 80% of existing library elements", type: "positive", label: "Efficiency Metric" },
        { text: "launching 3 days ahead of schedule", type: "positive", label: "Quantified Result" }
      ]
    },
    {
      questionId: 2,
      questionText: "Describe a situation where user research contradicted the business direction proposed by executive leadership. How did you advocate for the user?",
      category: "Stakeholder Alignment & Data",
      candidateAnswer: "During a major checkout funnel overhaul, leadership wanted an intrusive pop-up upsell. Usability testing showed an 18% drop-off rate. I created a fast 3-minute video recording showing user frustration in live testing, and proposed an inline contextual recommendation instead, which increased upsell conversion by 12% without harming checkout throughput.",
      status: "answered",
      timeSec: 165,
      score: 91,
      strengths: [
        "Compelling use of qualitative session clips as objective stakeholder alignment leverage",
        "Demonstrated dual focus on protecting checkout throughput while achieving corporate upsell targets"
      ],
      gaps: [
        "Could have mentioned the sample size and statistical confidence of the usability test"
      ],
      justification: "Outstanding answer highlighting senior-level stakeholder influence and user empathy. The candidate balanced business and UX concerns with concrete telemetry.",
      aiNotes: "Outstanding stakeholder influence! Using user session clips as objective evidence is a benchmark senior practice.",
      componentScores: {
        relevance: 96,
        technicalAccuracy: 90,
        depthAndCompleteness: 90,
        clarityAndStructure: 94,
        examples: 92
      },
      dimensionalScores: {
        relevance: 96,
        starStructure: 94,
        quantifiableImpact: 90,
        technicalPrecision: 84,
        seniorityCalibration: 92
      },
      starAnalysis: {
        situation: "Executive team proposed disruptive interstitial pop-ups in core checkout flow.",
        task: "Protect transaction conversion while fulfilling corporate upsell goals.",
        action: "Synthesized usability telemetry into video clips and designed an unobtrusive inline recommendation engine.",
        result: "+12% upsell conversion with 0% checkout funnel churn."
      },
      scoreBoosterRewrite: "To achieve 98+, cite the absolute dollar volume impact (e.g., $1.4M ARR incremental run rate) and ongoing A/B testing statistical significance.",
      highlights: [
        { text: "18% drop-off rate", type: "warning", label: "Identified Risk Metric" },
        { text: "fast 3-minute video recording", type: "positive", label: "Empathy & Influence" },
        { text: "increased upsell conversion by 12%", type: "positive", label: "Concrete Business Win" }
      ]
    },
    {
      questionId: 3,
      questionText: "How do you establish quantitative success metrics for a major product revamp before launch, and how do you pivot if initial telemetry is negative?",
      category: "Data-Driven Decisions",
      candidateAnswer: "I define primary North Star metrics along with secondary counter-metrics so we don't accidentally game the system. On our SaaS platform, our North Star was 7-day user retention, guarded by onboarding completion speed. When telemetry dipped initially, we isolated friction in the auth workflow and iterated quickly.",
      status: "answered",
      timeSec: 188,
      score: 79,
      strengths: [
        "Solid conceptual grasp of pairing North Star indicators with guardrail counter-metrics",
        "Recognized the importance of monitoring onboarding funnel speed"
      ],
      gaps: [
        "Lacked a specific rollback threshold or statistical criterion for triggering the pivot",
        "Could have provided deeper operational detail on telemetry tooling or alerting"
      ],
      justification: "A good conceptual response that correctly identifies key metric principles. However, it lacks specific numerical thresholds for triggering rollback pivots, keeping it in the high-70s range.",
      aiNotes: "Good conceptual framework with North Star + Counter Metrics. Missed an opportunity to share a specific time telemetry was negative.",
      componentScores: {
        relevance: 85,
        technicalAccuracy: 80,
        depthAndCompleteness: 75,
        clarityAndStructure: 82,
        examples: 70
      },
      dimensionalScores: {
        relevance: 85,
        starStructure: 75,
        quantifiableImpact: 65,
        technicalPrecision: 84,
        seniorityCalibration: 82
      },
      starAnalysis: {
        situation: "Establishing evaluation telemetry framework for major SaaS product rewrite.",
        task: "Align engineering and product on un-gameable North Star and health guardrails.",
        action: "Defined 7-day retention pairing with counter-metrics to monitor cognitive load.",
        result: "Framework adopted across squads, though response lacked concrete pivot metrics."
      },
      scoreBoosterRewrite: "Add a concrete historical story: 'When week 1 telemetry dropped 8%, I ran funnel cohort analysis, identified a broken Safari auth token, and shipped a hotfix restoring 99.8% completion.'",
      highlights: [
        { text: "secondary counter-metrics", type: "positive", label: "Balanced Analytics" },
        { text: "guarded by onboarding completion speed", type: "tip", label: "Could add metric outcome" }
      ]
    },
    {
      questionId: 4,
      questionText: "Explain your methodology for conducting an end-to-end design system audit across disparate web and mobile applications.",
      category: "Design Systems & Architecture",
      candidateAnswer: "I started by running automated inventory scripts across our React web repositories and mobile codebases to identify token drift. We discovered 42 divergent button variants. I cataloged them into a centralized Figma audit sheet, worked with platform engineering leads to define semantic design tokens, and created a progressive deprecation timeline across two releases.",
      status: "answered",
      timeSec: 170,
      score: 84,
      strengths: [
        "Systematic automated inventory approach to uncover token drift across web and mobile",
        "Clear collaboration with engineering on semantic tokens and progressive deprecation"
      ],
      gaps: [
        "Could have highlighted accessibility (WCAG AA/AAA) compliance audits during component rationalization"
      ],
      justification: "Strong technical answer detailing automated discovery and semantic token consolidation. Very solid execution with minor omission regarding accessibility contrast testing.",
      aiNotes: "High-rigor systems thinking. Identified 42 divergent variants with a concrete resolution timeline.",
      componentScores: {
        relevance: 90,
        technicalAccuracy: 86,
        depthAndCompleteness: 82,
        clarityAndStructure: 86,
        examples: 82
      },
      dimensionalScores: {
        relevance: 90,
        starStructure: 86,
        quantifiableImpact: 80,
        technicalPrecision: 86,
        seniorityCalibration: 84
      },
      starAnalysis: {
        situation: "Token drift and visual inconsistency across disparate web and mobile apps.",
        task: "Conduct complete inventory and establish authoritative design tokens.",
        action: "Executed automated repo scans, cataloged 42 variants, and established semantic token mappings.",
        result: "Consolidated variants into unified primitives with progressive deprecation."
      },
      scoreBoosterRewrite: "Mention automated regression checks using Storybook visual test suites to prevent future drift.",
      highlights: [
        { text: "42 divergent button variants", type: "warning", label: "Quantified Inconsistency" },
        { text: "semantic design tokens", type: "positive", label: "Industry Best Practice" }
      ]
    },
    {
      questionId: 5,
      questionText: "How do you manage conflicting priorities when engineering demands technical refactoring while marketing requests immediate growth experiments?",
      category: "Stakeholder Alignment & Negotiation",
      candidateAnswer: "I instituted a 70/20/10 capacity allocation framework: 70% core roadmap, 20% technical debt and refactoring, and 10% high-velocity growth experiments. We established joint weekly grooming where marketing brought projected business revenue impact and engineering brought system stability risk scores, allowing executive trade-offs to be made on objective data.",
      status: "answered",
      timeSec: 155,
      score: 78,
      strengths: [
        "Pragmatic percentage-based capacity governance (70/20/10 model)",
        "Objective criteria weighting system stability risk against projected revenue gains"
      ],
      gaps: [
        "Did not describe how emergencies or missed experiment targets are rebalanced in future sprints"
      ],
      justification: "Effective behavioral response with a proven capacity model. Lacks depth on post-experiment retrospectives and rebalancing cadence.",
      aiNotes: "Well-structured compromise framework with objective scorecards for competing demands.",
      componentScores: {
        relevance: 84,
        technicalAccuracy: 78,
        depthAndCompleteness: 75,
        clarityAndStructure: 82,
        examples: 76
      },
      dimensionalScores: {
        relevance: 84,
        starStructure: 80,
        quantifiableImpact: 72,
        technicalPrecision: 78,
        seniorityCalibration: 80
      },
      starAnalysis: {
        situation: "Friction between growth hacking demands and engineering infrastructure stability.",
        task: "Create an objective prioritization framework preventing roadmap deadlock.",
        action: "Introduced 70/20/10 capacity sharing and quantified risk vs revenue scorecards.",
        result: "Reduced prioritization disputes and guaranteed ongoing refactoring bandwidth."
      },
      scoreBoosterRewrite: "Explain a specific high-stakes trade-off where a growth test was delayed to prevent database outage.",
      highlights: [
        { text: "70/20/10 capacity allocation framework", type: "positive", label: "Operational Framework" },
        { text: "system stability risk scores", type: "positive", label: "Objective Risk Model" }
      ]
    }
  ],
  emotionalCurve: [
    { questionIndex: 1, label: "Q1: Deadline & Debt", confidence: 88, clarity: 90, stressLevel: 22 },
    { questionIndex: 2, label: "Q2: Leadership Conflict", confidence: 94, clarity: 95, stressLevel: 15 },
    { questionIndex: 3, label: "Q3: Metrics & Telemetry", confidence: 76, clarity: 82, stressLevel: 38 },
    { questionIndex: 4, label: "Q4: System Audit", confidence: 86, clarity: 88, stressLevel: 24 },
    { questionIndex: 5, label: "Q5: Priority Conflict", confidence: 80, clarity: 84, stressLevel: 30 }
  ]
};

export const TOP_COMPANIES: CompanyIntel[] = [
  // --- Indian IT Services Leaders ---
  {
    name: "Tata Consultancy Services (TCS)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80",
    tagline: "Building on belief.",
    category: "IT Services & Consulting",
    overview: "TCS is India's largest IT company and a top campus employer. Fresher and junior assessments evaluate coding fundamentals (TCS NQT), database queries, quantitative aptitude, and business communication.",
    keyValues: ["Leading Change", "Integrity", "Respect for the Individual", "Excellence", "Learning and Sharing"],
    commonQuestions: [
      "Explain the key differences between SQL join types with examples.",
      "How do you handle project deadline pressures while ensuring code correctness?",
      "Walk me through an academic or internship project and your specific contribution."
    ],
    prepTip: "Focus on clear fundamentals in Java/Python, database normalization, and structured answers regarding team collaboration."
  },
  {
    name: "Infosys",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&q=80",
    tagline: "Navigate your next.",
    category: "IT Services & Digital Solutions",
    overview: "Famous for its Mysore global education center, Infosys tests candidates on core algorithmic thinking, object-oriented concepts, and continuous learning adaptability.",
    keyValues: ["Client Value", "Leadership by Example", "Integrity and Transparency", "Fairness", "Excellence"],
    commonQuestions: [
      "What is the difference between abstraction and encapsulation in Object-Oriented Programming?",
      "Describe a challenging bug you encountered in a project and how you diagnosed it.",
      "How do you quickly learn a completely new technology stack or framework on the job?"
    ],
    prepTip: "Demonstrate strong foundations in OOPs, basic data structures, and enthusiasm for structured training programs."
  },
  {
    name: "Wipro",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80",
    tagline: "Ambition realized.",
    category: "IT Services & Cloud Solutions",
    overview: "Wipro recruits extensively across engineering and data disciplines. Focus areas include problem-solving, cloud computing foundations, and client-centric problem resolution.",
    keyValues: ["Be Passionate About Clients' Success", "Treat Each Person With Respect", "Be Global and Responsible", "Unyielding Integrity"],
    commonQuestions: [
      "Explain the lifecycle of an HTTP request from browser entry to server response.",
      "How do you prioritize multiple bug tickets or client requests when deadlines overlap?",
      "Give an example of how you worked with a cross-functional peer to resolve an issue."
    ],
    prepTip: "Highlight practical project work, basic networking/OS concepts, and clear interpersonal communication."
  },

  // --- Indian & Global Banking & Finance ---
  {
    name: "HDFC Bank",
    logo: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=120&q=80",
    tagline: "We understand your world.",
    category: "Banking & Financial Services",
    overview: "India's largest private sector bank tests candidates on analytical aptitude, financial compliance, customer empathy, and retail/digital banking workflows.",
    keyValues: ["Customer Focus", "Operational Excellence", "Product Leadership", "People", "Sustainability"],
    commonQuestions: [
      "How do you evaluate creditworthiness and debt service ratios for retail loan applicants?",
      "Describe a scenario where a customer was dissatisfied and how you de-escalated the situation.",
      "Explain how digital banking platforms and UPI have transformed branch banking operations."
    ],
    prepTip: "Understand basic banking terminology, CASA ratios, KYC norms, and emphasize customer-first communication."
  },
  {
    name: "JPMorgan Chase & Co.",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
    tagline: "The right relationship is everything.",
    category: "Investment Banking & Global Tech",
    overview: "JPMorgan assesses candidates on analytical rigor, transaction safety, high-throughput systems, and uncompromising ethical integrity.",
    keyValues: ["Exceptional Client Service", "Operational Excellence", "Integrity and Fairness", "Great Team and Culture"],
    commonQuestions: [
      "How do you ensure data consistency and idempotency in financial ledger systems?",
      "Tell me about a time you noticed an error in a financial report or dataset before it was finalized.",
      "Explain the trade-offs between relational ACID databases and NoSQL stores in banking."
    ],
    prepTip: "Emphasize high precision, auditability, data integrity, and structured problem breakdown."
  },

  // --- FMCG & Retail Leaders ---
  {
    name: "Hindustan Unilever (HUL)",
    logo: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=120&q=80",
    tagline: "Everyday essentials for a better future.",
    category: "Fast Moving Consumer Goods (FMCG)",
    overview: "The premier FMCG employer in India. HUL evaluates candidates on consumer empathy, commercial acumen, distributor channel operations, and data-driven brand growth.",
    keyValues: ["Integrity", "Responsibility", "Respect", "Pioneering Spirit"],
    commonQuestions: [
      "How would you improve the retail market penetration of a packaged food brand in tier-2 cities?",
      "Describe how you manage distributor inventory disputes under aggressive month-end targets.",
      "How do you use consumer purchase telemetry to optimize promotional campaign spending?"
    ],
    prepTip: "Ground answers in on-the-ground market dynamics, supply chain efficiency, and quantifiable sales ROI."
  },

  // --- Manufacturing & Automotive ---
  {
    name: "Tata Motors",
    logo: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=120&q=80",
    tagline: "Connecting Aspirations.",
    category: "Automotive & Electric Mobility",
    overview: "Pioneer in passenger EVs and commercial mobility. Evaluates candidates on manufacturing operations, quality assurance (Six Sigma/Kaizen), and hardware-software integration.",
    keyValues: ["Customer Centricity", "Operational Rigor", "Innovation & Agility", "Integrity"],
    commonQuestions: [
      "Explain the fundamental principles of lean manufacturing and root-cause analysis (5-Whys).",
      "How do you balance vehicle safety compliance with strict component manufacturing cost targets?",
      "Describe a situation where a supplier failed delivery and how you mitigated line stoppage."
    ],
    prepTip: "Highlight engineering safety discipline, cross-functional vendor management, and process optimization."
  },
  {
    name: "Larsen & Toubro (L&T)",
    logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=120&q=80",
    tagline: "It's all about imagineering.",
    category: "Engineering, EPC & Infrastructure",
    overview: "India's premier engineering conglomerate. Focuses on project scheduling, safety protocols, contract compliance, and resource allocation under challenging environments.",
    keyValues: ["Pursuit of Excellence", "Professional Ethics", "Customer Satisfaction", "Team Spirit"],
    commonQuestions: [
      "How do you track project milestones and mitigate schedule slippages on large engineering deliverables?",
      "Explain the importance of safety compliance protocols on industrial project sites.",
      "How do you negotiate scope changes with subcontractors without inflating project budgets?"
    ],
    prepTip: "Focus on milestone accountability, cost-engineering, and risk mitigation strategies."
  },

  // --- High-Growth Startups & Unicorns ---
  {
    name: "Flipkart",
    logo: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80",
    tagline: "India's homegrown e-commerce marketplace.",
    category: "E-Commerce & Supply Chain Logistics",
    overview: "Flipkart's interviews evaluate candidates on fast problem solving, scalability during Big Billion Days surges, customer obsession, and data-backed experimentation.",
    keyValues: ["Audacity", "Bias for Action", "Customer First", "Integrity"],
    commonQuestions: [
      "How would you optimize inventory placement across fulfillment hubs to reduce delivery times?",
      "Tell me about a time you analyzed user funnel metrics to identify where drop-offs occurred.",
      "How do you manage high-traffic concurrency bottlenecks during festival flash sales?"
    ],
    prepTip: "Show urgency, willingness to take calculated risks, and deep familiarity with e-commerce funnel metrics."
  },
  {
    name: "Swiggy",
    logo: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=120&q=80",
    tagline: "Delivering happiness at the door.",
    category: "Hyperlocal Delivery & Quick Commerce",
    overview: "Swiggy tests candidates on real-time logistical problem solving, geospatial dispatch challenges, unit economics, and customer-first speed of resolution.",
    keyValues: ["Consumer Comes First", "Always Be Curious, Always Be Learning", "Be Humble", "Do More With Less"],
    commonQuestions: [
      "How would you evaluate rider dispatch efficiency under sudden monsoon weather surges?",
      "Describe an instance where you identified an operational leak and fixed it with data analysis.",
      "How do you balance quick-commerce delivery speed (Instamart) with rider safety?"
    ],
    prepTip: "Focus on unit economics, real-time analytics, and practical user empathy in on-demand services."
  },

  // --- Big Tech & Global Product Giants ---
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=120&q=80",
    tagline: "Organize the world's information and make it universally accessible.",
    category: "Big Tech / Search & AI",
    overview: "Google interviews assess 'Googleyness' (intellectual humility, collaboration, navigating ambiguity) alongside deep algorithmic rigor and massive system scale capabilities.",
    keyValues: ["Focus on the User", "Fast is Better Than Slow", "Democracy on the Web", "Great Just Isn't Good Enough"],
    commonQuestions: [
      "Design a scalable real-time indexing pipeline for 10B web documents.",
      "Tell me about a time you worked with an uncooperative teammate under strict deadlines.",
      "How do you measure latency trade-offs between client caching vs server streaming?"
    ],
    prepTip: "Demonstrate structured thinking by breaking down ambiguous problems into explicit assumptions, constraints, and scale calculations before proposing solutions."
  },
  {
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=120&q=80",
    tagline: "Earth's most customer-centric company.",
    category: "E-Commerce & Cloud Infrastructure",
    overview: "Amazon's interview process is 100% structured around the 16 Leadership Principles (LPs). Every single answer MUST follow the STAR method with explicit data points.",
    keyValues: ["Customer Obsession", "Ownership", "Bias for Action", "Have Backbone; Disagree and Commit"],
    commonQuestions: [
      "Tell me about a time you made a high-stakes decision without complete data (Bias for Action).",
      "Give an example of a project where you insisted on higher standards despite team pushback.",
      "Describe a time you simplified a complex operational bottleneck."
    ],
    prepTip: "Prepare 2-3 detailed STAR stories for each Leadership Principle. Use 'I' instead of 'we' to clarify your specific contribution."
  },
  {
    name: "Meta",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=120&q=80",
    tagline: "Give people the power to build community and bring the world closer together.",
    category: "Social Technology & Metaverse",
    overview: "Meta prioritizes speed, high impact, moving fast, and building at 3B+ user scale. System design interviews evaluate high concurrency, caching strategy, and real-time feed fan-out.",
    keyValues: ["Move Fast", "Focus on Long-Term Impact", "Build Awesome Things", "Live in the Future"],
    commonQuestions: [
      "Design Instagram Stories ranking and media delivery infrastructure.",
      "Describe how you handled a situation where your project priority was suddenly cut.",
      "How do you evaluate system reliability during peak holiday traffic surges?"
    ],
    prepTip: "Focus on execution speed, aggressive metric goal setting, and clean modular code architecture."
  },
  {
    name: "Stripe",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
    tagline: "Financial infrastructure for the internet.",
    category: "Fintech & Developer Tools",
    overview: "Stripe values extraordinary craftsmanship, meticulous developer experience, clear written communication, and robust financial transaction safety.",
    keyValues: ["Users First", "Move with Urgency and Focus", "Thinks Rigorously", "Trust and Amplify"],
    commonQuestions: [
      "Build a rate limiter middleware for financial API payment endpoints.",
      "Describe how you debugged a silent data corruption or race condition in production.",
      "How do you design API contracts that remain backwards compatible across breaking updates?"
    ],
    prepTip: "Emphasize high API design standards, idempotent requests, and defensive error handling."
  },
  {
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=120&q=80",
    tagline: "Think Different.",
    category: "Consumer Hardware & Ecosystem",
    overview: "Apple's culture emphasizes extreme privacy, secret operational precision, vertical integration, and flawless user polish.",
    keyValues: ["Accessibility", "Education", "Environment", "Inclusion & Diversity", "Privacy"],
    commonQuestions: [
      "How do you balance high visual fidelity with strict battery and memory budgets?",
      "Tell me about a time you caught a subtle visual or performance defect that everyone else overlooked.",
      "Describe how you handle conflicting opinions across hardware, firmware, and software teams."
    ],
    prepTip: "Show an obsessive attention to detail, end-to-end user privacy respect, and relentless pursuit of UI/UX elegance."
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Dr. Elena Ross",
    role: "Co-Founder & Chief Scientist",
    credentials: "Ph.D. Stanford Computational Linguistics",
    exCompany: "Ex-Google AI Speech Lead",
    bio: "Pioneered real-time acoustic sentiment parsing and low-latency speech synthesis. Led speech research at Google for 7 years before co-founding InterviewAI.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Marcus Chen",
    role: "Co-Founder & CEO",
    credentials: "B.S. & M.S. Carnegie Mellon CS",
    exCompany: "Ex-Stripe Principal & Amazon Bar Raiser",
    bio: "Conducted over 450+ technical and system design bar raiser interviews across Stripe, Amazon, and Uber. Author of 'The Senior Engineering Bar'.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Sarah Jenkins",
    role: "VP of Product Science",
    credentials: "M.B.A. Harvard Business School",
    exCompany: "Ex-Head of Talent Assessment, McKinsey & Meta",
    bio: "Specialist in structured behavioral assessment rubrics, executive presence training, and high-impact cross-functional communication.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Maya Lin",
    role: "Head of AI Ethics & Fairness",
    credentials: "M.S. Oxford AI & Society",
    exCompany: "Ex-DeepMind Fairness in AI Lead",
    bio: "Dedicated to eliminating socio-linguistic and accent biases in automated evaluation models, ensuring universally fair assessment for global talent.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Vikram Patel",
    role: "Principal Audio DSP Engineer",
    credentials: "B.S. UC Berkeley Electrical Engineering",
    exCompany: "Ex-Dolby Laboratories Senior Architect",
    bio: "Architected sub-100ms client-side WebAudio digital signal processing pipelines and frequency spectrum extraction engines.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Prof. David Vance",
    role: "Scientific Advisor",
    credentials: "Professor of Cognitive NLP at MIT CSAIL",
    exCompany: "MIT NLP Lab Director",
    bio: "Advises on multi-turn dialogue state tracking, dynamic question follow-up generation, and semantic rubric alignment.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];

export const CASE_STUDIES = [
  {
    candidateName: "Alex Rivera",
    targetRole: "Staff Software Engineer",
    company: "Google Cloud",
    initialScore: 64,
    finalScore: 94,
    roundsPassed: "4 of 4 Technical & Bar Raiser Rounds",
    highlight: "Mastered distributed system trade-off explanations and eliminated nervous vocal acceleration during conflict resolution questions.",
    quote: "The real-time WPM pacing and dynamic Gemini follow-ups made the actual Google interview feel like a familiar practice run."
  },
  {
    candidateName: "Priya Mehta",
    targetRole: "Lead Product Manager",
    company: "Stripe",
    initialScore: 71,
    finalScore: 96,
    roundsPassed: "Offer Accepted (L6 Lead PM)",
    highlight: "Cut filler words from 28 down to 1 per response and strictly quantified business metric impact using the STAR method.",
    quote: "Having the AI immediately highlight when I forgot to state secondary counter-metrics completely changed how I structured my answers."
  },
  {
    candidateName: "Jordan Hayes",
    targetRole: "Principal Product Designer",
    company: "Apple",
    initialScore: 68,
    finalScore: 92,
    roundsPassed: "Offer Accepted (Design Systems)",
    highlight: "Learned how to articulate complex UX accessibility constraints with calm executive presence and structured stakeholder advocacy.",
    quote: "The acoustic feedback on pitch stability helped me stay composed when probed deeply on design system trade-offs."
  }
];
