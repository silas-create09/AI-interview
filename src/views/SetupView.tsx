import React, { useState, useMemo } from 'react';
import { AppTab, InterviewConfig, Question } from '../types';
import { TARGET_COMPANY_DIRECTORY, TARGET_ROLE_DIRECTORY, TargetRoleOption } from '../data/careerDirectory';
import { FIXED_QUESTIONS_PER_INTERVIEW, TOTAL_MARKS_POOL, calculateTotalPossibleMarks } from '../data/scoringConfig';
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
  Zap,
  Globe
} from 'lucide-react';

interface SetupViewProps {
  config: InterviewConfig;
  onChangeConfig: (newConfig: InterviewConfig) => void;
  onStartSimulation: (questions: Question[]) => void;
  onSelectTab: (tab: AppTab) => void;
}

const POPULAR_COMPANIES_SHORTCUTS = [
  "Tata Consultancy Services (TCS)",
  "Infosys",
  "Wipro",
  "HDFC Bank",
  "Hindustan Unilever (HUL)",
  "Tata Motors",
  "Flipkart",
  "Swiggy",
  "Google",
  "Amazon",
  "JPMorgan Chase & Co.",
  "McKinsey & Company"
];

export const SetupView: React.FC<SetupViewProps> = ({ 
  config, 
  onChangeConfig, 
  onStartSimulation,
  onSelectTab
}) => {
  const [roleInput, setRoleInput] = useState(config.role);
  const [companyInput, setCompanyInput] = useState(config.company);
  const [levelInput, setLevelInput] = useState<InterviewConfig['level']>(config.level === ('Executive / Director' as any) ? 'Senior / Lead' : config.level);
  const [difficultyInput, setDifficultyInput] = useState<'Easy' | 'Medium' | 'Hard'>(config.difficulty === ('Expert' as any) ? 'Medium' : (config.difficulty || 'Medium'));
  const [durationInput, setDurationInput] = useState(config.durationMinutes > 45 ? 30 : (config.durationMinutes || 30));
  const [customNotes, setCustomNotes] = useState(config.customNotes || "");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Directory filters
  const [selectedRoleDept, setSelectedRoleDept] = useState<string>('All');
  const [selectedCompanyIndustry, setSelectedCompanyIndustry] = useState<string>('All');

  const filteredRoles = useMemo(() => {
    return TARGET_ROLE_DIRECTORY.filter(r => {
      const matchDept = selectedRoleDept === 'All' || r.department === selectedRoleDept;
      return matchDept && r.isFresherFriendly;
    });
  }, [selectedRoleDept]);

  const filteredCompanies = useMemo(() => {
    if (selectedCompanyIndustry === 'All') return TARGET_COMPANY_DIRECTORY;
    return TARGET_COMPANY_DIRECTORY.filter(c => c.industry === selectedCompanyIndustry);
  }, [selectedCompanyIndustry]);

  const roleDepartments = [
    'All',
    'Data & Analytics',
    'Marketing',
    'Finance & Accounting',
    'Human Resources',
    'Information Technology',
    'Sales & BD',
    'Customer Support',
    'Content & Creative',
    'Operations & Admin'
  ];

  const companyIndustries = [
    'All',
    'IT & Tech',
    'Finance & Banking',
    'FMCG & Retail',
    'Manufacturing & Auto',
    'Startups & Unicorns',
    'Consulting & Analytics'
  ];

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

      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        let errText = `Server responded with status ${response.status}`;
        if (contentType.includes("application/json")) {
          const data = await response.json().catch(() => ({}));
          errText = (data.error || errText) + (data.details ? ` — ${data.details}` : "");
        }
        throw new Error(errText);
      }

      if (!contentType.includes("application/json")) {
        throw new Error("Question generation service returned an unexpected non-JSON response.");
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Select Target Role</h3>
                <p className="text-[11px] text-slate-400">Target entry-level, fresher, or specialized domain roles across India & globally</p>
              </div>
            </div>
          </div>

          {/* Search/Custom Role Input with Datalist */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              list="setup-roles-datalist"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              placeholder="e.g. Data Analyst, Digital Marketing Executive, Financial Analyst, Software Developer..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <datalist id="setup-roles-datalist">
              {TARGET_ROLE_DIRECTORY.filter(r => r.isFresherFriendly).map(r => (
                <option key={r.title} value={r.title}>{`${r.department} • Fresher-Friendly`}</option>
              ))}
            </datalist>
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {roleDepartments.map(dept => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedRoleDept(dept)}
                className={`text-[11px] whitespace-nowrap px-3 py-1 rounded-lg border font-medium transition-colors cursor-pointer ${
                  selectedRoleDept === dept
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredRoles.map((r) => {
              const isSelected = roleInput.toLowerCase() === r.title.toLowerCase();
              return (
                <div
                  key={r.title}
                  onClick={() => handleRoleSelect(r.title)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-2.5 ${
                    isSelected 
                      ? 'bg-indigo-950/80 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500' 
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="text-xl shrink-0 p-1 rounded-lg bg-slate-900 border border-slate-800">{r.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-white leading-tight">{r.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{r.department}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />}
                  </div>

                  <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                    {r.description}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-900">
                    <div className="flex flex-wrap gap-1">
                      {r.typicalSkills.slice(0, 2).map((sk) => (
                        <span key={sk} className="text-[9px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                          {sk}
                        </span>
                      ))}
                    </div>
                    {r.isFresherFriendly && (
                      <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/50 px-1.5 py-0.5 rounded shrink-0">
                        Fresher
                      </span>
                    )}
                  </div>
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
                {(['Junior / Entry', 'Mid-Level', 'Senior / Lead'] as const).map((lvl) => (
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">Target Company</label>
                <span className="text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> India & Global Employers
                </span>
              </div>
              <input
                type="text"
                list="setup-company-datalist"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
                placeholder="e.g. TCS, Infosys, HDFC Bank, HUL, Tata Motors, Flipkart, Google..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              />
              <datalist id="setup-company-datalist">
                {TARGET_COMPANY_DIRECTORY.map(c => (
                  <option key={c.name} value={c.name}>{`${c.industry} (${c.region}) — ${c.category}`}</option>
                ))}
              </datalist>

              {/* Industry Filter for Quick Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-0.5 scrollbar-thin">
                {companyIndustries.map(ind => (
                  <button
                    key={ind}
                    type="button"
                    onClick={() => setSelectedCompanyIndustry(ind)}
                    className={`text-[9px] whitespace-nowrap px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                      selectedCompanyIndustry === ind 
                        ? 'bg-indigo-600 text-white border-indigo-500' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
              
              {/* Company Chips from Directory */}
              <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto pr-1">
                {filteredCompanies.slice(0, 14).map(c => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setCompanyInput(c.name)}
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer transition-colors ${
                      companyInput === c.name 
                        ? 'bg-indigo-600 text-white border-indigo-500' 
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                    title={c.description}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Slider (Controls Session Pacing) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">Interview Length</span>
                <span className="font-mono font-bold text-cyan-400">{durationInput} Minutes • {FIXED_QUESTIONS_PER_INTERVIEW} Questions ({TOTAL_MARKS_POOL} Marks Pool)</span>
              </div>
              <input
                type="range"
                min="15"
                max="45"
                step="15"
                value={durationInput}
                onChange={(e) => setDurationInput(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>15 min (Fast Pacing)</span>
                <span>30 min (Standard Pacing)</span>
                <span>45 min (Detailed Pacing)</span>
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
