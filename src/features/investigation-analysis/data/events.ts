import type { DateRangeFilter } from "../../../app/filters/AppFiltersContext";
import eventsJson from "./events.json";

/**
 * `erasableSyntaxOnly` is enabled in tsconfig.app.json, which rules out
 * TypeScript enums. A const object plus a literal union keeps the
 * `Systems.IRON_DOME` call site while staying erasable.
 */
export const Systems = {
  IRON_DOME: "IRON_DOME",
  KELLA_DAVID: "KELLA_DAVID",
  ARROW_2: "ARROW_2",
  ARROW_3: "ARROW_3",
} as const;

export type System = (typeof Systems)[keyof typeof Systems];

export const Regions = {
  NORTH: "NORTH",
  GOLAN: "GOLAN",
  CENTER: "CENTER",
  LOWLANDS: "LOWLANDS",
  JERUSALEM: "JERUSALEM",
  SOUTH: "SOUTH",
} as const;

export type Region = (typeof Regions)[keyof typeof Regions];

/**
 * The data arrives with English codes, the screens are Hebrew, so every code is
 * translated on its way to an axis.
 *
 * Key order is also the axis order. A date range that empties a category must
 * not reshuffle the remaining bars, so the order never comes from the data.
 */
export const SystemsToHebrewMapper: Record<System, string> = {
  [Systems.IRON_DOME]: "כיפת ברזל",
  [Systems.KELLA_DAVID]: "קלע דוד",
  [Systems.ARROW_2]: "חץ 2",
  [Systems.ARROW_3]: "חץ 3",
};

export const RegionsToHebrewMapper: Record<Region, string> = {
  [Regions.NORTH]: "גזרת צפון",
  [Regions.GOLAN]: "רמת הגולן",
  [Regions.CENTER]: "גזרת מרכז",
  [Regions.LOWLANDS]: "גזרת שפלה",
  [Regions.JERUSALEM]: "גזרת ירושלים",
  [Regions.SOUTH]: "גזרת דרום",
};

export interface InvestigationEvent {
  droneId: string;
  missileType: string;
  system: System;
  date: string;
  place: string;
  region: Region;
  attacker: string;
  damageCaused: string;
  peopleHit: number;
  status: string;
}

/**
 * Declared as a type alias rather than an interface so it keeps the implicit
 * index signature that the MUI charts `dataset` prop requires.
 */
export type CategoryTotal = {
  category: string;
  total: number;
};

// JSON widens every string field, so the codes are asserted back to their unions.
export const INVESTIGATION_EVENTS = eventsJson as ReadonlyArray<InvestigationEvent>;

export const filterEventsByDateRange = (
  events: ReadonlyArray<InvestigationEvent>,
  { startDate, endDate }: DateRangeFilter,
): InvestigationEvent[] => {
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  return events.filter((event) => {
    const eventTime = new Date(event.date).getTime();

    return eventTime >= startTime && eventTime <= endTime;
  });
};

const totalByCategory = <TCode extends string>(
  events: ReadonlyArray<InvestigationEvent>,
  hebrewLabels: Record<TCode, string>,
  getCode: (event: InvestigationEvent) => string,
  getValue: (event: InvestigationEvent) => number,
): CategoryTotal[] => {
  // The mapper's key order is the axis order; unmapped codes land after it.
  const orderedCodes = Object.keys(hebrewLabels);
  const totals = new Map<string, number>();

  for (const code of orderedCodes) {
    totals.set(code, 0);
  }

  for (const event of events) {
    const code = getCode(event);

    // A code missing from the mapper is appended rather than dropped, so new
    // systems or regions in the data still reach the chart.
    if (!totals.has(code)) {
      orderedCodes.push(code);
    }

    totals.set(code, (totals.get(code) ?? 0) + getValue(event));
  }

  return orderedCodes.map((code) => ({
    // An unmapped code falls back to itself, which is louder than a blank tick.
    category: hebrewLabels[code as TCode] ?? code,
    total: totals.get(code) ?? 0,
  }));
};

export const countEventsBySystem = (events: ReadonlyArray<InvestigationEvent>): CategoryTotal[] =>
  totalByCategory(
    events,
    SystemsToHebrewMapper,
    (event) => event.system,
    () => 1,
  );

export const sumPeopleHitByRegion = (events: ReadonlyArray<InvestigationEvent>): CategoryTotal[] =>
  totalByCategory(
    events,
    RegionsToHebrewMapper,
    (event) => event.region,
    (event) => event.peopleHit,
  );
