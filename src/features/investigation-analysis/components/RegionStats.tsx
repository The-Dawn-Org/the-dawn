import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type RegionStatsRowProps = {
  region: string;
  intercepted: number;
  missed: number;
  casualties: number;
  damageK: number;
  eventCount: number;
};

const COLOR_INTERCEPTED = "#8cb85c";
const COLOR_REGION_DOT = "#d4a574";

type Rgb = readonly [number, number, number];

const SEVERITY_LOW: Rgb = [140, 184, 92];
const SEVERITY_MID: Rgb = [213, 166, 47];
const SEVERITY_HIGH: Rgb = [192, 57, 43];


const CASUALTY_SEVERITY_CEILING = 10;
const DAMAGE_SEVERITY_CEILING_K = 5000;

const FULL_BAR_PERCENT = 100;

const toRgb = (color: Rgb) => `rgb(${color.join(", ")})`;

const mixChannel = (from: number, to: number, ratio: number) =>
  Math.round(from + (to - from) * ratio);

const mixColors = (from: Rgb, to: Rgb, ratio: number) =>
  toRgb([
    mixChannel(from[0], to[0], ratio),
    mixChannel(from[1], to[1], ratio),
    mixChannel(from[2], to[2], ratio),
  ]);

const severityRatio = (value: number, ceiling: number) =>
  ceiling > 0 ? Math.min(Math.max(value / ceiling, 0), 1) : 0;

/** Damage climbs green through yellow to red across its ceiling. */
const damageColor = (damageK: number) => {
  const ratio = severityRatio(damageK, DAMAGE_SEVERITY_CEILING_K);

  return ratio <= 0.5
    ? mixColors(SEVERITY_LOW, SEVERITY_MID, ratio * 2)
    : mixColors(SEVERITY_MID, SEVERITY_HIGH, (ratio - 0.5) * 2);
};

/** Green is reserved for a region with no casualties, so one already reads as a warning. */
const casualtyColor = (casualties: number) =>
  casualties <= 0
    ? toRgb(SEVERITY_LOW)
    : mixColors(SEVERITY_MID, SEVERITY_HIGH, severityRatio(casualties, CASUALTY_SEVERITY_CEILING));

type MetricBarProps = {
  label: string;
  valueLabel: string;
  value: number;
  max: number;
  fillPercent: number;
  color: string;
};

const MetricBar = ({ label, valueLabel, value, max, fillPercent, color }: MetricBarProps) => {
  const percent = Math.min(Math.max(fillPercent, 0), 100);

  return (
    <Box sx={{ flex: 1, minWidth: 120 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 1,
          mb: 0.5,
        }}
      >
        <Typography sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.55)" }}>{label}</Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color }}>{valueLabel}</Typography>
      </Box>
      <Box
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={valueLabel}
        sx={{
          height: 10,
          borderRadius: 5,
          bgcolor: "rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${percent}%`,
            height: "100%",
            borderRadius: 5,
            bgcolor: color,
            transition: "width 200ms ease, background-color 200ms ease",
          }}
        />
      </Box>
    </Box>
  );
};

export const RegionStatsRow = ({
  region,
  intercepted,
  missed,
  casualties,
  damageK,
  eventCount,
}: RegionStatsRowProps) => {
  const total = intercepted + missed;
  const accuracy = total > 0 ? (intercepted / total) * 100 : 0;

  return (
    <Box
      dir="rtl"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        width: "100%",
        px: 2.5,
        py: 1.75,
        borderRadius: 1.5,
        bgcolor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.06)",
        },
      }}
    >
      {/* Region name with dot (far right) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          minWidth: 120,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: COLOR_REGION_DOT,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.92)",
          }}
        >
          {region}
        </Typography>
      </Box>

      <MetricBar
        label="יורט"
        valueLabel={total > 0 ? `${accuracy.toFixed(1)}%` : "—"}
        value={accuracy}
        max={100}
        fillPercent={accuracy}
        color={COLOR_INTERCEPTED}
      />

      <MetricBar
        label="נפגעים"
        valueLabel={casualties.toLocaleString("he-IL")}
        value={casualties}
        max={CASUALTY_SEVERITY_CEILING}
        fillPercent={FULL_BAR_PERCENT}
        color={casualtyColor(casualties)}
      />

      <MetricBar
        label="נזק"
        valueLabel={`${damageK.toLocaleString("he-IL")}K ₪`}
        value={damageK}
        max={DAMAGE_SEVERITY_CEILING_K}
        fillPercent={FULL_BAR_PERCENT}
        color={damageColor(damageK)}
      />

      {/* Event count (far left) */}
      {eventCount !== undefined && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 64,
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.92)",
              lineHeight: 1.2,
            }}
          >
            {eventCount.toLocaleString("he-IL")}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.55)" }}>אירועים</Typography>
        </Box>
      )}
    </Box>
  );
};
