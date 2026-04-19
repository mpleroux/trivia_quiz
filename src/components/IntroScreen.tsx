export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="game-content">
      <h1>Trivia Quiz</h1>

      <p>Test your knowledge!</p>

      <p>
        This is a trivia game using questions from Open Trivia DB. You will be
        given five multiple choice questions with buttons for the possible
        answers. After you make a choice the correct answer will be colored
        green and incorrect answers will be colored red.
      </p>

      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
}
