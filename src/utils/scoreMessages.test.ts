import { getScoreMessage } from "./scoreMessages";

describe("getScoreMessage", () => {
  it("returns 'Perfect!' when score equals totalQuestions", () => {
    const result = getScoreMessage(5, 5);
    expect(result).toBe("Perfect!");
  });
  it("returns 'Well done!' when scores 80% or higher", () => {
    const result = getScoreMessage(4, 5);
    expect(result).toBe("Well done!");
  });
  it("returns 'Good effort!' when scores between 50%-79%", () => {
    const result = getScoreMessage(3, 5);
    expect(result).toBe("Good effort!");
  });
  it("returns 'Better luck next time!' for scores below 50%", () => {
    const result = getScoreMessage(2, 5);
    expect(result).toBe("Better luck next time!");
  });
});
