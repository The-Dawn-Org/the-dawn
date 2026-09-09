import { Box, Typography } from "@mui/material";
import { InterceptionStats, RegionStatsRow } from "./components";

export const InvestigationAnalysisPage = () => {
  return (
    <Box component="main" className="development-screen">
      <Typography component="h1" className="development-screen__title">
        <InterceptionStats title="כיפת ברזל" intercepted={50} missed={20} />
        <RegionStatsRow
          eventCount={42}
          region="צפון"
          intercepted={31}
          missed={3}
          casualties={5}
          damageK={1971}
        />
      </Typography>
    </Box>
  );
};
