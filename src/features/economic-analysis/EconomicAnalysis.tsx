import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import RadarIcon from "@mui/icons-material/Radar";
import { useAppFilters } from "../../app/filters/AppFiltersContext";
import { ExpensesByAmmunitionChart } from "./ExpensesByAmmunitionChart";
import { GraphContainer } from "./GraphContainer";
import { DroneDashboardChart } from "./CostDrownToInterceptor/CostDrownToInterceptor";
import { getCostBySystem } from "./economicAnalysis.service";
import type { CostBySystemItem } from "./economicAnalysis.types";

export const EconomicAnalysis = () => {
  const { dateRange } = useAppFilters();
  const [expenses, setExpenses] = useState<CostBySystemItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    setErrorMessage(null);

    getCostBySystem(dateRange, abortController.signal)
      .then((nextExpenses) => setExpenses(nextExpenses))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setErrorMessage("לא ניתן לטעון את נתוני העלות");
        }
      })
      .finally(() => setIsLoading(false));

    return () => abortController.abort();
  }, [dateRange]);

  return (
    <Box component="main" className="economic-analysis">
      <GraphContainer
        icon={<PaidIcon />}
        title="עלות לפי מערכת"
        subtitle="עלות לפי סוג התחמושת ששוגר"
      >
        {isLoading ? (
          <Box className="economic-graph__loading">
            <CircularProgress size={28} />
          </Box>
        ) : errorMessage ? (
          <Box className="economic-graph__empty">
            <Typography>{errorMessage}</Typography>
          </Box>
        ) : (
          <ExpensesByAmmunitionChart data={expenses} />
        )}
      </GraphContainer>

      <GraphContainer
        icon={<RadarIcon />}
        title="עלות מיירט מול רחפנים מיורטים"
        subtitle="השוואה בין עלות היירוט למספר הרחפנים שיורטו"
      >
        <DroneDashboardChart />
      </GraphContainer>
    </Box>
  );
};
