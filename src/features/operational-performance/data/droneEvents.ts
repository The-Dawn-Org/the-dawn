import type { DateRangeFilter } from "../../../app/filters/AppFiltersContext";
import { useEvents } from "../../../hooks/useEvents";
import type { Event } from "../../../types";
/**
 * Declared as a type alias rather than an interface so it keeps the implicit
 * index signature that the MUI charts `dataset` prop requires.
 */
export type CategoryTotal = {
  // category: string;
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

export const filterEventsByDateRange = (
  events: ReadonlyArray<Event>,
  { startDate, endDate }: DateRangeFilter,
): Event[] => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  return events.filter((event) => {
    // `occurredAt` is a Unix timestamp in seconds, the filter works in millis.
    const eventTime = +event.time * 1000;

    return eventTime >= startTime && eventTime <= endTime;
  });
};

const totalByCategory = (
  events: ReadonlyArray<Event>,
  order: ReadonlyArray<string>,
  // hebrewLabels: Record<string, string>,
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
    // category: hebrewLabels[code] ?? code,
    total: totals.get(code) ?? 0,
  }));
};

export const countEventsBySystem = (events: ReadonlyArray<Event>): CategoryTotal[] =>
  totalByCategory(
    events,
    events.map((event) => event.interceptor.type),
    // InterceptorToHebrewMapper,
    (event) => event.interceptor.type,
    () => 1,
  );

export const sumCasualtiesBySector = (events: ReadonlyArray<Event>): CategoryTotal[] =>
  totalByCategory(
    events,
    events.map((event) => event.region),
    // SectorToHebrewMapper,
    (event) => event.region,
    (event) => event.droneInjuryCount,
  );
