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

    // Cleanup function
    return () => clearTimeout(timer);
  }, [answered, onAnswerClick, delayMs]);
}
