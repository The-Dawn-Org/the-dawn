import type { PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import "./ChartCard.css";

interface ChartCardProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <Box component="section" className="chart-card">
      <Box className="chart-card__header">
        <Typography component="h2" className="chart-card__title">
          {title}
        </Typography>
        {subtitle ? (
          <Typography component="p" className="chart-card__subtitle">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      <Box className="chart-card__body">{children}</Box>
    </Box>
  );
};
