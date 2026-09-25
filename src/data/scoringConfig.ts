/**
 * Scoring bands configuration for interview evaluation.
 * Easily editable thresholds mapping overall percentage to performance verdict bands.
 */
export interface ScoreBand {
  minPercentage: number;
  label: string;
  badgeClass: string;
  cardBorderClass: string;
  description: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  {
    minPercentage: 85,
    label: "Excellent",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-700",
    cardBorderClass: "border-emerald-500/50",
    description: "Exceptional mastery. Demonstrates thorough conceptual depth, precise technical reasoning, and concrete examples."
  },
  {
    minPercentage: 70,
    label: "Good",
    badgeClass: "bg-blue-950/80 text-blue-300 border-blue-700",
    cardBorderClass: "border-blue-500/50",
    description: "Strong competence. Covers core fundamentals accurately with sound structure and minor areas for elaboration."
  },
  {
    minPercentage: 50,
    label: "Average",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-700",
    cardBorderClass: "border-amber-500/50",
    description: "Baseline understanding. Answers touch on standard concepts but lack trade-offs, depth, or concrete specifics."
  },
  {
    minPercentage: 30,
    label: "Needs Improvement",
    badgeClass: "bg-orange-950/80 text-orange-300 border-orange-700",
    cardBorderClass: "border-orange-500/50",
    description: "Partial or shallow answers with noticeable technical gaps, missing dimensions, or skipped questions."
  },
  {
    minPercentage: 0,
    label: "Poor",
    badgeClass: "bg-rose-950/80 text-rose-300 border-rose-700",
    cardBorderClass: "border-rose-500/50",
    description: "Significant deficiencies, multiple unattempted questions, or low-effort responses lacking technical substance."
  }
];

export const FIXED_QUESTIONS_PER_INTERVIEW = 5;
export const MARKS_PER_QUESTION = 100;
export const TOTAL_MARKS_POOL = FIXED_QUESTIONS_PER_INTERVIEW * MARKS_PER_QUESTION; // 500 marks
export const MIN_WORD_COUNT = 40;

/**
 * Calculates dynamic total possible marks based on question count (questionCount * 100).
 */
export function calculateTotalPossibleMarks(questionCount: number = FIXED_QUESTIONS_PER_INTERVIEW): number {
  return (questionCount || FIXED_QUESTIONS_PER_INTERVIEW) * MARKS_PER_QUESTION;
}

/**
 * Maps an overall percentage to its configured verdict band.
 */
export function getVerdictFromPercentage(percentage: number): { label: string; band: ScoreBand } {
  const safePercentage = Math.max(0, Math.min(100, isNaN(percentage) ? 0 : percentage));
  const band = SCORE_BANDS.find(b => safePercentage >= b.minPercentage) || SCORE_BANDS[SCORE_BANDS.length - 1];
  return { label: band.label, band };
}
