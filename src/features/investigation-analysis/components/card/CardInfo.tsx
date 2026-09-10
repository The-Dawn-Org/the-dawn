import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import MetricCard from "./widget";
import type { EventOutcome } from "./widget";

// --- טיפוסים לפי מבנה האובייקט שהתקבל ---

export interface InterceptorInfo {
  interceptorTypeId: number;
  type: string;
  price: number;
}

export interface LauncherLocation {
  lat: number;
  lng: number;
}

export interface LauncherInfo {
  launcherId: number;
  location: LauncherLocation;
}

export interface DroneInfo {
  type: string;
  price: number;
}

export interface EventLocation {
  lat: number;
  lng: number;
}

export interface DefenseEvent {
  eventId: number;
  interceptor: InterceptorInfo;
  launcher: LauncherInfo;
  region: string;
  time: string;
  eventLocation: EventLocation;
  interceptionStatus: string;
  droneInjuryCount: number;
  eventStatus: string;
  attackingBody: string;
  drone: DroneInfo;
}

export interface EventDetailsCardProps {
  event: DefenseEvent;
}

// --- פונקציה משותפת לקביעת הצלחה/כישלון (משמשת גם את TabCard) ---

export function getEventOutcome(interceptionStatus: string): EventOutcome {
  return interceptionStatus.includes("לא") ? "error" : "success";
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));

export default function EventDetailsCard({ event }: EventDetailsCardProps) {
  const outcome = getEventOutcome(event.interceptionStatus);
  const accentColor = outcome === "success" ? "success.main" : "error.main";

  // הנתונים לוידג'טים - מרוכזים במערך אחד כדי לפרוש בגריד אחיד
  const metrics: { label: string; value: string }[] = [
    { label: "סטטוס אירוע", value: event.eventStatus },
    { label: "מזהה אירוע", value: String(event.eventId) },
    { label: "נזק כספי", value: formatCurrency(event.interceptor.price - event.drone.price) },
    { label: "מערכת הגנה", value: event.interceptor.type },
    { label: "נפגעים מהרחפן", value: String(event.droneInjuryCount) },
    { label: "גזרה", value: event.region },
    { label: "זמן אירוע", value: formatDateTime(event.time) },
    { label: "סוג רחפן", value: event.drone.type },
    { label: "גורם תוקף", value: event.attackingBody },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* פאנל עליון - היחיד (מלבד הנקודה בheader) שמשתנה לפי הצלחה/כישלון */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          bgcolor: "#1e1e1e",
          borderColor: accentColor,
          color: "common.white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: accentColor }}>
            {event.interceptionStatus}
          </Typography>
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: accentColor,
              flexShrink: 0,
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          {`האיום שוגר על ידי ${event.attackingBody} באזור ${event.region}`}
        </Typography>
      </Paper>

      {/* גריד אמיתי (CSS Grid) - שתי עמודות שוות תמיד, בלי תלות בתוכן */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          width: "100%",
        }}
      >
        {metrics.map((metric, index) => {
          const isDanglingLast = index === metrics.length - 1 && metrics.length % 2 !== 0;

          return (
            <Box
              key={metric.label}
              sx={{ gridColumn: isDanglingLast ? "1 / -1" : undefined }}
            >
              <MetricCard fullWidth label={metric.label} value={metric.value} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/*
דוגמת שימוש:

const event: DefenseEvent = {
  eventId: 1,
  interceptor: { interceptorTypeId: 1, type: 'PAC-3', price: 4000000 },
  launcher: { launcherId: 1, location: { lat: 31.7683, lng: 35.2137 } },
  region: 'מחוז ירושלים',
  time: '2026-09-08T18:05:44Z',
  eventLocation: { lat: 31.775, lng: 35.22 },
  interceptionStatus: 'לא יורט',
  droneInjuryCount: 3,
  eventStatus: 'נסגר',
  attackingBody: 'גורם מדינתי לא ידוע',
  drone: { type: 'LoadBee-M2', price: 8300 },
};

<EventDetailsCard event={event} />
*/