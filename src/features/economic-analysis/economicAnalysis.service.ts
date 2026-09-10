import axios from "axios";
import type { DateRangeFilter } from "../../app/filters/AppFiltersContext";
import type { SystemCost, DrownToInterceptorType } from "./types";

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

export const getDrownToInterceptor = async (
  dateRange: DateRangeFilter,
): Promise<DrownToInterceptorType[]> => {
  const response = await financeApi.get<DrownToInterceptorType[]>(
    "/finance/daily-interceptions",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
    }
  );

  return response.data;
};
