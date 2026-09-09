import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MapIcon from "@mui/icons-material/Map";
import MenuIcon from "@mui/icons-material/Menu";
import PaidIcon from "@mui/icons-material/Paid";
import ScheduleIcon from "@mui/icons-material/Schedule";
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

const OperationalControls = () => (
  <Box className="navbar__controls">
    <Box className="navbar__time-label">
      <ScheduleIcon aria-hidden="true" className="navbar__time-icon" />
      טווח זמן
    </Box>
    <Select
      defaultValue="7d"
      size="small"
      IconComponent={KeyboardArrowDownIcon}
      inputProps={{ "aria-label": "טווח זמן" }}
      className="navbar__time-select"
    >
      <MenuItem value="24h">24 שעות</MenuItem>
      <MenuItem value="7d">7 ימים</MenuItem>
      <MenuItem value="30d">30 ימים</MenuItem>
    </Select>
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
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const handleNavigate = (itemId: NavigationItemId) => {
    setMenuAnchor(null);
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

        <IconButton
          color="inherit"
          aria-label="פתיחת תפריט ניווט"
          aria-controls={menuAnchor ? "mobile-navigation" : undefined}
          aria-expanded={Boolean(menuAnchor)}
          onClick={(event) => setMenuAnchor(event.currentTarget)}
          className="navbar__menu-button"
        >
          <MenuIcon aria-hidden="true" className="navbar__menu-icon" />
        </IconButton>
        <Menu
          id="mobile-navigation"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          slotProps={{ paper: { className: "navbar__mobile-menu" } }}
        >
          {NAVIGATION_ITEMS.map(({ id, label, Icon: ItemIcon }) => (
            <MenuItem
              key={id}
              selected={id === activeItemId}
              onClick={() => handleNavigate(id)}
            >
              <ItemIcon aria-hidden="true" className="navbar__mobile-item-icon" />
              {label}
            </MenuItem>
          ))}
        </Menu>
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
