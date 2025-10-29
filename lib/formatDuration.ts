export function formatDuration(days: number): string {
  if (days < 0) return "Invalid duration";

  if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (days < 30) {
    const weeks = Math.floor(days / 7);
    const extraDays = days % 7;
    return extraDays === 0
      ? `${weeks} week${weeks > 1 ? "s" : ""}`
      : `${weeks} week${weeks > 1 ? "s" : ""} ${extraDays} day${extraDays > 1 ? "s" : ""}`;
  } else {
    const months = Math.floor(days / 30);
    const extraDays = days % 30;
    return extraDays === 0
      ? `${months} month${months > 1 ? "s" : ""}`
      : `${months} month${months > 1 ? "s" : ""} ${extraDays} day${extraDays > 1 ? "s" : ""}`;
  }
}
