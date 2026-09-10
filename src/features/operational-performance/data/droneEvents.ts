import type { DateRangeFilter } from "../../../app/filters/AppFiltersContext";
import type { Event } from "../../../types";
/**
 * Declared as a type alias rather than an interface so it keeps the implicit
 * index signature that the MUI charts `dataset` prop requires.
 */
export type CategoryTotal = {
  category: string;
  total: number;
};

/** An interceptor model is the defence system that answered the event. */
export const InterceptorToHebrewMapper: Record<string, string> = {
  Tamir: "תמיר",
  Stunner: "סטאנר",
  "Iron Beam": "מגן אור",
  "Barak-8": "ברק-8",
  "C-Dome": "כיפת ברזל ימית",
};

/**
 * The interceptor axis follows the order the models are declared in the mock,
 * so the reference table stays the single source of truth for both.
 */

/**
 * `event.time` has been observed as either a Unix timestamp in seconds (numeric
 * string) or an ISO datetime string depending on how the API serializes it, so
 * both are handled here rather than assuming one format.
 */
const parseEventTimeMs = (time: string): number => {
  if (/^\d+$/.test(time)) {
    return +time * 1000;
  }

  return new Date(time).getTime();
};

export const filterEventsByDateRange = (
  events: ReadonlyArray<Event>,
  { startDate, endDate }: DateRangeFilter,
): Event[] => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  console.log("[filterEventsByDateRange] range:", { startDate, endDate, startTime, endTime });
  if (events.length > 0) {
    console.log(
      "[filterEventsByDateRange] sample event.time:",
      events[0].time,
      "parsed:",
      parseEventTimeMs(events[0].time),
    );
  }

  return events.filter((event) => {
    const eventTime = parseEventTimeMs(event.time);

    if (Number.isNaN(eventTime)) {
      console.warn("[filterEventsByDateRange] unparseable event.time, dropping event:", event);
      return false;
    }

    return eventTime >= startTime && eventTime <= endTime;
  });
};

const totalByCategory = (
  events: ReadonlyArray<Event>,
  order: ReadonlyArray<string>,
  hebrewLabels: Record<string, string>,
  getCode: (event: Event) => string,
  getValue: (event: Event) => number,
): CategoryTotal[] => {
  const orderedCodes = [...order];
  const totals = new Map<string, number>();

  for (const code of orderedCodes) {
    totals.set(code, 0);
  }

  for (const event of events) {
    const code = getCode(event);

    // A code missing from the order is appended rather than dropped, so new
    // systems or sectors in the mock still reach the chart.
    if (!totals.has(code)) {
      orderedCodes.push(code);
    }

    totals.set(code, (totals.get(code) ?? 0) + getValue(event));
  }

  return orderedCodes.map((code) => ({
    // An unmapped code falls back to itself, which is louder than a blank tick.
    category: hebrewLabels[code] ?? code,
    total: totals.get(code) ?? 0,
  }));
};

export const countEventsBySystem = (events: ReadonlyArray<Event>): CategoryTotal[] =>
  totalByCategory(
    events,
    events.map((event) => event.interceptor.type),
    InterceptorToHebrewMapper,
    (event) => event.interceptor.type,
    () => 1,
  );

/** Regions come from the DB already in Hebrew, so no translation table is needed here. */
export const sumCasualtiesBySector = (events: ReadonlyArray<Event>): CategoryTotal[] =>
  totalByCategory(
    events,
    events.map((event) => event.region),
    {},
    (event) => event.region,
    (event) => event.droneInjuryCount,
  );
