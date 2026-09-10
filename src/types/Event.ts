import type { DroneType, InterceptorType, Launcher, Location } from ".";
import type { interceptionStatus } from "./InterceptionStatus";
import type { AttackingBody } from "./AttackingBody";
import type { Region } from "./Region";

export interface Event {
  eventId: number;
  interceptor: Omit<InterceptorType, "maxRange">;
  launcher: Pick<Launcher, "launcherId" | "location">;
  region: Region;
  time: string;
  eventLocation: Location;
  interceptionStatus: interceptionStatus;
  eventStatus: string;
  attackingBody: AttackingBody;
  drone: Pick<DroneType, "type" | "price">;
  droneInjuryCount: number;
}
