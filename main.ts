import calculateDeadline from "./src/deadlineCalculator";

console.log("Deadline calculator");

const date1 = new Date("2023-09-28T10:00:00");
const dueDate1 = calculateDeadline(date1, 3);
console.log(
  "Starting time:",
  date1.toLocaleString("hu-HU"),
  "estimated hours:",
  3,
  "it will be done at",
  dueDate1.toLocaleString("hu-HU")
);

// Overlap days
const dueDate2 = calculateDeadline(date1, 13);
console.log(
  "Starting time:",
  date1.toLocaleString("hu-HU"),
  "estimated hours:",
  13,
  "it will be done at",
  dueDate2.toLocaleString("hu-HU")
);

// Overlap a weekend
const dueDate3 = calculateDeadline(date1, 50);
console.log(
  "Starting time:",
  date1.toLocaleString("hu-HU"),
  "estimated hours:",
  50,
  "it will be done at",
  dueDate3.toLocaleString("hu-HU")
);
