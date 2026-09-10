import { Stack } from "@mui/material";
import {
  GpsFixed as GpsFixedIcon,
  PeopleAlt as PeopleAltIcon,
  AttachMoney as AttachMoneyIcon,
  MonitorHeart as MonitorHeartIcon,
  ShieldOutlined as ShieldIcon,
} from "@mui/icons-material";
import { StatSumCard } from "./statCard";
import type { Event } from "../../../types";

export type EventsBySystemChartProps = {
  events: Event[];
};

/** Matches the DB's Hebrew status strings, same convention as investigationStats.ts. */
const INTERCEPTED_STATUS = "הושלם בהצלחה";

export const SummaryStatisticsCard = ({ events }: EventsBySystemChartProps) => {
  const eventCount = events.length;
  const totalIntercepted = events.filter(
    (event) => event.eventStatus === INTERCEPTED_STATUS
  ).length;
  const interceptedPercent = eventCount > 0 ? (totalIntercepted / eventCount) * 100 : 0;
  const totalCasualtyCount = events.reduce(
    (sum, event) => sum + event.droneInjuryCount,
    0
  );
  const totalDamageCostIls = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(
    events.reduce((sum, event) => sum + event.interceptor.price - event.drone.price , 0)
    // TODO
  );

  console.log("[SummaryStatisticsCard] events:", eventCount, "intercepted:", totalIntercepted, "percent:", interceptedPercent, "casualties:", totalCasualtyCount);
  if (eventCount > 0) {
    console.log("[SummaryStatisticsCard] sample event:", events[0]);
  }

  return (
    <Stack spacing={3} direction={"row-reverse"} sx={{direction: "ltr"}}>
      <StatSumCard
        icon={<MonitorHeartIcon />}
        title="סך אירועים"
        value={eventCount}
      />
      <StatSumCard
        icon={<ShieldIcon />}
        title="יירוטים"
        value={totalIntercepted}
      />
      <StatSumCard
        icon={<GpsFixedIcon />}
        title="אחוז הצלחה"
        value={`${interceptedPercent}%`}
      />
      <StatSumCard
        icon={<PeopleAltIcon />}
        title="נפגעים"
        value={totalCasualtyCount}
        accent = "#D4A843"
      />
      <StatSumCard
        icon={<AttachMoneyIcon />}
        title="עלות מבצעית"
        value={`$${totalDamageCostIls}`}
        accent = "#D4A843"
      />
    </Stack>
  );
};
