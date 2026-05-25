export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface OpenTDBResponse {
  response_code: number;
  results: Question[];
}

// Use a temporary DOM element to decode HTML entities in API responses
export function decodeHTML(html: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

// This must be located outside a component, due to Math.random() being an "impure function"
export function shuffleAnswers(correct: string, incorrect: string[]): string[] {
  const answers = [correct, ...incorrect];
  // Walk backward and swap each element with a randomly selected earlier position
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
}
