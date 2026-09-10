import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { Event, InterceptorType } from "../../types";
import type { Region } from "../../types/Region";
import type { AttackingBody } from "../../types/AttackingBody";
import type { interceptionStatus } from "../../types/InterceptionStatus";

export interface EventFilters {
  region: Region;
  interceptorType: InterceptorType;
  attackingBody: AttackingBody;
  interceptionStatus: interceptionStatus;
}

interface EventsFiltersContextValue {
  events: Event[];
  filteredEvents: Event[];

  filters: EventFilters;
  // setFilters: React.Dispatch<React.SetStateAction<EventFilters>>;
  setFilters: (filters: EventFilters) => void;

  setRegion: (region: Region) => void;
  setInterceptorType: (interceptorType: InterceptorType) => void;
  setAttackingBody: (attackingBody: AttackingBody) => void;
  setInterceptionStatus: (interceptionStatus: interceptionStatus) => void;
}

const EventsFiltersContext = createContext<EventsFiltersContextValue | null>(
  null
);

const initialFilters: EventFilters = {
  region: null,
  interceptorType: null,
  attackingBody: null,
  interceptionStatus: null,
};

interface EventsFiltersProviderProps extends PropsWithChildren {
  events: Event[];
}

export const EventsFiltersProvider = ({
  children,
  events,
}: EventsFiltersProviderProps) => {
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesRegion = !filters.region || event.region === filters.region;

      const matchesInterceptorType =
        !filters.interceptorType ||
        event.interceptor === filters.interceptorType;

      const matchesAttackingBody =
        !filters.attackingBody || event.attackingBody === filters.attackingBody;

      const matchesInterceptionStatus =
        !filters.interceptionStatus ||
        event.interceptionStatus === filters.interceptionStatus;

      return (
        matchesRegion &&
        matchesInterceptorType &&
        matchesAttackingBody &&
        matchesInterceptionStatus
      );
    });
  }, [events, filters]);

  return (
    <EventsFiltersContext.Provider
      value={{
        events,
        filteredEvents,

        filters,
        setFilters,

        setRegion: (region) =>
          setFilters((prev) => ({
            ...prev,
            region,
          })),

        setInterceptorType: (interceptorType) =>
          setFilters((prev) => ({
            ...prev,
            interceptorType,
          })),

        setAttackingBody: (attackingBody) =>
          setFilters((prev) => ({
            ...prev,
            attackingBody,
          })),

        setInterceptionStatus: (interceptionStatus) =>
          setFilters((prev) => ({
            ...prev,
            interceptionStatus,
          })),
      }}
    >
      {children}
    </EventsFiltersContext.Provider>
  );
};

export const useEventsFilters = () => {
  const context = useContext(EventsFiltersContext);

  if (!context) {
    throw new Error(
      "useEventsFilters must be used within EventsFiltersProvider"
    );
  }

  return context;
};
