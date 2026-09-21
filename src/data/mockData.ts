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
    question: "Tell me about a time when a critical bug or design flaw escaped to production under your watch. What was the post-mortem process?",
    category: "Ownership & Resilience",
    recommendedDurationSec: 180,
    starFocus: "Result & Learning",
    keySkill: "Post-Mortem Accountability",
    difficulty: "Medium",
    expectedAnswerType: "behavioral",
    idealAnswerPoints: [
      "Clear ownership of root cause without blaming others",
      "Immediate mitigation and customer communication",
      "Preventative guardrails and automated tests added"
    ]
  }
];

export const SAMPLE_REPORT: InterviewReport = {
  id: "rep_98421",
  candidateName: "Alex Rivera",
  date: "Today, 10:45 AM",
  role: "Senior Product Designer",
  company: "Global Tech Corp",
  overallScore: 85,
  matchRating: "Strong Match for Senior Roles (Top 12% Candidate)",
  metrics: {
    communication: 92,
    technical: 78,
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
      description: "You set up the situation and actions brilliantly, but forgot to state concrete percentage impact metrics on 2 out of 4 questions.",
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
      timeSec: 142,
      score: 88,
      aiNotes: "Excellent STAR execution. The clear distinction between MVP scope and v1.1 polish showed strong pragmatic prioritization.",
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
      timeSec: 165,
      score: 91,
      aiNotes: "Outstanding stakeholder influence! Using user session clips as objective evidence is a benchmark senior practice.",
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
      candidateAnswer: "I define primary North Star metrics along with secondary counter-metrics so we don't accidentally game the system. On our SaaS platform, our North Star was 7-day user retention, guarded by onboarding completion speed...",
      timeSec: 188,
      score: 79,
      aiNotes: "Good conceptual framework with North Star + Counter Metrics. Missed an opportunity to share a specific time telemetry was negative.",
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
        result: "Framework adopted across 3 squads, though response lacked concrete pivot metrics."
      },
      scoreBoosterRewrite: "Add a concrete historical story: 'When week 1 telemetry dropped 8%, I ran funnel cohort analysis, identified a broken Safari auth token, and shipped a hotfix restoring 99.8% completion.'",
      highlights: [
        { text: "secondary counter-metrics", type: "positive", label: "Balanced Analytics" },
        { text: "guarded by onboarding completion speed", type: "tip", label: "Could add metric outcome" }
      ]
    }
  ],
  emotionalCurve: [
    { questionIndex: 1, label: "Q1: Deadline & Debt", confidence: 88, clarity: 90, stressLevel: 22 },
    { questionIndex: 2, label: "Q2: Leadership Conflict", confidence: 94, clarity: 95, stressLevel: 15 },
    { questionIndex: 3, label: "Q3: Metrics & Telemetry", confidence: 76, clarity: 82, stressLevel: 38 },
    { questionIndex: 4, label: "Q4: Production Outage", confidence: 82, clarity: 88, stressLevel: 28 }
  ]
};

export const TOP_COMPANIES: CompanyIntel[] = [
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=120&q=80",
    tagline: "Organize the world's information and make it universally accessible.",
    category: "Big Tech / Search & AI",
    overview: "Google interviews assess 'Googleyness' (intellectual humility, collaboration, navigate ambiguity) alongside deep algorithmic rigor and massive system scale capabilities.",
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
