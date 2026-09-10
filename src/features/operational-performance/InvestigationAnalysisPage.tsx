import { Box, Typography } from "@mui/material";
import { CasualtiesBySectorChart } from "./components/CasualtiesBySectorChart";
import { ChartsRow } from "./components/ChartsRow";
import { EventsBySystemChart } from "./components/EventsBySystemChart";
import { useFilteredEvents } from "./data/useFilteredEvents";
import "./InvestigationAnalysisPage.css";
import { SummaryStatisticsCard } from "./components/summaryStatisticsCard";
import { InrerceptorStatisticsChart } from "./components/InrerceptorStatisticsChart";
import { RegionsChart } from "./components/RegionsChart";

export const InvestigationAnalysisPage = () => {
  const events = useFilteredEvents();
  return (
    <Box component="main" className="investigation-analysis">
      <Typography component="h1" className="investigation-analysis__title">
        ביצועים אופרטיביים
      </Typography>
      <ChartsRow columns={1}>
        <SummaryStatisticsCard />
      </ChartsRow>
      <ChartsRow>
        <EventsBySystemChart events={events} />
        <CasualtiesBySectorChart events={events} />
      </ChartsRow>

      <ChartsRow columns={1}>
        <InrerceptorStatisticsChart events={events} />
      </ChartsRow>

      <ChartsRow columns={1}>
        <RegionsChart events={events} />
      </ChartsRow>
    </Box>
  );
};
