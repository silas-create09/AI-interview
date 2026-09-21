import React, { useState } from 'react';
import { AppTab, Question, ResumeAnalysisResult } from '../types';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  RefreshCw, 
  Layers, 
  Award, 
  Zap, 
  Search, 
  Check,
  RotateCcw
} from 'lucide-react';

interface ResumeReviewViewProps {
  onSelectTab: (tab: AppTab) => void;
  onCustomizeInterview?: (role: string, targetCompany: string) => void;
  onStartWithQuestions?: (questions: Question[], role: string, company: string) => void;
}

export const ResumeReviewView: React.FC<ResumeReviewViewProps> = ({ 
  onSelectTab, 
  onCustomizeInterview,
  onStartWithQuestions 
}) => {
  const [resumeText, setResumeText] = useState('');
  const [targetCompany, setTargetCompany] = useState('Google');
  const [targetRole, setTargetRole] = useState('Senior Software Engineer');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'bullets' | 'keywords' | 'interview-bridge'>('overview');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const analyzeResume = async (file?: File, directText?: string) => {
    const textToUse = directText !== undefined ? directText : resumeText;
    if (!file && !textToUse.trim()) {
      setErrorMessage("Please enter resume text or upload a document (.pdf, .docx, .txt).");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      let res: Response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("targetRole", targetRole);
        formData.append("targetCompany", targetCompany);

        res = await fetch("/api/resume/analyze", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/resume/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resumeText: textToUse,
            targetRole,
            targetCompany,
          }),
        });
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP ${res.status}: Resume analysis failed`);
      }

      const data: ResumeAnalysisResult = await res.json();
      setAnalysisResult(data);
      setHasAnalyzed(true);
      setActiveTab('overview');
    } catch (err: any) {
      console.error("Resume analysis error:", err);
      setErrorMessage(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // If it's plain text, read it into textarea too
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          if (text) setResumeText(text);
        };
        reader.readAsText(file);
      }
      analyzeResume(file);
    }
  };

  const handleLaunchMockFromResume = () => {
    if (analysisResult?.probeQuestions && analysisResult.probeQuestions.length > 0) {
      const formattedQuestions: Question[] = analysisResult.probeQuestions.map((pq, idx) => ({
        id: 2000 + idx,
        question: pq.question,
        category: pq.category || "Resume Deep Dive",
        difficulty: "Hard",
        expectedAnswerType: (pq.expectedAnswerType as any) || "technical",
        idealAnswerPoints: pq.idealAnswerPoints || [],
        recommendedDurationSec: 180,
      }));

      if (onStartWithQuestions) {
        onStartWithQuestions(formattedQuestions, targetRole, targetCompany);
        return;
      }
    }

    if (onCustomizeInterview) {
      onCustomizeInterview(targetRole, targetCompany);
    } else {
      onSelectTab('setup');
    }
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

          {hasAnalyzed && analysisResult && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleLaunchMockFromResume}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>Launch Mock from Resume</span>
              </button>
            </div>
          )}
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div className="bg-red-950/70 border border-red-500/60 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-red-200">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <div className="font-bold text-red-300">Resume Audit Unavailable</div>
                <div className="text-[11px] text-red-200/80 mt-0.5">{errorMessage}</div>
              </div>
            </div>
            <button
              onClick={() => analyzeResume()}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Audit</span>
            </button>
          </div>
        )}

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
                {hasAnalyzed && (
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    Audited
                  </span>
                )}
              </div>

              {/* Target Company & Role Selection with free-text and datalists */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    <span>Target Company</span>
                  </label>
                  <input
                    type="text"
                    list="company-list"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <datalist id="company-list">
                    <option value="Google" />
                    <option value="Amazon" />
                    <option value="Meta" />
                    <option value="Apple" />
                    <option value="Netflix" />
                    <option value="Microsoft" />
                    <option value="Stripe" />
                    <option value="Uber" />
                    <option value="Airbnb" />
                  </datalist>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-500" />
                    <span>Target Role</span>
                  </label>
                  <input
                    type="text"
                    list="role-list"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Staff Engineer, Product Manager"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <datalist id="role-list">
                    <option value="Senior Software Engineer" />
                    <option value="Staff Software Engineer" />
                    <option value="Engineering Manager" />
                    <option value="Product Manager" />
                    <option value="DevOps & Site Reliability Engineer" />
                    <option value="Machine Learning Engineer" />
                    <option value="Data Scientist" />
                  </datalist>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 text-center transition-colors bg-slate-950/40">
                <input 
                  type="file" 
                  accept=".txt,.pdf,.docx"
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

              {uploadedFileName && (
                <div className="p-2.5 rounded-xl bg-indigo-950/60 border border-indigo-800/80 text-indigo-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                  <span>Uploaded file: <strong>{uploadedFileName}</strong></span>
                </div>
              )}

              {/* Editable Resume Text Area */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Resume Text
                  </label>
                  <span className="text-[10px] text-slate-500">
                    {resumeText.trim() ? `${resumeText.trim().split(/\s+/).length} words` : "Empty"}
                  </span>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={12}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                  placeholder="Paste your resume markdown or plain text here, or upload a file above..."
                />
              </div>

              <button
                onClick={() => analyzeResume()}
                disabled={isAnalyzing || (!resumeText.trim() && !uploadedFileName)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing against {targetCompany} Rubric...</span>
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
            
            {!hasAnalyzed || !analysisResult ? (
              /* Empty State when no analysis has run */
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl flex flex-col items-center justify-center text-center space-y-4 min-h-[460px]">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-md">
                  <h3 className="text-lg font-bold text-white">No Resume Audit Yet</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Upload your resume (.pdf, .docx, .txt) or paste your experience into the editor on the left. InterviewAI will evaluate your profile against FAANG+ rubrics and generate targeted technical probe questions.
                  </p>
                </div>
              </div>
            ) : (
              <>
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

                    {/* Sub Scores from real dimensions if available */}
                    <div className="sm:col-span-2 grid grid-cols-3 gap-3 text-center">
                      {(analysisResult.dimensions && analysisResult.dimensions.length >= 3 
                        ? analysisResult.dimensions.slice(0, 3) 
                        : [
                            { name: "Impact", score: Math.min(100, analysisResult.score + 4), comment: "Metric Ratio" },
                            { name: "ATS Match", score: analysisResult.score, comment: "Keyword Match" },
                            { name: "Seniority", score: Math.max(50, analysisResult.score - 6), comment: "Scope & Growth" }
                          ]
                      ).map((dim, idx) => (
                        <div key={idx} className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                          <div className="text-[11px] font-bold text-slate-400 truncate">{dim.name}</div>
                          <div className="text-base font-black text-cyan-400 mt-1">{dim.score}%</div>
                          <div className="text-[10px] text-slate-500 mt-0.5 truncate">{dim.comment || "Calibrated"}</div>
                        </div>
                      ))}
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
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-indigo-400" />
                      <span>Calibrated Dimensions for {targetCompany}</span>
                    </h3>

                    <div className="space-y-4">
                      {(analysisResult.dimensions || []).map((dim, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              {dim.name}
                            </span>
                            <span className="font-bold text-emerald-400">{dim.score} / 100</span>
                          </div>
                          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${Math.min(100, Math.max(5, dim.score))}%` }} 
                            />
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {dim.comment}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: Bullet Rewrites (Google X-Y-Z Formula) */}
                {activeTab === 'bullets' && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
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
                        {analysisResult.bulletCritiques.length} Suggestions
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
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
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
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
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
                      {(analysisResult.probeQuestions || []).map((pq, idx) => (
                        <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-indigo-400 uppercase tracking-wider">
                              Probe Question {idx + 1} • {pq.category}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Type: {pq.expectedAnswerType}
                            </span>
                          </div>
                          <p className="text-xs text-white font-medium leading-relaxed">
                            "{pq.question}"
                          </p>
                          {pq.idealAnswerPoints && pq.idealAnswerPoints.length > 0 && (
                            <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400">
                              <span className="font-semibold text-slate-300">Key Focus Points: </span>
                              {pq.idealAnswerPoints.join(" • ")}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleLaunchMockFromResume}
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Practice Answering These in Live Video Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
