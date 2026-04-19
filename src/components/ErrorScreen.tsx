export default function ErrorScreen({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <div className="game-content">
      <p>Error: {error}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}
