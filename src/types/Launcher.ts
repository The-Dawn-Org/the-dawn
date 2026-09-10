import type { Location, LauncherType } from ".";

export interface Launcher {
  launcherId: number;
  launcherType: LauncherType;
  location: Location;
  asl: number;
  agl: number;
  amount: number;
  launcherName: string;
  active: boolean;
}
