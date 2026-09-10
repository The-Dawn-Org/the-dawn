import { Box, Divider, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

interface GraphContainerProps extends PropsWithChildren {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export const GraphContainer = ({
  children,
  icon,
  title,
  subtitle,
}: GraphContainerProps) => (
  <Box component="section" className="economic-graph">
    <Box className="economic-graph__header">
      <Box className="economic-graph__heading">
        <Box aria-hidden="true" className="economic-graph__icon">
          {icon}
        </Box>
        <Box>
          <Typography component="h2" className="economic-graph__title">
            {title}
          </Typography>
          {subtitle && (
            <Typography component="p" className="economic-graph__subtitle">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
    <Divider className="economic-graph__divider" />
    <Box className="economic-graph__content">{children}</Box>
  </Box>
);
