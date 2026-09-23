import React, { useState } from 'react';
import { AppTab, CompanyIntel } from '../types';
import { TOP_COMPANIES } from '../data/mockData';
import { 
  Building2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface CompanyPrepViewProps {
  onSelectTab: (tab: AppTab) => void;
  onSetTargetCompany: (companyName: string) => void;
}

export const CompanyPrepView: React.FC<CompanyPrepViewProps> = ({ 
  onSelectTab, 
  onSetTargetCompany 
}) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyIntel>(TOP_COMPANIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCompanyInput, setCustomCompanyInput] = useState('');
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);

  const filteredCompanies = TOP_COMPANIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleResearchCustomCompany = async () => {
    if (!customCompanyInput.trim()) return;
    setIsLoadingCustom(true);
    setResearchError(null);

    try {
      const res = await fetch("/api/company/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: customCompanyInput.trim(), role: "Software Engineer" })
      });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        let errText = `HTTP ${res.status}: Company research failed`;
        if (contentType.includes("application/json")) {
          const errData = await res.json().catch(() => ({}));
          errText = errData.error || errText;
        }
        throw new Error(errText);
      }

      if (!contentType.includes("application/json")) {
        throw new Error("Company research service returned an unexpected non-JSON response.");
      }

      const data = await res.json();
      if (data.companyName) {
        setSelectedCompany({
          name: data.companyName,
          logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80",
          tagline: `${data.companyName} Specialized Interview Prep`,
          category: "Target Enterprise",
          overview: data.overview,
          keyValues: data.keyValues || ["Innovation", "Excellence", "Customer Impact"],
          commonQuestions: data.commonQuestions || [],
          prepTip: data.prepTip || "Focus on STAR framework structure."
        });
      }
    } catch (e: any) {
      console.error("Custom company research failed", e);
      setResearchError(e.message || "Unable to research target company.");
    } finally {
      setIsLoadingCustom(false);
    }
  };

  const handleStartCompanySession = () => {
    onSetTargetCompany(selectedCompany.name);
    onSelectTab('setup');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
            <Building2 className="w-3.5 h-3.5" /> Company Intelligence Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Targeted Company Interview Intelligence
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Deep-dive into culture values, bar raiser expectations, and top asked questions for leading Indian and global employers across IT, banking, FMCG, manufacturing, and startups.
          </p>
        </div>

        {/* Search & Select Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Company Selector */}
          <div className="md:col-span-4 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TCS, Infosys, HDFC, HUL, Flipkart, Google..."
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Custom Company Search Input */}
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="text-[11px] font-bold text-slate-300">Research Custom Target Company</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customCompanyInput}
                  onChange={(e) => setCustomCompanyInput(e.target.value)}
                  placeholder="e.g. OpenAI, Palantir..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  onClick={handleResearchCustomCompany}
                  disabled={isLoadingCustom}
                  className="bg-amber-600 hover:bg-amber-500 text-white p-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  {isLoadingCustom ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                </button>
              </div>
              {researchError && (
                <div className="p-2 rounded-xl bg-red-950/60 border border-red-500/50 text-[11px] text-red-200 flex items-center justify-between gap-1.5">
                  <span>{researchError}</span>
                  <button
                    onClick={handleResearchCustomCompany}
                    className="underline text-red-300 hover:text-white font-bold cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Company Cards List */}
            <div className="space-y-2">
              {filteredCompanies.map(c => {
                const isSelected = selectedCompany.name === c.name;
                return (
                  <div
                    key={c.name}
                    onClick={() => setSelectedCompany(c)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-amber-950/40 border-amber-500 shadow-lg shadow-amber-500/10' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.logo} alt={c.name} className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
                      <div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.category}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Company Intelligence Details */}
          <div className="md:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-800 shadow-lg" />
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{selectedCompany.name}</h2>
                  <p className="text-xs text-amber-400 font-medium">{selectedCompany.tagline}</p>
                </div>
              </div>

              <button
                onClick={handleStartCompanySession}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Practice {selectedCompany.name} Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" /> Interview Process Overview
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {selectedCompany.overview}
              </p>
            </div>

            {/* Core Values */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Core Culture Principles
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.keyValues.map((v, i) => (
                  <span key={i} className="text-xs font-bold bg-amber-950/60 border border-amber-800/80 text-amber-300 px-3 py-1.5 rounded-xl">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            {/* Common Questions */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {selectedCompany.commonQuestions.map((q, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-200 flex items-start gap-2.5">
                    <span className="text-amber-400 font-mono font-bold">{idx + 1}.</span>
                    <span>"{q}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Prep Tip */}
            <div className="bg-gradient-to-tr from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 p-4 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" /> Bar Raiser Prep Tip
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedCompany.prepTip}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
