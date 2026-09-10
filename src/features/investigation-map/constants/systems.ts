/**
 * Interception systems ("מערכות").
 *
 * The dropdown shows the Hebrew label, but every filter/query uses the English
 * value so the client stays in sync with what the API expects.
 *
 * NOTE: a plain `enum` can't be used here because the project enables
 * `erasableSyntaxOnly`, so this is the equivalent erasable const-object pattern.
 */
export const SystemName = {
  BuzzStop15: "BuzzStop-15",
  NetWing30: "NetWing-30",
  DartFoxS: "DartFox-S",
  SpearMini70: "SpearMini-70",
  SkyLanceM: "SkyLance-M",
  FalconClipH: "FalconClip-H",
  SwarmMist5: "SwarmMist-5",
  MicroNetR: "MicroNet-R",
} as const;

export type SystemName = (typeof SystemName)[keyof typeof SystemName];

/** English value (sent to the API) -> Hebrew label (shown in the dropdown). */
export const SYSTEM_LABELS: Record<SystemName, string> = {
  [SystemName.BuzzStop15]: "זמזם-15",
  [SystemName.NetWing30]: "כנף-רשת-30",
  [SystemName.DartFoxS]: "שועל-חץ",
  [SystemName.SpearMini70]: "כידון-מיני-70",
  [SystemName.SkyLanceM]: "רומח-שמיים",
  [SystemName.FalconClipH]: "בז-נחיל",
  [SystemName.SwarmMist5]: "ערפל-נחיל-5",
  [SystemName.MicroNetR]: "מיקרו-רשת",
};

export interface FilterOption {
  /** Value used for filtering / sent to the API. */
  value: string;
  /** Text shown to the user. */
  label: string;
}

export const SYSTEM_OPTIONS: FilterOption[] = Object.values(SystemName).map(
  (value) => ({ value, label: SYSTEM_LABELS[value] }),
);
