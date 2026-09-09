import type { FC, ReactNode } from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const GraphCard: FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  children,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 2,
        p: 2,
        mx: "auto",
      }}
    >
      {/* header */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          pb: 1.5,
        }}
      >
        {icon}

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
            {title}
          </Typography>

          {subtitle && (
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Divider />

      {/* body */}
      <Box sx={{ pt: 1.5 }}>{children}</Box>
    </Box>
  );
};

export default GraphCard;
