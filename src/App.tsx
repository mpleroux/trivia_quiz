import { useState } from "react";
import { useTriviaQuestions } from "./hooks/useTriviaQuestions";
import TriviaGame from "./components/TriviaGame";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import IntroScreen from "./components/IntroScreen";

export default function App() {
  const { questions, isLoading, error, retry } = useTriviaQuestions();
  const [introDismissed, setIntroDismissed] = useState(false);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={retry} />;

  if (!introDismissed) {
    return <IntroScreen onStart={() => setIntroDismissed(true)} />;
  } else {
    return (
      <TriviaGame
        questions={questions}
        onPlayAgain={retry}
        isLoading={isLoading}
      />
    );
  }
}
