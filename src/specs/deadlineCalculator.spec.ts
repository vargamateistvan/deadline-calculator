import calculateDeadline from "../deadlineCalculator";

describe("calculateDeadline", () => {
  describe("Invalid turnaround time", () => {
    test("should throw an error for an invalid estimated time", () => {
      const invalidSubmitDate = new Date("2023-09-27T18:00:00");
      expect(() => calculateDeadline(invalidSubmitDate, -2)).toThrow(
        "Estimated time should be bigger than 0."
      );
    });
  });

  describe("Within Reporting Period", () => {
    test("should calculate due date within the same working day", () => {
      const validSubmitDate = new Date("2023-09-27T10:00:00");
      const result = calculateDeadline(validSubmitDate, 2);
      expect(result).toEqual(new Date("2023-09-27T12:00:00"));
    });

    test("should throw an error for an invalid reporting period submit date", () => {
      const invalidSubmitDate = new Date("2023-09-27T18:00:00");
      expect(() => calculateDeadline(invalidSubmitDate, 2)).toThrow(
        "Invalid reporting time!"
      );
    });
  });

  describe("Overlapping to Next Periods", () => {
    test("should not overlap and stay within the same day", () => {
      const validSubmitDate = new Date("2023-09-28T10:00:00");
      const result = calculateDeadline(validSubmitDate, 3);
      expect(result).toEqual(new Date("2023-09-28T13:00:00"));
    });

    test("should overlap to the next day", () => {
      const validSubmitDate = new Date("2023-09-28T10:00:00");
      const result = calculateDeadline(validSubmitDate, 13);
      expect(result).toEqual(new Date("2023-09-29T15:00:00"));
    });

    test("should overlap to the next week", () => {
      const validSubmitDate = new Date("2023-09-28T10:00:00");
      const result = calculateDeadline(validSubmitDate, 18);
      expect(result).toEqual(new Date("2023-10-02T12:00:00"));
    });
  });
});
