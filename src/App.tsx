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
import { MainNavbar, type NavigationItemId } from "./app/layout/MainNavbar"
import { useExportStatistics } from "./features/midnight-report/pdf-export/hooks/useExportStatisticsPdf";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { heIL } from "@mui/x-date-pickers/locales";
import "dayjs/locale/he";
import { AppFiltersProvider } from "./app/filters/AppFiltersContext";
import "./App.css";

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

const UnderDevelopmentScreen = () => {

  const { exportStatistics } = useExportStatistics();

  const statistics = {
    investigations: 42,
    completed: 31,
    pending: 11,
  };

  const handleExport = async () => {
    try {
      const pdf = await exportStatistics(statistics);
  
      const url = URL.createObjectURL(pdf);
      const link = document.createElement("a");
  
      link.href = url;
      link.download = "statistics.pdf";
      link.click();
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export statistics:", error);
    }
  };

  return (
  <Box component="main" className="development-screen">
    <Typography component="h1" className="development-screen__title">
      בפיתוח
    </Typography>
    <button
     className="export-to-pdf-button"
     onClick={handleExport}>
        יצא לקובץ PDF
      </button>
  </Box>
  )
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
