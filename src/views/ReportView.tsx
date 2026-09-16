import React, { useState } from 'react';
import { AppTab, InterviewReport } from '../types';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  Share2, 
  Play, 
  Clock, 
  Sparkles, 
  FileText, 
  BarChart3, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Building2,
  BrainCircuit,
  MessageSquare,
  Check,
  Target,
  Scale,
  Zap,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

interface ReportViewProps {
  report: InterviewReport;
  onSelectTab: (tab: AppTab) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onSelectTab }) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const dimScores = report.dimensionalScores || {
    relevance: 90,
    starStructure: 88,
    quantifiableImpact: 78,
    technicalPrecision: 84,
    seniorityCalibration: 86
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Top Header & Breadcrumb */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" /> Comprehensive Performance Scorecard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Interview Evaluation Report
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Candidate: <strong className="text-slate-200">{report.candidateName}</strong> • {report.date} • Role: <strong className="text-slate-200">{report.role}</strong> ({report.company})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedLink ? "Link Copied!" : "Share Report"}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Hero Score Gauge Section */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Gauge Score Widget */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center space-y-3 border-b md:border-b-0 md:border-r border-slate-800/80 pb-6 md:pb-0 md:pr-6">
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer Glow Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="377"
                  strokeDashoffset={377 - (377 * report.overallScore) / 100}
                  strokeLinecap="round"
                  className="text-indigo-500 transition-all duration-1000"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{report.overallScore}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">out of 100</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="inline-block text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
                {report.matchRating}
              </span>
              <p className="text-[11px] text-slate-400">Exceeds candidate benchmarks for {report.company}</p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Communication Clarity</div>
              <div className="text-2xl font-bold text-white">{report.metrics.communication}%</div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${report.metrics.communication}%` }} />
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold">High sentiment & cadence</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Technical Depth</div>
              <div className="text-2xl font-bold text-white">{report.metrics.technical}%</div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${report.metrics.technical}%` }} />
              </div>
              <p className="text-[10px] text-indigo-400 font-semibold">Solid architectural trade-offs</p>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-2xl space-y-2">
              <div className="text-xs text-slate-400 font-medium">Tone & Confidence</div>
              <div className="text-2xl font-bold text-white">{report.metrics.toneAndConfidence}%</div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${report.metrics.toneAndConfidence}%` }} />
              </div>
              <p className="text-[10px] text-cyan-400 font-semibold">Calm & authoritative pace</p>
            </div>

          </div>
        </div>

        {/* 5-Dimensional Precision Rubric Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" /> 5-Dimensional Evaluator Rubric Breakdown
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrated against Tier-1 tech (FAANG/FinTech) strict evaluation standards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                Zero-Grade Inflation Enforced
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Dimension 1: Relevance */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-400" /> Relevance
                </span>
                <span className="text-xs font-bold font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dimScores.relevance}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: `${dimScores.relevance}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Direct answer to core question without preamble or deflection.
              </p>
            </div>

            {/* Dimension 2: STAR Structure */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> STAR & Ownership
                </span>
                <span className="text-xs font-bold font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dimScores.starStructure}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${dimScores.starStructure}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Clear S-T-A-R narrative with distinct 'I' ownership over 'we'.
              </p>
            </div>

            {/* Dimension 3: Quantifiable Impact */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Metrics & Impact
                </span>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${
                  dimScores.quantifiableImpact >= 80 
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800' 
                    : 'text-amber-400 bg-amber-950/40 border-amber-800'
                }`}>
                  {dimScores.quantifiableImpact}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${dimScores.quantifiableImpact >= 80 ? 'bg-amber-400' : 'bg-amber-500'}`} style={{ width: `${dimScores.quantifiableImpact}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Concrete numbers, percentages, latencies (ms), or business ROI.
              </p>
            </div>

            {/* Dimension 4: Technical Precision */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" /> Tech Precision
                </span>
                <span className="text-xs font-bold font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dimScores.technicalPrecision}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dimScores.technicalPrecision}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Accurate systems terminology, memory/CPU trade-offs, and design patterns.
              </p>
            </div>

            {/* Dimension 5: Seniority Calibration */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Seniority Fit
                </span>
                <span className="text-xs font-bold font-mono text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {dimScores.seniorityCalibration}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${dimScores.seniorityCalibration}%` }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Scope of leadership, cross-functional vision, and risk foresight.
              </p>
            </div>
          </div>
        </div>

        {/* Action Plan Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Action Plan: 3 Critical Focus Areas
            </h2>
            <span className="text-xs text-slate-400">Targeted AI recommendations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.actionPlans.map((plan) => (
              <div key={plan.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                    plan.priority === 'High' 
                      ? 'bg-rose-950 text-rose-400 border-rose-800' 
                      : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}>
                    {plan.priority} Priority
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">{plan.category}</span>
                </div>

                <h3 className="font-bold text-slate-100 text-sm">{plan.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emotional Intelligence Graph */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" /> Emotional Intelligence & Vocal Stability Curve
              </h3>
              <p className="text-xs text-slate-400">Tracks confidence peaks and stress troughs across interview questions</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Confidence</span>
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Clarity</span>
            </div>
          </div>

          {/* SVG Curve Chart */}
          <div className="h-44 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#1e293b" strokeDasharray="4 4" />

              {/* Confidence Path */}
              <path
                d="M 20 50 Q 150 15, 270 65 T 480 30"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
              />
              {/* Clarity Path */}
              <path
                d="M 20 40 Q 150 20, 270 45 T 480 20"
                fill="none"
                stroke="#34d399"
                strokeWidth="3"
                strokeDasharray="2 2"
              />

              {/* Data points */}
              <circle cx="20" cy="50" r="4" fill="#22d3ee" />
              <circle cx="150" cy="20" r="4" fill="#22d3ee" />
              <circle cx="270" cy="65" r="4" fill="#22d3ee" />
              <circle cx="480" cy="30" r="4" fill="#22d3ee" />
            </svg>
            <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-2">
              <span>Q1: Technical Debt</span>
              <span>Q2: Conflict Resolution</span>
              <span>Q3: Metrics & Telemetry</span>
              <span>Q4: Production Bug</span>
            </div>
          </div>
        </div>

        {/* Transcript Deep-Dive Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> Question-by-Question Transcript Deep-Dive
            </h2>
            <span className="text-xs text-slate-400">Click to expand detailed inline AI highlights</span>
          </div>

          <div className="space-y-4">
            {report.transcripts.map((item) => {
              const isExpanded = expandedQuestionId === item.questionId;
              return (
                <div 
                  key={item.questionId}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <div 
                    onClick={() => setExpandedQuestionId(isExpanded ? null : item.questionId)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-400 text-xs">
                        Q{item.questionId}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{item.category}</div>
                        <h3 className="font-bold text-slate-100 text-sm mt-0.5">{item.questionText}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">{item.score} / 100 Score</div>
                        <div className="text-[10px] text-slate-500">{Math.floor(item.timeSec / 60)}m {item.timeSec % 60}s duration</div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 bg-slate-950/50">
                      
                      {/* Question-Level Dimensional Scores */}
                      {item.dimensionalScores && (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-indigo-400" /> Rubric Evaluation: 5 Dimensions
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">Calibrated Scoring</span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                              <div className="text-[10px] text-slate-400">Relevance</div>
                              <div className="font-bold text-white font-mono mt-0.5">{item.dimensionalScores.relevance}%</div>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                              <div className="text-[10px] text-slate-400">STAR Structure</div>
                              <div className="font-bold text-white font-mono mt-0.5">{item.dimensionalScores.starStructure}%</div>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                              <div className="text-[10px] text-slate-400">Quantifiable Metrics</div>
                              <div className={`font-bold font-mono mt-0.5 ${item.dimensionalScores.quantifiableImpact >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {item.dimensionalScores.quantifiableImpact}%
                              </div>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                              <div className="text-[10px] text-slate-400">Technical Precision</div>
                              <div className="font-bold text-white font-mono mt-0.5">{item.dimensionalScores.technicalPrecision}%</div>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-850 col-span-2 sm:col-span-1">
                              <div className="text-[10px] text-slate-400">Seniority Calib.</div>
                              <div className="font-bold text-white font-mono mt-0.5">{item.dimensionalScores.seniorityCalibration}%</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Candidate Answer Box */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Transcribed Response
                        </span>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                          "{item.candidateAnswer}"
                        </div>
                      </div>

                      {/* STAR Stage Breakdown if present */}
                      {item.starAnalysis && (
                        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-3">
                          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5 text-indigo-400" /> STAR Methodological Dissection
                          </span>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Situation (Context)</div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{item.starAnalysis.situation}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Task (Objective)</div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{item.starAnalysis.task}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Action (Ownership)</div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{item.starAnalysis.action}</p>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                              <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Result (Impact)</div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{item.starAnalysis.result}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Inline Highlights */}
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-400">AI Highlights & Metric Verification</span>
                        <div className="flex flex-wrap gap-2">
                          {item.highlights.map((h, idx) => (
                            <span 
                              key={idx}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                                h.type === 'positive' 
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                  : h.type === 'warning'
                                  ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                                  : 'bg-blue-950/80 text-blue-300 border-blue-800'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full fill-current" />
                              <strong>{h.label}:</strong> "{h.text}"
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Assessor Notes */}
                      <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 p-4 rounded-xl border border-indigo-500/20 text-xs space-y-1">
                        <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                          <BrainCircuit className="w-3.5 h-3.5" /> Assessor Rubric Notes
                        </span>
                        <p className="text-slate-300 leading-relaxed">{item.aiNotes}</p>
                      </div>

                      {/* Score Booster Rewrite if available */}
                      {item.scoreBoosterRewrite && (
                        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4 text-emerald-400" /> Score Booster: 95+ FAANG-Calibrated Exemplary Rewrite
                            </span>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                              +15 Pt Potential
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/80 p-3.5 rounded-lg border border-emerald-900/40 italic">
                            "{item.scoreBoosterRewrite}"
                          </p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Try Again CTA Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-white text-lg">Ready to refine your answers and test again?</h3>
            <p className="text-xs text-slate-400">Launch a new custom simulation with updated company rubrics.</p>
          </div>

          <button
            onClick={() => onSelectTab('setup')}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start New Practice Session</span>
          </button>
        </div>

      </div>
    </div>
  );
};
