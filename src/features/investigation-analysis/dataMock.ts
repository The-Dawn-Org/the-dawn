export const Sector = {
  GAZA: "gaza",
  LEBANON: "lebanon",
} as const;
export type Sector = (typeof Sector)[keyof typeof Sector];

export const LaunchingOrganization = {
  HEZBOLLAH: "hezbollah",
  HAMAS: "hamas",
} as const;
export type LaunchingOrganization =
  (typeof LaunchingOrganization)[keyof typeof LaunchingOrganization];

/** Where the event physically resolved: the drone was brought down, or it struck something */
export const EventLocationType = {
  FALL: "fall",
  INTERCEPT: "intercept",
} as const;
export type EventLocationType = (typeof EventLocationType)[keyof typeof EventLocationType];

export const EventStatus = {
  INTERCEPTED: "intercepted",
  FELL_IN_OPEN_FIELD: "fell_in_open_field",
  HIT_TARGET: "hit_target",
  IN_AIR: "in_air",
} as const;
export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

// --- Reference entities, mirroring the ERD (DRONE_TYPE, DRONE, LAUNCHER_TYPE, LAUNCHER, INTERCEPTOR_TYPE) ---

export interface DroneType {
  id: number;
  name: string;
}

export interface Drone {
  id: number;
  droneType: DroneType;
  heading: number;
  velocity: number;
}

export interface LauncherType {
  id: number;
  name: string;
  reloadTimeS: number;
}

export interface Launcher {
  id: number;
  launcherType: LauncherType;
  longitude: number;
  latitude: number;
  asl: number;
  agl: number;
  amount: number;
  active: boolean;
}

export interface InterceptorType {
  id: number;
  name: string;
  rangeM: number;
}

export const droneTypesMock: DroneType[] = [
  { id: 1, name: "Shahed-136" },
  { id: 2, name: "Zamzam-1" },
  { id: 3, name: "Ababil-2" },
  { id: 4, name: "Qasef-2K" },
];

export const launcherTypesMock: LauncherType[] = [
  { id: 1, name: "Fixed Rail Launcher", reloadTimeS: 45 },
  { id: 2, name: "Mobile Multi-Rail Launcher", reloadTimeS: 30 },
];

export const launchersMock: Launcher[] = [
  {
    id: 1,
    launcherType: launcherTypesMock[0],
    longitude: 34.465,
    latitude: 31.42,
    asl: 45,
    agl: 3,
    amount: 12,
    active: true,
  },
  {
    id: 2,
    launcherType: launcherTypesMock[1],
    longitude: 34.39,
    latitude: 31.47,
    asl: 60,
    agl: 3,
    amount: 8,
    active: true,
  },
  {
    id: 3,
    launcherType: launcherTypesMock[0],
    longitude: 34.51,
    latitude: 31.385,
    asl: 30,
    agl: 3,
    amount: 10,
    active: true,
  },
  {
    id: 4,
    launcherType: launcherTypesMock[1],
    longitude: 35.26,
    latitude: 33.11,
    asl: 520,
    agl: 4,
    amount: 14,
    active: true,
  },
  {
    id: 5,
    launcherType: launcherTypesMock[0],
    longitude: 35.43,
    latitude: 33.22,
    asl: 610,
    agl: 4,
    amount: 9,
    active: true,
  },
];

export const interceptorTypesMock: InterceptorType[] = [
  { id: 1, name: "Tamir", rangeM: 70000 },
  { id: 2, name: "Stunner", rangeM: 300000 },
  { id: 3, name: "Iron Beam", rangeM: 10000 },
  { id: 4, name: "Barak-8", rangeM: 150000 },
  { id: 5, name: "C-Dome", rangeM: 70000 },
];

export const dronesMock: Drone[] = [
  { id: 1, droneType: droneTypesMock[0], heading: 0, velocity: 22 },
  { id: 2, droneType: droneTypesMock[1], heading: 37, velocity: 25 },
  { id: 3, droneType: droneTypesMock[2], heading: 74, velocity: 28 },
  { id: 4, droneType: droneTypesMock[3], heading: 111, velocity: 31 },
  { id: 5, droneType: droneTypesMock[0], heading: 148, velocity: 34 },
  { id: 6, droneType: droneTypesMock[1], heading: 185, velocity: 37 },
  { id: 7, droneType: droneTypesMock[2], heading: 222, velocity: 40 },
  { id: 8, droneType: droneTypesMock[3], heading: 259, velocity: 23 },
  { id: 9, droneType: droneTypesMock[0], heading: 296, velocity: 26 },
  { id: 10, droneType: droneTypesMock[1], heading: 333, velocity: 29 },
  { id: 11, droneType: droneTypesMock[2], heading: 10, velocity: 32 },
  { id: 12, droneType: droneTypesMock[3], heading: 47, velocity: 35 },
  { id: 13, droneType: droneTypesMock[0], heading: 84, velocity: 38 },
  { id: 14, droneType: droneTypesMock[1], heading: 121, velocity: 41 },
  { id: 15, droneType: droneTypesMock[2], heading: 158, velocity: 24 },
  { id: 16, droneType: droneTypesMock[3], heading: 195, velocity: 27 },
  { id: 17, droneType: droneTypesMock[0], heading: 232, velocity: 30 },
  { id: 18, droneType: droneTypesMock[1], heading: 269, velocity: 33 },
  { id: 19, droneType: droneTypesMock[2], heading: 306, velocity: 36 },
  { id: 20, droneType: droneTypesMock[3], heading: 343, velocity: 39 },
];

export interface DroneEvent {
  id: string;

  drone: Drone;

  /** The ERD has no per-unit interceptor table; this is the interceptor model that responded */
  interceptor: InterceptorType;

  launcher: Launcher;

  /** Unix timestamp (seconds since epoch) */
  occurredAt: number;

  eventLocationType: EventLocationType;
  sector: Sector;
  launchingOrganization: LaunchingOrganization;

  /** Estimated damage caused by the drone, in ILS */
  damageCostIls: number;

  /** Number of casualties; 0 when none (internally estimated, not sourced) */
  casualtyCount: number;

  status: EventStatus;
}

export const droneEventsMock: DroneEvent[] = [
  {
    id: "d90fb2ec-5c13-4c25-85fe-73194a9160ba",
    drone: dronesMock[0],
    interceptor: interceptorTypesMock[0],
    launcher: launchersMock[0],
    occurredAt: 1735938840,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "98714be0-082a-4e74-9f7a-21e844df8e64",
    drone: dronesMock[1],
    interceptor: interceptorTypesMock[4],
    launcher: launchersMock[3],
    occurredAt: 1736051520,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 12000,
    casualtyCount: 0,
    status: EventStatus.FELL_IN_OPEN_FIELD,
  },
  {
    id: "f35a6566-999d-40a0-97e0-f38560ab5852",
    drone: dronesMock[2],
    interceptor: interceptorTypesMock[1],
    launcher: launchersMock[1],
    occurredAt: 1736344020,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 450000,
    casualtyCount: 2,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "176d6e88-a6e9-440d-be3c-4bc925df7f0b",
    drone: dronesMock[3],
    interceptor: interceptorTypesMock[0],
    launcher: launchersMock[4],
    occurredAt: 1736561100,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "e9333fdf-81d0-48be-9f04-034f78d2e7a2",
    drone: dronesMock[4],
    interceptor: interceptorTypesMock[2],
    launcher: launchersMock[2],
    occurredAt: 1736884680,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.IN_AIR,
  },
  {
    id: "aef6c2d0-f915-44b9-8894-fb55f65658f0",
    drone: dronesMock[5],
    interceptor: interceptorTypesMock[3],
    launcher: launchersMock[3],
    occurredAt: 1737105660,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 1250000,
    casualtyCount: 1,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "8e6af4ba-656c-4c8b-9763-ad5d6cc9281a",
    drone: dronesMock[6],
    interceptor: interceptorTypesMock[1],
    launcher: launchersMock[0],
    occurredAt: 1737412800,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "2ef681f5-c2b1-4c3f-8de2-b3dc01cd53e3",
    drone: dronesMock[7],
    interceptor: interceptorTypesMock[4],
    launcher: launchersMock[4],
    occurredAt: 1737612720,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.FELL_IN_OPEN_FIELD,
  },
  {
    id: "9d7c3428-3d54-439b-baba-f8c0369d4ae1",
    drone: dronesMock[8],
    interceptor: interceptorTypesMock[0],
    launcher: launchersMock[1],
    occurredAt: 1737905580,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 89000,
    casualtyCount: 0,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "087cf575-bd9d-48f1-bb68-9bdfc2b01b03",
    drone: dronesMock[9],
    interceptor: interceptorTypesMock[2],
    launcher: launchersMock[3],
    occurredAt: 1738191900,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "fa4d55ab-5a38-4380-961c-526529879223",
    drone: dronesMock[10],
    interceptor: interceptorTypesMock[3],
    launcher: launchersMock[2],
    occurredAt: 1738408620,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.FELL_IN_OPEN_FIELD,
  },
  {
    id: "6a41e48f-58e8-45b6-a9ea-7411dc92fcd1",
    drone: dronesMock[11],
    interceptor: interceptorTypesMock[1],
    launcher: launchersMock[4],
    occurredAt: 1738640940,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 620000,
    casualtyCount: 3,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "d0355509-3e22-4dc6-bbe6-3d523de81e06",
    drone: dronesMock[12],
    interceptor: interceptorTypesMock[0],
    launcher: launchersMock[0],
    occurredAt: 1738873560,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "1f83f65a-4576-4ae7-b1d0-e1ec85636745",
    drone: dronesMock[13],
    interceptor: interceptorTypesMock[4],
    launcher: launchersMock[3],
    occurredAt: 1739088180,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.IN_AIR,
  },
  {
    id: "08cbe72c-d4e3-4798-b7b0-7ef72d305524",
    drone: dronesMock[14],
    interceptor: interceptorTypesMock[2],
    launcher: launchersMock[1],
    occurredAt: 1739382900,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 34000,
    casualtyCount: 0,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "f6f18c49-413a-4026-b80d-fb5b9a53f177",
    drone: dronesMock[15],
    interceptor: interceptorTypesMock[3],
    launcher: launchersMock[4],
    occurredAt: 1739580060,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "0188a32a-6b59-4a14-8943-83baf9c90caa",
    drone: dronesMock[16],
    interceptor: interceptorTypesMock[1],
    launcher: launchersMock[2],
    occurredAt: 1739881740,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.FELL_IN_OPEN_FIELD,
  },
  {
    id: "cfe665b9-2a4b-4e8d-99e2-af3e28d402c4",
    drone: dronesMock[17],
    interceptor: interceptorTypesMock[0],
    launcher: launchersMock[3],
    occurredAt: 1740114960,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 980000,
    casualtyCount: 1,
    status: EventStatus.HIT_TARGET,
  },
  {
    id: "b7de64e0-acbd-4210-9f60-400f774041f9",
    drone: dronesMock[18],
    interceptor: interceptorTypesMock[2],
    launcher: launchersMock[0],
    occurredAt: 1740422280,
    eventLocationType: EventLocationType.INTERCEPT,
    sector: Sector.GAZA,
    launchingOrganization: LaunchingOrganization.HAMAS,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.INTERCEPTED,
  },
  {
    id: "ce37d17d-51c7-4277-b066-71506ee253cc",
    drone: dronesMock[19],
    interceptor: interceptorTypesMock[4],
    launcher: launchersMock[4],
    occurredAt: 1740653520,
    eventLocationType: EventLocationType.FALL,
    sector: Sector.LEBANON,
    launchingOrganization: LaunchingOrganization.HEZBOLLAH,
    damageCostIls: 0,
    casualtyCount: 0,
    status: EventStatus.FELL_IN_OPEN_FIELD,
  },
];
