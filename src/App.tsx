import { useState } from "react";
import "./App.css";

interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function QuestionCounter({
  currentQuestionIndex,
}: {
  currentQuestionIndex: number;
}) {
  return <div>Question: {currentQuestionIndex}</div>;
}

function ScoreDisplay({ score }: { score: number }) {
  return <div>Score: {score}</div>;
}

function GameHeader({
  currentQuestionIndex,
  score,
}: {
  currentQuestionIndex: number;
  score: number;
}) {
  return (
    <div className="flex justify-between">
      <QuestionCounter currentQuestionIndex={currentQuestionIndex} />
      <ScoreDisplay score={score} />
    </div>
  );
}

function QuestionText({ currentQuestion }: { currentQuestion: Question }) {
  return (
    <div>
      <p>Category: {currentQuestion.category}</p>
      <p>Question: {currentQuestion.question}</p>
    </div>
  );
}

function AnswerOptions({ currentQuestion }: { currentQuestion: Question }) {
  return (
    <div className="flex justify-between">
      <button>{currentQuestion.correct_answer}</button>
      {currentQuestion.incorrect_answers.map((answer) => (
        <button>{answer}</button>
      ))}
    </div>
  );
}

function GameBoard({ currentQuestion }: { currentQuestion: Question }) {
  return (
    <>
      <QuestionText currentQuestion={currentQuestion} />
      <AnswerOptions currentQuestion={currentQuestion} />
    </>
  );
}

function TriviaGame({ questions }: { questions: Question[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  return (
    <div className="mx-auto px-4 text-sm sm:max-w-2xl sm:px-6 sm:text-base md:max-w-3xl">
      <GameHeader currentQuestionIndex={currentQuestionIndex} score={score} />
      <GameBoard currentQuestion={questions[currentQuestionIndex]} />
    </div>
  );
}

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
