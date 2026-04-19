import { useState } from "react";
import { type Question } from "../utils";
import GameHeader from "./GameHeader";
import GameBoard from "./GameBoard";
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

  // Event handler for buttons
  const handleAnswerClick = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Increment score for correct answer
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    // Advance to next question
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
          <GameBoard
            currentQuestion={questions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            onAnswerClick={handleAnswerClick}
          />
        </>
      )}
    </div>
  );
}
