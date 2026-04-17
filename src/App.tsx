import { useState } from "react";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function decodeHTML(html: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = html;
  return el.value;
}

// This must be located outside a component, due to Math.random() being an "impure function"
function shuffleAnswers(correct: string, incorrect: string[]): string[] {
  const answers = [correct, ...incorrect];
  // Fisher-Yates
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return answers;
}

function GameHeader({
  currentQuestionIndex,
  score,
}: {
  currentQuestionIndex: number;
  score: number;
}) {
  return (
    <header className="mb-4 flex justify-between text-sm">
      <div>Question: {currentQuestionIndex + 1}</div>
      <div>Score: {score}</div>
    </header>
  );
}

function QuestionText({ currentQuestion }: { currentQuestion: Question }) {
  return (
    <h1 className="text-lg font-medium">
      {currentQuestion.category}: {decodeHTML(currentQuestion.question)}
    </h1>
  );
}

function AnswerOptions({
  currentQuestion,
  onAnswerClick,
}: {
  currentQuestion: Question;
  onAnswerClick: (answer: string) => void;
}) {
  const shuffledAnswers = shuffleAnswers(
    currentQuestion.correct_answer,
    currentQuestion.incorrect_answers,
  );

  return (
    <fieldset className="flex justify-between">
      <legend className="sr-only">Select your answer</legend>
      {shuffledAnswers.map((answer) => (
        <button
          key={answer}
          onClick={() => onAnswerClick(answer)}
          aria-label={`Answer: ${answer}`}>
          {answer}
        </button>
      ))}
    </fieldset>
  );
}

function GameBoard({
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

function GameOver({
  score,
  totalQuestions,
  onPlayAgain,
}: {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}) {
  return (
    <section className="game-content">
      <p>Game Over!</p>
      <p>
        You scored {score} out of {totalQuestions}
      </p>
      <button onClick={onPlayAgain}>Play Again</button>
    </section>
  );
}

function TriviaGame({ questions }: { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
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

// Trivia data hardcoded for now
const QUESTIONS = [
  {
    type: "multiple",
    difficulty: "medium",
    category: "History",
    question:
      "When did the British hand-over sovereignty of Hong Kong back to China?",
    correct_answer: "1997",
    incorrect_answers: ["1999", "1841", "1900"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Mathematics",
    question: "How many sides does a pentagon have?",
    correct_answer: "5",
    incorrect_answers: ["9", "6", "4"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Geography",
    question: "With which country does France share its largest land border",
    correct_answer: "Brazil",
    incorrect_answers: ["Germany", "Spain", "Canada"],
  },
];

export default function App() {
  return <TriviaGame questions={QUESTIONS} />;
}
