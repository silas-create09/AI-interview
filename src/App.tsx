import React, { useState, useEffect } from 'react';
import { AppTab, InterviewConfig, Question, InterviewReport } from './types';
import { DEFAULT_CONFIG, SAMPLE_QUESTIONS, SAMPLE_REPORT } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal, AuthUser } from './components/AuthModal';
import { LandingView } from './views/LandingView';
import { SetupView } from './views/SetupView';
import { SimulatorView } from './views/SimulatorView';
import { ReportView } from './views/ReportView';
import { CompanyPrepView } from './views/CompanyPrepView';
import { ResumeReviewView } from './views/ResumeReviewView';
import { AboutView } from './views/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('landing');
  const [config, setConfig] = useState<InterviewConfig>(DEFAULT_CONFIG);
  const [questions, setQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [report, setReport] = useState<InterviewReport>(SAMPLE_REPORT);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  // Authentication State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Automatically scroll to the top of the page whenever the tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentTab]);

  const handleSelectTab = (tab: AppTab) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setCurrentTab(tab);
  };

  const handleOpenAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Handle starting simulation
  const handleStartSimulation = (generatedQuestions: Question[]) => {
    if (generatedQuestions && generatedQuestions.length > 0) {
      setQuestions(generatedQuestions);
    } else {
      setQuestions(SAMPLE_QUESTIONS);
    }
    setHasActiveSession(true);
    handleSelectTab('simulator');
  };

  // Handle finishing interview
  const handleFinishInterview = (generatedReport: InterviewReport) => {
    setReport(generatedReport);
    setHasActiveSession(false);
    handleSelectTab('report');
  };

  // Handle target company change from CompanyPrepView
  const handleSetTargetCompany = (companyName: string) => {
    setConfig(prev => ({ ...prev, company: companyName }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar 
        currentTab={currentTab} 
        onSelectTab={handleSelectTab} 
        hasActiveSession={hasActiveSession} 
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingView onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'setup' && (
          <SetupView 
            config={config} 
            onChangeConfig={setConfig} 
            onStartSimulation={handleStartSimulation} 
            onSelectTab={handleSelectTab} 
          />
        )}

        {currentTab === 'simulator' && (
          <SimulatorView 
            config={config} 
            questions={questions} 
            onFinishInterview={handleFinishInterview} 
            onSelectTab={handleSelectTab} 
          />
        )}

        {currentTab === 'report' && (
          <ReportView 
            report={report} 
            onSelectTab={handleSelectTab} 
          />
        )}

        {currentTab === 'company-prep' && (
          <CompanyPrepView 
            onSelectTab={handleSelectTab} 
            onSetTargetCompany={handleSetTargetCompany} 
          />
        )}

        {currentTab === 'resume-review' && (
          <ResumeReviewView 
            onSelectTab={handleSelectTab} 
            onCustomizeInterview={(role, comp) => {
              setConfig(prev => ({ ...prev, role, company: comp }));
              handleSelectTab('setup');
            }}
          />
        )}

        {currentTab === 'about' && (
          <AboutView onSelectTab={handleSelectTab} />
        )}
      </main>

      <Footer onSelectTab={handleSelectTab} />

      {/* Global Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
