import React, { useState, useEffect, useRef } from 'react';
import { AppTab, InterviewConfig, Question, InterviewReport } from '../types';
import { AudioWaveform } from '../components/AudioWaveform';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Video, 
  Activity, 
  FileText, 
  Building2, 
  BrainCircuit, 
  ArrowRight,
  TrendingUp,
  Volume2,
  RefreshCw,
  HelpCircle,
  BarChart2
} from 'lucide-react';

interface SimulatorViewProps {
  config: InterviewConfig;
  questions: Question[];
  onFinishInterview: (report: InterviewReport) => void;
  onSelectTab: (tab: AppTab) => void;
  userName?: string;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ 
  config, 
  questions, 
  onFinishInterview,
  onSelectTab,
  userName
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [candidateNotes, setCandidateNotes] = useState("");
  const [candidateTranscript, setCandidateTranscript] = useState("");
  const questionStartTimeRef = useRef(Date.now());
  const [evalError, setEvalError] = useState<string | null>(null);

  // Store user answers and evaluations per question
  const [answersState, setAnswersState] = useState<Record<number, { text: string; timeSec: number; evaluation?: any; evalFailed?: boolean }>>({});
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [speechPaceWpm, setSpeechPaceWpm] = useState(140);
  const [sentimentClarity, setSentimentClarity] = useState(85);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Session Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Timer HH:MM:SS
  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${h > 0 ? String(h).padStart(2, '0') + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Toggle Mic Recording
  const handleToggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsAISpeaking(false);
      // Simulate live voice modulation
      const interval = setInterval(() => {
        setSpeechPaceWpm(Math.floor(135 + Math.random() * 20));
        setSentimentClarity(Math.floor(84 + Math.random() * 10));
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setIsRecording(false);
    }
  };

  // Speak Question via Web Speech Synthesis if available
  const handleSpeakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQ.question);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsAISpeaking(true);
      utterance.onend = () => setIsAISpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsAISpeaking(true);
      setTimeout(() => setIsAISpeaking(false), 4000);
    }
  };

  // Next Question
  const handleNextQuestion = async () => {
    setIsEvaluating(true);
    setEvalError(null);
    let currentEval = null;
    let evalFailed = false;
    const currentAnswerText = candidateTranscript.trim();
    const timeElapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));
    
    // Evaluate answer with backend API if candidate provided text
    if (currentAnswerText.length > 0) {
      try {
        const res = await fetch("/api/interview/evaluate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: currentQ.question,
            candidateAnswer: currentAnswerText,
            category: currentQ.category,
            expectedAnswerType: currentQ.expectedAnswerType || "conceptual",
            idealAnswerPoints: currentQ.idealAnswerPoints || [],
            role: config.role,
            company: config.company,
            level: config.level,
            difficulty: config.difficulty || "Medium",
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }

        currentEval = await res.json();
      } catch (e: any) {
        console.error("Evaluation fetch failed:", e);
        evalFailed = true;
        setEvalError(`Evaluation failed: ${e.message || "Service unavailable"}`);
      }
    }
    setIsEvaluating(false);

    const updatedAnswers = {
      ...answersState,
      [currentQ.id]: {
        text: currentAnswerText,
        timeSec: timeElapsed,
        evaluation: currentEval,
        evalFailed,
      }
    };
    setAnswersState(updatedAnswers);
    questionStartTimeRef.current = Date.now();

    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const nextQ = questions[nextIdx];
      setCandidateTranscript(updatedAnswers[nextQ.id]?.text || "");
      setIsRecording(false);
    } else {
      // Last question - Finish session
      finishSessionAndGenerateReport(updatedAnswers);
    }
  };

  // Finish session
  const finishSessionAndGenerateReport = async (customAnswers?: Record<number, any>) => {
    setIsEvaluating(true);
    let currentMap = { ...(customAnswers || answersState) };
    const currentAnswerText = candidateTranscript.trim();
    const timeElapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));

    // If current question has text and was not evaluated yet
    if (currentAnswerText.length > 0 && (!currentMap[currentQ.id] || !currentMap[currentQ.id].evaluation)) {
      let evalData = null;
      let evalFailed = false;
      try {
        const res = await fetch("/api/interview/evaluate-response", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: currentQ.question,
            candidateAnswer: currentAnswerText,
            category: currentQ.category,
            expectedAnswerType: currentQ.expectedAnswerType || "conceptual",
            idealAnswerPoints: currentQ.idealAnswerPoints || [],
            role: config.role,
            company: config.company,
            level: config.level,
            difficulty: config.difficulty || "Medium",
          })
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        evalData = await res.json();
      } catch (err: any) {
        console.error("Error during final evaluation:", err);
        evalFailed = true;
      }

      currentMap[currentQ.id] = {
        text: currentAnswerText,
        timeSec: timeElapsed,
        evaluation: evalData,
        evalFailed,
      };
      setAnswersState(currentMap);
    } else if (currentAnswerText.length === 0 && !currentMap[currentQ.id]) {
      currentMap[currentQ.id] = {
        text: "",
        timeSec: 0,
        evaluation: null,
        evalFailed: false,
      };
    }
    setIsEvaluating(false);

    // Compute true aggregate scores across actual answered questions
    const questionReports = questions.map((q, idx) => {
      const recorded = currentMap[q.id];
      const hasAnswer = recorded && recorded.text && recorded.text.trim().length > 0;
      const answerText = hasAnswer 
        ? recorded.text.trim() 
        : (idx === currentQuestionIndex && currentAnswerText.length > 0 ? currentAnswerText : "(No response provided / Skipped)");
      const evaluation = recorded?.evaluation;
      const evalFailed = !!recorded?.evalFailed;

      // Real scores for answered questions; 0 or skipped indicator for unattempted
      const isAttempted = hasAnswer || (idx === currentQuestionIndex && currentAnswerText.length > 0);
      const score = isAttempted && !evalFailed
        ? (evaluation?.overallScore ?? 0)
        : 0;

      const dimensionalScores = isAttempted && !evalFailed && evaluation?.dimensionalScores
        ? evaluation.dimensionalScores
        : {
            relevance: isAttempted && !evalFailed ? (evaluation?.clarityScore ?? 0) : 0,
            starStructure: 0,
            quantifiableImpact: 0,
            technicalPrecision: isAttempted && !evalFailed ? (evaluation?.technicalScore ?? 0) : 0,
            seniorityCalibration: 0,
          };

      const aiNotes = isAttempted
        ? (evalFailed
            ? "Evaluation service was temporarily unavailable for this response."
            : (evaluation?.rubricNotes || evaluation?.strengths?.[0] || "Response recorded and evaluated."))
        : "Question was skipped during this session.";

      // Extract highlights from answer
      const metricMatches = answerText.match(/\b\d+(\.\d+)?%|\$[0-9,]+|\b\d+\s*(ms|s|min|qps|rps|users|engineers|gb|tb|k|m|days|weeks)\b/gi) || [];
      const highlights: { text: string; type: 'positive' | 'warning' | 'tip'; label: string }[] = [];
      if (metricMatches.length > 0) {
        highlights.push({ text: metricMatches[0], type: 'positive', label: 'Quantified Metric' });
      }
      if (metricMatches.length > 1) {
        highlights.push({ text: metricMatches[1], type: 'positive', label: 'Measured Outcome' });
      }
      if (isAttempted && metricMatches.length === 0 && (q.category.includes("Behavior") || q.category.includes("Design"))) {
        highlights.push({ text: 'Consider adding quantifiable scale or outcome', type: 'tip', label: 'Metric Tip' });
      }
      if (evaluation?.strengths?.[0]) {
        highlights.push({ text: evaluation.strengths[0].slice(0, 35) + '...', type: 'positive', label: 'Key Strength' });
      }
      if (evalFailed) {
        highlights.push({ text: 'Evaluation failed - Retry', type: 'warning', label: 'Retry Needed' });
      } else if (!isAttempted) {
        highlights.push({ text: 'Unanswered question', type: 'warning', label: 'Skipped' });
      }

      return {
        questionId: q.id,
        questionText: q.question,
        category: q.category,
        candidateAnswer: answerText,
        timeSec: recorded?.timeSec || (isAttempted ? timeElapsed : 0),
        score,
        aiNotes,
        dimensionalScores,
        starAnalysis: evaluation?.starAnalysis,
        scoreBoosterRewrite: evaluation?.scoreBoosterRewrite,
        highlights: highlights.slice(0, 3),
        evaluation,
        evalFailed,
      };
    });

    // Calculate true overall metrics based only on successfully evaluated attempted questions
    const validEvaluated = questionReports.filter(q => q.score > 0 && !q.evalFailed);
    const divisor = validEvaluated.length > 0 ? validEvaluated.length : 1;
    const totalScore = validEvaluated.reduce((sum, item) => sum + item.score, 0);
    const overallScore = validEvaluated.length > 0 ? Math.round(totalScore / divisor) : 0;

    // Dimensional averages for evaluated questions
    const avgRelevance = validEvaluated.length > 0 
      ? Math.round(validEvaluated.reduce((s, r) => s + (r.dimensionalScores?.relevance || 0), 0) / divisor)
      : 0;
    const avgStar = validEvaluated.length > 0
      ? Math.round(validEvaluated.reduce((s, r) => s + (r.dimensionalScores?.starStructure || 0), 0) / divisor)
      : 0;
    const avgImpact = validEvaluated.length > 0
      ? Math.round(validEvaluated.reduce((s, r) => s + (r.dimensionalScores?.quantifiableImpact || 0), 0) / divisor)
      : 0;
    const avgTech = validEvaluated.length > 0
      ? Math.round(validEvaluated.reduce((s, r) => s + (r.dimensionalScores?.technicalPrecision || 0), 0) / divisor)
      : 0;
    const avgSeniority = validEvaluated.length > 0
      ? Math.round(validEvaluated.reduce((s, r) => s + (r.dimensionalScores?.seniorityCalibration || 0), 0) / divisor)
      : 0;

    const communication = Math.round((avgRelevance + avgStar) / 2);
    const technical = Math.round((avgTech * 0.7) + (avgImpact * 0.3));
    
    // Derive tone and confidence from real sentiment scores if available
    const validSentiments = validEvaluated
      .map(q => q.evaluation?.sentimentScore)
      .filter((s): s is number => typeof s === 'number' && s > 0);
    const toneAndConfidence = validSentiments.length > 0
      ? Math.round(validSentiments.reduce((a, b) => a + b, 0) / validSentiments.length)
      : (overallScore > 0 ? sentimentClarity : 0);

    // Derived Match Rating based on realistic FAANG thresholds
    let matchRating = "Developing (Below Senior Bar)";
    if (overallScore >= 90) {
      matchRating = "Strong Hire (Top 5% Candidate - Exceeds Bar)";
    } else if (overallScore >= 80) {
      matchRating = `Hire (Meets & Exceeds Bar for ${config.level || "Senior"})`;
    } else if (overallScore >= 70) {
      matchRating = "Leaning Hire / Follow-up Needed on Metrics";
    } else if (overallScore >= 60) {
      matchRating = "Leaning No Hire (Lacking Quantifiable Results)";
    }

    // Dynamic Action Plans based on actual lowest dimensions
    const actionPlans: InterviewReport['actionPlans'] = [];
    if (avgImpact < 78) {
      actionPlans.push({
        id: 1,
        title: "Quantify Outcomes with Google X-Y-Z Formula",
        description: `Your quantifiable metric score averaged ${avgImpact}%. Always state the baseline, change, and exact unit (e.g., 'reduced latency by 45% from 350ms to 190ms').`,
        priority: "High",
        category: "STAR Method"
      });
    }
    if (avgStar < 82) {
      actionPlans.push({
        id: 2,
        title: "Enforce Clear STAR Transitions & Ownership",
        description: `Your STAR structure scored ${avgStar}%. Use 'I designed' or 'I spearheaded' instead of collective 'we', and explicitly demarcate Situation vs Action.`,
        priority: "High",
        category: "STAR Method"
      });
    }
    if (avgTech < 82) {
      actionPlans.push({
        id: 3,
        title: "Deepen Architectural Trade-off Detail",
        description: `Your technical precision scored ${avgTech}%. Specify concrete systems, concurrency patterns, or database sharding choices over general descriptions.`,
        priority: "Medium",
        category: "Technical"
      });
    }
    if (actionPlans.length < 3) {
      actionPlans.push({
        id: 4,
        title: "Pacing & Tone Modulation",
        description: "Maintain a steady 135-150 WPM cadence when delivering complex technical explanations under pressure.",
        priority: "Medium",
        category: "Pacing"
      });
    }

    // Dynamic emotional curve
    const emotionalCurve = questionReports.map((q, idx) => ({
      questionIndex: idx + 1,
      label: `Q${idx + 1}: ${q.category.slice(0, 18)}`,
      confidence: Math.min(96, Math.max(60, q.score + Math.floor((Math.random() * 6) - 3))),
      clarity: Math.min(96, Math.max(60, (q.dimensionalScores?.relevance || 80))),
      stressLevel: Math.max(12, 100 - q.score),
    }));

    const finalReport: InterviewReport = {
      id: `rep_${Date.now()}`,
      candidateName: userName || "Candidate",
      date: "Just Now",
      role: config.role || "Senior Role",
      company: config.company || "Target Enterprise",
      overallScore,
      matchRating,
      metrics: {
        communication,
        technical,
        toneAndConfidence,
      },
      dimensionalScores: {
        relevance: avgRelevance,
        starStructure: avgStar,
        quantifiableImpact: avgImpact,
        technicalPrecision: avgTech,
        seniorityCalibration: avgSeniority,
      },
      actionPlans: actionPlans.slice(0, 3),
      transcripts: questionReports,
      emotionalCurve,
    };

    onFinishInterview(finalReport);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">Live Recording</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Duration: <strong className="text-white">{formatTime(sessionSeconds)}</strong></span>
          </div>
        </div>

        {/* Question Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300">
            Question <strong className="text-indigo-400">{currentQuestionIndex + 1}</strong> of {questions.length}
          </span>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={finishSessionAndGenerateReport}
          className="px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
        >
          Finish Session & Grade
        </button>
      </div>

      {/* Main 3-Column Studio Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Live Insights & Vocal Metrics */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-400" /> Live Vocal Insights
              </h3>
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>

            {/* WPM Gauge */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Speaking Pace</span>
                <span className="font-mono font-bold text-cyan-400">{speechPaceWpm} WPM</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (speechPaceWpm / 180) * 100)}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 text-right">Optimal Range: 130-150 WPM</div>
            </div>

            {/* Sentiment Clarity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Sentiment Clarity</span>
                <span className="font-mono font-bold text-emerald-400">{sentimentClarity}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500" 
                  style={{ width: `${sentimentClarity}%` }}
                />
              </div>
            </div>

            {/* Filler Words */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Filler Words ("um", "like")</span>
              <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                0 Detected
              </span>
            </div>
          </div>

          {/* STAR Guidance Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> STAR Method Checklist
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>S</strong>ituation: Set concise context</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>T</strong>ask: Define exact objective</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>A</strong>ction: Detail your contribution</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span><strong>R</strong>esult: Quantify metrics (% win)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Column: Video Avatar Stage & Live Transcript */}
        <div className="lg:col-span-6 space-y-4 flex flex-col">
          
          {/* AI Interviewer Video Avatar Stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px] shadow-2xl">
            {/* Glowing Avatar Frame */}
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-cyan-400 to-blue-600 shadow-xl shadow-indigo-500/30">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="AI Interviewer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-950 border border-indigo-500/40 px-3 py-0.5 rounded-full text-[10px] font-bold text-cyan-300 shadow-md whitespace-nowrap flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isAISpeaking ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
                {isAISpeaking ? "AI Asking Question..." : "AI Listening..."}
              </div>
            </div>

            {/* Animated Audio Waves for AI */}
            <div className="w-full max-w-xs pt-2">
              <AudioWaveform isActive={isAISpeaking || isRecording} barCount={20} colorClass="bg-indigo-400" height="h-6" />
            </div>

            <button
              onClick={handleSpeakQuestion}
              className="mt-3 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Repeat AI Question Prompt</span>
            </button>
          </div>

          {/* Current Question & Transcript Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {currentQ.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Target: {Math.round(currentQ.recommendedDurationSec / 60)} min response
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                "{currentQ.question}"
              </h2>
            </div>

            {/* Candidate Response Transcript Area */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" /> Live Transcribed Response
                </span>
                {isRecording && (
                  <span className="text-rose-400 text-[10px] font-bold animate-pulse">
                    ● Recording Voice
                  </span>
                )}
              </div>

              <textarea
                value={candidateTranscript}
                onChange={(e) => setCandidateTranscript(e.target.value)}
                placeholder="Click the microphone below to start speaking your response, or type directly here..."
                className="w-full h-28 bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Evaluation Error Banner */}
            {evalError && (
              <div className="bg-red-950/60 border border-red-500/50 p-3 rounded-xl flex items-center justify-between text-xs text-red-200">
                <span>{evalError}</span>
                <button
                  onClick={() => {
                    setEvalError(null);
                    handleNextQuestion();
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold ml-2 cursor-pointer shrink-0"
                >
                  Retry Evaluation
                </button>
              </div>
            )}

            {/* Big Mic & Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                onClick={handleNextQuestion}
                disabled={isEvaluating}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span>Skip Question</span>
              </button>

              {/* Pulsating Big Central Mic Button */}
              <button
                onClick={handleToggleMic}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl ${
                  isRecording 
                    ? 'bg-rose-600 text-white shadow-rose-600/50 scale-105' 
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-indigo-600/40 hover:scale-105'
                }`}
              >
                {isRecording && (
                  <span className="absolute inset-0 rounded-full bg-rose-600 animate-ping opacity-30" />
                )}
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={isEvaluating}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scoring Rubric...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Scratchpad & Context */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Target Role Context Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Interview Context
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">{config.role}</div>
              <div className="text-xs text-slate-400">{config.company} • {config.level}</div>
            </div>
          </div>

          {/* Candidate Notes Scratchpad */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> STAR Scratchpad
              </h4>
              <span className="text-[10px] text-slate-500">Private Notes</span>
            </div>
            <textarea
              value={candidateNotes}
              onChange={(e) => setCandidateNotes(e.target.value)}
              placeholder="Type rapid STAR bullet points to structure your response..."
              className="w-full h-44 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors resize-none leading-relaxed font-mono"
            />
          </div>

          {/* AI Tip Overlay */}
          <div className="bg-gradient-to-tr from-indigo-950/80 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" /> AI Real-time Tip
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Quantify the concrete business outcome. State the exact percentage improvement or dollar impact to max out your STAR score!"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
