export type AppTab = 
  | 'landing' 
  | 'setup' 
  | 'simulator' 
  | 'report' 
  | 'company-prep' 
  | 'resume-review'
  | 'about';

export interface Question {
  id: number;
  question: string;
  category: string;
  recommendedDurationSec: number;
  starFocus: string;
  keySkill: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  expectedAnswerType?: 'conceptual' | 'behavioral' | 'system-design' | 'case';
  idealAnswerPoints?: string[];
}

export interface DimensionalScores {
  relevance: number; // 0-100: Did candidate directly address the question?
  starStructure: number; // 0-100: Are Situation, Task, Action, Result clearly defined?
  quantifiableImpact: number; // 0-100: Concrete metrics, scale, percentages, dollars, latency
  technicalPrecision: number; // 0-100: Technical accuracy, trade-offs, architecture, failure modes
  seniorityCalibration: number; // 0-100: Scope, leadership, strategic influence matching target level
}

export interface AnswerEvaluation {
  questionId: number;
  candidateText: string;
  overallScore: number;
  clarityScore: number;
  technicalScore: number;
  sentimentScore: number;
  verdict?: string;
  incorrectClaims?: string[];
  missedPoints?: string[];
  evaluatorConfidence?: 'low' | 'medium' | 'high';
  dimensionalScores: DimensionalScores;
  strengths: string[];
  improvements: string[];
  starAnalysis: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  scoreBoosterRewrite?: string;
  suggestedFollowUp?: string;
  rubricNotes?: string;
  timestamp: string;
}

export interface InterviewConfig {
  role: string;
  level: 'Junior / Entry' | 'Mid-Level' | 'Senior / Lead' | 'Executive / Director';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  company: string;
  durationMinutes: number;
  customNotes?: string;
  micDeviceId?: string;
}

export interface InterviewReport {
  id: string;
  candidateName: string;
  date: string;
  role: string;
  company: string;
  overallScore: number;
  matchRating: string;
  metrics: {
    communication: number; // 0-100
    technical: number; // 0-100
    toneAndConfidence: number; // 0-100
  };
  dimensionalScores?: DimensionalScores;
  actionPlans: {
    id: number;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    category: 'Technical' | 'Pacing' | 'STAR Method';
  }[];
  transcripts: {
    questionId: number;
    questionText: string;
    category: string;
    candidateAnswer: string;
    timeSec: number;
    score: number;
    aiNotes: string;
    dimensionalScores?: DimensionalScores;
    starAnalysis?: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
    scoreBoosterRewrite?: string;
    highlights: {
      text: string;
      type: 'positive' | 'warning' | 'tip';
      label: string;
    }[];
  }[];
  emotionalCurve: {
    questionIndex: number;
    label: string;
    confidence: number;
    clarity: number;
    stressLevel: number;
  }[];
}

export interface CompanyIntel {
  name: string;
  logo: string;
  tagline: string;
  category: string;
  overview: string;
  keyValues: string[];
  commonQuestions: string[];
  prepTip: string;
}

export interface ResumeAnalysisResult {
  isResume: boolean;
  overallScore: number;
  atsScore: number;
  relevanceScore: number;
  impactScore: number;
  skillsScore: number;
  structureScore: number;
  verdict: string;
  summary: string;
  bulletCritiques: {
    original: string;
    critique: string;
    improved: string;
    metricBoost: string;
  }[];
  detectedKeywords: string[];
  missingKeywords: string[];
  redFlags: string[];
  probeQuestions: {
    question: string;
    category: string;
    rationale: string;
  }[];
}

export interface CompanyResearchResult {
  companyName: string;
  overview: string;
  keyValues: string[];
  commonQuestions: string[];
  prepTip: string;
  verified: boolean;
  sources: { title: string; url: string }[];
}
