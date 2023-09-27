import { workingHours, workingDays } from "./constants.js";

function isReportingPeriod(submitDate) {
  const submitHour = submitDate.getHours();
  const submitDay = submitDate.getDay();

  return (
    workingDays.includes(submitDay) &&
    submitHour >= workingHours.start &&
    submitHour < workingHours.end
  );
}

export default function calculateDeadline(submitDate) {
  return isReportingPeriod(submitDate);
}
