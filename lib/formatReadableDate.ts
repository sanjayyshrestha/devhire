
export function formatReadableDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // "Jan"
    day: "2-digit", // "15"
    year: "numeric", // "2025"
  });
}
