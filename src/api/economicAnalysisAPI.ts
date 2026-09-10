import axios from "axios";
import type { DateRangeFilter } from "../app/filters/AppFiltersContext";
import type { SystemCost, CardsInfoItem } from "../features/economic-analysis/types";
import { axiosInstance } from "./axios";


export const getCostBySystem = async (
  dateRange: DateRangeFilter,
  signal?: AbortSignal,
): Promise<SystemCost[]> => {
  const response = await axiosInstance.get<SystemCost[]>(
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
  const response = await axiosInstance.get<CardsInfoItem>(
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