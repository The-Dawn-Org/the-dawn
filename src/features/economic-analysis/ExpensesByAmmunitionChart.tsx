import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import type { CostBySystemItem } from "./economicAnalysis.types";

interface ExpensesByAmmunitionChartProps {
  data: CostBySystemItem[];
}

const currencyFormatter = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const axisValueFormatter = (value: number) =>
  value === 0 ? "$0K" : `$${Math.round(value / 1_000)}K`;

const BAR_COLORS = ["#6ca847", "#b0a260", "#d5a62f", "#82aa72"];

export const ExpensesByAmmunitionChart = ({
  data,
}: ExpensesByAmmunitionChartProps) => {
  if (data.length === 0) {
    return (
      <Box className="economic-graph__empty">
        <Typography>לא נמצאו נתונים לטווח שנבחר</Typography>
      </Box>
    );
  }

  return (
    <Box className="expenses-chart">
      <BarChart
      height={320}
      margin={{ top: 22, right: 18, bottom: 18, left: 100 }}
      xAxis={[
        {
          scaleType: "band",
          data: data.map(({ system }) => system),
          categoryGapRatio: 0.72,
          valueFormatter: (value) => String(value),
          tickLabelStyle: { fill: "#9ca994", fontSize: 13 },
        },
      ]}
      yAxis={[
        {
          min: 0,
          width: 82,
          valueFormatter: axisValueFormatter,
          tickLabelStyle: { fill: "#87947e", fontSize: 12 },
        },
      ]}
      series={[
        {
          data: data.map(({ cost }) => cost),
          label: "הוצאה",
          color: BAR_COLORS[0],
          colorGetter: ({ dataIndex }) =>
            BAR_COLORS[dataIndex % BAR_COLORS.length],
          valueFormatter: (value) =>
            value === null ? "" : currencyFormatter.format(value),
        },
      ]}
      hideLegend
      slotProps={{ tooltip: { trigger: "axis" } }}
      sx={{
        "& .MuiChartsAxis-line": { stroke: "#3f5435" },
        "& .MuiChartsAxis-tick": { stroke: "#3f5435" },
        "& .MuiChartsGrid-line": {
          stroke: "#263a23",
          strokeDasharray: "3 4",
        },
        "& .MuiBarElement-root": { rx: 3 },
      }}
      grid={{ horizontal: true }}
      />
      <Box
        aria-label="שמות המערכות"
        className="expenses-chart__labels"
        sx={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}
      >
        {data.map(({ system }) => (
          <Typography key={system} component="span">
            {system}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
