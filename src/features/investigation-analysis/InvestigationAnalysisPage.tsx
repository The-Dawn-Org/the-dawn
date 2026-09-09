import { Box, Typography } from "@mui/material";
import { CasualtiesBySectorChart } from "./components/CasualtiesBySectorChart";
import { ChartsRow } from "./components/ChartsRow";
import { EventsBySystemChart } from "./components/EventsBySystemChart";
import "./InvestigationAnalysisPage.css";

export const InvestigationAnalysisPage = () => {
  return (
    <Box component="main" className="investigation-analysis">
      <Typography component="h1" className="investigation-analysis__title">
        ביצועים אופרטיביים
      </Typography>

      <ChartsRow>
        <EventsBySystemChart />
        <CasualtiesBySectorChart />
      </ChartsRow>
    </Box>
  );
};
