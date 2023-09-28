import calculateDeadline from "../deadlineCalculator";

jest.mock("../constants", () => ({
  workingDays: [1, 2, 3, 4], // Monday to Thursday
  workingHours: { start: 17, end: 9 },
}));

describe("Invalid input", () => {
  test("should throw an error for an invalid workday interval", () => {
    const validSubmitDate = new Date("2023-09-28T10:00:00");
    expect(() => calculateDeadline(validSubmitDate, 2)).toThrow(
      "Please add a valid workday interval."
    );
  });
});
