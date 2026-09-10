import { Box } from "@mui/material";
import { Statistics } from "./Statistics";
import { useState, type FC } from "react";
import type { Event } from "../../../types";
import type { InterceptionEvent } from "../../investigation-analysis/types/tableTypes";
import InfoEventsCard from "../../investigation-analysis/components/card/TabCard";
import GenericTable from "../../investigation-analysis/components/Table/GenericTable";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { columns } from "../../investigation-analysis/components/Table/TableColumnDefinition";
import { useEvents } from "../../../hooks/useEvents";
import { getEventById } from "../../../api/endpoints/events";

// Mock data TODO: delete in prod
const events_STUB: InterceptionEvent[] = [
  {
    eventId: 0,
    interceptor: { interceptorTypeId: 0, type: "תמיר", price: 50000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-08T14:32:10Z",
    eventLocation: { lat: 32.09, lng: 34.79 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "ננוסוורם קיו-9", price: 900 },
    droneInjuryCount: 0,
  },
  {
    eventId: 1,
    interceptor: { interceptorTypeId: 1, type: "פק-3", price: 4000000 },
    launcher: { launcherId: 1, location: { lat: 31.7683, lng: 35.2137 } },
    region: "צפון",
    time: "2026-09-08T18:05:44Z",
    eventLocation: { lat: 31.775, lng: 35.22 },
    interceptionStatus: "לא יורט",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "לואדבי אמ-2", price: 8300 },
    droneInjuryCount: 0,
  },
  {
    eventId: 2,
    interceptor: { interceptorTypeId: 2, type: "סטאנר", price: 1000000 },
    launcher: { launcherId: 2, location: { lat: 32.794, lng: 34.9896 } },
    region: "גליל מערבי",
    time: "2026-09-09T02:17:59Z",
    eventLocation: { lat: 32.8, lng: 34.995 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 2,
  },
  {
    eventId: 3,
    interceptor: { interceptorTypeId: 4, type: "חץ 3 יירוט", price: 3500000 },
    launcher: { launcherId: 3, location: { lat: 29.5581, lng: 34.9482 } },
    region: "דרום",
    time: "2026-09-09T05:48:21Z",
    eventLocation: { lat: 29.56, lng: 34.96 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 0,
  },
  {
    eventId: 4,
    interceptor: { interceptorTypeId: 3, type: "סי-רם ראונד", price: 15000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-09T07:03:12Z",
    eventLocation: { lat: 32.087, lng: 34.785 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "סקימייט סי-7", price: 2500 },
    droneInjuryCount: 4,
  },
  {
    eventId: 0,
    interceptor: { interceptorTypeId: 0, type: "תמיר", price: 50000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-08T14:32:10Z",
    eventLocation: { lat: 32.09, lng: 34.79 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "ננוסוורם קיו-9", price: 900 },
    droneInjuryCount: 0,
  },
  {
    eventId: 1,
    interceptor: { interceptorTypeId: 1, type: "פק-3", price: 4000000 },
    launcher: { launcherId: 1, location: { lat: 31.7683, lng: 35.2137 } },
    region: "צפון",
    time: "2026-09-08T18:05:44Z",
    eventLocation: { lat: 31.775, lng: 35.22 },
    interceptionStatus: "לא יורט",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "לואדבי אמ-2", price: 8300 },
    droneInjuryCount: 0,
  },
  {
    eventId: 2,
    interceptor: { interceptorTypeId: 2, type: "סטאנר", price: 1000000 },
    launcher: { launcherId: 2, location: { lat: 32.794, lng: 34.9896 } },
    region: "גליל מערבי",
    time: "2026-09-09T02:17:59Z",
    eventLocation: { lat: 32.8, lng: 34.995 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 2,
  },
  {
    eventId: 3,
    interceptor: { interceptorTypeId: 4, type: "חץ 3 יירוט", price: 3500000 },
    launcher: { launcherId: 3, location: { lat: 29.5581, lng: 34.9482 } },
    region: "דרום",
    time: "2026-09-09T05:48:21Z",
    eventLocation: { lat: 29.56, lng: 34.96 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 0,
  },
  {
    eventId: 4,
    interceptor: { interceptorTypeId: 3, type: "סי-רם ראונד", price: 15000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-09T07:03:12Z",
    eventLocation: { lat: 32.087, lng: 34.785 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "סקימייט סי-7", price: 2500 },
    droneInjuryCount: 4,
  },
  {
    eventId: 0,
    interceptor: { interceptorTypeId: 0, type: "תמיר", price: 50000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-08T14:32:10Z",
    eventLocation: { lat: 32.09, lng: 34.79 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "ננוסוורם קיו-9", price: 900 },
    droneInjuryCount: 0,
  },
  {
    eventId: 1,
    interceptor: { interceptorTypeId: 1, type: "פק-3", price: 4000000 },
    launcher: { launcherId: 1, location: { lat: 31.7683, lng: 35.2137 } },
    region: "צפון",
    time: "2026-09-08T18:05:44Z",
    eventLocation: { lat: 31.775, lng: 35.22 },
    interceptionStatus: "לא יורט",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "לואדבי אמ-2", price: 8300 },
    droneInjuryCount: 0,
  },
  {
    eventId: 2,
    interceptor: { interceptorTypeId: 2, type: "סטאנר", price: 1000000 },
    launcher: { launcherId: 2, location: { lat: 32.794, lng: 34.9896 } },
    region: "גליל מערבי",
    time: "2026-09-09T02:17:59Z",
    eventLocation: { lat: 32.8, lng: 34.995 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "לבנון",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 2,
  },
  {
    eventId: 3,
    interceptor: { interceptorTypeId: 4, type: "חץ 3 יירוט", price: 3500000 },
    launcher: { launcherId: 3, location: { lat: 29.5581, lng: 34.9482 } },
    region: "דרום",
    time: "2026-09-09T05:48:21Z",
    eventLocation: { lat: 29.56, lng: 34.96 },
    interceptionStatus: "יורט",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "פלקון-לונג אקס-2", price: 18000 },
    droneInjuryCount: 0,
  },
  {
    eventId: 4,
    interceptor: { interceptorTypeId: 3, type: "סי-רם ראונד", price: 15000 },
    launcher: { launcherId: 0, location: { lat: 32.0853, lng: 34.7818 } },
    region: "מרכז",
    time: "2026-09-09T07:03:12Z",
    eventLocation: { lat: 32.087, lng: 34.785 },
    interceptionStatus: "יש נפגעים",
    eventStatus: "סגור",
    attackingBody: "עזה",
    drone: { type: "סקימייט סי-7", price: 2500 },
    droneInjuryCount: 4,
  },
];

type StatisticsEventLogsProps = {
  events: Event[];
};

export const StatisticsEventLogs: FC<StatisticsEventLogsProps> = ({
  events,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<InterceptionEvent | null>(
    null
  );

  const handleRowClick = async (info: InterceptionEvent) => {
    setSelectedEvent(await getEventById(info.eventId));
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // const { events } = useEvents();

  return (
    <Box
      dir="rtl"
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0c120c",
        color: "#fff",
        p: 1,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* ================= STATS ================= */}

      <Statistics events={events} />

      {/* ================= EVENTS ================= */}

      <Box
        sx={{
          width: "30%",
          minWidth: "450px",
          marginLeft: "auto",
        }}
      >
        <GenericTable
          targetSubjects={events}
          columns={columns}
          title="יומן אירועים"
          icon={<ShowChartIcon sx={{ color: "#8ABB4C" }} />}
          onRowClick={handleRowClick}
        />
      </Box>

      {selectedEvent && (
        <InfoEventsCard event={selectedEvent} onClose={handleClosePopup} />
      )}
    </Box>
  );
};
