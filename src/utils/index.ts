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

export function decodeHTML(html: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

// This must be located outside a component, due to Math.random() being an "impure function"
export function shuffleAnswers(correct: string, incorrect: string[]): string[] {
  const answers = [correct, ...incorrect];
  // Fisher-Yates
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
}
