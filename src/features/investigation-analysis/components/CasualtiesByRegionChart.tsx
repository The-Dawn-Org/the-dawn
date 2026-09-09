import { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { sumPeopleHitByRegion } from "../data/events";
import { useFilteredEvents } from "../data/useFilteredEvents";
import { ChartCard } from "./ChartCard";
import {
  CATEGORY_TICK_STYLE,
  CHART_COLORS,
  CHART_HEIGHT,
  NUMBER_FORMATTER,
  VALUE_TICK_STYLE,
} from "./chartTheme";

export const CasualtiesByRegionChart = () => {
  const events = useFilteredEvents();
  const peopleHitByRegion = useMemo(() => sumPeopleHitByRegion(events), [events]);

  const totalPeopleHit = peopleHitByRegion.reduce((total, region) => total + region.total, 0);

  return (
    <ChartCard
      title="נפגעים לפי גזרה"
      subtitle={`${NUMBER_FORMATTER.format(totalPeopleHit)} נפגעים בטווח הזמן הנבחר`}
    >
      <BarChart
        dataset={peopleHitByRegion}
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
            valueFormatter: (value) => `${NUMBER_FORMATTER.format(value ?? 0)} נפגעים`,
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "category",
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
