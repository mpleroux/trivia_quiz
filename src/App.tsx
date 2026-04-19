import { useTriviaQuestions } from "./hooks/useTriviaQuestions";
import TriviaGame from "./components/TriviaGame";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";

export default function App() {
  const { questions, isLoading, error, retry } = useTriviaQuestions();

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={retry} />;

  return (
    <TriviaGame
      questions={questions}
      onPlayAgain={retry}
      isLoading={isLoading}
    />
  );
}
