import { useMemo } from "react";
import { useAppFilters } from "../../../app/filters/AppFiltersContext";
import { DRONE_EVENTS, filterEventsByDateRange } from "./droneEvents";

/** The events inside the date range currently selected in the navbar. */
export const useFilteredEvents = () => {
  const { dateRange } = useAppFilters();

  return useMemo(() => filterEventsByDateRange(DRONE_EVENTS, dateRange), [dateRange]);
};
