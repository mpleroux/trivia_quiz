import { useState, useEffect } from "react";
import { decodeHTML, type Question, type OpenTDBResponse } from "../utils";

interface UseTriviaQuestionsReturn {
  questions: Question[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useTriviaQuestions(): UseTriviaQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    // Necessary because React Strict Mode mounts components twice as a test
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchQuestions = async () => {
      setIsLoading(true); // Always reset to loading when fetch starts
      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=5&type=multiple",
          { signal },
        );
        const data: OpenTDBResponse = await response.json();

        if (data.response_code !== 0) {
          throw new Error("Failed to fetch questions from API");
        }

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
        setIsLoading(false); // Turn off loading when done
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          // Request was cancelled, don't update state, don't set isLoading to false
          // (For when fetch is aborted in StrictMode)
          return;
        }
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching questions",
        );
        setQuestions([]);
        setIsLoading(false); // Turn off loading so error displays
      }
    };

    fetchQuestions();

    return () => controller.abort(); // Cancel request on unmount or re-run
  }, [gameKey]);

  const retry = () => setGameKey((prev) => prev + 1);

  return {
    questions,
    isLoading,
    error,
    retry,
  };
}
