import type { DroneType, InterceptorType, Launcher, Location } from ".";

export interface Event {
  eventId: number;
  interceptor: Omit<InterceptorType, "maxRange">;
  launcher: Launcher;
  region: string;
  time: string;
  eventLocation: Location;
  interceptionStatus: string;
  // eventStatus: string;
  attackingBody: string;
  drone: Pick<DroneType, "type" | "price">;
  droneInjuryCount: number;
}
