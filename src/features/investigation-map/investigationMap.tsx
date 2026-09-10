import { useState, useEffect, type FC } from "react";
import { Box, Button, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Map } from "./components/Map";
import { OpenInFull, CloseFullscreen, LocationOn } from "@mui/icons-material";
import { useEvents, type FilterEventsDto } from "../../hooks/useEvents";
import { StatisticsEventLogs } from "./Componants/EventsAndStatistics";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { useAppFilters } from "../../app/filters/AppFiltersContext";

export const InvestigationMap: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<Boolean>(false);

  const { dateRange } = useAppFilters();
  const { events } = useEvents({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const toggleFullscreen = (): void => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 0);

    return () => clearTimeout(timer);
  }, [isFullscreen]);

  const legendItems = [
    { label: "יוורט", color: "#00b894" },
    { label: "לא יוורט", color: "#d63031" },
    { label: "נפגעים", color: "#fdcb6e" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        gap: isFullscreen ? 0 : 2,
        p: isFullscreen ? 0 : 2,
        overflow: "hidden",
        backgroundColor: "#0d1110",
      }}
    >
      {!isFullscreen && (
        <Box
          sx={{
            width: "450px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <StatisticsEventLogs events={events} />
        </Box>
      )}

      {/* Map Container */}
      <Box
        sx={{
          flex: 1,
          height: isFullscreen ? "100vh" : "100%",
          width: isFullscreen ? "100vw" : "auto",
          display: "flex",
          flexDirection: "column",
          borderRadius: isFullscreen ? 0 : "12px",
          border: isFullscreen ? "none" : "1px solid rgba(74, 100, 78, 0.4)",
          backgroundColor: "#111714",
          overflow: "hidden",
          position: isFullscreen ? "fixed" : "relative",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: isFullscreen ? 99999 : 1,
        }}
      >
        {/* Map Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            height: "48px",
            boxSizing: "border-box",
            flexShrink: 0,
            borderBottom: "1px solid rgba(74, 100, 78, 0.3)",
            backgroundColor: "#161e1a",
            position: "relative",
            zIndex: 10,
            dir: "rtl",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn sx={{ color: "#706fd3", fontSize: "1.3rem" }} />
            <Typography
              sx={{
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              תחקיר גיאוגרפי – {events?.length || 0} אירועים
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {legendItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#a3b1b0",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              onClick={toggleFullscreen}
              sx={{
                backgroundColor: "#192019",
                color: "#a3b1b0",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  backgroundColor: "#232b23",
                  color: "#ffffff",
                },
              }}
            >
              {isFullscreen ? "יציאה ממסך מלא" : "מסך מלא"}
              {isFullscreen ? (
                <CloseFullscreen sx={{ fontSize: "1.1rem" }} />
              ) : (
                <OpenInFull sx={{ fontSize: "1.1rem" }} />
              )}
            </Button>
          </Box>
        </Box>

        {/* Map View */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "calc(100% - 48px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              "& .leaflet-container": {
                width: "100%",
                height: "100%",
                background: "#0d1110",
              },
            }}
          >
            <Map isFullscreen={isFullscreen} events={events} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
