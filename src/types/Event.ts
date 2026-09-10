import type { DroneType, InterceptorType, Launcher, Location } from ".";
export interface Event {
  eventId: number;
  interceptor: Omit<InterceptorType, "maxRange">;
  launcher: Pick<Launcher, "launcherId" | "launcherType" | "location">;
  region: string;
  time: string;
  eventLocation: Location;
  interceptionStatus: string;
  attackingBody: string;
  drone: Pick<DroneType, "type" | "price">;
  droneInjuryCount: number;
}
