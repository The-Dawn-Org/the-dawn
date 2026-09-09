import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type RegionStatsRowProps = {
  /** Region name, e.g. "צפון" */
  region: string;
  /** Number of successful interceptions */
  intercepted: number;
  /** Number of missed/leakers */
  missed: number;
  /** Civilian casualties */
  casualties: number;
  /** Damage cost in thousands, e.g. 1971 for 1,971K */
  damageK: number;
  /** Number of events recorded in the region */
  eventCount?: number;
  /** Placeholder scale for the casualties bar until a real one is defined */
  maxCasualties?: number;
  /** Placeholder scale for the damage bar until a real one is defined */
  maxDamageK?: number;
};

const COLOR_INTERCEPTED = "#8cb85c";
const COLOR_CASUALTIES = "#c0392b";
const COLOR_DAMAGE = "#d4a574";

const DEFAULT_MAX_CASUALTIES = 50;
const DEFAULT_MAX_DAMAGE_K = 5000;

type MetricBarProps = {
  label: string;
  valueLabel: string;
  value: number;
  max: number;
  color: string;
};

const MetricBar = ({ label, valueLabel, value, max, color }: MetricBarProps) => {
  const percent = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

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
        <Typography
          sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.55)" }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color }}>
          {valueLabel}
        </Typography>
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
            transition: "width 200ms ease",
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
  maxCasualties = DEFAULT_MAX_CASUALTIES,
  maxDamageK = DEFAULT_MAX_DAMAGE_K,
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
            bgcolor: COLOR_DAMAGE,
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
        color={COLOR_INTERCEPTED}
      />

      <MetricBar
        label="נפגעים"
        valueLabel={casualties.toLocaleString("he-IL")}
        value={casualties}
        max={maxCasualties}
        color={COLOR_CASUALTIES}
      />

      <MetricBar
        label="נזק"
        valueLabel={`${damageK.toLocaleString("he-IL")}K ₪`}
        value={damageK}
        max={maxDamageK}
        color={COLOR_DAMAGE}
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
          <Typography
            sx={{ fontSize: 11, color: "rgba(255, 255, 255, 0.55)" }}
          >
            אירועים
          </Typography>
        </Box>
      )}
    </Box>
  );
};
