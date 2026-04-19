import { useState, useEffect, useMemo } from "react";
import { shuffleAnswers, type Question } from "../utils";

type ButtonState = "default" | "correct" | "incorrect" | "disabled";

function getButtonClass(state: ButtonState): string {
  const baseClass = "block mb-4";
  const stateClasses: Record<ButtonState, string> = {
    default: "",
    correct: " bg-green-500 hover:bg-green-600",
    incorrect: " bg-red-500 hover:bg-red-600",
    disabled: "opacity-50",
  };

  return baseClass + stateClasses[state];
}

export default function AnswerOptions({
  currentQuestion,
  onAnswerClick,
}: {
  currentQuestion: Question;
  onAnswerClick: (answer: string) => void;
}) {
  const [answered, setAnswered] = useState<string | null>(null);

  // Only recalculate if currentQuestion changes
  // Otherwise use cached array
  const shuffledAnswers = useMemo(
    () =>
      shuffleAnswers(
        currentQuestion.correct_answer,
        currentQuestion.incorrect_answers,
      ),
    [currentQuestion],
  );

  const handleAnswerClick = (answer: string) => {
    if (answered) return; // Ignore if already answered
    setAnswered(answer);
  };

  // Auto-advance after 1.5 seconds
  useEffect(() => {
    if (answered === null) return;

    const timer = setTimeout(() => {
      onAnswerClick(answered);
    }, 1500);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [answered, onAnswerClick]);

  return (
    <fieldset>
      <legend className="sr-only">Select your answer</legend>
      {shuffledAnswers.map((answer) => {
        const isCorrect = answer === currentQuestion.correct_answer;
        const isSelected = answer === answered;

        const getButtonState = (): ButtonState => {
          if (!answered) return "default";
          if (isCorrect) return "correct";
          if (isSelected) return "incorrect";
          return "disabled";
        };

        const buttonClass = getButtonClass(getButtonState());

        return (
          <button
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            disabled={answered !== null}
            aria-label={`Answer: ${answer}`}
            className={buttonClass}>
            {answer}
          </button>
        );
      })}
    </fieldset>
  );
}
