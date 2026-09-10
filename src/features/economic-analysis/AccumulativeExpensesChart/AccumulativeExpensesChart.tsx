import { Box, Typography } from "@mui/material";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import {
  LineHighlightPlot,
  LinePlot,
  MarkPlot,
} from "@mui/x-charts/LineChart";
import type { AccumulativeExpensePoint } from "../types";

interface AccumulativeExpensesChartProps {
  data: AccumulativeExpensePoint[];
}

const AXIS_TEXT = "#8a9482";
const GRID_LINE = "#263a23";
const AXIS_LINE = "#3f5435";
const ACTUAL_EXPENSE_COLOR = "#8bae5a";

const dateFormatter = new Intl.DateTimeFormat("he-IL", {
  day: "numeric",
  month: "short",
});

const formatDateLabel = (date: string) => {
  const calendarDate = date.slice(0, 10);
  return dateFormatter.format(new Date(`${calendarDate}T00:00:00`));
};

const axisValueFormatter = (value: number) =>
  value === 0 ? "$0M" : `$${(value / 1_000_000).toFixed(1)}M`;

const tooltipValueFormatter = (value: number | null) =>
  value === null ? "" : `$${value.toLocaleString("en-US")}`;

export const AccumulativeExpensesChart = ({
  data,
}: AccumulativeExpensesChartProps) => {
  if (data.length === 0) {
    return (
      <Box className="economic-graph__empty">
        <Typography>לא נמצאו נתונים לטווח שנבחר</Typography>
      </Box>
    );
  }

  const labels = data.map(({ date }) => formatDateLabel(date));
  let runningTotal = 0;
  const values = data.map(({ number }) => {
    runningTotal += number;
    return runningTotal;
  });
  const maxValue = Math.max(...values);
  const yAxisMax = Math.max(1_000_000, Math.ceil(maxValue / 1_000_000) * 1_000_000);

  return (
    <Box className="accumulative-expenses-chart">
      <ChartsContainer
        height={320}
        series={[
          {
            type: "line",
            id: "accumulative-expenses",
            data: values,
            label: "הוצאה בפועל",
            color: ACTUAL_EXPENSE_COLOR,
            curve: "linear",
            showMark: true,
            valueFormatter: tooltipValueFormatter,
          },
        ]}
        xAxis={[
          {
            id: "dates",
            data: labels,
            scaleType: "band",
            position: "bottom",
            height: 34,
            tickLabelStyle: {
              fill: AXIS_TEXT,
              fontSize: 12,
            },
          },
        ]}
        yAxis={[
          {
            id: "accumulative-expenses-axis",
            min: 0,
            max: yAxisMax,
            valueFormatter: axisValueFormatter,
            width: 64,
            tickLabelStyle: {
              fill: AXIS_TEXT,
              fontSize: 11,
            },
          },
        ]}
        margin={{ top: 20, right: 20, bottom: 20, left: 10 }}
        sx={{
          ".MuiChartsAxis-line": { stroke: AXIS_LINE },
          ".MuiChartsAxis-tick": { stroke: AXIS_LINE },
          ".MuiChartsGrid-line": {
            stroke: GRID_LINE,
            strokeDasharray: "3 4",
          },
          ".MuiLineElement-root": { strokeWidth: 2 },
          ".MuiMarkElement-root": {
            stroke: ACTUAL_EXPENSE_COLOR,
            fill: "#121d13",
            strokeWidth: 2,
          },
        }}
      >
        <ChartsGrid horizontal vertical={false} />
        <LinePlot />
        <LineHighlightPlot />
        <MarkPlot />
        <ChartsAxisHighlight x="line" y="none" />
        <ChartsXAxis axisId="dates" />
        <ChartsYAxis axisId="accumulative-expenses-axis" />
        <ChartsTooltip trigger="axis" />
      </ChartsContainer>
      <Box className="accumulative-expenses-chart__legend">
        <Box component="span">
          <Box
            component="span"
            className="accumulative-expenses-chart__legend-mark"
          />
          הוצאה בפועל
        </Box>
      </Box>
    </Box>
  );
};
