// src/components/InvestigationMap.tsx
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEvents } from "../../hooks/useEvents";

export const InvestigationMap = () => {
  const { events, loading, error } = useEvents();

  return (
    <Box className="development-screen" sx={{ p: 3 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        מפה (רשימת אירועים)
      </Typography>

      {loading && <Typography>טוען אירועים...</Typography>}
      {error && <Typography color="error">שגיאה: {error}</Typography>}

      {!loading && !error && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h6">אירוע #{index + 1}</Typography>
              <Box component="pre" sx={{ m: 0, fontSize: "0.875rem" }}>
                {JSON.stringify(event, null, 2)}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
