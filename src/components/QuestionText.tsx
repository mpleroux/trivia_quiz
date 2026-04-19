import { decodeHTML, type Question } from "../utils";

export default function QuestionText({
  currentQuestion,
}: {
  currentQuestion: Question;
}) {
  return (
    <h1 className="text-lg font-medium">
      {currentQuestion.category}: {decodeHTML(currentQuestion.question)}
    </h1>
  );
}
