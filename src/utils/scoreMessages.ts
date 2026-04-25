export function getScoreMessage(score: number, totalQuestions: number): string {
  if (score === totalQuestions) return "Perfect!";
  else if (score >= totalQuestions * 0.8) return "Well done!";
  else if (score >= totalQuestions * 0.5) return "Good effort!";
  return "Better luck next time!";
}
