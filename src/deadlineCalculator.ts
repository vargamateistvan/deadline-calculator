import { workingHours, workingDays, weekLength } from "./constants";

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

function isOverlapsAnotherDay(
  reportDate: Date,
  turnAroundTime: TurnaroundTime
): boolean {
  return reportDate.getHours() + turnAroundTime.hours >= workingHours.end;
}

function isWeekEnd(reportDate: Date, turnAroundTime: TurnaroundTime): boolean {
  return (
    reportDate.getDay() + turnAroundTime.days >
    workingDays[workingDays.length - 1]
  );
}

function getWeekEndDays(): number {
  return weekLength - workingDays.length;
}

function getRemaningHours(
  reportDate: Date,
  turnAroundTime: TurnaroundTime,
  workDayHours: number
): number {
  return (
    (reportDate.getHours() + turnAroundTime.hours - workingHours.start) %
    workDayHours
  );
}

function getOverlapTime(
  reportDate: Date,
  turnAroundTime: TurnaroundTime
): TurnaroundTime {
  const workDayHours: number = getWorkingHours();
  let days: number = turnAroundTime.days;

  if (isOverlapsAnotherDay(reportDate, turnAroundTime)) {
    days++;
  }

  if (isWeekEnd(reportDate, turnAroundTime)) {
    days += getWeekEndDays();
  }

  const hours: number = getRemaningHours(
    reportDate,
    turnAroundTime,
    workDayHours
  );

  return { days, hours };
}

export default function calculateDeadline(
  reportDate: Date,
  turnaround: number
): Date {
  if (workingHours.start >= workingHours.end) {
    throw new Error("Please add a valid workday interval.");
  }

  if (turnaround < 0) {
    throw new Error("Estimated time should be bigger than 0.");
  }

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
