import { Box } from "@mui/material";
import { Statistics } from "./Statistics";
import { type FC } from "react";
import type { Event } from "../../../types";
import type { InterceptionEvent } from "../../investigation-analysis/types/tableTypes";
import GenericTable from "../../investigation-analysis/components/Table/GenericTable";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { columns } from "../../investigation-analysis/components/Table/TableColumnDefinition";

type StatisticsEventLogsProps = {
  events: Event[];
  onEventSelect: (eventId: number) => void;
};

export const StatisticsEventLogs: FC<StatisticsEventLogsProps> = ({
  events,
  onEventSelect,
}) => {
  const handleRowClick = (info: InterceptionEvent) => {
    onEventSelect(info.eventId);
  };

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
          width: "100%",
          minWidth: "430px",
          display: "flex",
          // justifyContent: "center",
          // margin: 0
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
    </Box>
  );
};
