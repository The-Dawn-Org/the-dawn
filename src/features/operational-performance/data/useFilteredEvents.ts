import { useMemo } from "react";
import { useAppFilters } from "../../../app/filters/AppFiltersContext";
import { filterEventsByDateRange } from "./droneEvents";
import { useEvents } from "../../../hooks/useEvents";

/** The events inside the date range currently selected in the navbar. */
export const useFilteredEvents = () => {
  const { dateRange } = useAppFilters();
  const { events } = useEvents();

  return useMemo(() => filterEventsByDateRange(events, dateRange), [dateRange]);
};
