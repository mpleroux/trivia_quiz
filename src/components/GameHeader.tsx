export default function GameHeader({
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
