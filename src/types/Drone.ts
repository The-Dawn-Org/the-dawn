import type { DroneType } from ".";

export interface Drone {
  droneId: number;
  droneType: DroneType;
  heading: number;
  velocity: number;
}
