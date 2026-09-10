import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { heIL } from "@mui/x-date-pickers/locales";
import "dayjs/locale/he";
import { AppFiltersProvider } from "./app/filters/AppFiltersContext";
import { MainNavbar, type NavigationItemId } from "./app/layout/MainNavbar";
import "./App.css";
import InfoEventsCard from "./features/investigation-analysis/components/card/TabCard";
import MetricCard from "./features/investigation-analysis/components/card/widget";
import EventDetailsCard from "./features/investigation-analysis/components/card/CardInfo";

const SCREEN_PATHS: Record<NavigationItemId, string> = {
  "investigation-map": "/investigation-map",
  "operational-performance": "/operational-performance",
  "economic-analysis": "/economic-analysis",
};

const PATH_SCREEN_IDS = Object.fromEntries(
  Object.entries(SCREEN_PATHS).map(([screenId, path]) => [path, screenId]),
) as Record<string, NavigationItemId>;

const commandRoomTheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#d5a62f",
    },
    background: {
      default: "#0c140d",
      paper: "#121d13",
    },
  },
  typography: {
    fontFamily: '"Heebo", "Segoe UI", sans-serif',
  },
});
const event = {
  eventId: 1026,
  interceptor: {
    interceptorTypeId: 1,
    type: "PAC-3",
    price: 4000000,
  },
  launcher: {
    launcherId: 1,
    location: {
      lat: 31.7683,
      lng: 35.2137,
    },
  },
  region: "מחוז ירושלים",
  time: "2026-09-09T08:49:00Z",
  eventLocation: {
    lat: 31.775,
    lng: 35.22,
  },
  interceptionStatus: "לא יורט",
  droneInjuryCount: 3,
  eventStatus: "נסגר",
  attackingBody: "גורם מדינתי לא ידוע",
  drone: {
    type: "LoadBee-M2",
    price: 8300,
  },
};



const UnderDevelopmentScreen = () => (
  <Box component="main" className="development-screen">
    <Typography component="h1" className="development-screen__title">
      בפיתוח
    </Typography>
    <InfoEventsCard event={event} />  </Box>
);

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeScreenId =
    PATH_SCREEN_IDS[location.pathname] ?? "investigation-map";

  const handleNavigate = (screenId: NavigationItemId) => {
    navigate(SCREEN_PATHS[screenId]);
  };

  return (
    <>
      <MainNavbar activeItemId={activeScreenId} onNavigate={handleNavigate} />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={SCREEN_PATHS["investigation-map"]} replace />}
        />
        <Route
          path={SCREEN_PATHS["investigation-map"]}
          element={<UnderDevelopmentScreen />}
        />
        <Route
          path={SCREEN_PATHS["operational-performance"]}
          element={<UnderDevelopmentScreen />}
        />
        <Route
          path={SCREEN_PATHS["economic-analysis"]}
          element={<UnderDevelopmentScreen />}
        />
        <Route
          path="*"
          element={<Navigate to={SCREEN_PATHS["investigation-map"]} replace />}
        />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={commandRoomTheme}>
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="he"
        localeText={
          heIL.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <BrowserRouter>
          <AppFiltersProvider>
            <AppRoutes />
          </AppFiltersProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
