import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

const launchesByDay = [
  { day: "Sun", value: 12 },
  { day: "Mon", value: 19 },
  { day: "Tue", value: 15 },
  { day: "Wed", value: 24 },
  { day: "Thu", value: 18 },
  { day: "Fri", value: 27 },
  { day: "Sat", value: 21 },
];

const launchesByHour = [
  { hour: "00:00", value: 2 },
  { hour: "04:00", value: 4 },
  { hour: "08:00", value: 12 },
  { hour: "12:00", value: 25 },
  { hour: "16:00", value: 31 },
  { hour: "20:00", value: 18 },
];

const statusData = [
  { id: 0, value: 42, label: "Completed" },
  { id: 1, value: 18, label: "Active" },
  { id: 2, value: 8, label: "Failed" },
];

export const StatisticsPage = () => {
  return (
    <Box
      data-statistics-page
      sx={{
        p: 3,
      }}
    >
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Statistics
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Overview of investigation activity and system events
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {/* Total launches */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Total launches
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              136
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Active investigations
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              18
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Completed
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              42
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography color="text.secondary">
              Failed
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mt: 1,
              }}
            >
              8
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Launches by day
            </Typography>

            <BarChart
              height={350}
              xAxis={[
                {
                  scaleType: "band",
                  data: launchesByDay.map((item) => item.day),
                },
              ]}
              series={[
                {
                  data: launchesByDay.map((item) => item.value),
                  label: "Launches",
                },
              ]}
              margin={{
                left: 50,
                right: 20,
                top: 20,
                bottom: 40,
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Investigation status
            </Typography>

            <PieChart
              height={350}
              series={[
                {
                  data: statusData,
                  innerRadius: 70,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
              }}
            >
              Activity by hour
            </Typography>

            <LineChart
              height={350}
              xAxis={[
                {
                  scaleType: "point",
                  data: launchesByHour.map((item) => item.hour),
                },
              ]}
              series={[
                {
                  data: launchesByHour.map((item) => item.value),
                  label: "Activity",
                  curve: "linear",
                },
              ]}
              margin={{
                left: 50,
                right: 20,
                top: 20,
                bottom: 40,
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatisticsPage;