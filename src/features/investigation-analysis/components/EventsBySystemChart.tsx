import { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { countEventsBySystem } from "../data/droneEvents";
import { ChartCard } from "./ChartCard";
import {
  CATEGORY_AXIS_HEIGHT,
  CATEGORY_TICK_STYLE,
  CHART_COLORS,
  CHART_HEIGHT,
  NUMBER_FORMATTER,
  SHOW_EVERY_CATEGORY_TICK,
  VALUE_TICK_STYLE,
} from "./chartTheme";
import type { DroneEvent } from "../dataMock";

export type EventsBySystemChartProps = {
  events: DroneEvent[];
};

export const EventsBySystemChart = ({ events }: EventsBySystemChartProps) => {
  const eventsBySystem = useMemo(() => countEventsBySystem(events), [events]);

  return (
    <ChartCard
      title="סך האירועים בכל מערכת"
      subtitle={`${NUMBER_FORMATTER.format(
        events.length
      )} אירועים בטווח הזמן הנבחר`}
    >
      <BarChart
        dataset={eventsBySystem}
        height={CHART_HEIGHT}
        hideLegend
        borderRadius={4}
        grid={{ horizontal: true }}
        margin={{ top: 24, right: 8, bottom: 8, left: 8 }}
        series={[
          {
            dataKey: "total",
            label: "אירועים",
            color: CHART_COLORS.events,
            barLabel: "value",
            barLabelPlacement: "outside",
            valueFormatter: (value) =>
              `${NUMBER_FORMATTER.format(value ?? 0)} אירועים`,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "category",
            height: CATEGORY_AXIS_HEIGHT,
            tickLabelInterval: SHOW_EVERY_CATEGORY_TICK,
            reverse: true,
            categoryGapRatio: 0.65,
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: CATEGORY_TICK_STYLE,
          },
        ]}
        yAxis={[
          {
            position: "right",
            width: 48,
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: VALUE_TICK_STYLE,
          },
        ]}
      />
    </ChartCard>
  );
};
