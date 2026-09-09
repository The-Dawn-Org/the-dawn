import { Box } from "@mui/material";
import { InterceptionStats, RegionStatsRow } from "./components";
import { droneEventsMock } from "./dataMock";
import { summarizeByInterceptor, summarizeByRegion } from "./investigationStats";

const PIE_SIZE = 180;

export const InvestigationAnalysisPage = () => {
  const interceptionStats = summarizeByInterceptor(droneEventsMock);
  const regionStats = summarizeByRegion(droneEventsMock);

  return (
    <Box component="main" dir="rtl" sx={{ display: "flex", flexDirection: "column", gap: 4, p: 3 }}>
      <Box component="section" sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
        {interceptionStats.map((stat) => (
          <Box key={stat.title} sx={{ flexShrink: 0 }}>
            <InterceptionStats
              title={stat.title}
              intercepted={stat.intercepted}
              missed={stat.missed}
              size={PIE_SIZE}
            />
          </Box>
        ))}
      </Box>

      <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
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
    </Box>
  );
};
