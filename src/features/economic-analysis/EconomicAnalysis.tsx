import { Box, Typography } from "@mui/material";
import { DroneDashboardChart } from "./CostDrownToInterceptor/CostDrownToInterceptor";


export const EconomicAnalysis = () => {


    return (
    <Box component="main" className="development-screen">
      <Typography component="h1" className="development-screen__title">
        ניתוח עלויות
        <DroneDashboardChart/>
      </Typography>
    </Box>
  );
}