import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { EconomicDamageItem } from "../types";

interface EconomicDamageChartProps {
  data: EconomicDamageItem[];
}

const currencyFormatter = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const axisValueFormatter = (value: number) =>
  value === 0 ? "$0K" : `$${Math.round(value / 1_000)}K`;

const TICK_STEP = 600_000;
const HIGH_THRESHOLD = 5_000_000;
const MID_THRESHOLD = 1_000_000;

export const EconomicDamageChart = ({ data }: EconomicDamageChartProps) => {
  const theme = useTheme();

  const getBarColor = (damage: number) => {
    if (damage >= HIGH_THRESHOLD) return theme.palette.kpi.red;
    if (damage >= MID_THRESHOLD) return theme.palette.kpi.gold;
    return theme.palette.kpi.darkGreen;
  };

  const maxDamage =
    data.length > 0 ? Math.max(...data.map(({ totalDamage }) => totalDamage)) : 0;

  const tickCount = Math.ceil(maxDamage / TICK_STEP) + 1;
  const ticks = Array.from({ length: tickCount }, (_, i) => i * TICK_STEP);
  const axisMax = ticks[ticks.length - 1];

  return data.length === 0 ? (
    <Box className="economic-graph__empty">
      <Typography>לא נמצאו נתונים לטווח שנבחר</Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
      dir="rtl"
    >
      <BarChart
        height={320}
        layout="horizontal"
        margin={{ top: 22, right: 18, bottom: 18, left: 140 }}
        yAxis={[
          {
            scaleType: "band",
            categoryGapRatio: 0.72,
            width: 130,
            data: data.map(({ sectorName }) => sectorName),
            tickLabelStyle: {
              fill: "#9ca994",
              fontSize: 12,
            },
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: axisMax,
            tickInterval: ticks,
            valueFormatter: axisValueFormatter,
            tickLabelStyle: {
              display: "flex",
              fontSize: 12,
              fill: "#9ca994",
              color: "#9ca994"
            },
          },
        ]}
        series={[
          {
            data: data.map(({ totalDamage }) => totalDamage),
            label: "נזק כספי",
            colorGetter: ({ dataIndex }) =>
              getBarColor(data[dataIndex].totalDamage),
            valueFormatter: (value) =>
              value === null ? "" : currencyFormatter.format(value),
          },
        ]}
        hideLegend
        slotProps={{ tooltip: { trigger: "axis" } }}
        sx={{
          "& .MuiChartsAxis-line": {
            stroke: theme.palette.divider,
          },
          "& .MuiChartsAxis-tick": {
            stroke: theme.palette.divider,
          },
          "& .MuiChartsGrid-line": {
            stroke: "#263a23",
            strokeDasharray: "3 4",
          },
          "& .MuiBarElement-root": {
            rx: 3,
          },
        }}
        grid={{ vertical: true }}
      />
    </Box>
  );
};