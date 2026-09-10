import type { PropsWithChildren } from "react";
import { Box, Typography, Stack, type StackProps } from "@mui/material";
import "./ChartCard.css";

interface ChartCardProps extends PropsWithChildren, StackProps {
  title: string;
  subtitle?: string;
}

export const ChartCard = ({
  title,
  subtitle,
  children,
  ...stackProps
}: ChartCardProps) => {
  return (
    <Stack component="section" className="chart-card" {...stackProps}>
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
    </Stack>
  );
};
