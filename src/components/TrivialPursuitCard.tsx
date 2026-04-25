import { type Question, decodeHTML } from "../utils";
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
      <div className="bg-[#1A4D7A] p-6 shadow-lg/25">
        {/* Inner gold frame */}
        <div className="relative border-6 border-[#D4A574] bg-[#FAF6F1] p-4 md:p-5">
          {/* Curved corners */}
          <svg
            className="pointer-events-none absolute top-0 left-0 h-5 w-5"
            viewBox="0 0 40 40">
            <path d="M 0 0 L 40 0 Q 0 0 0 40 Z" fill="#D4A574" />
          </svg>
          <svg
            className="pointer-events-none absolute top-0 right-0 h-5 w-5"
            style={{ transform: "scaleX(-1)" }}
            viewBox="0 0 40 40">
            <path d="M 0 0 L 40 0 Q 0 0 0 40 Z" fill="#D4A574" />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-0 left-0 h-5 w-5"
            style={{ transform: "scaleY(-1)" }}
            viewBox="0 0 40 40">
            <path d="M 0 0 L 40 0 Q 0 0 0 40 Z" fill="#D4A574" />
          </svg>
          <svg
            className="pointer-events-none absolute right-0 bottom-0 h-5 w-5"
            style={{ transform: "scaleX(-1) scaleY(-1)" }}
            viewBox="0 0 40 40">
            <path d="M 0 0 L 40 0 Q 0 0 0 40 Z" fill="#D4A574" />
          </svg>

          <div className="grid gap-x-8 gap-y-4 md:grid-cols-[5.5rem_1fr] md:gap-y-2">
            {/* Category oval + name */}
            <div className="flex items-center gap-2 md:flex-col md:items-start md:justify-center">
              {/* Oval wrapper */}
              <div
                className="flex h-8 w-12 items-center justify-center rounded-[50%] border-3 border-slate-800 p-0.5 md:h-16 md:w-24 md:border-4"
                style={{ backgroundColor: categoryColor }}>
                <div
                  className="flex h-full w-full items-center justify-center rounded-[50%] font-serif text-xl font-semibold text-slate-800 shadow-none md:text-4xl md:shadow-[inset_0_0_0_2px_rgba(30,41,59,1)]"
                  style={{
                    backgroundColor: categoryColor,
                  }}>
                  {categoryText}
                </div>
              </div>

              {/* Category name */}
              <div className="font-sans text-xs text-gray-700 md:hidden">
                {decodeHTML(currentQuestion.category)}
              </div>
            </div>

            {/* Question text */}
            <div>
              <div className="hidden font-sans text-sm text-gray-700 md:mb-1 md:block">
                {decodeHTML(currentQuestion.category)}
              </div>
              <div className="font-serif text-base text-gray-900 md:text-lg">
                {currentQuestion.question}
              </div>
            </div>

            {/* Answer buttons - Column 2 only on desktop */}
            {/* Key forces fresh shuffled answers */}
            <div className="md:col-start-2">
              <AnswerOptions
                key={currentQuestionIndex}
                currentQuestion={currentQuestion}
                onAnswerClick={onAnswerClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
