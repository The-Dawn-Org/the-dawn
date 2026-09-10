import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { LinePlot, LineHighlightPlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import type { DrownToInterceptorType } from "../types";
import { Box, Typography } from "@mui/material";
import { useAppFilters } from "../../../app/filters/AppFiltersContext";

interface DrownsToInterceptorProps {
  data: DrownToInterceptorType[];
}

const days = [
  "יום א׳",
  "יום ב׳",
  "יום ג׳",
  "יום ד׳",
  "יום ה׳",
  "יום ו׳",
  "שבת׳",
];

const CARD_BORDER = "#2c3a26";
const GOLD = "#e0b04a";
const RED = "#c0392b";
const TEXT_MUTED = "#8a9482";

const toDateKey = (date: Date | string | number): string =>
  new Date(date).toDateString();

const getDateRangeArray = (start: Date, end: Date): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0);

  const last = new Date(end);
  last.setHours(0, 0, 0, 0);

  while (current <= last) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const DrownsToInterceptor = ({ data }: DrownsToInterceptorProps) => {
  const { dateRange } = useAppFilters();

  const rangeDates = getDateRangeArray(
    new Date(dateRange.startDate),
    new Date(dateRange.endDate),
  );

  if (rangeDates.length === 0) {
    return (
      <Box className="economic-graph__empty">
        <Typography>לא נמצאו נתונים לטווח שנבחר</Typography>
      </Box>
    );
  }

  const dataByDate = new Map(
    data.map((item) => [toDateKey(item.date), item] as const),
  );

  const interceptCost = rangeDates.map(
    (date) => dataByDate.get(toDateKey(date))?.interceptorsTotalCost ?? 0,
  );
  const droneCost = rangeDates.map(
    (date) => dataByDate.get(toDateKey(date))?.dronesTotalCost ?? 0,
  );

  const maxCostToShow = Math.max(0, ...interceptCost, ...droneCost);
  const numberToDevide = 10 ** (maxCostToShow.toString().length - 1);
  const roundedMaxToShow =
    maxCostToShow === 0
      ? 1
      : Math.round(maxCostToShow / numberToDevide) * numberToDevide;

  return (
    <div className="drone-interceptor-chart" dir="rtl">
      <ChartsContainer
        height={320}
        margin={{ top: 24, right: 24, bottom: 32, left: 24 }}
        series={[
          {
            type: "line",
            data: interceptCost,
            yAxisId: "costAxis",
            color: GOLD,
            label: "עלות מיירט",
            curve: "linear",
            showMark: true,
            highlightScope: {
              highlight: "item",
            },
          },
          {
            type: "line",
            data: droneCost,
            yAxisId: "countAxis",
            color: RED,
            label: "עלות רחפן",
            curve: "linear",
            showMark: true,
            highlightScope: {
              highlight: "item",
            },
          },
        ]}
        xAxis={[
          {
            id: "days",

            data: rangeDates,
            valueFormatter: (date: Date) => days[date.getDay()],
            scaleType: "band",
            categoryGapRatio: 0.72,
            position: "bottom",
            height: 40,
            tickLabelStyle: {
              fill: TEXT_MUTED,
              fontSize: 12,
            },
          },
        ]}
        yAxis={[
          {
            id: "costAxis",
            position: "right",
            scaleType: "linear",
            min: 0,
            max: roundedMaxToShow,
            valueFormatter: (value) => `$${value / 1000}K`,
            tickLabelStyle: {
              fill: TEXT_MUTED,
              fontSize: 11,
            },
          },
          {
            id: "countAxis",
            position: "left",
            scaleType: "linear",
            min: 0,
            max: roundedMaxToShow,
            valueFormatter: (value) => `$${value / 1000}K`,
            tickLabelStyle: {
              fill: TEXT_MUTED,
              fontSize: 11,
            },
          },
        ]}
        sx={{
          ".MuiChartsAxis-line": {
            stroke: CARD_BORDER,
          },
          ".MuiChartsAxis-tick": {
            stroke: CARD_BORDER,
          },
          ".MuiChartsAxis-tickLabel": {
            fill: TEXT_MUTED,
            fontSize: 12,
          },
          ".MuiChartsGrid-line": {
            stroke: "#263a23",
            strokeDasharray: "3 4",
          },
          ".MuiChartsAxisHighlight-root": {
            stroke: "#ffffff",
            strokeWidth: 1,
          },
          ".MuiLineChart-mark[data-highlighted]": {
            stroke: "#ffffff",
            strokeWidth: 2,
          },
        }}
      >
        <ChartsGrid horizontal vertical={false} />

        <LinePlot />
        <LineHighlightPlot />
        <MarkPlot />

        <ChartsAxisHighlight x="line" y="none" />
        <ChartsXAxis axisId="days" />
        <ChartsYAxis axisId="countAxis" />
        <ChartsTooltip trigger="axis" />
      </ChartsContainer>

      <div className="drone-interceptor-chart__legend">
        <span>
          <span
            className="drone-interceptor-chart__legend-mark"
            style={{ background: GOLD }}
          />
          עלות מיירט (K$)
        </span>

        <span>
          <span
            className="drone-interceptor-chart__legend-mark drone-interceptor-chart__legend-mark--circle"
            style={{ background: RED }}
          />
          רחפנים מיורטים
        </span>
      </div>
    </div>
  );
};