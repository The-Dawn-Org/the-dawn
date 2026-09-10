import type { InterceptorType, Launcher } from ".";

export interface LauncherAmmunition {
  launcher: Launcher;
  interceptorType: InterceptorType;
  quantity: number;
}
