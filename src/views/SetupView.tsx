import React, { useState } from 'react';
import { AppTab, InterviewConfig, Question } from '../types';
import { MicCheck } from '../components/MicCheck';
import { 
  Settings, 
  Search, 
  Building2, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  ArrowRight,
  HelpCircle,
  RefreshCw,
  Sliders,
  AlertTriangle,
  RotateCcw,
  Zap
} from 'lucide-react';

interface SetupViewProps {
  config: InterviewConfig;
  onChangeConfig: (newConfig: InterviewConfig) => void;
  onStartSimulation: (questions: Question[]) => void;
  onSelectTab: (tab: AppTab) => void;
}

const PRESET_ROLES = [
  { title: "Software Engineer", dept: "Engineering", icon: "💻" },
  { title: "Senior Product Designer", dept: "Design", icon: "🎨" },
  { title: "Product Manager", dept: "Product", icon: "🎯" },
  { title: "Data Scientist & AI Lead", dept: "Data & ML", icon: "📊" },
  { title: "Solutions Architect", dept: "Cloud Infra", icon: "☁️" },
  { title: "Engineering Manager", dept: "Management", icon: "👥" },
];

const PRESET_COMPANIES = ["Global Tech Corp", "Google", "Amazon", "Meta", "Stripe", "Apple", "McKinsey"];

export const SetupView: React.FC<SetupViewProps> = ({ 
  config, 
  onChangeConfig, 
  onStartSimulation,
  onSelectTab
}) => {
  const [roleInput, setRoleInput] = useState(config.role);
  const [companyInput, setCompanyInput] = useState(config.company);
  const [levelInput, setLevelInput] = useState(config.level);
  const [difficultyInput, setDifficultyInput] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert'>(config.difficulty || 'Medium');
  const [durationInput, setDurationInput] = useState(config.durationMinutes);
  const [customNotes, setCustomNotes] = useState(config.customNotes || "");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRoleSelect = (title: string) => {
    setRoleInput(title);
  };

  const handleInitialize = async () => {
    setIsLoadingQuestions(true);
    setErrorMessage(null);

    const updatedConfig: InterviewConfig = {
      role: roleInput,
      level: levelInput,
      difficulty: difficultyInput,
      company: companyInput,
      durationMinutes: durationInput,
      customNotes: customNotes
    };

    onChangeConfig(updatedConfig);

    // Retrieve previous questions for deduplication
    let previousQuestions: string[] = [];
    try {
      const stored = localStorage.getItem("interview_prev_questions");
      if (stored) {
        previousQuestions = JSON.parse(stored);
      }
    } catch {
      previousQuestions = [];
    }

    try {
      const response = await fetch("/api/interview/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedConfig,
          previousQuestions,
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data.error || `Server responded with status ${response.status}`) + (data.details ? ` — ${data.details}` : ""));
      }

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        // Save new questions for deduplication in future sessions
        try {
          const newQTexts = data.questions.map((q: any) => q.question);
          const combined = [...previousQuestions, ...newQTexts].slice(-30);
          localStorage.setItem("interview_prev_questions", JSON.stringify(combined));
        } catch {
          // ignore storage quota errors
        }
        onStartSimulation(data.questions);
      } else {
        throw new Error("No questions were returned by the AI service.");
      }
    } catch (e: any) {
      console.error("API call error generating questions:", e);
      setErrorMessage(e.message || "Failed to generate questions. AI service unavailable.");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
            <Sliders className="w-3.5 h-3.5" /> Simulation Configuration
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Set the Stage for Your Next Career Leap
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Configure your target job role, seniority level, and company domain to generate tailored AI interview rubrics.
          </p>
        </div>

        {/* Step 1: Role Selection Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                1
              </div>
              <h3 className="font-bold text-white text-base">Select Target Role</h3>
            </div>
            <span className="text-xs text-slate-400">Choose preset or type custom</span>
          </div>

          {/* Search/Custom Role Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="e.g. Principal Backend Engineer, Senior Product Designer..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESET_ROLES.map((r) => {
              const isSelected = roleInput === r.title;
              return (
                <div
                  key={r.title}
                  onClick={() => handleRoleSelect(r.title)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/20' 
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{r.title}</div>
                      <div className="text-[10px] text-slate-400">{r.dept}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Seniority, Company & Length */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                2
              </div>
              <h3 className="font-bold text-white text-base">Seniority, Company & Duration</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Seniority Level Radio Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Seniority Level (Job Scope)</label>
              <div className="space-y-2">
                {(['Junior / Entry', 'Mid-Level', 'Senior / Lead', 'Executive / Director'] as const).map((lvl) => (
                  <label
                    key={lvl}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      levelInput === lvl ? 'bg-indigo-950/80 border-indigo-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{lvl}</span>
                    <input
                      type="radio"
                      name="level"
                      checked={levelInput === lvl}
                      onChange={() => setLevelInput(lvl)}
                      className="accent-indigo-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Target Difficulty Radio Choice */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Interview Difficulty (Question Rigor & Grading)</label>
                <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Calibrated Grading
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { key: 'Easy', desc: 'Fundamentals & definitions (Direct answers reach 70-85)' },
                  { key: 'Medium', desc: 'Applied scenarios & reasoning (Need examples for 70+)' },
                  { key: 'Hard', desc: 'Trade-offs & edge cases (Shallow answers capped at 65)' },
                  { key: 'Expert', desc: 'Ambiguous systems, failure modes & deep architecture' },
                ].map((d) => (
                  <label
                    key={d.key}
                    className={`flex flex-col p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      difficultyInput === d.key
                        ? 'bg-amber-950/40 border-amber-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{d.key}</span>
                      <input
                        type="radio"
                        name="difficulty"
                        checked={difficultyInput === d.key}
                        onChange={() => setDifficultyInput(d.key as any)}
                        className="accent-amber-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">{d.desc}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Target Company */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Target Company</label>
              <input
                type="text"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="e.g. Google, Amazon, Stripe, McKinsey..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              
              {/* Company Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_COMPANIES.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCompanyInput(c)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
                      companyInput === c ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">Interview Length</span>
                <span className="font-mono font-bold text-cyan-400">{durationInput} Minutes ({durationInput <= 15 ? 3 : durationInput <= 30 ? 5 : durationInput <= 45 ? 7 : 9} Questions)</span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="15"
                value={durationInput}
                onChange={(e) => setDurationInput(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>15 min (3 Qs)</span>
                <span>30 min (5 Qs)</span>
                <span>45 min (7 Qs)</span>
                <span>60 min (9 Qs)</span>
              </div>
            </div>

          </div>

          {/* Custom Notes */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-300">Custom Focus Areas & Probing Instructions (Optional)</label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g. Focus heavily on distributed locking algorithms and trade-off analysis..."
              className="w-full h-20 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>
        </div>

        {/* Step 3: Integrated Mic Calibration Component */}
        <MicCheck />

        {/* Error Banner */}
        {errorMessage && (
          <div className="bg-red-950/60 border border-red-500/60 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-red-200">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <div className="font-bold text-red-300">Question Generation Failed</div>
                <div className="text-[11px] text-red-200/80 mt-0.5">{errorMessage}</div>
              </div>
            </div>
            <button
              onClick={handleInitialize}
              disabled={isLoadingQuestions}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Generation</span>
            </button>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center pt-4">
          <button
            onClick={handleInitialize}
            disabled={isLoadingQuestions}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-600 text-white font-extrabold text-sm shadow-2xl shadow-indigo-600/40 inline-flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isLoadingQuestions ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating AI Questions & Loading Studio...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Initialize Simulation -&gt;</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
