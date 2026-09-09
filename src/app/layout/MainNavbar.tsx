import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import type { IconProps } from "@mui/material";
import "./MainNavbar.css";

export type NavigationItemId =
  | "investigation-map"
  | "operational-performance"
  | "economic-analysis";

interface MainNavbarProps {
  activeItemId?: NavigationItemId;
  onNavigate?: (itemId: NavigationItemId) => void;
}

const NAVIGATION_ITEMS = [
  { id: "investigation-map", label: "מפת אירועים", icon: "map" },
  {
    id: "operational-performance",
    label: "ביצועים אופרטיביים",
    icon: "bar_chart",
  },
  { id: "economic-analysis", label: "עלויות ומלאי", icon: "paid" },
] as const;

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

const SelectArrowIcon = (props: IconProps) => (
  <Icon {...props}>keyboard_arrow_down</Icon>
);

const Brand = () => {
  const currentDateTime = useCurrentDateTime();

  return (
    <Box className="navbar__brand">
      <Box aria-hidden="true" className="navbar__brand-icon">
        <Icon aria-hidden="true" className="navbar__brand-icon-svg">
          radar
        </Icon>
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
      <Icon aria-hidden="true" className="navbar__time-icon">
        schedule
      </Icon>
      טווח זמן
    </Box>
    <Select
      defaultValue="7d"
      size="small"
      IconComponent={SelectArrowIcon}
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
          <Icon aria-hidden="true" className="navbar__menu-icon">
            menu
          </Icon>
        </IconButton>
        <Menu
          id="mobile-navigation"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          slotProps={{ paper: { className: "navbar__mobile-menu" } }}
        >
          {NAVIGATION_ITEMS.map((item) => (
            <MenuItem
              key={item.id}
              selected={item.id === activeItemId}
              onClick={() => handleNavigate(item.id)}
            >
              <Icon aria-hidden="true" className="navbar__mobile-item-icon">
                {item.icon}
              </Icon>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>

      <Toolbar
        component="nav"
        aria-label="ניווט ראשי"
        className="navbar__navigation"
      >
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = item.id === activeItemId;

          return (
            <Button
              key={item.id}
              color="inherit"
              startIcon={
                <Icon aria-hidden="true" className="navbar__navigation-icon">
                  {item.icon}
                </Icon>
              }
              aria-current={isActive ? "page" : undefined}
              onClick={() => handleNavigate(item.id)}
              className={`navbar__navigation-item${isActive ? " navbar__navigation-item--active" : ""}`}
            >
              {item.label}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  );
};
