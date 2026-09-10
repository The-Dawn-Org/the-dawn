import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { useAppFilters } from "../../../app/filters/AppFiltersContext";
import { useEvents, type FilterEventsDto } from "../../../hooks/useEvents";
import type { Event } from "../../../types";

/**
 * The four dropdowns in the filters navbar. Keys match the fields the events
 * API expects (see {@link FilterEventsDto}); values are always the English /
 * canonical value, never the Hebrew label shown in the UI.
 */
export interface MapFilterSelections {
  region: string[];
  type: string[];
  launchRegion: string[];
  status: string[];
}

const EMPTY_SELECTIONS: MapFilterSelections = {
  region: [],
  type: [],
  launchRegion: [],
  status: [],
};

interface MapFiltersContextValue {
  /** Current dropdown selection (the "draft" the user is editing). */
  selections: MapFilterSelections;
  setSelection: (key: keyof MapFilterSelections, values: string[]) => void;
  /** Copy the draft selection into the active query and refetch. */
  applyFilters: () => void;
  /** True while there are edited-but-not-yet-applied changes. */
  hasPendingChanges: boolean;
  /** Events for the currently applied filters + navbar date range. */
  events: Event[];
  loading: boolean;
  error: string | null;
}

const MapFiltersContext = createContext<MapFiltersContextValue | null>(null);

const areSelectionsEqual = (a: MapFilterSelections, b: MapFilterSelections) =>
  (Object.keys(a) as (keyof MapFilterSelections)[]).every((key) => {
    const left = a[key];
    const right = b[key];

    return (
      left.length === right.length &&
      left.every((value) => right.includes(value))
    );
  });

export const MapFiltersProvider = ({ children }: PropsWithChildren) => {
  const { dateRange } = useAppFilters();

  const [selections, setSelections] =
    useState<MapFilterSelections>(EMPTY_SELECTIONS);
  const [appliedSelections, setAppliedSelections] =
    useState<MapFilterSelections>(EMPTY_SELECTIONS);

  const setSelection = useCallback(
    (key: keyof MapFilterSelections, values: string[]) => {
      setSelections((prev) => ({ ...prev, [key]: values }));
    },
    [],
  );

  const applyFilters = useCallback(() => {
    setAppliedSelections(selections);
  }, [selections]);

  const queryFilters = useMemo<FilterEventsDto>(() => {
    const filters: FilterEventsDto = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };

    if (appliedSelections.region.length) {
      filters.region = appliedSelections.region;
    }
    if (appliedSelections.type.length) {
      filters.type = appliedSelections.type;
    }
    if (appliedSelections.launchRegion.length) {
      filters.launchRegion = appliedSelections.launchRegion;
    }
    if (appliedSelections.status.length) {
      filters.status = appliedSelections.status;
    }

    return filters;
  }, [appliedSelections, dateRange]);

  const { events, loading, error } = useEvents(queryFilters);

  const value = useMemo<MapFiltersContextValue>(
    () => ({
      selections,
      setSelection,
      applyFilters,
      hasPendingChanges: !areSelectionsEqual(selections, appliedSelections),
      events,
      loading,
      error,
    }),
    [selections, appliedSelections, setSelection, applyFilters, events, loading, error],
  );

  return (
    <MapFiltersContext value={value}>{children}</MapFiltersContext>
  );
};

export const useMapFilters = () => {
  const context = useContext(MapFiltersContext);

  if (!context) {
    throw new Error("useMapFilters must be used within a MapFiltersProvider");
  }

  return context;
};
