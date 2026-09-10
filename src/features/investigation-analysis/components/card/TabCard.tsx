import React, { useState } from "react";
import type { SyntheticEvent } from "react";

import {
  Card,
  CardContent,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import EventDetailsCard, { getEventOutcome } from "./CardInfo";
import type { DefenseEvent } from "./CardInfo";
import { useAIResponse } from "../../../../hooks/useAIResponse";

export interface InfoEventsCardProps {
  event: DefenseEvent;
  title?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`info-events-tabpanel-${index}`}
      aria-labelledby={`info-events-tab-${index}`}
      sx={{
        width: "100%",
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
      }}
    >
      {value === index && (
        <Box
          sx={{
            pt: 2,
            width: "100%",
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default function InfoEventsCard({
  event,
  title = "יירוט",
}: InfoEventsCardProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const { analysis, loading, error } = useAIResponse(event);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // הנקודה בheader - היחידה (מלבד הפאנל העליון בCardInfo) שמשתנה לפי הצלחה/כישלון
  const outcome = getEventOutcome(event.interceptionStatus);
  const outcomeColor = outcome === "success" ? "success.main" : "error.main";

  return (
    <Card
      variant="outlined"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,

        width: 420,
        height: "100vh",

        maxWidth: "none",
        maxHeight: "none",

        /*
         * מעל ה-navbar ושאר התוכן.
         */
        zIndex: (theme) => theme.zIndex.modal + 1,

        display: "flex",
        flexDirection: "column",

        borderRadius: 0,

        overflow: "hidden",
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          flex: 1,

          display: "flex",
          flexDirection: "column",

          minHeight: 0,

          boxSizing: "border-box",

          p: 2,

          "&:last-child": {
            pb: 2,
          },
        }}
      >
        {/* ========================= */}
        {/* כותרת */}
        {/* ========================= */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          {/* Event ID + dot (משתנה לפי הצלחה) */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
              }}
            >
              EVT-{event.eventId}
            </Typography>

            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: outcomeColor,
              }}
            />
          </Box>

          {/* Title */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: "common.white",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Date */}

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
            }}
          >
            {new Intl.DateTimeFormat("he-IL", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(event.time))}
          </Typography>
        </Box>

        {/* ========================= */}
        {/* Tabs */}
        {/* ========================= */}

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="מידע כללי או רצף אירועים"
          sx={{
            width: "100%",
          }}
        >
          <Tab
            label="מידע כללי"
            id="info-events-tab-0"
            aria-controls="info-events-tabpanel-0"
          />

          <Tab
            label="רצף אירועים"
            id="info-events-tab-1"
            aria-controls="info-events-tabpanel-1"
          />
        </Tabs>

        <Divider />

        <TabPanel value={tabIndex} index={0}>
          <EventDetailsCard event={event} />
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          {" "}
          <Typography variant="h6" sx={{ mb: 2 }}>
            {" "}
            רצף אירועים{" "}
          </Typography>{" "}
          {loading ? (
            <Box
              sx={{
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  border: "4px solid",
                  borderColor: "divider",
                  borderTopColor: "primary.main",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                  },
                }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                טוען את רצף האירועים...
              </Typography>
            </Box>
          ) : error ? (
            <Box
              sx={{
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "error.main", fontWeight: 700 }}
              >
                שגיאה בטעינת רצף האירועים
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                לא ניתן היה לקבל את הנתונים מהשרת. נסה שוב מאוחר יותר.
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", lineHeight: 1.8 }}
            >
              {analysis.text}
            </Typography>
          )}
        </TabPanel>
      </CardContent>
    </Card>
  );
}
