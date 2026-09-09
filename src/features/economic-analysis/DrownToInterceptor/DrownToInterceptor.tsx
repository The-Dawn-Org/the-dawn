import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, LineHighlightPlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsAxisHighlight } from "@mui/x-charts/ChartsAxisHighlight";
import type { DrownToInterceptorType } from "../economicAnalysis.types";
import { Box, Typography } from "@mui/material";

interface DrownsToInterceptorProps {
  data: DrownToInterceptorType[]
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

export const DrownsToInterceptor = (
  {
    data,
  }: DrownsToInterceptorProps
) => {
  if (data.length === 0) {
    return (
      <Box className="economic-graph__empty">
        <Typography>לא נמצאו נתונים לטווח שנבחר</Typography>
      </Box>
    );
  }

  const droneCost = data.map(({ dronesTotalCost }) => dronesTotalCost);
  const interceptCost = data.map(({ interceptorsTotalCost }) => interceptorsTotalCost);

  console.log(data);

  const dayLabels = data.map(({ date }) => days[new Date(date).getDay()]);

  return (
    <div className="drone-interceptor-chart" dir="rtl">
      <ChartsContainer
        height={320}
        series={[
          {
            type: "line",
            data: droneCost,
            yAxisId: "costAxis",
            color: GOLD,
            label: "עלות מיירט (K$)",
            curve: "linear",
            showMark: true,

            highlightScope: {
              highlight: "item",
            },
          },
          {
            type: "line",
            data: interceptCost,
            yAxisId: "countAxis",
            color: RED,
            label: "רחפנים מיורטים",
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
            data: dayLabels,
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
            max: 1000000,
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
            max: 1000000,
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
          ".MuiBarElement-root": {
            rx: 4,
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

        <BarPlot />
        <LinePlot />
        <LineHighlightPlot />
        <MarkPlot />

        <ChartsAxisHighlight x="line" y="none" />
        <ChartsXAxis axisId="days" />
        <ChartsYAxis axisId="costAxis" />
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
