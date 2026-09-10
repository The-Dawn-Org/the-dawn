import { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { sumCasualtiesBySector } from "../data/droneEvents";
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

export type CasualtiesBySectorChartProps = {
  events: DroneEvent[];
};

export const CasualtiesBySectorChart = ({
  events,
}: CasualtiesBySectorChartProps) => {
  const casualtiesBySector = useMemo(
    () => sumCasualtiesBySector(events),
    [events]
  );

  const totalCasualties = casualtiesBySector.reduce(
    (total, sector) => total + sector.total,
    0
  );

  return (
    <ChartCard
      title="נפגעים לפי גזרה"
      subtitle={`${NUMBER_FORMATTER.format(
        totalCasualties
      )} נפגעים בטווח הזמן הנבחר`}
    >
      <BarChart
        dataset={casualtiesBySector}
        height={CHART_HEIGHT}
        hideLegend
        borderRadius={4}
        grid={{ horizontal: true }}
        margin={{ top: 24, right: 8, bottom: 8, left: 8 }}
        series={[
          {
            dataKey: "total",
            label: "נפגעים",
            color: CHART_COLORS.casualties,
            barLabel: "value",
            barLabelPlacement: "outside",
            valueFormatter: (value) =>
              `${NUMBER_FORMATTER.format(value ?? 0)} נפגעים`,
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
