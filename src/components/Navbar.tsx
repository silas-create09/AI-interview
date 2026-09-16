import React, { useState } from 'react';
import { AppTab } from '../types';
import { 
  Sparkles, 
  Video, 
  BarChart3, 
  Settings, 
  Building2, 
  Info, 
  Play,
  Zap,
  CheckCircle2,
  LogIn,
  User,
  LogOut,
  ChevronDown,
  Shield,
  Award,
  FileText
} from 'lucide-react';
import { AuthUser } from './AuthModal';

interface NavbarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  hasActiveSession?: boolean;
  currentUser?: AuthUser | null;
  onOpenAuthModal: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentTab, 
  onSelectTab, 
  hasActiveSession,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                InterviewAI
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Precision Career Simulation
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => onSelectTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'landing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Overview
          </button>

          <button
            onClick={() => onSelectTab('setup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'setup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Setup
          </button>

          <button
            onClick={() => onSelectTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all relative cursor-pointer ${
              currentTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            Simulator
            {hasActiveSession && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            onClick={() => onSelectTab('report')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'report'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            Scorecard
          </button>

          <button
            onClick={() => onSelectTab('company-prep')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'company-prep'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            Company Prep
          </button>

          <button
            onClick={() => onSelectTab('resume-review')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'resume-review'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            Resume Review
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentTab === 'about'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            About
          </button>
        </nav>

        {/* Action Button, Auth & User Profile on Top Right Corner */}
        <div className="flex items-center gap-2.5">
          {/* Start Practice CTA Button */}
          <button
            onClick={() => onSelectTab('setup')}
            className="hidden sm:flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs font-bold tracking-wide shadow-lg shadow-indigo-500/25 transition-all items-center gap-1.5 group active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white group-hover:scale-110 transition-transform" />
            <span>Practice</span>
          </button>

          {/* User Auth Section (Single Log In / Sign Up Button / User Profile) */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              >
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-lg object-cover border border-indigo-500/40"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white leading-none">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">{currentUser.tier}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn text-xs">
                  <div className="px-4 py-2 border-b border-slate-800/80">
                    <div className="font-bold text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      <Shield className="w-3 h-3" />
                      <span>{currentUser.tier}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { onSelectTab('report'); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Saved Scorecards & History</span>
                    </button>
                    <button
                      onClick={() => { onSelectTab('setup'); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 text-left text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Calibration Preferences</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-800/80 pt-1">
                    <button
                      onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                      className="w-full px-4 py-2 text-left text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuthModal('login')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-bold text-white shadow-sm hover:border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-400" />
              <span>Log In / Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Strip */}
      <div className="md:hidden flex items-center justify-between px-3 py-2 bg-slate-950 border-t border-slate-800 overflow-x-auto text-xs scrollbar-none gap-2">
        <button
          onClick={() => onSelectTab('landing')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'landing' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('setup')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'setup' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Setup
        </button>
        <button
          onClick={() => onSelectTab('simulator')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Simulator
        </button>
        <button
          onClick={() => onSelectTab('report')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'report' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Scorecard
        </button>
        <button
          onClick={() => onSelectTab('company-prep')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'company-prep' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Companies
        </button>
        <button
          onClick={() => onSelectTab('resume-review')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'resume-review' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Resume Review
        </button>
        <button
          onClick={() => onSelectTab('about')}
          className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap ${currentTab === 'about' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          About
        </button>
      </div>
    </header>
  );
};
