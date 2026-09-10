import type { Event } from "../../../types";
import { ChartCard } from "./ChartCard";
import { useMemo } from "react";
import { summarizeByInterceptor } from "../data/investigationStats";
import { Box, Stack } from "@mui/material";
import { InterceptionStats } from ".";
import { InterceptorToHebrewMapper } from "../data/droneEvents";

export type InrerceptorStatisticsChartProps = {
  events: Event[];
};

export const InrerceptorStatisticsChart = ({ events }: InrerceptorStatisticsChartProps) => {
  const interceptionStats = useMemo(() => summarizeByInterceptor(events), [events]);

  return (
    <ChartCard title="אחוזי פגיעה בכל מערכת" spacing={4} dir="row">
      <Stack
        dir="rtl"
        direction="row"
        useFlexGap
        spacing={2}
        sx={{
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          pb: 1,
        }}
      >
        {interceptionStats.map((stat) => (
          <Box key={stat.title} sx={{ width: "100%" }}>
            <InterceptionStats
              title={InterceptorToHebrewMapper[stat.title] ?? stat.title}
              intercepted={stat.intercepted}
              missed={stat.missed}
            />
          </Box>
        ))}
      </Stack>
    </ChartCard>
  );
};
