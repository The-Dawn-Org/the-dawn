/**
 * Shared chart tokens for the investigation analysis screens.
 * Both hues were validated for lightness, chroma, colour-vision separation and
 * contrast against the dark card surface.
 */
export const CHART_COLORS = {
  events: "#b8881f",
  casualties: "#2f9fc4",
} as const;

export const CHART_HEIGHT = 320;

export const AXIS_LABEL_COLOR = "#91a0b4";

export const CATEGORY_TICK_STYLE = {
  fill: AXIS_LABEL_COLOR,
  fontSize: 13,
} as const;

export const VALUE_TICK_STYLE = {
  fill: AXIS_LABEL_COLOR,
  fontSize: 12,
} as const;

export const NUMBER_FORMATTER = new Intl.NumberFormat("he-IL");
