import type { DroneEvent } from "../dataMock";
import { ChartCard } from "./ChartCard";
import { useMemo } from "react";
import { summarizeByRegion } from "../investigationStats";
import { Box } from "@mui/material";
import { RegionStatsRow } from ".";

export type RegionsChartProps = {
  events: DroneEvent[];
};

export const RegionsChart = ({ events }: RegionsChartProps) => {
  const regionStats = useMemo(() => summarizeByRegion(events), [events]);

  return (
    <ChartCard title="תוצאות אירועים בגזרות">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pb: 1.5 }}>
        {regionStats.map((stat) => (
          <Box key={stat.region}>
            <RegionStatsRow
              region={stat.region}
              intercepted={stat.intercepted}
              missed={stat.missed}
              casualties={stat.casualties}
              damageK={stat.damageK}
              eventCount={stat.eventCount}
            />
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
