import React, { useState } from 'react';
import { AppTab } from '../types';
import { TEAM_MEMBERS, CASE_STUDIES } from '../data/mockData';
import { 
  Info, 
  Sparkles, 
  Award, 
  BrainCircuit, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Target,
  CheckCircle2,
  Mic,
  Activity,
  Layers,
  Lock,
  Zap,
  ChevronDown,
  ChevronUp,
  Cpu,
  BarChart3,
  Flame,
  Clock,
  Compass,
  FileCheck,
  Check,
  X,
  BookOpen
} from 'lucide-react';

interface AboutViewProps {
  onSelectTab: (tab: AppTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onSelectTab }) => {
  const [activeTechTab, setActiveTechTab] = useState<'acoustic' | 'gemini' | 'rubric' | 'security'>('acoustic');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the vocal acoustic engine distinguish between thoughtful pauses and nervous hesitations?",
      answer: "Our digital signal processing (DSP) pipeline analyzes the spectral envelope and pitch micro-variations immediately preceding a pause. A thoughtful pause typically exhibits a stable descending pitch cadence with no trailing glottal fry or filler phonemes (e.g., 'uh', 'um'). Conversely, anxiety-induced hesitations display pitch instability, breath tremors, and stutter frequencies, which our models quantify separately."
    },
    {
      question: "How are company-specific interview rubrics calibrated and kept up to date?",
      answer: "Our rubric database is curated through continuous analysis of verified candidate debriefs, published company leadership tenets (such as Amazon's 16 Leadership Principles and Google's GCA criteria), and regular calibration rounds with active industry bar raisers. The rubrics explicitly grade trade-off articulation, architectural choices, and executive presence required at each specific career level."
    },
    {
      question: "Does InterviewAI store or train on my audio recordings or transcripts?",
      answer: "No. We operate under a strict Zero Data Retention (ZDR) policy. Audio streams are processed ephemerally in volatile memory for real-time DSP feature extraction and immediately discarded after the scorecard synthesis is completed. Your transcripts and audio are never utilized to train public foundational AI models."
    },
    {
      question: "How does the system handle diverse regional accents and multilingual speakers?",
      answer: "Our speech recognition and acoustic scoring layers are trained on internationally diverse multilingual datasets spanning over 120 regional phonetic patterns. The evaluation algorithms prioritize semantic clarity, structural logic, and vocal confidence over native accent conformism, actively eliminating phonetic bias."
    },
    {
      question: "Can InterviewAI evaluate executive leadership and behavioral rounds as effectively as technical rounds?",
      answer: "Yes. Our behavioral evaluation framework specifically deconstructs narrative arcs using the STAR method (Situation, Task, Action, Result), assessing stakeholder diplomacy, conflict mediation, cross-functional advocacy, and quantitative metric attribution—skills that are critical for Director, VP, and Principal level candidates."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Header & Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400 shadow-lg shadow-indigo-950/30">
            <Info className="w-3.5 h-3.5 text-indigo-400" /> 
            <span>Our Mission, Science & Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Democratizing Elite Career Coaching with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Computational Speech Science
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We created InterviewAI to eliminate the high-stakes anxiety of modern technical and executive interviews. By pairing real-time acoustic signal processing with Gemini multimodal reasoning, we provide every candidate with world-class, objective, and unbiased bar-raiser feedback.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onSelectTab('setup')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Launch Practice Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectTab('company-prep')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Browse Company Intelligence</span>
            </button>
          </div>
        </section>

        {/* High-Impact Proof Statistics */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-1 relative">
            <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">15,000+</div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Simulated Sessions</div>
            <p className="text-[11px] text-slate-500 pt-1">Across 85+ countries</p>
          </div>

          <div className="space-y-1 relative">
            <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">88.4%</div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Offer Rate</div>
            <p className="text-[11px] text-slate-500 pt-1">At Tier 1 tech & finance firms</p>
          </div>

          <div className="space-y-1 relative">
            <div className="text-3xl sm:text-5xl font-black text-cyan-400 tracking-tight">&lt;120ms</div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Acoustic Latency</div>
            <p className="text-[11px] text-slate-500 pt-1">Sub-second speech analytics</p>
          </div>

          <div className="space-y-1 relative">
            <div className="text-3xl sm:text-5xl font-black text-purple-400 tracking-tight">98.2%</div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Bar Raiser Correlation</div>
            <p className="text-[11px] text-slate-500 pt-1">Calibrated with hiring committees</p>
          </div>
        </section>

        {/* Interactive Technology Deep-Dive Hub */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
              <Cpu className="w-3.5 h-3.5" /> Engineering & Deep Tech
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Technology Powering InterviewAI
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore how our low-latency speech pipelines, neural language reasoning, and calibrated assessment rubrics operate behind the scenes.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveTechTab('acoustic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTechTab === 'acoustic'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Acoustic DSP Engine</span>
            </button>

            <button
              onClick={() => setActiveTechTab('gemini')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTechTab === 'gemini'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Gemini Multimodal Reasoning</span>
            </button>

            <button
              onClick={() => setActiveTechTab('rubric')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTechTab === 'rubric'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Bar Raiser Rubrics</span>
            </button>

            <button
              onClick={() => setActiveTechTab('security')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTechTab === 'security'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy & Zero-Retention</span>
            </button>
          </div>

          {/* Tab Details Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {activeTechTab === 'acoustic' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
                    <Zap className="w-3.5 h-3.5" /> Real-time Speech DSP
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Sub-100ms Acoustic Cadence Analytics</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Our proprietary WebAudio signal processor continuously extracts frequency spectrum, vocal intensity, and speech envelope parameters in real time without sending raw audio files to external storage.
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Words-Per-Minute (WPM) Sweet Spot:</strong> Tracks conversational pacing to ensure you stay in the optimal 130-160 WPM clarity zone.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Filler Word & Glottal Hesitation Detection:</strong> Categorizes verbal crutches (like, um, basically) and measures pause durations.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Pitch Stability & Stress Tracking:</strong> Monitors voice tremor and inflection changes during high-pressure follow-up probes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-3">
                    <span className="text-indigo-400 font-bold flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Live Acoustic Pipeline
                    </span>
                    <span className="text-emerald-400 text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded">Active DSP Hook</span>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">FFT Sample Window:</span>
                      <span className="text-cyan-400">1024 bins @ 44.1 kHz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Cadence:</span>
                      <span className="text-emerald-400">142 WPM (Optimal Range)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vocal Pitch Variation:</span>
                      <span className="text-indigo-300">±14 Hz (High Stability)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Silence Classification:</span>
                      <span className="text-amber-300">Thoughtful Reflection (1.2s)</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 w-[94%]" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                      <span>Low Energy</span>
                      <span>Signal Confidence: 94%</span>
                      <span>High Energy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'gemini' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
                    <BrainCircuit className="w-3.5 h-3.5" /> Neural Semantic Engine
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Gemini Multimodal Reasoning & Adaptive Probes</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Powered by Google's Gemini models, the AI interviewer dynamically listens, maps answers into a semantic dependency graph, and constructs intelligent follow-up questions tailored to your exact responses.
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">STAR Narrative Parsing:</strong> Dissects answers into Situation, Task, Action, and Result components to evaluate completeness.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Quantitative Metric Extraction:</strong> Flags whether you quantified business outcomes with specific numbers and percentages.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Adaptive Follow-Up Probing:</strong> Challenges ambiguous claims with contextual questions just like a real Principal interviewer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800/80 pb-3 flex items-center justify-between">
                    <span>Semantic Narrative Breakdown</span>
                    <span className="text-indigo-400 text-[11px]">Real-time Evaluation</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <div className="flex justify-between font-semibold pb-1">
                        <span className="text-indigo-400">Situation (Context)</span>
                        <span className="text-emerald-400">Clear & Concise</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Established multi-tenant system constraints and tight 6-week release schedule.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <div className="flex justify-between font-semibold pb-1">
                        <span className="text-cyan-400">Action (Individual Contribution)</span>
                        <span className="text-emerald-400">High Ownership (58% of answer)</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Employed 'I' statements, led component modularization, and negotiated trade-offs.</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <div className="flex justify-between font-semibold pb-1">
                        <span className="text-emerald-400">Result (Impact & Telemetry)</span>
                        <span className="text-emerald-400">Quantified (+25% speed)</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Documented 3-day early delivery and reduced engineering rework by 25%.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'rubric' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
                    <Target className="w-3.5 h-3.5" /> Calibrated Assessment
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">420+ Calibrated Corporate Rubric Models</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Different companies prioritize fundamentally different traits. We simulate the exact evaluation criteria used by Amazon Bar Raisers, Google Hiring Committees, Meta Engineering Directors, and Stripe API Craftsmen.
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Amazon Leadership Principles:</strong> Evaluates answers specifically for 'Bias for Action', 'Customer Obsession', and 'Earn Trust'.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Google GCA & Googleyness:</strong> Assesses intellectual humility, comfort with ambiguity, and structured problem decomposition.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Role-Specific Seniority Tiers:</strong> Dynamic scoring calibrated from Junior (L3) to Staff / Principal (L6+).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800/80 pb-3">
                    Target Company Scoring Matrix
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <div className="font-bold text-white">Amazon Model (L6 SDE)</div>
                        <div className="text-[11px] text-slate-400">Weight: 40% LP Alignment, 40% Architecture, 20% Delivery</div>
                      </div>
                      <span className="text-amber-400 font-mono font-bold">16 LPs</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <div className="font-bold text-white">Google Model (L5 Senior)</div>
                        <div className="text-[11px] text-slate-400">Weight: 50% Algorithmic Depth, 30% Scale, 20% Googleyness</div>
                      </div>
                      <span className="text-cyan-400 font-mono font-bold">GCA Rubric</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div>
                        <div className="font-bold text-white">Stripe Model (Staff Designer)</div>
                        <div className="text-[11px] text-slate-400">Weight: 45% Craft & Polish, 35% Systems, 20% Communication</div>
                      </div>
                      <span className="text-purple-400 font-mono font-bold">Craft Bar</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTechTab === 'security' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Enterprise Grade
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Zero Data Retention (ZDR) & Algorithmic Ethics</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Your interview prep should remain 100% private. We implement rigorous client-side memory safety, zero persistent audio logging, and comprehensive algorithmic debiasing.
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Zero Model Training:</strong> Your voice recordings and answers are never used to train public or foundational AI models.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">In-Memory Ephemeral DSP:</strong> Audio buffers are processed purely in volatile memory and purged immediately after report generation.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">
                        <strong className="text-white">Accent-Neutral Bias Guard:</strong> Machine learning layers undergo multi-dialect normalization to prevent linguistic discrimination.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800/80 pb-3 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" /> Security Guarantees & Certifications
                  </h4>
                  <div className="space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Data Transit Encryption:</span>
                      <span className="text-emerald-400 font-mono font-bold">TLS 1.3 End-to-End</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">Audio Retention Policy:</span>
                      <span className="text-emerald-400 font-mono font-bold">0 Days (Instant Purge)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">SOC-2 Type II Compliance:</span>
                      <span className="text-cyan-400 font-mono font-bold">Verified Architecture</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-300">PII De-identification:</span>
                      <span className="text-purple-400 font-mono font-bold">Client-Side Anonymized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* The 4-Pillar Evaluation Framework */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 4-Pillar Evaluation Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Every mock interview is objectively scored across four core dimensions derived from elite tech hiring committees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                01
              </div>
              <h3 className="font-bold text-white text-base">Speech Fluency & Cadence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates WPM rhythm (130-160 WPM sweet spot), eliminating filler crutches, voice tremor, and awkward conversational dead air.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                02
              </div>
              <h3 className="font-bold text-white text-base">STAR Structural Precision</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ensures concise Situation setup, clear personal Action ownership, and concrete quantified Result metrics with business outcomes.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                03
              </div>
              <h3 className="font-bold text-white text-base">Technical Depth & Trade-offs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Checks for nuanced architectural comparisons, latency vs. consistency considerations, and thoughtful system design trade-offs.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                04
              </div>
              <h3 className="font-bold text-white text-base">Executive Presence & Composure</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measures emotional resilience, vocal stability, and stakeholder empathy under pressure when answering challenging follow-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table: AI vs. Traditional Prep */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
              <BarChart3 className="w-3.5 h-3.5" /> Comparative Benchmark Study
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Engineers Choose AI Simulation
            </h2>
            <p className="text-xs text-slate-400">
              How InterviewAI compares against informal peer practice and expensive human coaching.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-300">
                    <th className="p-4 sm:p-5 font-bold">Evaluation Factor</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-400">Informal Peer Mocks</th>
                    <th className="p-4 sm:p-5 font-bold text-slate-400">Human Career Coach</th>
                    <th className="p-4 sm:p-5 font-bold text-indigo-400 bg-indigo-950/30">InterviewAI Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Availability & On-Demand Scheduling</td>
                    <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-400" /> Hard to schedule
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Limited (Days in advance)
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> 24/7 Instant Simulation</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Feedback Objectivity & Non-Bias</td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Subjective / Polite Bias
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Varies by individual coach
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> 100% Unbiased DSP & Rubrics</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Feedback Turnaround Speed</td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      5-10 min casual debrief
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      24 - 48 Hours for notes
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Under 30 Seconds Scorecard</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Acoustic & Vocal Telemetry</td>
                    <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-400" /> None
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Rough qualitative impression
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Exact WPM, Pitch & Filler Counts</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Company Rubric Granularity</td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Generic leetcode/behavioral
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Based on coach's past jobs
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> 420+ Corporate Rubric Models</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">Cost & Accessibility</td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      Free (Reciprocal effort)
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      $250 – $600 / Hour
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-400 font-bold bg-indigo-950/20">
                      <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Instant & Accessible Practice</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Meet the Leadership & Scientific Advisory Board */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leadership & Scientific Advisory Board
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Built by speech scientists, former Amazon Bar Raisers, Stanford NLP researchers, and Silicon Valley hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((m, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg flex-shrink-0" 
                    />
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">{m.name}</h3>
                      <div className="text-xs text-indigo-400 font-semibold">{m.role}</div>
                      <div className="text-[11px] text-cyan-400 font-medium">{m.exCompany}</div>
                    </div>
                  </div>
                  
                  <div className="text-[11px] text-slate-300 font-medium bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                    {m.credentials}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Candidate Transformation Case Studies */}
        <section className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <FileCheck className="w-3.5 h-3.5" /> Real-World Outcomes
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Candidate Transformation Case Studies
            </h2>
            <p className="text-xs text-slate-400">
              See how structured AI simulation helped engineers and designers secure offers at top global organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((c, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div>
                      <h3 className="font-bold text-white text-sm">{c.candidateName}</h3>
                      <div className="text-xs text-indigo-400">{c.targetRole}</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                      {c.company}
                    </span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Initial Mock Score</div>
                      <div className="font-bold text-rose-400 text-base">{c.initialScore} / 100</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Post-Practice Score</div>
                      <div className="font-bold text-emerald-400 text-base">{c.finalScore} / 100</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {c.highlight}
                  </p>

                  <blockquote className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-xl border-l-2 border-indigo-500">
                    "{c.quote}"
                  </blockquote>
                </div>

                <div className="pt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{c.roundsPassed}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology & Science FAQ */}
        <section className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
              <BookOpen className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Technology & Methodology FAQ
            </h2>
            <p className="text-xs text-slate-400">
              Detailed answers on how our acoustic models, scoring engine, and privacy architecture function.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-white hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-950/40 border border-indigo-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <h3 className="font-black text-white text-2xl sm:text-3xl tracking-tight">
            Ready to Master Your Next High-Stakes Interview?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Configure your target role, select your company calibration rubric, and experience real-time AI interview coaching today.
          </p>
          <div>
            <button
              onClick={() => onSelectTab('setup')}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-600/30 inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Start Interactive Simulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
