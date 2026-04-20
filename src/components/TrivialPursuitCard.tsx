import { type Question } from "../utils";
import AnswerOptions from "./AnswerOptions";
import {
  getCategoryColor,
  getCategoryAbbreviation,
} from "../utils/categoryData";

export default function TrivialPursuitCard({
  currentQuestion,
  currentQuestionIndex,
  onAnswerClick,
}: {
  currentQuestion: Question;
  currentQuestionIndex: number;
  onAnswerClick: (answer: string) => void;
}) {
  const categoryText = getCategoryAbbreviation(currentQuestion.category);
  const categoryColor = getCategoryColor(currentQuestion.category);

  return (
    <>
      {/* Outer dark blue frame */}
      <div className="bg-[#1A4D7A] p-4">
        {/* Inner gold frame */}
        <div className="flex gap-4 border-4 border-[#D4A574] bg-[#FAF6F1] p-6">
          {/* Category circle */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full font-serif text-2xl font-bold text-slate-900"
            style={{ backgroundColor: categoryColor }}>
            {categoryText}
          </div>
          {/* Question and answer buttons */}
          <div className="flex flex-1 flex-col gap-4">
            <div className="font-serif text-lg text-gray-900">
              {currentQuestion.question}
            </div>
            {/* Key forces fresh shuffled answers */}
            <AnswerOptions
              key={currentQuestionIndex}
              currentQuestion={currentQuestion}
              onAnswerClick={onAnswerClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
