import { useEffect, useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import PaidIcon from "@mui/icons-material/Paid";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { type Dayjs } from "dayjs";
import {
  useAppFilters,
  type DateRangeFilter,
} from "../filters/AppFiltersContext";
import logoUrl from "../../assets/logo.png";
import "./MainNavbar.css";

export type NavigationItemId =
  | "investigation-map"
  | "operational-performance"
  | "economic-analysis";

interface MainNavbarProps {
  activeItemId?: NavigationItemId;
  onNavigate?: (itemId: NavigationItemId) => void;
}

const NAVIGATION_ITEMS: ReadonlyArray<{
  id: NavigationItemId;
  label: string;
  Icon: SvgIconComponent;
}> = [
  { id: "investigation-map", label: "מפת אירועים", Icon: MapIcon },
  {
    id: "operational-performance",
    label: "ביצועים אופרטיביים",
    Icon: BarChartIcon,
  },
  { id: "economic-analysis", label: "עלויות ומלאי", Icon: PaidIcon },
];

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("he-IL", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "Asia/Jerusalem",
  timeZoneName: "short",
});

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(
      () => setCurrentDateTime(new Date()),
      60_000,
    );

    return () => window.clearInterval(intervalId);
  }, []);

  return DATE_TIME_FORMATTER.format(currentDateTime);
};

const Brand = () => {
  const currentDateTime = useCurrentDateTime();

  return (
    <Box className="navbar__brand">
      <Box aria-hidden="true" className="navbar__brand-icon">
        <img src={logoUrl} alt="" className="navbar__brand-icon-img" />
      </Box>
      <Box>
        <Typography component="div" className="navbar__title">
          פלטפורמת תחקור הגנה אווירית
        </Typography>
        <Typography component="div" className="navbar__subtitle">
          ניתוח טקטי בזמן אמת · {currentDateTime}
        </Typography>
      </Box>
    </Box>
  );
};

const DateRangeControls = () => {
  const { dateRange, setDateRange } = useAppFilters();

  const updateDateRange = (
    field: keyof DateRangeFilter,
    value: Dayjs | null,
  ) => {
    if (!value?.isValid()) {
      return;
    }

    const nextValue = value.format("YYYY-MM-DDTHH:mm");

    if (field === "startDate" && nextValue > dateRange.endDate) {
      setDateRange({ startDate: nextValue, endDate: nextValue });
      return;
    }

    if (field === "endDate" && nextValue < dateRange.startDate) {
      setDateRange({ startDate: nextValue, endDate: nextValue });
      return;
    }

    setDateRange({ ...dateRange, [field]: nextValue });
  };

  return (
    <Box className="navbar__date-range">
      <Box className="navbar__date-control">
        <Typography
          component="label"
          htmlFor="start-date-time"
          className="navbar__date-label"
        >
          תאריך ושעת התחלה
        </Typography>
        <DateTimePicker
          value={dayjs(dateRange.startDate)}
          onChange={(value) => updateDateRange("startDate", value)}
          maxDateTime={dayjs(dateRange.endDate)}
          format="DD/MM/YYYY HH:mm"
          ampm={false}
          slotProps={{
            textField: {
              size: "small",
              className: "navbar__date-field",
              slotProps: {
                htmlInput: { id: "start-date-time" },
              },
            },
          }}
        />
      </Box>
      <Box className="navbar__date-control">
        <Typography
          component="label"
          htmlFor="end-date-time"
          className="navbar__date-label"
        >
          תאריך ושעת סיום
        </Typography>
        <DateTimePicker
          value={dayjs(dateRange.endDate)}
          onChange={(value) => updateDateRange("endDate", value)}
          minDateTime={dayjs(dateRange.startDate)}
          format="DD/MM/YYYY HH:mm"
          ampm={false}
          slotProps={{
            textField: {
              size: "small",
              className: "navbar__date-field",
              slotProps: {
                htmlInput: { id: "end-date-time" },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

const OperationalControls = () => (
  <Box className="navbar__controls">
    <Box className="navbar__time-label">
      <ScheduleIcon aria-hidden="true" className="navbar__time-icon" />
      טווח זמן
    </Box>
    <DateRangeControls />
    <Box className="navbar__status">
      <Box aria-hidden="true" className="navbar__status-dot" />
      המערכות פעילות
    </Box>
  </Box>
);

export const MainNavbar = ({
  activeItemId = "investigation-map",
  onNavigate,
}: MainNavbarProps) => {
  const handleNavigate = (itemId: NavigationItemId) => {
    onNavigate?.(itemId);
  };

  return (
    <AppBar
      component="header"
      position="static"
      elevation={0}
      className="navbar"
    >
      <Toolbar className="navbar__top">
        <Brand />
        <OperationalControls />
      </Toolbar>

      <Toolbar
        component="nav"
        aria-label="ניווט ראשי"
        className="navbar__navigation"
      >
        {NAVIGATION_ITEMS.map(({ id, label, Icon: ItemIcon }) => {
          const isActive = id === activeItemId;

          return (
            <Button
              key={id}
              color="inherit"
              startIcon={
                <ItemIcon
                  aria-hidden="true"
                  className="navbar__navigation-icon"
                />
              }
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleNavigate(id)}
              className={`navbar__navigation-item${isActive ? " navbar__navigation-item--active" : ""}`}
            >
              {label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};
