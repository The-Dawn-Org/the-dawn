import { useMemo } from "react";
import { useAppFilters } from "../../../app/filters/AppFiltersContext";
import { INVESTIGATION_EVENTS, filterEventsByDateRange } from "./events";

/** The events inside the date range currently selected in the navbar. */
export const useFilteredEvents = () => {
  const { dateRange } = useAppFilters();

  return useMemo(() => filterEventsByDateRange(INVESTIGATION_EVENTS, dateRange), [dateRange]);
};
