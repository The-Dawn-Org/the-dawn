import { Stack } from "@mui/material";
import {
  GpsFixed as GpsFixedIcon,
  PeopleAlt as PeopleAltIcon,
  AttachMoney as AttachMoneyIcon,
  MonitorHeart as MonitorHeartIcon,
  ShieldOutlined as ShieldIcon,
} from "@mui/icons-material";
import { StatSumCard } from "./statCard";
import { EventStatus, type DroneEvent } from "../dataMock";

export type EventsBySystemChartProps = {
  events: DroneEvent[];
};

export const SummaryStatisticsCard = ({ events }: EventsBySystemChartProps) => {
  const eventCount = events.length;
  const totalIntercepted = events.filter(
    (event) => event.status === EventStatus.INTERCEPTED
  ).length;
  const interceptedPercent = (totalIntercepted / eventCount) * 100;
  const totalCasualtyCount = events.reduce(
    (sum, event) => sum + event.casualtyCount,
    0
  );
  const totalDamageCostIls = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(
    events.reduce((sum, event) => sum + event.damageCostIls, 0)
  );

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
