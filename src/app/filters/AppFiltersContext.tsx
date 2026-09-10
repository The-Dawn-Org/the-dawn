import { createContext, useContext, useState, type PropsWithChildren } from "react";

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

interface AppFiltersContextValue {
  dateRange: DateRangeFilter;
  setDateRange: (dateRange: DateRangeFilter) => void;
}

const AppFiltersContext = createContext<AppFiltersContextValue | null>(null);

const toLocalDateTimeValue = (date: Date) => {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset).toISOString();
};

const createInitialDateRange = (): DateRangeFilter => {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7);

  return {
    startDate: toLocalDateTimeValue(startDate),
    endDate: toLocalDateTimeValue(endDate),
  };
};

export const AppFiltersProvider = ({ children }: PropsWithChildren) => {
  const [dateRange, setDateRange] = useState(createInitialDateRange);

  return <AppFiltersContext value={{ dateRange, setDateRange }}>{children}</AppFiltersContext>;
};

export const useAppFilters = () => {
  const context = useContext(AppFiltersContext);

  if (!context) {
    throw new Error("useAppFilters must be used within AppFiltersProvider");
  }

  return context;
};
