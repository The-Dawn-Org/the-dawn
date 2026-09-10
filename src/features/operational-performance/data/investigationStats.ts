import type { Event } from "../../../types";

/** Only a confirmed interception counts as a hit, and only a confirmed strike as a miss. */
const isIntercepted = (event: Event) => event.eventStatus === "הושלם בהצלחה";

const isMissed = (event: Event) => event.eventStatus === "נכשל";

export interface InterceptionSummary {
  /** Interceptor type name, used as the chart title */
  title: string;
  intercepted: number;
  missed: number;
}

export interface RegionSummary {
  region: string;
  intercepted: number;
  missed: number;
  casualties: number;
  /** Damage cost in thousands of ILS */
  damageK: number;
  /** Every event in the region, including ones excluded from the interception rate */
  eventCount: number;
}

enum droneDamageCost {
  "SkyMite-C7"=10000,
  "LoadBee-M2"=25000,
  "Falcon-Long X4"=40000,
  "NanoSwarm-Q9"=3000,
}

const groupBy = <T>(items: ReadonlyArray<T>, toKey: (item: T) => string) =>
  items.reduce<Record<string, T[]>>((groups, item) => {
    const key = toKey(item);

    if (groups[key]) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }

    return groups;
  }, {});

export const summarizeByInterceptor = (events: ReadonlyArray<Event>): InterceptionSummary[] =>
  Object.entries(groupBy(events, (event) => event.interceptor.type)).map(
    ([title, interceptorEvents]) => ({
      title,
      intercepted: interceptorEvents.filter(isIntercepted).length,
      missed: interceptorEvents.filter(isMissed).length,
    }),
  );

export const summarizeByRegion = (events: ReadonlyArray<Event>): RegionSummary[] =>

  Object.entries(groupBy(events, (event) => event.region))
    .map(([region, regionEvents]) => ({
      region,
      intercepted: regionEvents.filter(isIntercepted).length,
      missed: regionEvents.filter(isMissed).length,
      casualties: regionEvents.reduce((sum, event) => sum + event.droneInjuryCount, 0),
      damageK: Math.round(regionEvents.reduce((sum, event) => sum + (isMissed(event) ? droneDamageCost[event.drone.type] : 0), 0) / 1000),
      eventCount: regionEvents.length,
    }))
    .sort((first, second) => second.eventCount - first.eventCount);
