import { Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { Map } from "./components/Map";

export const InvestigationMap = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
        gap: 2,
        p: 2,
        overflow: "hidden",
        backgroundColor: "#0d1110",
      }}
    >
      {/* Right Sidebar */}
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
        {/* Sidebar content */}
      </Box>

      {/* Map Container */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          border: "1px solid rgba(74, 100, 78, 0.4)",
          backgroundColor: "#111714",
          overflow: "hidden",
          position: "relative", 
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
            zIndex: 1000,
          }}
        >
          {/* Header content */}
        </Box>

        {/* Map View */}
        <Box
          sx={{
            flex: 1,
            position: "relative",
            width: "100%",
            height: "calc(100% - 48px)",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              "& .leaflet-container": {
                width: "100%",
                height: "100%",
                background: "#0d1110",
              },
            }}
          >
            <Map />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};