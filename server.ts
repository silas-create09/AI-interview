import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazy or safe check
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!process.env.GEMINI_API_KEY });
});

// Endpoint: Generate Interview Questions
app.post("/api/interview/generate-questions", async (req, res) => {
  try {
    const { role, level, durationMinutes, company, customNotes } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback response if API key is not yet provided
      return res.json({
        questions: [
          {
            id: 1,
            question: `Can you walk me through a challenging technical architectural decision you made in a recent project at ${company || "your previous role"}?`,
            category: "System Design & Architecture",
            recommendedDurationSec: 180,
            starFocus: "Situation & Task",
            keySkill: "Technical Leadership",
          },
          {
            id: 2,
            question: "Describe a situation where you had a strong disagreement with a product manager or senior stakeholder regarding a deadline or feature scope. How did you resolve it?",
            category: "Behavioral & Communication",
            recommendedDurationSec: 150,
            starFocus: "Action & Result",
            keySkill: "Conflict Resolution",
          },
          {
            id: 3,
            question: "How do you systematically identify and diagnose performance bottlenecks in high-scale distributed systems under load?",
            category: "Technical Deep-Dive",
            recommendedDurationSec: 210,
            starFocus: "Action",
            keySkill: "System Optimization",
          },
          {
            id: 4,
            question: "Tell me about a time when a feature you shipped failed or caused a production issue. What went wrong and what steps did you take to prevent recurrence?",
            category: "Ownership & Resilience",
            recommendedDurationSec: 180,
            starFocus: "Result & Learning",
            keySkill: "Post-mortem & Quality",
          },
        ],
      });
    }

    const prompt = `Generate a realistic interview question list for a candidate interviewing for:
Target Role: ${role || "Software Engineer"}
Seniority Level: ${level || "Senior / Lead"}
Company: ${company || "General Tech"}
Target Length: ${durationMinutes || 30} minutes
Additional Context: ${customNotes || "Standard industry standards"}

Return 4 to 6 well-structured interview questions covering technical, behavioral, system design, and role-specific competencies.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an expert executive tech recruiter and principal engineering interviewer. Generate concise, realistic, high-impact interview questions.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  category: { type: Type.STRING },
                  recommendedDurationSec: { type: Type.INTEGER },
                  starFocus: { type: Type.STRING },
                  keySkill: { type: Type.STRING },
                },
                required: ["id", "question", "category", "recommendedDurationSec", "starFocus", "keySkill"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: error.message || "Failed to generate questions" });
  }
});

// Heuristic fallback for precise rubric-based scoring when Gemini API is offline
function evaluateResponseHeuristic(
  question: string,
  candidateAnswer: string,
  role = "Software Engineer",
  company = "Tech Enterprise",
  level = "Senior / Lead"
) {
  const text = (candidateAnswer || "").trim();
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Very short, evasive, or empty responses get strictly penalized
  if (wordCount < 15 || /^(i don't know|idk|no idea|skip|pass|nothing|not sure|n\/a)\b/i.test(text)) {
    return {
      overallScore: 28,
      clarityScore: 35,
      technicalScore: 24,
      sentimentScore: 30,
      dimensionalScores: {
        relevance: 30,
        starStructure: 20,
        quantifiableImpact: 15,
        technicalPrecision: 20,
        seniorityCalibration: 25,
      },
      strengths: ["Attempted to answer"],
      improvements: [
        "Response is too brief (<15 words). Provide a complete narrative with context, actions, and results.",
        "Structure your response using the STAR framework (Situation, Task, Action, Result).",
        "Include concrete numbers (e.g. latency reduced by 40%, supported 10k concurrent users).",
      ],
      starAnalysis: {
        situation: "Missing background or project context.",
        task: "No specific technical challenge or business constraint specified.",
        action: "No engineering decisions or personal leadership actions described.",
        result: "No measurable outcome or business metrics provided.",
      },
      scoreBoosterRewrite: `At ${company}, our team encountered a critical scalability bottleneck. As the ${role}, I took ownership of the migration by auditing database bottlenecks and implementing an asynchronous event queue. This decreased response time by 45% and eliminated timeouts during peak traffic.`,
      suggestedFollowUp: "Could you walk me through a specific real-world project from your career where you tackled a similar scenario?",
      rubricNotes: "Severely penalized due to brevity and absence of STAR methodology components.",
    };
  }

  // 1. Quantifiable Metrics & Scale Detection
  const metricRegex = /\b\d+(\.\d+)?%|\$[0-9,]+(\.[0-9]+)?|\b\d+\s*(ms|milliseconds|s|seconds|min|minutes|qps|rps|tps|fps|gb|tb|mb|k|m|million|billion|users|customers|requests|transactions|engineers|nodes|servers|clusters|days|weeks|months|x)\b/gi;
  const metricsFound = text.match(metricRegex) || [];
  const metricCount = metricsFound.length;

  let quantifiableImpact = 52;
  if (metricCount === 0) {
    quantifiableImpact = Math.min(62, 45 + Math.floor(wordCount / 12));
  } else if (metricCount === 1) {
    quantifiableImpact = Math.min(78, 68 + Math.floor(wordCount / 15));
  } else if (metricCount === 2) {
    quantifiableImpact = Math.min(88, 78 + Math.floor(wordCount / 15));
  } else {
    quantifiableImpact = Math.min(96, 88 + (metricCount - 2) * 2);
  }

  // 2. STAR Structure Detection
  const hasSituation = /(situation|context|background|previously|at the time|when i was|at my former|in my role|we were building|we had|during my|faced a)/i.test(text);
  const hasTask = /(task|objective|goal|challenge|responsible for|target|requirement|hard deadline|problem was|we needed to|needed to balance)/i.test(text);
  const hasAction = /(i decided|i implemented|i designed|i built|i led|i refactored|i spearheaded|i orchestrated|i audited|i created|i resolved|i analyzed|i proposed|i advocated|i prioritized|i introduced)/i.test(text);
  const hasResult = /(result|outcome|impact|increased|reduced|slashed|decreased|boosted|saved|achieved|improved|delivered|ahead of schedule|promotions|conversion|eliminated|prevented)/i.test(text);

  let starElementsCount = 0;
  if (hasSituation) starElementsCount++;
  if (hasTask) starElementsCount++;
  if (hasAction) starElementsCount++;
  if (hasResult) starElementsCount++;

  let starStructure = 48 + starElementsCount * 11;
  // Personal Agency Bonus ("I" vs "We")
  const personalI = (text.match(/\b(i|my|mine|me)\b/gi) || []).length;
  const teamWe = (text.match(/\b(we|our|us)\b/gi) || []).length;
  if (personalI >= 3 && personalI >= teamWe) {
    starStructure += 6;
  }
  starStructure = Math.min(95, starStructure);

  // 3. Question Relevance & Directness
  const questionWords = question
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length > 3 && !["what", "when", "where", "which", "about", "your", "with", "that", "this", "time", "have"].includes(w));
  
  let matchingQuestionConcepts = 0;
  for (const qw of questionWords) {
    if (text.toLowerCase().includes(qw)) {
      matchingQuestionConcepts++;
    }
  }

  let relevance = 65;
  if (matchingQuestionConcepts >= 2) relevance += 12;
  if (matchingQuestionConcepts >= 4) relevance += 10;
  if (wordCount >= 60) relevance += 6;
  relevance = Math.min(95, relevance);

  // 4. Technical & Architectural Depth
  const techKeywords = /(architecture|microservice|latency|cache|caching|redis|kafka|postgres|sql|nosql|kubernetes|docker|api|grpc|database|queue|telemetry|monitoring|prometheus|datadog|trade-off|benchmark|throughput|scale|pipeline|bottleneck|consensus|resilience|fault-tolerant|modular|component|ci\/cd|observability|sharding|concurrency|async|indexes|p99)/gi;
  const techMatches = text.match(techKeywords) || [];
  const uniqueTech = new Set(techMatches.map(m => m.toLowerCase())).size;

  let technicalPrecision = 58;
  if (uniqueTech >= 1) technicalPrecision += 8;
  if (uniqueTech >= 3) technicalPrecision += 14;
  if (uniqueTech >= 5) technicalPrecision += 12;
  technicalPrecision = Math.min(96, technicalPrecision);

  // 5. Seniority & Level Calibration
  let seniorityCalibration = 64;
  const leadershipWords = /(championed|spearheaded|mentored|aligned|stakeholder|consensus|rfc|roadmap|post-mortem|ownership|trade-off|cross-functional|strategic|delegated)/gi;
  const leaderMatches = (text.match(leadershipWords) || []).length;
  if (leaderMatches >= 1) seniorityCalibration += 10;
  if (leaderMatches >= 2) seniorityCalibration += 12;
  if (level.includes("Senior") || level.includes("Lead") || level.includes("Executive")) {
    if (leaderMatches === 0) seniorityCalibration -= 6;
  }
  seniorityCalibration = Math.min(94, Math.max(50, seniorityCalibration));

  // Weighted Overall Score
  // Weights: Relevance 25%, STAR 25%, Impact 20%, Technical 20%, Seniority 10%
  const overallScore = Math.round(
    relevance * 0.25 +
    starStructure * 0.25 +
    quantifiableImpact * 0.20 +
    technicalPrecision * 0.20 +
    seniorityCalibration * 0.10
  );

  const clarityScore = Math.round(relevance * 0.5 + starStructure * 0.5);
  const technicalScore = Math.round(technicalPrecision * 0.7 + quantifiableImpact * 0.3);
  const sentimentScore = Math.round(seniorityCalibration * 0.5 + clarityScore * 0.5);

  // Formulate calibrated strengths
  const strengths: string[] = [];
  if (hasSituation && hasTask) {
    strengths.push("Clear problem articulation framing both technical stakes and business context.");
  }
  if (personalI >= teamWe && personalI > 0) {
    strengths.push("Strong personal agency using 'I' to articulate individual architectural contributions.");
  }
  if (metricCount > 0) {
    strengths.push(`Quantified impact with concrete metrics (${metricsFound.slice(0, 2).join(", ")}).`);
  } else {
    strengths.push("Direct and professional communication tone.");
  }
  if (uniqueTech >= 2) {
    strengths.push("Precise domain terminology reflecting deep familiarity with modern systems.");
  }

  // Formulate targeted improvements
  const improvements: string[] = [];
  if (metricCount === 0) {
    improvements.push("Add quantitative outcomes (e.g. '% latency reduction', 'QPS supported', or 'weeks saved') using the Google X-Y-Z formula.");
  }
  if (!hasResult) {
    improvements.push("Conclude with an explicit 'Result' segment detailing long-term business impact and team learnings.");
  }
  if (teamWe > personalI) {
    improvements.push("Shift phrasing from 'we did' to 'I designed/implemented' to highlight your personal ownership.");
  }
  if (uniqueTech < 2) {
    improvements.push("Enrich technical depth by referencing specific data structures, caching layers, or architectural trade-offs.");
  }

  return {
    overallScore,
    clarityScore,
    technicalScore,
    sentimentScore,
    dimensionalScores: {
      relevance,
      starStructure,
      quantifiableImpact,
      technicalPrecision,
      seniorityCalibration,
    },
    strengths: strengths.slice(0, 3),
    improvements: improvements.slice(0, 3),
    starAnalysis: {
      situation: hasSituation ? "Solid context set with clear baseline parameters." : "Needs clearer upfront context and timeline.",
      task: hasTask ? "Explicitly identified the primary engineering/product challenge." : "Stated task is somewhat ambiguous; clarify the core constraint.",
      action: hasAction ? "Detailed specific architectural decisions and execution steps." : "Actions are high-level; detail the specific technical steps taken.",
      result: hasResult ? "Demonstrated clear resolution with business alignment." : "Missing concrete closing metrics (latency %, dollar volume, or user satisfaction).",
    },
    scoreBoosterRewrite: `In response to ${question.slice(0, 45)}..., I analyzed the bottleneck using distributed telemetry, architected a modular solution cutting lead time by 35%, and delivered the rollout 3 days ahead of schedule with 99.99% availability.`,
    suggestedFollowUp: `How did you validate that your architectural solution would scale if traffic increased 5x, and what counter-metrics did you monitor?`,
    rubricNotes: `Scored based on 5 calibrated dimensions. Metric score: ${quantifiableImpact}/100. STAR score: ${starStructure}/100.`,
  };
}

// Endpoint: Evaluate Response in real-time or per question
app.post("/api/interview/evaluate-response", async (req, res) => {
  try {
    const { question, candidateAnswer, role, company, level } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Return accurate heuristic evaluation
      const heuristicResult = evaluateResponseHeuristic(question, candidateAnswer, role, company, level);
      return res.json(heuristicResult);
    }

    const prompt = `You are a Principal Technical Interviewer and Hiring Bar Raiser at a top tier technology company (${company || "FAANG"}).
Evaluate the following candidate response with uncompromising precision against an objective, calibrated 5-dimension scoring rubric.

Target Candidate Profile:
- Role: ${role || "Senior Software Engineer"}
- Seniority Level: ${level || "Senior / Lead"}
- Target Company: ${company || "Google"}

Question Asked:
"${question}"

Candidate's Actual Response:
"${candidateAnswer || ""}"

EVALUATION RUBRIC & INSTRUCTIONS:
1. Relevance & Directness (Weight 25%): Did the candidate directly and substantively answer the core prompt without rambling or deflecting?
2. STAR Structure & Completeness (Weight 25%): Are Situation, Task, Action, and Result clearly delineated? Did the candidate state their own personal contributions ("I") vs vague team actions ("we")?
3. Quantifiable Impact & Metrics (Weight 20%): Did they state explicit numbers (%, $, latency, throughput, scale, headcount, delivery timeline)? Answers with ZERO numbers must not score above 65 in this dimension.
4. Technical & Domain Precision (Weight 20%): Did they name concrete technologies, architectural patterns, failure modes, trade-offs, or protocols relevant to the role?
5. Seniority & Culture Calibration (Weight 10%): Does the answer demonstrate the scope, influence, and mature judgment expected of a ${level || "Senior"} candidate?

PENALTY RULES (DO NOT INFLATE SCORES):
- A response under 25 words or saying "I don't know" MUST receive an overallScore below 35.
- A response with no metrics or business outcomes MUST NOT score above 80 overall.
- Compute overallScore as: (relevance * 0.25) + (starStructure * 0.25) + (quantifiableImpact * 0.20) + (technicalPrecision * 0.20) + (seniorityCalibration * 0.10).
- Provide a concrete "scoreBoosterRewrite" showing how the candidate could rewrite their response using the Google X-Y-Z formula ("Accomplished X as measured by Y, by doing Z") to score 95+.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction:
          "You are an exacting FAANG Staff Interviewer and Bar Raiser. Evaluate interview answers with rigorous precision and avoid score inflation.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            clarityScore: { type: Type.INTEGER },
            technicalScore: { type: Type.INTEGER },
            sentimentScore: { type: Type.INTEGER },
            dimensionalScores: {
              type: Type.OBJECT,
              properties: {
                relevance: { type: Type.INTEGER },
                starStructure: { type: Type.INTEGER },
                quantifiableImpact: { type: Type.INTEGER },
                technicalPrecision: { type: Type.INTEGER },
                seniorityCalibration: { type: Type.INTEGER },
              },
              required: ["relevance", "starStructure", "quantifiableImpact", "technicalPrecision", "seniorityCalibration"],
            },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            starAnalysis: {
              type: Type.OBJECT,
              properties: {
                situation: { type: Type.STRING },
                task: { type: Type.STRING },
                action: { type: Type.STRING },
                result: { type: Type.STRING },
              },
              required: ["situation", "task", "action", "result"],
            },
            scoreBoosterRewrite: { type: Type.STRING },
            suggestedFollowUp: { type: Type.STRING },
            rubricNotes: { type: Type.STRING },
          },
          required: [
            "overallScore",
            "clarityScore",
            "technicalScore",
            "sentimentScore",
            "dimensionalScores",
            "strengths",
            "improvements",
            "starAnalysis",
            "scoreBoosterRewrite",
            "suggestedFollowUp",
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Error in AI evaluation, utilizing fallback engine:", error);
    const fallback = evaluateResponseHeuristic(
      req.body.question,
      req.body.candidateAnswer,
      req.body.role,
      req.body.company,
      req.body.level
    );
    res.json(fallback);
  }
});

// Endpoint: Company Intelligence & Insights
app.post("/api/company/research", async (req, res) => {
  try {
    const { companyName, role } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        companyName: companyName || "Tech Corp",
        overview: `${companyName || "Tech Corp"} emphasizes strong engineering ownership, data-informed product decisions, and high cross-functional collaboration.`,
        keyValues: ["Customer Obsession", "Bias for Action", "Frugality & Scale", "Insist on Highest Standards"],
        commonQuestions: [
          "Describe a time you had to deliver results under extreme ambiguity.",
          "How do you evaluate system design trade-offs between consistency and availability?",
          "Give an example of a time you simplified a complex legacy architecture.",
        ],
        prepTip: "Focus heavily on quantifying business impact with concrete metrics. Structure every behavioral response using the STAR method with concise 2-minute answers.",
      });
    }

    const prompt = `Provide research insights for preparing for an interview at company "${companyName}" for the role "${role}". Include company overview, core culture values, common interview questions, and a high-impact prep tip.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            companyName: { type: Type.STRING },
            overview: { type: Type.STRING },
            keyValues: { type: Type.ARRAY, items: { type: Type.STRING } },
            commonQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            prepTip: { type: Type.STRING },
          },
          required: ["companyName", "overview", "keyValues", "commonQuestions", "prepTip"],
        },
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InterviewAI Server running at http://localhost:${PORT}`);
  });
}

startServer();
