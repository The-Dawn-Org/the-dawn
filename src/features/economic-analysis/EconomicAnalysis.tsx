import { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PaidIcon from "@mui/icons-material/Paid";
import RadarIcon from "@mui/icons-material/Radar";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import { InfoCard } from "./info-cards/InfoCard";
import { useAppFilters } from "../../app/filters/AppFiltersContext";
import { ExpensesByAmmunitionChart } from "./ExpensesByAmmunitionCharts/ExpensesByAmmunitionChart";
import { GraphContainer } from "./GraphContainer";
import { DronesToInterceptor } from "./DroneToInterceptor/DroneToInterceptor";
import { getDrownToInterceptor } from "./economicAnalysis.service";
import { AccumulativeExpensesChart } from "./AccumulativeExpensesChart/AccumulativeExpensesChart";
import {
  getCardsInfoItem,
  getBudgetByDate,
  getCostBySystem,
} from "../../api/economicAnalysisAPI";
import type {
  DroneToInterceptorType,
  SystemCost,
  CardsInfoItem,
} from "./types";
import {
  StockLevels,
  stockLevelsData,
} from "./InventoryInterceptors/InventoryInterceptors";
import { Inventory2Outlined } from "@mui/icons-material";
import type { AccumulativeExpensePoint } from "./types";

export const EconomicAnalysis = () => {
  const theme = useTheme();
  const { dateRange } = useAppFilters();
  const [drownToInterceptor, setDrownToInterceptor] = useState<
    DroneToInterceptorType[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expenses, setExpenses] = useState<SystemCost[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardsInfoItem | null>(null);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [isLoadingDrownToInter, setIsLoadingDrownToInter] = useState(true);
  const [accumulativeExpenses, setAccumulativeExpenses] = useState<
    AccumulativeExpensePoint[]
  >([]);
  const [isLoadingAccumulativeExpenses, setIsLoadingAccumulativeExpenses] =
    useState(true);
  const [accumulativeExpensesError, setAccumulativeExpensesError] =
    useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [infoCardsError, setInfoCardsError] = useState<boolean>(false);
  const [expensesError, setExpensesError] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoadingExpenses(true);
    setIsLoadingAccumulativeExpenses(true);
    setAccumulativeExpensesError(false);

    getCostBySystem(dateRange, abortController.signal)
      .then((nextExpenses) => setExpenses(nextExpenses))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setExpensesError(true);
        }
      })
      .finally(() => setIsLoadingExpenses(false));

    getBudgetByDate(dateRange, abortController.signal)
      .then((nextAccumulativeExpenses) =>
        setAccumulativeExpenses(nextAccumulativeExpenses)
      )
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setAccumulativeExpensesError(true);
        }
      })
      .finally(() => setIsLoadingAccumulativeExpenses(false));

    getDrownToInterceptor(dateRange, abortController.signal)
      .then((nextDrownToInterceptor) => {
        console.log(nextDrownToInterceptor);
        setDrownToInterceptor(nextDrownToInterceptor);
      })
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setErrorMessage("לא ניתן לטעון נתוני הרחפים ומחירי המיירטים.");
        }
      })
      .finally(() => setIsLoadingDrownToInter(false));

    return () => abortController.abort();
  }, [dateRange]);

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoadingCards(true);

    getCardsInfoItem(dateRange, abortController.signal)
      .then((cardsInfoData) => setCardsInfo(cardsInfoData))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setInfoCardsError(true);
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
    <Box
      component="main"
      className="economic-analysis"
      sx={{ width: "99%", justifySelf: "center", display: "block" }}
      dir="rtl"
    >
      {/* Info Cards */}
      {isLoadingCards ? (
        <Box className="economic-graph__loading">
          <CircularProgress size={28} />
        </Box>
      ) : infoCardsError || !cardsInfo ? (
        <Box className="economic-graph__empty">
          <Typography>לא ניתן לטעון את נתוני הקלפים</Typography>
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
            value={formatCurrency(cardsInfo.averageInterceptCost)}
            icon={PaymentsRoundedIcon}
            accentColor={theme.palette.kpi.gold}
          />
          <InfoCard
            label="מיירטים ששוגרו"
            value={formatNumber(cardsInfo.interceptorsLaunched)}
            icon={BoltRoundedIcon}
            accentColor={theme.palette.kpi.lightGreen}
          />
          <InfoCard
            label="סטיית תקציב"
            value={`${Math.abs(cardsInfo.budgetVariance)}%${
              cardsInfo.budgetVariance > 0 ? "  +" : "  -"
            }`}
            icon={TrendingUpRoundedIcon}
            accentColor={
              cardsInfo.budgetVariance > 0
                ? theme.palette.kpi.red
                : theme.palette.kpi.darkGreen
            }
          />
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
          },
          gap: 2,
          marginTop: 2,
          "& > *": {
            minWidth: 0,
            width: "100%",
          },
          "& > :last-child:nth-child(odd)": {
            gridColumn: {
              xs: "auto",
              md: "1 / -1",
            },
          },
        }}
      >
        <GraphContainer
          icon={<PaidIcon />}
          title="עלות לפי מערכת"
          subtitle="עלות לפי סוג התחמושת ששוגר"
        >
          {isLoadingExpenses ? (
            <Box className="economic-graph__loading">
              <CircularProgress size={28} />
            </Box>
          ) : expensesError ? (
            <Box className="economic-graph__empty">
              <Typography>לא ניתן לטעון את נתוני העלות</Typography>
            </Box>
          ) : (
            <ExpensesByAmmunitionChart data={expenses} />
          )}
        </GraphContainer>

        <GraphContainer
          icon={<RadarIcon />}
          title="יחס עלות אסימטרי"
          subtitle="עלות מיירט מול שווי רחפן"
        >
          {isLoadingDrownToInter ? (
            <Box className="economic-graph__loading">
              <CircularProgress size={28} />
            </Box>
          ) : errorMessage ? (
            <Box className="economic-graph__empty">
              <Typography>{errorMessage}</Typography>
            </Box>
          ) : (
            <DronesToInterceptor data={drownToInterceptor} />
          )}
        </GraphContainer>

        <GraphContainer
          icon={<Inventory2Outlined />}
          title="מלאי במערכות היירוט"
          subtitle="רמות מלאי נוכחיות"
        >
          {isLoadingAccumulativeExpenses ? (
            <Box className="economic-graph__loading">
              <CircularProgress size={28} />
            </Box>
          ) : accumulativeExpensesError ? (
            <Box className="economic-graph__empty">
              <Typography>לא ניתן לטעון את נתוני סטיית התקציב</Typography>
            </Box>
          ) : (
            <StockLevels items={stockLevelsData} />
          )}
        </GraphContainer>
      </Box>
    </Box>
  );
};
