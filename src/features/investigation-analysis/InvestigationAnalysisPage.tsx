import { Box, Typography } from "@mui/material";

import { SummaryStatisticsCard } from "./components/summaryStatisticsCard";

export const InvestigationAnalysisPage = () => {
  return (
    <Box component="main" className="development-screen">
      <Typography component="h1" className="development-screen__title">
        העמוד הכי טוב באתר
      </Typography>
      <SummaryStatisticsCard />
    </Box>
  );
};
