import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import type { DorwnToExpens } from "../economicAnalysis.types";

const days = ["יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת׳"];

const data: DorwnToExpens[] = [
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 7),
    droneIntercepted: 17,
    totalCost: 25000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 6),
    droneIntercepted: 25,
    totalCost: 47000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 5),
    droneIntercepted: 31,
    totalCost: 43000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 4),
    droneIntercepted: 27,
    totalCost: 63000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 3),
    droneIntercepted: 21,
    totalCost: 29000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60 * 2),
    droneIntercepted: 21,
    totalCost: 40000,
  },
  {
    date: new Date(new Date().getTime() - 1000 * 60),
    droneIntercepted: 0,
    totalCost: 0,
  },
];

const BG = "#1b2417";
const CARD_BORDER = "#2c3a26";
const GOLD = "#e0b04a";
const RED = "#c0392b";
const TEXT_MUTED = "#8a9482";

export const DroneDashboardChart = () => {
  const costs = data.map(({ totalCost }) => totalCost);
  const intercepted = data.map(({ droneIntercepted }) => droneIntercepted);

  return (
    <div className="drone-interceptor-chart" dir="rtl">
      <ChartsContainer
        height={320}
        series={[
          {
            type: "bar",
            data: costs,
            yAxisId: "costAxis",
            color: GOLD,
            label: "עלות מיירט (K$)",
          },
          {
            type: "line",
            data: intercepted,
            yAxisId: "countAxis",
            color: RED,
            label: "רחפנים מיורטים",
            curve: "linear",
            showMark: true,
          },
        ]}
        xAxis={[
          {
            id: "days",
            scaleType: "band",
            data: data.map((_, index) => days[index]),
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 12 },
          },
        ]}
        yAxis={[
          {
            id: "costAxis",
            position: "right",
            scaleType: "linear",
            min: 0,
            max: 80000,
            valueFormatter: (value) => `$${value / 1000}K`,
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 11 },
          },
          {
            id: "countAxis",
            position: "left",
            scaleType: "linear",
            min: 0,
            max: 32,
            tickLabelStyle: { fill: TEXT_MUTED, fontSize: 11 },
          },
        ]}
        sx={{
          ".MuiChartsAxis-line": { stroke: CARD_BORDER },
          ".MuiChartsAxis-tick": { stroke: CARD_BORDER },
          ".MuiChartsGrid-line": {
            stroke: "#263a23",
            strokeDasharray: "3 4",
          },
          ".MuiBarElement-root": { rx: 4 },
        }}
      >
        <ChartsGrid horizontal vertical={false} />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis axisId="days" />
        <ChartsYAxis axisId="costAxis" />
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
