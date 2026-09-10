import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
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
import { InvestigationMap } from "./features/investigation-map/investigationMap";
import { EconomicAnalysis } from "./features/economic-analysis/EconomicAnalysis";
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    kpi: {
      gold: string;
      red: string;
      lightGreen: string;
      darkGreen: string;
    };
  }
  interface PaletteOptions {
    kpi?: {
      gold: string;
      red: string;
      lightGreen: string;
      darkGreen: string;
    };
  }
}

const SCREEN_PATHS: Record<NavigationItemId, string> = {
  "investigation-map": "/investigation-map",
  "operational-performance": "/operational-performance",
  "economic-analysis": "/economic-analysis",
};

const PATH_SCREEN_IDS = Object.fromEntries(
  Object.entries(SCREEN_PATHS).map(([screenId, path]) => [path, screenId])
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
    kpi: {
      gold: "#D4A843",
      red: "#C44536",
      lightGreen: "#8BAE5A",
      darkGreen: "#6FA84B",
    },
  },
  typography: {
    fontFamily: '"Heebo", "Segoe UI", sans-serif',
  },
});

// // Mock data TODO: delete in prod
// const events_STUB: InterceptionEvent[] = [
//   {
//     "eventId": 0,
//     "interceptor": { "interceptorTypeId": 0, "type": "תמיר", "price": 50000 },
//     "launcher": { "launcherId": 0, "location": { "lat": 32.0853, "lng": 34.7818 } },
//     "region": "מרכז",
//     "time": "2026-09-08T14:32:10Z",
//     "eventLocation": { "lat": 32.0900, "lng": 34.7900 },
//     "interceptionStatus": "יורט",
//     "eventStatus": "סגור",
//     "attackingBody": "עזה",
//     "drone": { "type": "ננוסוורם קיו-9", "price": 900 },
//     "droneInjuryCount": 0
//   },
//   {
//     "eventId": 1,
//     "interceptor": { "interceptorTypeId": 1, "type": "פק-3", "price": 4000000 },
//     "launcher": { "launcherId": 1, "location": { "lat": 31.7683, "lng": 35.2137 } },
//     "region": "צפון",
//     "time": "2026-09-08T18:05:44Z",
//     "eventLocation": { "lat": 31.7750, "lng": 35.2200 },
//     "interceptionStatus": "לא יורט",
//     "eventStatus": "סגור",
//     "attackingBody": "לבנון",
//     "drone": { "type": "לואדבי אמ-2", "price": 8300 },
//     "droneInjuryCount": 0
//   },
//   {
//     "eventId": 2,
//     "interceptor": { "interceptorTypeId": 2, "type": "סטאנר", "price": 1000000 },
//     "launcher": { "launcherId": 2, "location": { "lat": 32.7940, "lng": 34.9896 } },
//     "region": "גליל מערבי",
//     "time": "2026-09-09T02:17:59Z",
//     "eventLocation": { "lat": 32.8000, "lng": 34.9950 },
//     "interceptionStatus": "יש נפגעים",
//     "eventStatus": "סגור",
//     "attackingBody": "לבנון",
//     "drone": { "type": "פלקון-לונג אקס-2", "price": 18000 },
//     "droneInjuryCount": 2
//   },
//   {
//     "eventId": 3,
//     "interceptor": { "interceptorTypeId": 4, "type": "חץ 3 יירוט", "price": 3500000 },
//     "launcher": { "launcherId": 3, "location": { "lat": 29.5581, "lng": 34.9482 } },
//     "region": "דרום",
//     "time": "2026-09-09T05:48:21Z",
//     "eventLocation": { "lat": 29.5600, "lng": 34.9600 },
//     "interceptionStatus": "יורט",
//     "eventStatus": "סגור",
//     "attackingBody": "עזה",
//     "drone": { "type": "פלקון-לונג אקס-2", "price": 18000 },
//     "droneInjuryCount": 0
//   },
//   {
//     "eventId": 4,
//     "interceptor": { "interceptorTypeId": 3, "type": "סי-רם ראונד", "price": 15000 },
//     "launcher": { "launcherId": 0, "location": { "lat": 32.0853, "lng": 34.7818 } },
//     "region": "מרכז",
//     "time": "2026-09-09T07:03:12Z",
//     "eventLocation": { "lat": 32.0870, "lng": 34.7850 },
//     "interceptionStatus": "יש נפגעים",
//     "eventStatus": "סגור",
//     "attackingBody": "עזה",
//     "drone": { "type": "סקימייט סי-7", "price": 2500 },
//     "droneInjuryCount": 4
//   },
// ];

const UnderDevelopmentScreen = () => {
  // האירוע שנבחר בטבלה - כשהוא לא null, הפופאפ פתוח
  // const [selectedEvent, setSelectedEvent] = useState<InterceptionEvent | null>(null);

  // const handleRowClick = (info: InterceptionEvent) => {
  //   setSelectedEvent(info);
  // };

  // const handleClosePopup = () => {
  //   setSelectedEvent(null);
  // };

  return (
    <Box component="main" className="development-screen">
      <Typography component="h1" className="development-screen__title">
        בפיתוח
      </Typography>

      {/* <Box
        sx={{
          width: "30%",
          minWidth: "600px",
          marginLeft: "auto",
        }}
      >
        <GenericTable
          targetSubjects={events_STUB}
          columns={columns}
          title="יומן אירועים"
          icon={<ShowChartIcon sx={{ color: "#8ABB4C" }} />}
          onRowClick={handleRowClick}
        />
      </Box>

      {selectedEvent && (
        <InfoEventsCard event={selectedEvent} onClose={handleClosePopup} />
      )} */}
    </Box>
  );
};

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
          element={<InvestigationMap />}
        />
        <Route
          path={SCREEN_PATHS["operational-performance"]}
          element={<UnderDevelopmentScreen />}
        />
        <Route
          path={SCREEN_PATHS["economic-analysis"]}
          element={<EconomicAnalysis />}
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
