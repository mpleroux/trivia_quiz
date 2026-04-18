import { useState, useEffect, useMemo } from "react";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface OpenTDBResponse {
  response_code: number;
  results: Question[];
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

        // Determine button styling based on feedback state
        let buttonClass = "block mb-4";
        if (answered) {
          if (isCorrect) {
            buttonClass += " bg-green-500 hover:bg-green-600";
          } else if (isSelected) {
            // not correct
            buttonClass += " bg-red-500 hover:bg-red-600";
          } else {
            buttonClass += " opacity-50";
          }
        }

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
  isLoading = false,
}: {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  isLoading?: boolean;
}) {
  return (
    <>
      <h1 className="text-lg font-medium">Game Over!</h1>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={onPlayAgain} disabled={isLoading}>
        {isLoading ? "Loading new questions..." : "Play Again"}
      </button>
    </>
  );
}

function TriviaGame({
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

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    // Necessary because React Strict Mode mounts components twice as a test
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple",
          { signal },
        );
        const data: OpenTDBResponse = await response.json();

        if (data.response_code !== 0) {
          throw new Error("Failed to fetch questions from API");
        }

        // Decode HTML entities in questions and answers
        const decodedQuestions = data.results.map((q) => ({
          ...q,
          question: decodeHTML(q.question),
          correct_answer: decodeHTML(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((answer) =>
            decodeHTML(answer),
          ),
        }));

        setQuestions(decodedQuestions);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return; // Request was cancelled, don't update state, don't set isLoading to false
        }
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching questions",
        );
        setQuestions([]);
        setIsLoading(false); // Only set false on real error
      }
    };

    fetchQuestions();

    return () => controller.abort(); // Cancel request on unmount or re-run
  }, [gameKey]);

  if (isLoading) {
    return (
      <div className="game-content">
        <p>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="game-content">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <TriviaGame
      questions={questions}
      onPlayAgain={() => setGameKey(gameKey + 1)}
      isLoading={isLoading}
    />
  );
}
