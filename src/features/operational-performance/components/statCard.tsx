import { Box, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

export interface StatCardProps {
  /** Any icon node — MUI icon, SVG, img */
  icon: ReactNode;
  /** Label above the value */
  title: string;
  /** The number/text to display */
  value: string | number;
  /** Accent color for icon + value */
  accent?: string;
}

export const StatSumCard = ({
  icon,
  title,
  value,
  accent = "#7CE06A",
}: StatCardProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 2.5,
        minWidth: 220,
        px: 2.5,
        py: 2,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        border: "1px solid",
        borderColor: `${accent}2E`,
        width: "100%",
      }}
    >
      {/* Icon tile */}
      <Box
        sx={{
          flexShrink: 0,
          width: 48,
          height: 48,
          display: "grid",
          placeItems: "center",
          borderRadius: 2.5,
          bgcolor: `${accent}14`,
          color: accent,
          "& svg": { fontSize: 26, display: "block" },
        }}
      >
        {icon}
      </Box>

      {/* Text block */}
      <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
        <Typography
          noWrap
          sx={{
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.4,
            color: `${accent}99`,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "baseline",
            gap: 0.75,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: accent,
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
