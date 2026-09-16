import React from 'react';
import { AppTab } from '../types';
import { AudioWaveform } from '../components/AudioWaveform';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Mic, 
  BrainCircuit, 
  Award, 
  ShieldCheck, 
  ChevronRight,
  MessageSquareText,
  Activity,
  Target,
  Compass,
  FileText
} from 'lucide-react';

interface LandingViewProps {
  onSelectTab: (tab: AppTab) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSelectTab }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Glow Ambient Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-900/20 via-blue-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-12">
        
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-300 shadow-xl backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Next-Gen AI Interview Intelligence 2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Master Your Career with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Precision AI Coaching
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Simulate real high-stakes technical, system design, and behavioral interviews with real-time vocal analysis, instant feedback, and role-tailored Gemini question models.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onSelectTab('setup')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-white" />
              <span>Start Practicing Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onSelectTab('company-prep')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore Company Intelligence</span>
            </button>
          </div>
        </div>

        {/* Interactive Live AI Card Preview */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 relative overflow-hidden text-left">
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="AI Interviewer Avatar"
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-sm">Dr. Elena AI • Principal Assessor</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs text-slate-400">Simulating: Senior Product Designer @ Global Tech Corp</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>94% Confidence Match</span>
            </div>
          </div>

          {/* Live Audio Wave & Sample Response */}
          <div className="py-6 space-y-4">
            <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <MessageSquareText className="w-4 h-4" /> Live AI Question Prompt
                </span>
                <span>Question 2 of 5</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 leading-relaxed">
                "Walk me through a time when user research strongly contradicted senior executive direction. How did you advocate for the user while maintaining cross-functional trust?"
              </p>
            </div>

            {/* Simulated Vocal Waveform */}
            <div className="bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <Mic className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>Candidate Speech Stream...</span>
              </div>
              <div className="flex-1 max-w-xs">
                <AudioWaveform isActive={true} barCount={24} colorClass="bg-cyan-400" height="h-8" />
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
                142 WPM (Optimal)
              </span>
            </div>
          </div>

          {/* Live Insight Pill Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">STAR Framework</div>
                <div className="text-xs font-bold text-slate-200">Situation Clear</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Clarity Rating</div>
                <div className="text-xs font-bold text-slate-200">92% High Sentiment</div>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <Target className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Filler Word Count</div>
                <div className="text-xs font-bold text-slate-200">0 detected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">50,000+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Candidates</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-indigo-400 tracking-tight">10,000+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Mock Interviews Held</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">95%</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Offer Success Rate</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 tracking-tight">12+</div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Top Tech Models</div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Built for Modern Career Standards</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stop Guessing. Master Every Technical & Behavioral Question.
          </p>
          <p className="text-sm text-slate-400">
            Our multi-modal AI models evaluate speech pace, answer depth, trade-off analysis, and executive confidence in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Adaptive AI Interviewer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically probing follow-up questions customized to your specific target role, seniority level, and company culture principles.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Custom role & company rubrics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Real-time technical follow-up probes</span>
              </li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Real-time Speech Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track words per minute, filler words (um, like, basically), tone confidence, and pause frequency during live video simulations.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Vocal pace & inflection monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filler word & hesitation detection</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">STAR Method Scorecards</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant post-interview deep-dive reports breaking down your Situation, Task, Action, and Result with concrete action plans.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Emotional curve analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Downloadable PDF report & highlights</span>
              </li>
            </ul>
          </div>

          {/* Feature 4: Resume Review & Intelligence */}
          <div 
            onClick={() => onSelectTab('resume-review')}
            className="bg-slate-900 border border-slate-800 hover:border-rose-500/40 rounded-2xl p-6 space-y-4 hover:-translate-y-1 transition-all group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Resume Intelligence</span>
              <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">New</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Audit bullet points against Google X-Y-Z formulas, detect missing ATS keywords, and auto-bridge your resume into customized live mocks.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Google X-Y-Z bullet rewrites</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                <span>FAANG+ ATS keyword scoring</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* High Impact Proof Banner */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-bold text-indigo-400">
              <ShieldCheck className="w-4 h-4" /> Silicon Valley Gold Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Transform Interview Anxiety into Unshakeable Confidence
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Traditional mock interviews with friends are biased and inconsistent. InterviewAI provides an objective, repeatable environment that mirrors the exact bar of top tech hiring committees.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mt-0.5">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant Quantitative Feedback</h4>
                  <p className="text-xs text-slate-400">Get graded within 30 seconds of finishing your interview session.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mt-0.5">✓</div>
                <div>
                  <h4 className="text-xs font-bold text-white">Company Culture Alignment</h4>
                  <p className="text-xs text-slate-400">Practice Amazon's 16 Leadership Principles, Googleyness, or Stripe's API standards.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectTab('company-prep')}
              className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Company Intelligence Hub</span>
              <ChevronRight className="w-4 h-4 text-indigo-400" />
            </button>
          </div>

          <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-slate-200">Interview Readiness Score</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">Top 10% Tier</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold pb-1">
                  <span className="text-slate-300">Communication & Clarity</span>
                  <span className="text-indigo-400">92%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold pb-1">
                  <span className="text-slate-300">Technical Depth & Trade-offs</span>
                  <span className="text-cyan-400">78%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[78%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold pb-1">
                  <span className="text-slate-300">Confidence & Vocal Stability</span>
                  <span className="text-emerald-400">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[85%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="bg-gradient-to-r from-indigo-900/60 via-slate-900 to-blue-950/60 border border-indigo-500/30 rounded-3xl p-10 sm:p-14 space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Land Your Dream Offer?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join thousands of software engineers, product managers, designers, and executives who aced their interviews with AI simulation.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('setup')}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Initialize Simulation Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
