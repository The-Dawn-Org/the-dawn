import { EventStatus, type DroneEvent } from "./dataMock";

/**
 * The events carry no region, so regions are derived from the launcher latitude.
 * Both the threshold and the names are placeholders until the data carries a real region.
 */
const REGION_LATITUDE_THRESHOLD = 32;
const REGION_NORTH = "צפון";
const REGION_SOUTH = "דרום";

export const resolveRegion = (event: DroneEvent) =>
  event.launcher.latitude >= REGION_LATITUDE_THRESHOLD ? REGION_NORTH : REGION_SOUTH;

/** Only a confirmed interception counts as a hit, and only a confirmed strike as a miss. */
const isIntercepted = (event: DroneEvent) => event.status === EventStatus.INTERCEPTED;

const isMissed = (event: DroneEvent) => event.status === EventStatus.HIT_TARGET;

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

const groupBy = <T>(items: T[], toKey: (item: T) => string) =>
  items.reduce<Record<string, T[]>>((groups, item) => {
    const key = toKey(item);

    if (groups[key]) {
      groups[key].push(item);
    } else {
      groups[key] = [item];
    }

    return groups;
  }, {});

export const summarizeByInterceptor = (events: DroneEvent[]): InterceptionSummary[] =>
  Object.entries(groupBy(events, (event) => event.interceptor.name)).map(
    ([title, interceptorEvents]) => ({
      title,
      intercepted: interceptorEvents.filter(isIntercepted).length,
      missed: interceptorEvents.filter(isMissed).length,
    }),
  );

export const summarizeByRegion = (events: DroneEvent[]): RegionSummary[] =>
  Object.entries(groupBy(events, resolveRegion))
    .map(([region, regionEvents]) => ({
      region,
      intercepted: regionEvents.filter(isIntercepted).length,
      missed: regionEvents.filter(isMissed).length,
      casualties: regionEvents.reduce((sum, event) => sum + event.casualtyCount, 0),
      damageK: Math.round(regionEvents.reduce((sum, event) => sum + event.damageCostIls, 0) / 1000),
      eventCount: regionEvents.length,
    }))
    .sort((first, second) => second.eventCount - first.eventCount);
