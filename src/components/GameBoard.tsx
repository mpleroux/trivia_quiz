import { type Question } from "../utils";
import TrivialPursuitCard from "./TrivialPursuitCard";

export default function GameBoard({
  currentQuestion,
  currentQuestionIndex,
  onAnswerClick,
}: {
  currentQuestion: Question;
  currentQuestionIndex: number;
  onAnswerClick: (answer: string) => void;
}) {
  return (
    <>
      <TrivialPursuitCard
        currentQuestion={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        onAnswerClick={onAnswerClick}
      />
    </>
  );
}
