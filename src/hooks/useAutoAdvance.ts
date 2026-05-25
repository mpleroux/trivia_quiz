import { useEffect } from "react";

export function useAutoAdvance(
  answered: string | null,
  onAnswerClick: (answer: string) => void,
  delayMs: number = 1500,
): void {
  // Auto-advance after X seconds (default is 1.5)
  useEffect(() => {
    if (answered === null) return;

    const timer = setTimeout(() => {
      onAnswerClick(answered);
    }, delayMs);

    // Cancel the timer if the question changes or the component unmounts
    return () => clearTimeout(timer);
  }, [answered, onAnswerClick, delayMs]);
}
