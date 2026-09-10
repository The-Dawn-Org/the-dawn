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
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import { InfoCard } from "./info-cards/InfoCard";
import { useAppFilters } from "../../app/filters/AppFiltersContext";
import { ExpensesByAmmunitionChart } from "./ExpensesByAmmunitionChart/ExpensesByAmmunitionChart";
import { DrownsToInterceptorChart } from "./DrownToInterceptorChart/DrownToInterceptorChart";
import { EconomicDamageChart } from "./EconomicDamageChart/EconomicDamageChart";
import { GraphContainer } from "./GraphContainer";
import {
  getCardsInfoItem,
  getCostBySystem,
  getEconomicDamage,
  getDrownToInterceptor
} from "../../api/economicAnalysisAPI";
import type {
  DrownToInterceptorType,
  SystemCost,
  CardsInfoItem,
  EconomicDamageItem,
} from "./types";

export const EconomicAnalysis = () => {
  // mock data
  const mockEconomicDamage: EconomicDamageItem[] = [
    { sectorName: "דרום", totalDamage: 5_800_000 },
    { sectorName: "צפון", totalDamage: 4_200_000 },
    { sectorName: "גליל מערבי", totalDamage: 1_500_000 },
    { sectorName: "מרכז", totalDamage: 650_000 },
  ];

  const theme = useTheme();
  const { dateRange } = useAppFilters();
  const [drownToInterceptor, setDrownToInterceptor] = useState<
    DrownToInterceptorType[]
  >([]);

  const [expenses, setExpenses] = useState<SystemCost[]>([]);
  const [cardsInfo, setCardsInfo] = useState<CardsInfoItem | null>(null);
  const [damageBySector, setDamageBySector] = useState<EconomicDamageItem[]>([]);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(true);
  const [isLoadingDrownToInter, setIsLoadingDrownToInter] = useState(true);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingDamage, setIsLoadingDamage] = useState(true);
  const [infoCardsError, setInfoCardsError] = useState<boolean>(false);
  const [expensesError, setExpensesError] = useState<boolean>(false);
  const [damageError, setDamageError] = useState<boolean>(false);
  const [drownError, setDrownError] = useState<boolean>(false);

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

    setIsLoadingExpenses(true);

    getCostBySystem(dateRange, abortController.signal)
      .then((nextExpenses) => setExpenses(nextExpenses))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setExpensesError(true);
        }
      })
      .finally(() => setIsLoadingExpenses(false));

    getDrownToInterceptor(dateRange, abortController.signal)
      .then((nextDrownToInterceptor) => {
        setDrownToInterceptor(nextDrownToInterceptor);
      })
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setDrownError(true);
        }
      })
      .finally(() => setIsLoadingDrownToInter(false));

    setIsLoadingDamage(true);

    getEconomicDamage(dateRange, abortController.signal)
      .then((nextDamage) => setDamageBySector(nextDamage))
      .catch((error: unknown) => {
        if (!axios.isCancel(error)) {
          setDamageError(false);
        }
      })
      .finally(() => setIsLoadingDamage(false));

    setDamageBySector(mockEconomicDamage);

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
            value={`${Math.abs(cardsInfo.budgetVariance)}%${cardsInfo.budgetVariance > 0 ? "  +" : "  -"
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
          "& > :last-child": {
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
          ) : drownError ? (
            <Box className="economic-graph__empty">
              <Typography>לא ניתן לטעון נתוני הרחפים ומחירי המיירטים</Typography>
            </Box>
          ) : (
            <DrownsToInterceptorChart data={drownToInterceptor} />
          )}
        </GraphContainer>

        <GraphContainer
          icon={<LocalFireDepartmentRoundedIcon />}
          title="נזק רכוש לפי גזרה"
        >
          {isLoadingDamage ? (
            <Box className="economic-graph__loading">
              <CircularProgress size={28} />
            </Box>
          ) : damageError ? (
            <Box className="economic-graph__empty">
              <Typography>לא ניתן לטעון את נתוני הנזק לרכוש</Typography>
            </Box>
          ) : (
            <EconomicDamageChart data={damageBySector} />
          )}
        </GraphContainer>
      </Box>
    </Box>
  );
};