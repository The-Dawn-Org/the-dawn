import { Stack } from "@mui/material";
import {
  GpsFixed as GpsFixedIcon,
  PeopleAlt as PeopleAltIcon,
  AttachMoney as AttachMoneyIcon,
  MonitorHeart as MonitorHeartIcon,
  ShieldOutlined as ShieldIcon,
} from "@mui/icons-material";
import { StatSumCard } from "./statCard";
import { droneEventsMock, EventStatus } from "../dataMock";

export const SummaryStatisticsCard = () => {
  // Not wired into the cards yet — kept as separate variables until it's decided which card each maps to.
  const eventCount = droneEventsMock.length;
  const totalIntercepted = droneEventsMock.filter(
    (event) => event.status === EventStatus.INTERCEPTED
  ).length;
  const interceptedPercent = (totalIntercepted / eventCount) * 100;
  const totalCasualtyCount = droneEventsMock.reduce(
    (sum, event) => sum + event.casualtyCount,
    0
  );
  const totalDamageCostIls = Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(
    droneEventsMock.reduce((sum, event) => sum + event.damageCostIls, 0)
  );

  return (
    <Stack spacing={3} direction={"row-reverse"} sx={{direction: "ltr"}}>
      <StatSumCard
        icon={<MonitorHeartIcon />}
        title="סך אירועים"
        value={eventCount.toString()}
      />
      <StatSumCard
        icon={<ShieldIcon />}
        title="יירוטים"
        value={totalIntercepted.toString()}
      />
      <StatSumCard
        icon={<GpsFixedIcon />}
        title="אחוז הצלחה"
        value={`${interceptedPercent}%`}
      />
      <StatSumCard
        icon={<PeopleAltIcon />}
        title="נפגעים"
        value={totalCasualtyCount.toString()}
      />
      <StatSumCard
        icon={<AttachMoneyIcon />}
        title="עלות מבצעית"
        value={`$${totalDamageCostIls}`}
      />
    </Stack>
  );
};
