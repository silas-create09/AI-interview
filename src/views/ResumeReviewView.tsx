import React, { useState } from 'react';
import { AppTab } from '../types';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  BarChart, 
  Eye, 
  FileUp, 
  Award,
  Zap,
  Flame,
  Search,
  Check
} from 'lucide-react';

interface ResumeReviewViewProps {
  onSelectTab: (tab: AppTab) => void;
  onCustomizeInterview?: (role: string, targetCompany: string) => void;
}

interface AnalysisSection {
  score: number;
  label: string;
  verdict: 'Excellent' | 'Good' | 'Needs Improvement';
  summary: string;
  bulletCritiques: {
    original: string;
    critique: string;
    improved: string;
    metricBoost: string;
  }[];
  detectedKeywords: string[];
  missingKeywords: string[];
}

const SAMPLE_RESUME_TEXT = `Alex Rivera
Senior Full-Stack & Distributed Systems Engineer
San Francisco, CA | alex.rivera@example.com | github.com/alexrivera

SUMMARY
Results-driven software engineer with 6+ years designing, scaling, and deploying mission-critical distributed systems. Proven track record driving 99.99% microservice availability, architecting event-driven pipelines handling 50k+ QPS, and mentoring engineering teams.

EXPERIENCE
Staff / Senior Software Engineer — Apex Cloud Technologies (2022 – Present)
- Led modernization of legacy monolithic checkout engine into event-driven Go and Rust microservices on Kubernetes.
- Optimized Redis caching layer and Postgres database indexing, reducing p99 latency from 420ms to 48ms.
- Built automated continuous delivery canary deployment pipeline with zero downtime, cutting deployment lead times by 65%.
- Mentored 8 junior and mid-level engineers in distributed system design, clean architecture, and observability.

Software Engineer — Horizon Fintech (2019 – 2022)
- Architected real-time fraud detection pipeline processing over 12M daily financial transactions with Apache Kafka and Flink.
- Implemented gRPC APIs connecting payment gateways, reducing inter-service serialization overhead by 40%.
- Conducted regular load testing with k6, identifying and resolving memory leaks in critical reconciliation paths.

SKILLS
- Languages: Go, TypeScript, Python, Rust, SQL
- Infrastructure & Distributed: Kubernetes, Docker, Kafka, AWS (ECS, RDS, S3), Redis, PostgreSQL, gRPC
- Architecture: Microservices, Event-Driven Architecture, High-Concurrency, CI/CD, Observability (Prometheus, Datadog)`;

export const ResumeReviewView: React.FC<ResumeReviewViewProps> = ({ onSelectTab }) => {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [targetCompany, setTargetCompany] = useState('Google');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer (L5/L6)');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'bullets' | 'keywords' | 'interview-bridge'>('overview');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasAnalyzed(true);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadSuccess(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setResumeText(text);
          handleAnalyze();
        }
      };
      reader.readAsText(file);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  // Mock Analysis Evaluation
  const analysisResult: AnalysisSection = {
    score: 88,
    label: 'Strong Match for Tier-1 Tech',
    verdict: 'Excellent',
    summary: `Your profile demonstrates high-impact systems leadership, clear quantifiable metrics (p99 latency reductions, QPS scale), and modern architectural patterns aligned with ${targetCompany}'s rubric.`,
    bulletCritiques: [
      {
        original: "Led modernization of legacy monolithic checkout engine into event-driven Go and Rust microservices on Kubernetes.",
        critique: "Strong technical scope, but misses concrete business outcome and scale numbers (e.g. monetary volume, traffic peak, or cost savings).",
        improved: "Spearheaded migration of legacy monolith to Go/Rust event-driven microservices on Kubernetes, supporting $180M+ annualized checkout volume and cutting cloud spend by 22%.",
        metricBoost: "+18% Impact Score"
      },
      {
        original: "Optimized Redis caching layer and Postgres database indexing, reducing p99 latency from 420ms to 48ms.",
        critique: "Excellent metric specification (420ms to 48ms). Explicitly mention the specific indexing strategy or caching eviction algorithm to showcase deep mastery.",
        improved: "Redesigned Redis cluster invalidation topology and B-tree composite indexing in PostgreSQL, slashing p99 latency by 88% (420ms → 48ms) across 50k QPS peak loads.",
        metricBoost: "+24% Technical Depth"
      },
      {
        original: "Mentored 8 junior and mid-level engineers in distributed system design, clean architecture, and observability.",
        critique: "Highlight the organizational or career outcome of the mentorship to demonstrate L5+ leadership maturity.",
        improved: "Championed engineering mentorship for 8 junior/mid engineers, leading to 3 promotions and establishing org-wide distributed tracing standards in OpenTelemetry.",
        metricBoost: "+15% Leadership Calibration"
      }
    ],
    detectedKeywords: [
      "Distributed Systems", "Kubernetes", "Kafka", "PostgreSQL", "Go", "Rust", 
      "Microservices", "Latency Optimization", "CI/CD", "Redis", "gRPC", "Observability"
    ],
    missingKeywords: [
      "Fault Tolerance / Chaos Engineering", "Cap Theorem Trade-offs", 
      "SLA / SLO Governance", "Cross-Functional RFC Authoring", "Global Disaster Recovery"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Resume & Rubric Scanner</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Resume Intelligence & ATS Calibration
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Audit your resume against FAANG+ hiring rubrics, uncover missing keyword signals, elevate bullet point impact using the Google X-Y-Z formula, and auto-bridge your resume into personalized live mock interviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('setup')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Mock from Resume</span>
            </button>
          </div>
        </div>

        {/* Input Controls & Upload Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Target Role, Company & Resume Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Resume Source</span>
                </h3>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  ATS Ready
                </span>
              </div>

              {/* Target Company & Role Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    <span>Target Company</span>
                  </label>
                  <select
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Google">Google (GCA & Craft)</option>
                    <option value="Amazon">Amazon (16 LPs)</option>
                    <option value="Meta">Meta (System & E5 Execution)</option>
                    <option value="Apple">Apple (Deep Domain & Polish)</option>
                    <option value="Stripe">Stripe (Code Taste & Scaling)</option>
                    <option value="Microsoft">Microsoft (Growth & Collaboration)</option>
                    <option value="Netflix">Netflix (High Performance Culture)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-500" />
                    <span>Target Track</span>
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="Senior Software Engineer (L5/L6)">Senior Software Engineer</option>
                    <option value="Staff Systems Architect">Staff Systems Architect</option>
                    <option value="Engineering Manager">Engineering Manager</option>
                    <option value="Lead Product Manager">Lead Product Manager</option>
                    <option value="DevOps & Cloud SRE">DevOps & Cloud SRE</option>
                  </select>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 text-center transition-colors bg-slate-950/40">
                <input 
                  type="file" 
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-indigo-400 border border-slate-800">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-white">Click or drag resume file</span>
                    <span className="text-slate-400 block text-[11px]">Supports PDF, DOCX, or Plain Text</span>
                  </div>
                </div>
              </div>

              {uploadSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Resume loaded successfully! AI analyzing changes...</span>
                </div>
              )}

              {/* Editable Resume Text Area */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Resume Text
                  </label>
                  <span className="text-[10px] text-slate-500">
                    {resumeText.split(/\s+/).length} words
                  </span>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={14}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                  placeholder="Paste your resume markdown or raw text here..."
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Recalibrating Rubric against {targetCompany}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Resume Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: AI Analysis, Scorecard & Bullet Rewrites */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Score Overview Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                {/* Main Score Gauge */}
                <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-800 pb-4 sm:pb-0 sm:pr-4">
                  <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-indigo-600/30">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">{analysisResult.score}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{analysisResult.verdict}</span>
                    </div>
                    <div className="text-sm font-black text-white mt-0.5">{analysisResult.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Calibrated to {targetCompany}</div>
                  </div>
                </div>

                {/* Sub Scores */}
                <div className="sm:col-span-2 grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400">Impact Ratio</div>
                    <div className="text-base font-black text-cyan-400 mt-1">94%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">X-Y-Z Metrics</div>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400">ATS Match</div>
                    <div className="text-base font-black text-indigo-400 mt-1">91%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Keyword Match</div>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400">Leadership</div>
                    <div className="text-base font-black text-amber-400 mt-1">82%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Scope & Growth</div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="mt-5 pt-5 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/40">
                <span className="font-bold text-indigo-400 block mb-1">Executive Assessment:</span>
                {analysisResult.summary}
              </div>
            </div>

            {/* Analysis Navigation Tabs */}
            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Rubric Breakdown</span>
              </button>

              <button
                onClick={() => setActiveTab('bullets')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'bullets'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Google X-Y-Z Rewrites</span>
              </button>

              <button
                onClick={() => setActiveTab('keywords')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'keywords'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>ATS Keywords</span>
              </button>

              <button
                onClick={() => setActiveTab('interview-bridge')}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'interview-bridge'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Target Mock Questions</span>
              </button>
            </div>

            {/* TAB CONTENT: Overview / Rubric Breakdown */}
            {activeTab === 'overview' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Calibrated Dimensions for {targetCompany}</span>
                </h3>

                <div className="space-y-4">
                  {/* Dimension 1 */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        Quantifiable Business & Architecture Impact
                      </span>
                      <span className="font-bold text-emerald-400">95 / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Strong inclusion of baseline vs. post-optimization figures (420ms to 48ms p99 latency, 50k+ QPS, 65% lead time).
                    </p>
                  </div>

                  {/* Dimension 2 */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        Distributed Systems Depth & Modern Stack
                      </span>
                      <span className="font-bold text-cyan-400">92 / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Proficient signals for event-driven streaming (Kafka/Flink), Go/Rust microservices, and Kubernetes orchestration.
                    </p>
                  </div>

                  {/* Dimension 3 */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Staff-Level Strategic & RFC Authoring Scope
                      </span>
                      <span className="font-bold text-amber-400">76 / 100</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Recommend explicitly detailing technical decision documents (RFCs authored, ADR trade-offs, and multi-team consensus).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Bullet Rewrites (Google X-Y-Z Formula) */}
            {activeTab === 'bullets' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Google X-Y-Z Impact Bullet Enhancements</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>
                    </p>
                  </div>
                  <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-800/60">
                    3 Suggestions
                  </span>
                </div>

                <div className="space-y-4">
                  {analysisResult.bulletCritiques.map((item, idx) => (
                    <div key={idx} className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Bullet Point #{idx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                          {item.metricBoost}
                        </span>
                      </div>

                      {/* Original Bullet */}
                      <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-400 line-through">
                        "{item.original}"
                      </div>

                      {/* AI Critique */}
                      <div className="text-[11px] text-amber-400 flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{item.critique}</span>
                      </div>

                      {/* Recommended Rewrite */}
                      <div className="bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-800/40 text-xs text-indigo-200 font-medium">
                        <span className="font-bold text-white block text-[11px] uppercase tracking-wider mb-1">
                          ✨ Recommended FAANG+ Rewrite:
                        </span>
                        "{item.improved}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Keywords / ATS Match */}
            {activeTab === 'keywords' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>Keyword Optimization for {targetCompany} & {targetRole}</span>
                </h3>

                {/* Detected Keywords */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Strong Keyword Signals Detected ({analysisResult.detectedKeywords.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {analysisResult.detectedKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing / High-Priority Keywords */}
                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>High-Value Keywords Missing from Profile ({analysisResult.missingKeywords.length})</span>
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Adding these concepts will enhance ATS ranking and trigger favorable interviewer rubric scoring at {targetCompany}:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {analysisResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-800/50 text-xs text-rose-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Interview Bridge (Mock Questions Generated from Resume) */}
            {activeTab === 'interview-bridge' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Resume-Driven Deep Dive Questions</span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Interviews at {targetCompany} will aggressively probe these specific claims on your resume:
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Probe Question 1 • Microservice Latency
                    </div>
                    <p className="text-xs text-white font-medium">
                      "You mentioned slashing p99 latency from 420ms to 48ms across Redis and Postgres. Walk me through the exact telemetry bottlenecks you discovered and why caching invalidation didn't trigger race conditions."
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      Probe Question 2 • Fault Tolerance & Scale
                    </div>
                    <p className="text-xs text-white font-medium">
                      "When orchestrating 12M daily financial events with Kafka and Flink, how did you handle out-of-order event arrivals and exactly-once processing guarantees during partition rebalances?"
                    </p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Probe Question 3 • Staff Leadership & Consensus
                    </div>
                    <p className="text-xs text-white font-medium">
                      "Tell me about a time you led the Kubernetes migration and faced significant pushback from senior colleagues on deployment safety. How did you align the team?"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectTab('setup')}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Practice Answering These in Live Video Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
