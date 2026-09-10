import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import EventsFilters from "./filterEvents";

export const InvestigationMap = () => (
  <Box className="development-screen">
    <EventsFilters />
    <Typography component="h1">מפה</Typography>
  </Box>
);
