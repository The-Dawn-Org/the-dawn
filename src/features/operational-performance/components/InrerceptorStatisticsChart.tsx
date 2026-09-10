import type { Event } from "../../../types";
import { ChartCard } from "./ChartCard";
import { useMemo } from "react";
import { summarizeByInterceptor } from "../data/investigationStats";
import { Box, Stack } from "@mui/material";
import { InterceptionStats } from ".";

export type InrerceptorStatisticsChartProps = {
  events: Event[];
};

export const InrerceptorStatisticsChart = ({
  events,
}: InrerceptorStatisticsChartProps) => {
  const interceptionStats = useMemo(
    () => summarizeByInterceptor(events),
    [events]
  );

  return (
    <ChartCard title="אחוזי פגיעה בכל מערכת" spacing={4} dir="row">
      <Stack
        sx={{ display: "flex", width: "220px", direction: "ltr" }}
        spacing={2}
        direction={"row-reverse"}
      >
        {interceptionStats.map((stat) => (
          <Box key={stat.title} sx={{ width: "100%" }}>
            <InterceptionStats
              title={stat.title}
              intercepted={stat.intercepted}
              missed={stat.missed}
            />
          </Box>
        ))}
      </Stack>
    </ChartCard>
  );
};
