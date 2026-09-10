import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import MetricCard, { type EventOutcome } from './widget';

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


const formatCurrency = (value: number) =>
  new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(value);

const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat('he-IL', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso));

  export function getEventOutcome(interceptionStatus: string): EventOutcome {
    return interceptionStatus.includes("לא") ? "error" : "success";
  }

export default function EventDetailsCard({ event }: EventDetailsCardProps) {
  const wasIntercepted = !event.interceptionStatus.includes('לא');

  return (
    <Box sx={{ width: '100%', maxWidth: 720 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          bgcolor: '#1e1e1e',
          borderColor: wasIntercepted ? 'success.main' : 'error.main',
          color: 'common.white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight:700, color: wasIntercepted ? 'success.main' : 'error.main' }}
          >
            {event.interceptionStatus}
          </Typography>
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              border: '2px solid',
              borderColor: wasIntercepted ? 'success.main' : 'error.main',
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {`האיום שוגר על ידי ${event.attackingBody} באזור ${event.region}`}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="מזהה אירוע" value={String(event.eventId)} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="סטטוס אירוע" value={event.eventStatus} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="מערכת הגנה" value={event.interceptor.type} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="נזק כספי" value={formatCurrency(event.interceptor.price - event.drone.price)} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="גזרה" value={event.region} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="גורם תוקף" value={event.attackingBody} />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="סוג רחפן" value={event.drone.type} />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="זמן אירוע" value={formatDateTime(event.time)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MetricCard fullWidth label="נפגעים מהרחפן" value={String(event.droneInjuryCount)} />
        </Grid>

      </Grid>
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
  eventStatus: 'נסגר',
  attackingBody: 'גורם מדינתי לא ידוע',
  drone: { type: 'LoadBee-M2', price: 8300 },
};

<EventDetailsCard event={event} />
*/
