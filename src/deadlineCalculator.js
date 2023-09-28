import { workingHours, workingDays } from "./constants.js";

function isReportingPeriod(reportDate) {
  const submitHour = reportDate.getHours();
  const submitDay = reportDate.getDay();

  return (
    workingDays.includes(submitDay) &&
    submitHour >= workingHours.start &&
    submitHour < workingHours.end
  );
}

function getWorkingHours() {
  return workingHours.end - workingHours.start;
}

function getTurnaroundTime(turnaround) {
  const workDayHours = getWorkingHours();
  const days = Math.floor(turnaround / workDayHours);
  const hours = turnaround % workDayHours;

  return { days, hours };
}

function getOverlapTime(reportDate, turnAroundTime) {
  const workDayHours = getWorkingHours();
  let days = turnAroundTime.days;

  // If hours overlaps another day
  if (reportDate.getHours() + turnAroundTime.hours >= workingHours.end) {
    days++;
  }

  // If it weekend
  if (reportDate.getDay() + turnAroundTime.days > 5) {
    days += 2;
  }

  // If remaing hours bigger than workDayHours
  const hours =
    (reportDate.getHours() + turnAroundTime.hours - workingHours.start) %
    workDayHours;

  return { days, hours };
}

export default function calculateDeadline(reportDate, turnaround) {
  const isValidReportDate = isReportingPeriod(reportDate);
  if (!isValidReportDate) {
    throw new Error("Invalid reporting time!");
  }

  const dueDate = new Date(reportDate);

  if (reportDate.getHours() + turnaround < workingHours.end) {
    dueDate.setHours(dueDate.getHours() + turnaround);
    return dueDate;
  }

  const turnAroundTime = getTurnaroundTime(turnaround);
  const overlapDates = getOverlapTime(reportDate, turnAroundTime);

  dueDate.setDate(dueDate.getDate() + overlapDates.days);
  dueDate.setHours(workingHours.start + overlapDates.hours);

  return dueDate;
}
