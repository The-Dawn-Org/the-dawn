import { Box } from "@mui/material";
import { Statistics } from "./Statistics";
import type { FC } from "react";
import type { Event } from "../../../types";

type StatisticsEventLogsProps = {
    events: Event[];
};

export const StatisticsEventLogs: FC<StatisticsEventLogsProps> = ({ events }) => {
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
        </Box>
    );
};
