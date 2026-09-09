import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PaidIcon from "@mui/icons-material/Paid";
import { InfoCard } from "./info-cards/InfoCard";
import { useAppFilters } from "../../app/filters/AppFiltersContext";
import { ExpensesByAmmunitionChart } from "./ExpensesByAmmunitionCharts/ExpensesByAmmunitionChart";
import { GraphContainer } from "./GraphContainer";
import { getCardsInfoItem, getCostBySystem } from "../../api/economicAnalysisAPI";
import type { CostBySystemItem, CardsInfoItem } from "./types";

export const EconomicAnalysis = () => {
  const theme = useTheme();
  const { dateRange } = useAppFilters();
  const [expenses, setExpenses] = useState<CostBySystemItem[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardsInfoItem | null>(null);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [infoCardsErrorMessage, setInfoCardsErrorMessage] = useState<string | null>(null);
  const [expensesErrorMessage, setExpensesErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    const abortController = new AbortController();

    setIsLoadingExpenses(true);
    setExpensesErrorMessage(null);

    getCostBySystem(dateRange, abortController.signal)
      .then((nextExpenses) => setExpenses(nextExpenses))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setExpensesErrorMessage("לא ניתן לטעון את נתוני העלות");
        }
      })
      .finally(() => setIsLoadingExpenses(false));

    return () => abortController.abort();
  }, [dateRange]);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoadingCards(true);
    setInfoCardsErrorMessage(null);

    getCardsInfoItem(dateRange, abortController.signal)
      .then((cardsInfoData) => setCardsInfo(cardsInfoData))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setInfoCardsErrorMessage("לא ניתן לטעון את נתוני הקלפים");
        }
      })
      .finally(() => setIsLoadingCards(false));
    return () => abortController.abort();
    
  }, [dateRange]);

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString("en-US");
  };

  return (
    <Box component="main" className="economic-analysis" sx={{ width: "99%", justifySelf: "center" }} dir="rtl">
      {/* Info Cards */}
      {isLoadingCards ? (
          <Box className="economic-graph__loading">
            <CircularProgress size={28} />
          </Box>
        ) : infoCardsErrorMessage ? (
          <Box className="economic-graph__empty">
            <Typography>{infoCardsErrorMessage}</Typography>
          </Box>
        ) : (
          <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
          }}
        >
          <InfoCard
            label="סך עלות מבצעית"
            value={formatCurrency(cardsInfo.totalCost)}
            icon={AttachMoneyRoundedIcon}
            accentColor={theme.palette.kpi.gold}
          />
          <InfoCard
            label="שווי רחפנים מיורטים"
            value={formatCurrency(cardsInfo.dronsesData.totalCost)}
            icon={GpsFixedRoundedIcon}
            accentColor={theme.palette.kpi.red}
            sublabel={`${cardsInfo.dronsesData.count} רחפנים`}
          />
          <InfoCard
            label="עלות ממוצעת ליירוט"
            value={formatCurrency(
             cardsInfo.averageInterceptCost
            )}
            icon={PaymentsRoundedIcon}
            accentColor={theme.palette.kpi.gold}
          />
          <InfoCard
            label="מיירטים ששוגרו"
            value={formatNumber(cardsInfo.interceptorsLaunced)}
            icon={BoltRoundedIcon}
            accentColor={theme.palette.kpi.lightGreen}
          />
          <InfoCard
            label="סטיית תקציב"
            value={`${cardsInfo.budgetVariance}%${cardsInfo.budgetVariance > 0 ? "  +" : "  -"}`}
            icon={TrendingUpRoundedIcon}
            accentColor={
              cardsInfo.budgetVariance > 0 ? theme.palette.kpi.red : theme.palette.kpi.darkGreen
            }
          />
        </Box>
        )}

      {/* Cost by System Graph */}
      <GraphContainer
        icon={<PaidIcon />}
        title="עלות לפי מערכת"
        subtitle="עלות לפי סוג התחמושת ששוגר"
      >
        {isLoadingExpenses ? (
          <Box className="economic-graph__loading">
            <CircularProgress size={28} />
          </Box>
        ) : expensesErrorMessage ? (
          <Box className="economic-graph__empty">
            <Typography>{expensesErrorMessage}</Typography>
          </Box>
        ) : (
          <ExpensesByAmmunitionChart data={expenses} />
        )}
      </GraphContainer>
    </Box>
  );
};