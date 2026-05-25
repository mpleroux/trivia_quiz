import { useState } from "react";
import { type Question } from "../utils";
import GameHeader from "./GameHeader";
import TrivialPursuitCard from "./TrivialPursuitCard";
import GameOver from "./GameOver";

export default function TriviaGame({
  questions,
  onPlayAgain,
  isLoading = false,
}: {
  questions: Question[];
  onPlayAgain?: () => void;
  isLoading?: boolean;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    onPlayAgain?.(); // Call the parent's function to fetch new questions
  };

  // Update score and advance the question index when an answer is selected
  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // Show game components or game over page if there are no more questions
  return (
    <div className="game-content">
      {currentQuestionIndex >= questions.length ? (
        <GameOver
          score={score}
          totalQuestions={questions.length}
          onPlayAgain={handlePlayAgain}
          isLoading={isLoading}
        />
      ) : (
        <>
          <GameHeader
            currentQuestionIndex={currentQuestionIndex}
            score={score}
          />
          <TrivialPursuitCard
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerClick={handleAnswerClick}
          />
        </>
      )}
    </div>
  );
}
