import calculateDeadline from "../deadlineCalculator.js";

describe("calculateDeadline", () => {
  test("should return true for a valid reporting period submit date", () => {
    const validSubmitDate = new Date("2023-09-27T10:00:00"); // Valid reporting period
    const result = calculateDeadline(validSubmitDate);
    expect(result).toBe(true);
  });

  test("should return false for an invalid reporting period submit date", () => {
    const invalidSubmitDate = new Date("2023-09-27T18:00:00"); // Outside reporting period
    const result = calculateDeadline(invalidSubmitDate);
    expect(result).toBe(false);
  });
});
