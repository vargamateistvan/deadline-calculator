import calculateDeadline from "../deadlineCalculator";

describe("calculateDeadline", () => {
  describe("Reporting period", () => {
    test("should return a valid reporting period submit date", () => {
      const validSubmitDate = new Date("2023-09-27T10:00:00"); // Valid reporting period
      const result = calculateDeadline(validSubmitDate, 2);
      expect(result).toEqual(new Date("2023-09-27T12:00:00"));
    });

    test("should return error for an invalid reporting period submit date", () => {
      const invalidSubmitDate = new Date("2023-09-27T18:00:00"); // Outside reporting period
      expect(() => calculateDeadline(invalidSubmitDate, 2)).toThrow(
        "Invalid reporting time!"
      );
    });
  });

  describe("Invalid inputs", () => {});
});
