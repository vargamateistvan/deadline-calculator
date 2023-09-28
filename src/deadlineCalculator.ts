import { workingHours, workingDays } from "./constants";

type TurnaroundTime = {
  days: number;
  hours: number;
};

function isReportingPeriod(reportDate: Date): boolean {
  const submitHour: number = reportDate.getHours();
  const submitDay: number = reportDate.getDay();

  return (
    workingDays.includes(submitDay) &&
    submitHour >= workingHours.start &&
    submitHour < workingHours.end
  );
}

function getWorkingHours(): number {
  return workingHours.end - workingHours.start;
}

function getTurnaroundTime(turnaround: number): TurnaroundTime {
  const workDayHours: number = getWorkingHours();
  const days: number = Math.floor(turnaround / workDayHours);
  const hours: number = turnaround % workDayHours;

  return { days, hours };
}

function getOverlapTime(
  reportDate: Date,
  turnAroundTime: TurnaroundTime
): TurnaroundTime {
  const workDayHours: number = getWorkingHours();
  let days: number = turnAroundTime.days;

  // If hours overlaps another day
  if (reportDate.getHours() + turnAroundTime.hours >= workingHours.end) {
    days++;
  }

  // If it weekend
  if (
    reportDate.getDay() + turnAroundTime.days >
    workingDays[workingDays.length - 1]
  ) {
    // Add weekend days
    days += 7 - workingDays.length;
  }

  // If remaing hours bigger than workDayHours
  const hours: number =
    (reportDate.getHours() + turnAroundTime.hours - workingHours.start) %
    workDayHours;

  return { days, hours };
}

export default function calculateDeadline(
  reportDate: Date,
  turnaround: number
): Date {
  const isValidReportDate: boolean = isReportingPeriod(reportDate);
  if (!isValidReportDate) {
    throw new Error("Invalid reporting time!");
  }

  const dueDate: Date = new Date(reportDate);

  if (reportDate.getHours() + turnaround < workingHours.end) {
    dueDate.setHours(dueDate.getHours() + turnaround);
    return dueDate;
  }

  const turnAroundTime: TurnaroundTime = getTurnaroundTime(turnaround);
  const overlapDates: TurnaroundTime = getOverlapTime(
    reportDate,
    turnAroundTime
  );

  dueDate.setDate(dueDate.getDate() + overlapDates.days);
  dueDate.setHours(workingHours.start + overlapDates.hours);

  return dueDate;
}
