import type { Location, Drone } from ".";

export interface DronePosition {
  dronePositionId: number;
  drone: Drone;
  location: Location;
  asl: number;
  agl: number;
}
