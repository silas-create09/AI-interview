export type QuestionStatus = 'answered' | 'skipped' | 'invalid';

export interface AnswerValidationResult {
  status: QuestionStatus;
  label: string;
  reason?: string;
  wordCount: number;
  isEligibleForAI: boolean;
  score: number; // 0 for skipped or invalid, pending / evaluated for answered
}

// Blocklist of common evasive non-answers and fillers
const JUNK_BLOCKLIST: string[] = [
  "idk",
  "i dont know",
  "i don't know",
  "dont know",
  "don't know",
  "na",
  "n/a",
  "n / a",
  "n.a",
  "n.a.",
  "no",
  "yes",
  "nothing",
  "not sure",
  "pass",
  "none",
  "?",
  "??",
  "???",
  "no idea",
  "i have no idea",
  "i got no idea",
  "skip",
  "skipped",
  "next",
  "whatever",
  "nah",
  "nope",
  "dunno",
  "dont care",
  "don't care",
  "can't answer",
  "cant answer",
  "cannot answer",
  "no comment",
  "asdf",
  "qwerty",
  "test",
  "testing",
  "blank",
  "nil",
  "null",
  "undefined",
  "dont wanna answer",
  "i don't want to answer",
  "leave it"
];

/**
 * Checks if normalized string consists solely of a single character repeated (e.g. "aaaaaa", ".....", "111111").
 */
function isRepeatedSingleCharacter(text: string): boolean {
  if (!text) return false;
  const stripped = text.replace(/\s+/g, "");
  if (stripped.length <= 1) return false;
  const firstChar = stripped[0];
  for (let i = 1; i < stripped.length; i++) {
    if (stripped[i] !== firstChar) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if text is repetitive junk like "abcabcabc" or keyboard mash
 */
function isDegenerateJunk(text: string): boolean {
  if (isRepeatedSingleCharacter(text)) return true;
  // Punctuation or special symbols only
  if (/^[^a-zA-Z0-9]+$/.test(text)) return true;
  // Repeated 2-char pattern e.g. "hahahahahaha", "lalalala"
  if (text.length >= 6 && /^([a-zA-Z0-9]{1,3})\1{3,}$/i.test(text)) return true;
  return false;
}

/**
 * Validates candidate answer strictly prior to evaluation.
 * Returns status:
 * - 'skipped': Completely empty field (no text at all)
 * - 'invalid': Degenerate input, under 3 chars, repeated characters, or non-answer blocklist match
 * - 'answered': Passes junk filter and meets minimum 40 words
 */
export function validateCandidateAnswer(rawInput: string | undefined | null): AnswerValidationResult {
  // 1. Check for skipped: completely empty field (no text entered at all)
  if (rawInput === undefined || rawInput === null || rawInput.length === 0) {
    return {
      status: 'skipped',
      label: 'Skipped',
      reason: 'Question was skipped (no input provided).',
      wordCount: 0,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // Normalize submitted answer (trim whitespace, lowercase)
  const trimmed = rawInput.trim();
  const normalized = trimmed.toLowerCase();

  // Words count
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  // 2. Check degenerate input: empty after trimming (e.g. user typed only spaces)
  if (trimmed.length === 0) {
    return {
      status: 'invalid',
      label: 'Invalid / low-effort answer',
      reason: 'Submitted response contains only whitespace characters.',
      wordCount: 0,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // 3. Check degenerate input: under ~3 characters (e.g. "a", "ok", "?", "no")
  if (trimmed.length < 3) {
    return {
      status: 'invalid',
      label: 'Invalid / low-effort answer',
      reason: 'Submitted response is fewer than 3 characters and contains no substantive content.',
      wordCount,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // 4. Check degenerate input: single character repeated (e.g. "aaaaaa", ".......")
  if (isDegenerateJunk(normalized)) {
    return {
      status: 'invalid',
      label: 'Invalid / low-effort answer',
      reason: 'Submitted response contains repetitive characters or degenerate input without meaningful explanation.',
      wordCount,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // 5. Check blocklist of non-answers (exact or close match)
  // Clean punctuation for matching: "i don't know???" -> "i dont know"
  const cleanPunctuation = normalized.replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
  const isBlocklisted = JUNK_BLOCKLIST.some(item => {
    const cleanItem = item.replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
    return cleanPunctuation === cleanItem || normalized === item;
  });

  if (isBlocklisted) {
    return {
      status: 'invalid',
      label: 'Invalid / low-effort answer',
      reason: `Submitted response matches low-effort non-answer phrasing ('${trimmed}').`,
      wordCount,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // 6. Minimum word count requirement (minimum 40 words)
  // For answers that pass the junk filter:
  // If non-empty but under 40 words, submission should be blocked for elaboration.
  if (wordCount < 40) {
    return {
      status: 'answered', // Not junk, but requires elaboration before calling AI evaluator
      label: 'Under 40 Words',
      reason: `Response contains ${wordCount} words. A minimum of 40 words is required for evaluation.`,
      wordCount,
      isEligibleForAI: false,
      score: 0,
    };
  }

  // Passed all filters: genuine answer ready for AI evaluator
  return {
    status: 'answered',
    label: 'Answered',
    reason: undefined,
    wordCount,
    isEligibleForAI: true,
    score: 0, // Will be set by AI evaluator
  };
}
