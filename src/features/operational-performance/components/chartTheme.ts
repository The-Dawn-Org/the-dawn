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

/**
 * A band axis is 25px tall by default, and MUI spends the tick size and the
 * tick gap out of that before it measures the text. The 18px left over is
 * shorter than a 13px Hebrew line, so `shortenLabels` ellipsised every name
 * down to an empty string and the axis came out blank. This leaves room for
 * the label to render at full length.
 */
export const CATEGORY_AXIS_HEIGHT = 40;

/**
 * A band axis also defaults to `tickLabelInterval: "auto"`, which drops any
 * label that would collide with its neighbour. Every column has to carry its
 * name, so both charts opt out of that.
 */
export const SHOW_EVERY_CATEGORY_TICK = () => true;
