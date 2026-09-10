import { Box } from "@mui/material";
import { Statistics } from "./Statistics";
import { useState, type FC } from "react";
import type { Event } from "../../../types";
import type { InterceptionEvent } from "../../investigation-analysis/types/tableTypes";
import InfoEventsCard from "../../investigation-analysis/components/card/TabCard";
import GenericTable from "../../investigation-analysis/components/Table/GenericTable";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { columns } from "../../investigation-analysis/components/Table/TableColumnDefinition";
import { getEventById } from "../../../api/endpoints/events";

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
