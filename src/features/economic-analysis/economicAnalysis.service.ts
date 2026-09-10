import axios from "axios";
import type { DateRangeFilter } from "../../app/filters/AppFiltersContext";
import type { SystemCost, DroneToInterceptorType, InventoryType } from "./types";

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

export const getDroneToInterceptor = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<DroneToInterceptorType[]> => {
  const response = await financeApi.get<DroneToInterceptorType[]>(
    "/finance/daily-interceptions",
    {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      signal,
    }
  );

  return response.data;
};

export const getInventoryDetails = async (
  signal?: AbortSignal,
): Promise<InventoryType[]> => {
  const response = await financeApi.get<InventoryType[]>(
    "/finance/launcher-inventory",
    {
      signal,
    }
  );

  return response.data;
}
