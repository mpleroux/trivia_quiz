import { type Question } from "../utils";
import QuestionText from "./QuestionText";
import AnswerOptions from "./AnswerOptions";

export default function GameBoard({
  currentQuestion,
  currentQuestionIndex,
  onAnswerClick,
}: {
  currentQuestion: Question;
  currentQuestionIndex: number;
  onAnswerClick: (answer: string) => void;
}) {
  // Key forces fresh shuffled answers
  return (
    <>
      <QuestionText currentQuestion={currentQuestion} />
      <AnswerOptions
        key={currentQuestionIndex}
        currentQuestion={currentQuestion}
        onAnswerClick={onAnswerClick}
      />
    </>
  );
}
