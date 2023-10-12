import calculateDeadline from "../deadlineCalculator";

jest.mock("../constants", () => ({
  workingDays: [1, 2, 3, 4], // Monday to Thursday
  workingHours: { start: 9, end: 15 },
  weekLength: 7,
}));

describe("4 days week with 6 hours workdays", () => {
  test("should overlap to next week", () => {
    const validSubmitDate = new Date("2023-09-28T10:00:00");
    const result = calculateDeadline(validSubmitDate, 8);
    expect(result).toEqual(new Date("2023-10-02T12:00:00"));
  });
});
