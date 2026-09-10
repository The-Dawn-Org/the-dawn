import { useEffect, useMemo } from "react";
import { useAppFilters } from "../../../app/filters/AppFiltersContext";
import { filterEventsByDateRange } from "./droneEvents";
import { useEvents } from "../../../hooks/useEvents";

/** The events inside the date range currently selected in the navbar. */
export const useFilteredEvents = () => {
  const { dateRange } = useAppFilters();
  const { events, loading, error } = useEvents();

  const filteredEvents = useMemo(
    () => filterEventsByDateRange(events, dateRange),
    [events, dateRange],
  );

  useEffect(() => {
    console.log("[useFilteredEvents] fetched events:", events.length, "loading:", loading, "error:", error);
    console.log("[useFilteredEvents] date range:", dateRange);
    console.log("[useFilteredEvents] events after date filter:", filteredEvents.length, filteredEvents);
  }, [events, loading, error, dateRange, filteredEvents]);

  return filteredEvents;
};
