import axios from "axios";
import type { DateRangeFilter } from "../../app/filters/AppFiltersContext";
import type { CostBySystemItem, DrownToInterceptorType } from "./economicAnalysis.types";

const financeApi = axios.create({
  baseURL: import.meta.env.VITE_FINANCE_API_URL ?? "",
});

export const getCostBySystem = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<CostBySystemItem[]> => {
  const response = await financeApi.get<CostBySystemItem[]>(
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

export const getDrownToInterceptor = async (
  dateRange: DateRangeFilter,
  // signal?: AbortSignal,
): Promise<DrownToInterceptorType[]> => {
  const response = await financeApi.get<DrownToInterceptorType[]>(
    "/finance/daily-interceptions",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      // signal,
    }
  );

  return response.data;
};
