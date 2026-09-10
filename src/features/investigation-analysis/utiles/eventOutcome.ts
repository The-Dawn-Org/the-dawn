export type EventOutcome = "success" | "error";

export const getEventOutcome = (
  interceptionStatus: string
): EventOutcome => {
  const normalizedStatus = interceptionStatus.trim().toLowerCase();

  if (
    normalizedStatus === "missed" ||
    normalizedStatus === "לא יורט"
  ) {
    return "error";
  }

  return "success";
};