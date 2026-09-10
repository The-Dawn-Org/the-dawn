import type { DateRangeFilter } from "../../../app/filters/AppFiltersContext";
import { Sector, droneEventsMock, interceptorTypesMock, type DroneEvent } from "../dataMock";

/**
 * Declared as a type alias rather than an interface so it keeps the implicit
 * index signature that the MUI charts `dataset` prop requires.
 */
export type CategoryTotal = {
  category: string;
  total: number;
};

/**
 * The mock arrives with English codes, the screens are Hebrew, so every code is
 * translated on its way to an axis.
 *
 * Key order is also the axis order. A date range that empties a category must
 * not reshuffle the remaining bars, so the order never comes from the data.
 */
export const SectorToHebrewMapper: Record<Sector, string> = {
  [Sector.GAZA]: "עזה",
  [Sector.LEBANON]: "לבנון",
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
const INTERCEPTOR_ORDER = interceptorTypesMock.map((interceptor) => interceptor.name);

const SECTOR_ORDER: string[] = [Sector.GAZA, Sector.LEBANON];

export const DRONE_EVENTS: ReadonlyArray<DroneEvent> = droneEventsMock;

export const filterEventsByDateRange = (
  events: ReadonlyArray<DroneEvent>,
  { startDate, endDate }: DateRangeFilter,
): DroneEvent[] => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  return events.filter((event) => {
    // `occurredAt` is a Unix timestamp in seconds, the filter works in millis.
    const eventTime = event.occurredAt * 1000;

    return eventTime >= startTime && eventTime <= endTime;
  });
};

const totalByCategory = (
  events: ReadonlyArray<DroneEvent>,
  order: ReadonlyArray<string>,
  hebrewLabels: Record<string, string>,
  getCode: (event: DroneEvent) => string,
  getValue: (event: DroneEvent) => number,
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

export const countEventsBySystem = (events: ReadonlyArray<DroneEvent>): CategoryTotal[] =>
  totalByCategory(
    events,
    INTERCEPTOR_ORDER,
    InterceptorToHebrewMapper,
    (event) => event.interceptor.name,
    () => 1,
  );

export const sumCasualtiesBySector = (events: ReadonlyArray<DroneEvent>): CategoryTotal[] =>
  totalByCategory(
    events,
    SECTOR_ORDER,
    SectorToHebrewMapper,
    (event) => event.sector,
    (event) => event.casualtyCount,
  );
