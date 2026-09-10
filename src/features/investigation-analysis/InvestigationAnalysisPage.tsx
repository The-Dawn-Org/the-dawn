import { useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { InterceptionStats, RegionStatsRow } from "./components";
import { CasualtiesBySectorChart } from "./components/CasualtiesBySectorChart";
import { ChartCard } from "./components/ChartCard";
import { ChartsRow } from "./components/ChartsRow";
import { EventsBySystemChart } from "./components/EventsBySystemChart";
import { useFilteredEvents } from "./data/useFilteredEvents";
import {
  summarizeByInterceptor,
  summarizeByRegion,
} from "./investigationStats";
import "./InvestigationAnalysisPage.css";
import { SummaryStatisticsCard } from "./components/summaryStatisticsCard";

const PIE_SIZE = 180;

export const InvestigationAnalysisPage = () => {
  const events = useFilteredEvents();
  const interceptionStats = useMemo(
    () => summarizeByInterceptor(events),
    [events]
  );
  const regionStats = useMemo(() => summarizeByRegion(events), [events]);

  return (
    <Box component="main" className="investigation-analysis">
      <Typography component="h1" className="investigation-analysis__title">
        ביצועים אופרטיביים
      </Typography>
      <ChartsRow columns={1}>
        <SummaryStatisticsCard />
      </ChartsRow>
      <ChartsRow>
        <EventsBySystemChart />
        <CasualtiesBySectorChart />
      </ChartsRow>

      <ChartsRow columns={1}>
        <ChartCard title="אחוזי פגיעה בכל מערכת" spacing={4} dir="row">
          <Stack
            sx={{ display: "flex", width: "220px", direction: 'ltr' }}
            spacing={2}
            direction={"row-reverse"}
          >
            {interceptionStats.map((stat) => (
              <Box key={stat.title} sx={{ width: "100%" }}>
                <InterceptionStats
                  title={stat.title}
                  intercepted={stat.intercepted}
                  missed={stat.missed}
                  size={PIE_SIZE}
                />
              </Box>
            ))}
          </Stack>
        </ChartCard>
      </ChartsRow>

      <ChartsRow columns={1}>
        <ChartCard title="תוצאות אירועים בגזרות">
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, pb: 1.5 }}
          >
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
      </ChartsRow>
    </Box>
  );
};
