import React, { useState } from 'react';
import { AppTab } from '../types';
import { Sparkles, Shield, Github, Twitter, Linkedin, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: AppTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (tab: AppTab) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    onSelectTab(tab);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div 
              onClick={() => handleNav('landing')}
              className="flex items-center gap-2 cursor-pointer group w-fit"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-300 transition-colors">InterviewAI</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              The precision AI career coaching platform powering high-stakes technical, system design, and behavioral interview success.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => handleNav('about')}
                aria-label="Twitter Community"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleNav('about')}
                aria-label="LinkedIn Network"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleNav('about')}
                aria-label="GitHub Repository"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Features Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Product Features</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('simulator')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Live Video Simulator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('report')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  STAR Method Scorecards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('company-prep')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Company Intelligence Hub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('resume-review')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Resume Intelligence & ATS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('setup')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Mic & Audio Calibration
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Methodology Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Company & Science</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  About & Science
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Evaluation Framework
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('company-prep')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Corporate Interview Rubrics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-indigo-400 transition-colors text-left font-medium cursor-pointer"
                >
                  Security & Zero-Retention
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Career Insights */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Career Insights Weekly</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get the latest Silicon Valley interview trends, rubric debriefs, and STAR frameworks directly in your inbox.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800/80 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Check your inbox for our STAR guide.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email" 
                  required
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                />
                <button 
                  type="submit"
                  aria-label="Subscribe to weekly career insights"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} InterviewAI Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => handleNav('about')}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" /> SOC-2 Type II Certified
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => handleNav('about')} className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => handleNav('company-prep')} className="hover:text-slate-400 transition-colors cursor-pointer">Security Rubrics</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

