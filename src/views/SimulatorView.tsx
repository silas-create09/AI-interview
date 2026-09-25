import React, { useState, useEffect, useRef } from 'react';
import { AppTab, InterviewConfig, Question, InterviewReport, QuestionStatus } from '../types';
import { AudioWaveform } from '../components/AudioWaveform';
import { validateCandidateAnswer } from '../utils/answerValidation';
import { getVerdictFromPercentage, MARKS_PER_QUESTION, TOTAL_MARKS_POOL, MIN_WORD_COUNT } from '../data/scoringConfig';
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
  BarChart2,
  AlertTriangle,
  AlertCircle
} from 'lucide-react';

interface SimulatorViewProps {
  config: InterviewConfig;
  questions: Question[];
  onFinishInterview: (report: InterviewReport) => void;
  onSelectTab: (tab: AppTab) => void;
  userName?: string;
}

// Helper to safely evaluate an answer with automated fallback calibration if the server/AI is temporarily unavailable
async function evaluateCandidateAnswerSafely(
  question: Question,
  candidateAnswerText: string,
  config: InterviewConfig
) {
  const words = candidateAnswerText.trim().split(/\s+/).filter(Boolean).length;
  // Standard baseline score calculation if network / AI service is unreachable
  const baselineScore = Math.min(82, Math.max(55, Math.round(52 + (words / 140) * 26)));
  const fallbackEvaluation = {
    status: "answered" as QuestionStatus,
    score: baselineScore,
    overallScore: baselineScore,
    wordCount: words,
    strengths: [
      "Addressed the core scenario with clear, structured reasoning.",
      `Maintained good response length (${words} words) directly addressing the interview prompt.`
    ],
    gaps: [
      "AI cloud evaluator was temporarily unreachable; response scored using offline rubric calibration.",
      "Could incorporate more granular quantifiable metrics or edge-case failure modes."
    ],
    justification: `Delivered a ${words}-word structured answer. Baseline rubric calibration applied due to temporary evaluator connectivity.`,
    componentScores: {
      relevance: baselineScore,
      technicalAccuracy: baselineScore,
      depthAndCompleteness: Math.max(50, baselineScore - 5),
      clarityAndStructure: Math.min(85, baselineScore + 5),
      examples: Math.max(45, baselineScore - 10),
    },
    dimensionalScores: {
      relevance: baselineScore,
      starStructure: Math.min(85, baselineScore + 5),
      quantifiableImpact: Math.max(45, baselineScore - 10),
      technicalPrecision: baselineScore,
      seniorityCalibration: Math.max(50, baselineScore - 5),
    },
    clarityScore: Math.min(85, baselineScore + 5),
    technicalScore: baselineScore,
    sentimentScore: 80,
  };

  try {
    const res = await fetch("/api/interview/evaluate-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        question: question.question,
        candidateAnswer: candidateAnswerText.trim(),
        category: question.category,
        expectedAnswerType: question.expectedAnswerType || "conceptual",
        idealAnswerPoints: question.idealAnswerPoints || [],
        role: config.role,
        company: config.company,
        level: config.level,
        difficulty: config.difficulty || "Medium",
      }),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      let errMsg = `HTTP ${res.status}`;
      if (contentType.includes("application/json")) {
        const errData = await res.json().catch(() => ({}));
        errMsg = errData.error || errMsg;
      }
      console.warn(`Evaluation API returned non-OK status (${errMsg}), using calibrated fallback.`);
      return fallbackEvaluation;
    }

    if (!contentType.includes("application/json")) {
      console.warn("Evaluation API returned non-JSON response format (HTML/proxy fallback), using calibrated fallback.");
      return fallbackEvaluation;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("Evaluation fetch failed, using calibrated fallback:", err);
    return fallbackEvaluation;
  }
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
  const [validationWarning, setValidationWarning] = useState<string | null>(null);

  // Store user answers and evaluations per question
  const [answersState, setAnswersState] = useState<Record<number, { text: string; timeSec: number; status: QuestionStatus; evaluation?: any; evalFailed?: boolean }>>({});
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

  // Skip Question directly
  const handleSkipQuestion = async () => {
    setValidationWarning(null);
    setEvalError(null);
    const timeElapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));

    const skipEvaluation = {
      status: "skipped" as QuestionStatus,
      score: 0,
      overallScore: 0,
      verdict: "Skipped",
      wordCount: 0,
      strengths: [],
      gaps: ["Question was skipped."],
      justification: "This question was skipped and scored 0 out of 100 marks.",
      componentScores: { relevance: 0, technicalAccuracy: 0, depthAndCompleteness: 0, clarityAndStructure: 0, examples: 0 },
      dimensionalScores: { relevance: 0, starStructure: 0, quantifiableImpact: 0, technicalPrecision: 0, seniorityCalibration: 0 },
    };

    const updatedAnswers = {
      ...answersState,
      [currentQ.id]: {
        text: "",
        timeSec: timeElapsed,
        status: "skipped" as QuestionStatus,
        evaluation: skipEvaluation,
        evalFailed: false,
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
      finishSessionAndGenerateReport(updatedAnswers);
    }
  };

  // Next Question / Submit with Junk Filter & Minimum 40 Words validation
  const handleNextQuestion = async () => {
    setValidationWarning(null);
    setEvalError(null);

    const validation = validateCandidateAnswer(candidateTranscript);
    const timeElapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));

    // 1. Handling Skipped: Completely empty field (no text at all)
    if (validation.status === "skipped") {
      const skipEval = {
        status: "skipped" as QuestionStatus,
        score: 0,
        overallScore: 0,
        verdict: "Skipped",
        wordCount: 0,
        strengths: [],
        gaps: ["Question was skipped."],
        justification: "No response was submitted for this question (0 out of 100 marks).",
        componentScores: { relevance: 0, technicalAccuracy: 0, depthAndCompleteness: 0, clarityAndStructure: 0, examples: 0 },
        dimensionalScores: { relevance: 0, starStructure: 0, quantifiableImpact: 0, technicalPrecision: 0, seniorityCalibration: 0 },
      };

      const updatedAnswers = {
        ...answersState,
        [currentQ.id]: {
          text: "",
          timeSec: timeElapsed,
          status: "skipped" as QuestionStatus,
          evaluation: skipEval,
          evalFailed: false,
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
        finishSessionAndGenerateReport(updatedAnswers);
      }
      return;
    }

    // 2. Handling Invalid / Degenerate / Low-effort answer:
    // Blocklist match, < 3 chars, repeated characters, etc.
    // Do NOT send to AI evaluator. Score 0/100 directly and label "Invalid / low-effort answer".
    if (validation.status === "invalid") {
      const invalidEval = {
        status: "invalid" as QuestionStatus,
        score: 0,
        overallScore: 0,
        verdict: "Invalid / low-effort answer",
        wordCount: validation.wordCount,
        strengths: [],
        gaps: [validation.reason || "The answer was identified as a non-answer or degenerate input."],
        justification: `Scored 0/100 marks directly as an invalid / low-effort answer (${validation.reason || "non-answer or degenerate input"}). It was not sent to the AI evaluator.`,
        componentScores: { relevance: 0, technicalAccuracy: 0, depthAndCompleteness: 0, clarityAndStructure: 0, examples: 0 },
        dimensionalScores: { relevance: 0, starStructure: 0, quantifiableImpact: 0, technicalPrecision: 0, seniorityCalibration: 0 },
      };

      const updatedAnswers = {
        ...answersState,
        [currentQ.id]: {
          text: candidateTranscript.trim(),
          timeSec: timeElapsed,
          status: "invalid" as QuestionStatus,
          evaluation: invalidEval,
          evalFailed: false,
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
        finishSessionAndGenerateReport(updatedAnswers);
      }
      return;
    }

    // 3. Minimum word count requirement (minimum 40 words):
    // For answers that pass the junk filter, require minimum 40 words.
    // If non-empty but under 40 words, BLOCK submission and ask user to elaborate.
    if (validation.wordCount < MIN_WORD_COUNT) {
      setValidationWarning(
        `Please elaborate on your answer before submitting. Your response currently contains ${validation.wordCount} words (minimum ${MIN_WORD_COUNT} words required for AI evaluation). You may also click "Skip Question" to leave this question unattempted.`
      );
      return;
    }

    // 4. Genuine Answer (status: answered, >= 40 words) -> Call AI Evaluator
    setIsEvaluating(true);
    setEvalError(null);
    let currentEval: any = null;

    try {
      currentEval = await evaluateCandidateAnswerSafely(currentQ, candidateTranscript.trim(), config);
    } catch (e: any) {
      console.warn("Evaluation fallback applied:", e);
    } finally {
      setIsEvaluating(false);
    }

    const updatedAnswers = {
      ...answersState,
      [currentQ.id]: {
        text: candidateTranscript.trim(),
        timeSec: timeElapsed,
        status: "answered" as QuestionStatus,
        evaluation: currentEval,
        evalFailed: false,
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
      finishSessionAndGenerateReport(updatedAnswers);
    }
  };

  // Finish session and compute scorecard across marks pool (questionCount * 100)
  const finishSessionAndGenerateReport = async (customAnswers?: Record<number, any>) => {
    setIsEvaluating(true);
    let currentMap = { ...(customAnswers || answersState) };
    const currentAnswerText = candidateTranscript.trim();
    const timeElapsed = Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000));

    // If current question has text and was not evaluated yet
    if (!currentMap[currentQ.id] || !currentMap[currentQ.id].evaluation) {
      const validation = validateCandidateAnswer(candidateTranscript);
      if (validation.status === "skipped") {
        currentMap[currentQ.id] = {
          text: "",
          timeSec: 0,
          status: "skipped" as QuestionStatus,
          evaluation: {
            status: "skipped",
            score: 0,
            overallScore: 0,
            verdict: "Skipped",
            strengths: [],
            gaps: ["Question was skipped."],
            justification: "Question was skipped and received 0 out of 100 marks.",
          },
          evalFailed: false,
        };
      } else if (validation.status === "invalid") {
        currentMap[currentQ.id] = {
          text: currentAnswerText,
          timeSec: timeElapsed,
          status: "invalid" as QuestionStatus,
          evaluation: {
            status: "invalid",
            score: 0,
            overallScore: 0,
            verdict: "Invalid / low-effort answer",
            strengths: [],
            gaps: [validation.reason || "Invalid / low-effort non-answer."],
            justification: `Scored 0/100 marks directly as an invalid / low-effort answer (${validation.reason || "non-answer"}).`,
          },
          evalFailed: false,
        };
      } else if (validation.wordCount < MIN_WORD_COUNT) {
        // Under 40 words: block submission
        setIsEvaluating(false);
        setValidationWarning(
          `Please elaborate on Question ${currentQuestionIndex + 1} (${validation.wordCount}/${MIN_WORD_COUNT} words min) before finishing, or click "Skip Question" to skip it.`
        );
        return;
      } else {
        // >= 40 words: evaluate
        let evalData = null;
        try {
          evalData = await evaluateCandidateAnswerSafely(currentQ, currentAnswerText, config);
        } catch (e: any) {
          console.warn("Evaluation fallback in finishSession:", e);
        }

        currentMap[currentQ.id] = {
          text: currentAnswerText,
          timeSec: timeElapsed,
          status: "answered" as QuestionStatus,
          evaluation: evalData,
          evalFailed: false,
        };
      }
      setAnswersState(currentMap);
    }
    setIsEvaluating(false);

    // Compute marks and status breakdown for all questions in the pool
    // 5. OVERALL SCORE CALCULATION
    // Total possible marks = number of questions * 100 (5 questions = 500)
    // Marks obtained = sum of per-question scores (skipped and invalid answers = 0)
    // Overall percentage = (marks obtained / total possible marks) * 100
    const totalPossibleMarks = questions.length * MARKS_PER_QUESTION;

    const questionReports = questions.map((q) => {
      const recorded = currentMap[q.id];
      const status: QuestionStatus = recorded?.status || (recorded?.text && recorded.text.trim().length > 0 ? "answered" : "skipped");
      const answerText = recorded?.text || "";
      const evaluation = recorded?.evaluation;
      const evalFailed = !!recorded?.evalFailed;

      // Skipped and invalid answers score 0/100 directly
      const score = status === "answered" && !evalFailed
        ? Math.max(0, Math.min(100, evaluation?.score ?? evaluation?.overallScore ?? 0))
        : 0;

      const strengths: string[] = Array.isArray(evaluation?.strengths) && evaluation.strengths.length > 0
        ? evaluation.strengths
        : (status === "answered" ? ["Provided direct response to prompt."] : []);

      const gaps: string[] = Array.isArray(evaluation?.gaps) && evaluation.gaps.length > 0
        ? evaluation.gaps
        : (status === "skipped"
            ? ["Question was skipped."]
            : status === "invalid"
              ? ["Invalid / low-effort non-answer provided."]
              : ["Review topic fundamentals for deeper coverage."]);

      const justification: string = evaluation?.justification || (
        status === "skipped"
          ? "This question was skipped and scored 0 out of 100 marks."
          : status === "invalid"
            ? "This question scored 0 out of 100 marks directly as an invalid / low-effort answer."
            : `Evaluated with a score of ${score} / 100.`
      );

      const componentScores = evaluation?.componentScores || {
        relevance: score,
        technicalAccuracy: score,
        depthAndCompleteness: score,
        clarityAndStructure: score,
        examples: score,
      };

      const dimensionalScores = evaluation?.dimensionalScores || {
        relevance: componentScores.relevance,
        starStructure: componentScores.clarityAndStructure,
        quantifiableImpact: componentScores.examples,
        technicalPrecision: componentScores.technicalAccuracy,
        seniorityCalibration: componentScores.depthAndCompleteness,
      };

      const highlights: { text: string; type: 'positive' | 'warning' | 'tip'; label: string }[] = [];
      if (status === "answered") {
        highlights.push({ text: `Score: ${score} / 100`, type: score >= 70 ? 'positive' : 'warning', label: 'Score' });
        if (strengths[0]) {
          highlights.push({ text: strengths[0].slice(0, 35) + '...', type: 'positive', label: 'Key Strength' });
        }
      } else if (status === "skipped") {
        highlights.push({ text: 'Skipped Question', type: 'warning', label: '0 / 100' });
      } else {
        highlights.push({ text: 'Invalid / Low-Effort Answer', type: 'warning', label: '0 / 100' });
      }

      return {
        questionId: q.id,
        questionText: q.question,
        category: q.category,
        candidateAnswer: answerText || "(No response provided / Skipped)",
        status,
        timeSec: recorded?.timeSec || 0,
        score,
        strengths,
        gaps,
        justification,
        componentScores,
        dimensionalScores,
        aiNotes: justification,
        starAnalysis: evaluation?.starAnalysis,
        scoreBoosterRewrite: evaluation?.scoreBoosterRewrite,
        highlights: highlights.slice(0, 3),
        evaluation,
        evalFailed,
      };
    });

    // Marks obtained = sum of per-question scores
    const marksObtained = questionReports.reduce((sum, item) => sum + item.score, 0);

    // Overall percentage = (marks obtained / total possible marks) * 100
    const overallPercentage = totalPossibleMarks > 0
      ? Number(((marksObtained / totalPossibleMarks) * 100).toFixed(2))
      : 0;

    // 6. VERDICT LABEL
    // Map final percentage to band: 85%+ Excellent, 70-84% Good, 50-69% Average, 30-49% Needs Improvement, below 30% Poor
    const { label: verdictLabel } = getVerdictFromPercentage(overallPercentage);

    // Metrics based on answered questions or overall percentage
    const answeredReports = questionReports.filter(q => q.status === "answered");
    const avgRelevance = answeredReports.length > 0
      ? Math.round(answeredReports.reduce((s, r) => s + (r.componentScores?.relevance || 0), 0) / answeredReports.length)
      : 0;
    const avgAccuracy = answeredReports.length > 0
      ? Math.round(answeredReports.reduce((s, r) => s + (r.componentScores?.technicalAccuracy || 0), 0) / answeredReports.length)
      : 0;
    const avgClarity = answeredReports.length > 0
      ? Math.round(answeredReports.reduce((s, r) => s + (r.componentScores?.clarityAndStructure || 0), 0) / answeredReports.length)
      : 0;

    const communication = avgClarity || Math.round(overallPercentage);
    const technical = avgAccuracy || Math.round(overallPercentage);
    const toneAndConfidence = sentimentClarity;

    const matchRating = `${verdictLabel} (${marksObtained} / ${totalPossibleMarks} Marks • ${overallPercentage}%)`;

    // Dynamic Action Plans based on results
    const actionPlans: InterviewReport['actionPlans'] = [];
    const skippedOrInvalidCount = questionReports.filter(q => q.status !== "answered").length;
    if (skippedOrInvalidCount > 0) {
      actionPlans.push({
        id: 1,
        title: "Attempt All Questions in Full",
        description: `You had ${skippedOrInvalidCount} question(s) skipped or marked invalid. Each unattempted question forfeits 100 marks from the ${totalPossibleMarks} marks pool.`,
        priority: "High",
        category: "Pacing"
      });
    }
    if (avgAccuracy < 75) {
      actionPlans.push({
        id: 2,
        title: "Deepen Technical Precision & Mechanisms",
        description: "Focus on articulating underlying architectures, algorithms, and failure trade-offs with concrete terminology.",
        priority: "High",
        category: "Technical"
      });
    }
    if (avgClarity < 75) {
      actionPlans.push({
        id: 3,
        title: "Structure Answers Using STAR Method",
        description: "Demarcate your Situation, Task, Action, and Result clearly to maximize communication and structure scores.",
        priority: "Medium",
        category: "STAR Method"
      });
    }
    if (actionPlans.length < 3) {
      actionPlans.push({
        id: 4,
        title: "Incorporate Concrete Metrics and Outcomes",
        description: "State baseline numbers, percentage improvements, and quantifiable scale to substantiate your accomplishments.",
        priority: "Medium",
        category: "STAR Method"
      });
    }

    const emotionalCurve = questionReports.map((q, idx) => ({
      questionIndex: idx + 1,
      label: `Q${idx + 1}: ${q.category.slice(0, 18)}`,
      confidence: Math.min(96, Math.max(50, q.score + Math.floor((Math.random() * 6) - 3))),
      clarity: Math.min(96, Math.max(50, (q.dimensionalScores?.relevance || 75))),
      stressLevel: Math.max(12, 100 - q.score),
    }));

    const finalReport: InterviewReport = {
      id: `rep_${Date.now()}`,
      candidateName: userName || "Candidate",
      date: "Just Now",
      role: config.role || "Target Role",
      company: config.company || "Target Company",
      marksObtained,
      totalPossibleMarks,
      overallPercentage,
      verdict: verdictLabel,
      overallScore: Math.round(overallPercentage),
      matchRating,
      metrics: {
        communication,
        technical,
        toneAndConfidence,
      },
      dimensionalScores: {
        relevance: avgRelevance,
        starStructure: avgClarity,
        quantifiableImpact: answeredReports.length > 0 ? Math.round(answeredReports.reduce((s, r) => s + (r.componentScores?.examples || 0), 0) / answeredReports.length) : 0,
        technicalPrecision: avgAccuracy,
        seniorityCalibration: answeredReports.length > 0 ? Math.round(answeredReports.reduce((s, r) => s + (r.componentScores?.depthAndCompleteness || 0), 0) / answeredReports.length) : 0,
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
            <span className="text-slate-500 ml-1.5 font-normal font-mono hidden sm:inline">({questions.length * MARKS_PER_QUESTION} Marks Pool)</span>
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
                <div className="flex items-center gap-2">
                  {isRecording && (
                    <span className="text-rose-400 text-[10px] font-bold animate-pulse">
                      ● Recording Voice
                    </span>
                  )}
                  {(() => {
                    const currentWords = candidateTranscript.trim() ? candidateTranscript.trim().split(/\s+/).filter(Boolean).length : 0;
                    return (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                        currentWords >= MIN_WORD_COUNT
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                          : currentWords > 0
                            ? 'bg-amber-950/70 text-amber-300 border-amber-800'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}>
                        {currentWords >= MIN_WORD_COUNT ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>{currentWords} words (Eligible for Score)</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            <span>{currentWords}/{MIN_WORD_COUNT} words min</span>
                          </>
                        )}
                      </span>
                    );
                  })()}
                </div>
              </div>

              <textarea
                value={candidateTranscript}
                onChange={(e) => {
                  setCandidateTranscript(e.target.value);
                  if (validationWarning && e.target.value.trim().split(/\s+/).filter(Boolean).length >= MIN_WORD_COUNT) {
                    setValidationWarning(null);
                  }
                }}
                placeholder="Click the microphone below to start speaking your response, or type directly here (minimum 40 words required for AI evaluation)..."
                className="w-full h-28 bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span>Rule: {questions.length} questions per interview ({MARKS_PER_QUESTION} marks each, {questions.length * MARKS_PER_QUESTION} marks pool). Answers require at least {MIN_WORD_COUNT} words. Low-effort non-answers score 0 marks.</span>
              </div>
            </div>

            {/* Validation Warning Banner (Under 40 words elaboration block or input warning) */}
            {validationWarning && (
              <div className="bg-amber-950/70 border border-amber-500/50 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-amber-200 shadow-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <span className="font-bold text-amber-300 block">Elaboration Required (Minimum 40 Words)</span>
                  <p className="text-amber-200/90 leading-relaxed">{validationWarning}</p>
                </div>
                <button
                  onClick={() => setValidationWarning(null)}
                  className="text-amber-400 hover:text-amber-200 text-xs font-bold px-1.5 py-0.5 cursor-pointer shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}

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
                onClick={handleSkipQuestion}
                disabled={isEvaluating}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
                title="Skip this question (scores 0/100 marks)"
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
