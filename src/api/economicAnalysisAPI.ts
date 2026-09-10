import axios from "axios";
import type { DateRangeFilter } from "../app/filters/AppFiltersContext";
import type {
  AccumulativeExpensePoint,
  BudgetByDateResponse,
  CardsInfoItem,
  SystemCost,
} from "../features/economic-analysis/types";

const financeApi = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL ?? "",
});

export const getCostBySystem = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<SystemCost[]> => {
  const response = await financeApi.get<SystemCost[]>(
    "/finance/cost-by-system",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      signal,
    },
  );

  return response.data;
};

export const getCardsInfoItem = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<CardsInfoItem> => {
  const response = await financeApi.get<CardsInfoItem>(
    "/finance/cards",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      signal,
    },
  );

  return response.data;
};

export const getBudgetByDate = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<AccumulativeExpensePoint[]> => {
  const response = await financeApi.get<BudgetByDateResponse[]>(
    "/finance/budget-by-date",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      signal,
    },
  );

  return response.data.map(({ date, budget }) => ({
    date,
    number: budget,
  }));
};