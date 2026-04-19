export default function GameOver({
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
