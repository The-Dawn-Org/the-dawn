import { type ReactNode } from "react";
import { Paper, Box, Typography } from "@mui/material";

export type EventOutcome = "success" | "error";

export interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  status?: EventOutcome;
}

export default function MetricCard({
  label,
  value,
  icon,
  fullWidth,
  status = "success",
}: MetricCardProps) {
  const accentColor = status === "success" ? "success.main" : "error.main";

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        gap: 1.5,

        px: 2.5,
        py: 1.5,

        borderRadius: 5,

        bgcolor: "#1e1e1e",

        borderColor: accentColor,

        color: "common.white",

        width: fullWidth ? "100%" : "fit-content",

        boxSizing: "border-box",
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
          }}
        >
          {label}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </Box>

      {icon ?? (
        <Box
          sx={{
            width: 16,
            height: 16,

            borderRadius: "50%",

            border: "2px solid",

            borderColor: accentColor,

            flexShrink: 0,
          }}
        />
      )}
    </Paper>
  );
}