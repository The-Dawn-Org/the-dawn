import { Box, Paper, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface InfoCardProps {
    label: string;
    value: string | number;
    unit?: string;
    icon: SvgIconComponent;
    accentColor: string;
    sublabel?: string;
}

export const InfoCard = ({
    label,
    value,
    unit,
    icon: Icon,
    accentColor,
    sublabel,
}: InfoCardProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                position: "relative",
                overflow: "hidden",
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(42, 54, 34, 1)",
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 1,
                "&:hover .info-card-icon": {
                    transform: "scale(1.2)",
                },
            }}
        >
            {/* top accent line */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    insetInline: 0,
                    height: 2,
                    opacity: 0.7,
                    background: `linear-gradient(270deg, ${accentColor}, transparent)`,
                }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                    sx={{
                        fontSize: 11,
                        letterSpacing: "0.05em",
                        color: "text.secondary",
                        fontWeight: 500,
                    }}
                >
                    {label}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 700,
                            fontFamily: "monospace",
                            color: accentColor,
                        }}
                    >
                        {value}
                    </Typography>
                    {unit && (
                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                            {unit}
                        </Typography>
                    )}
                </Box>

                {sublabel && (
                    <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                        {sublabel}
                    </Typography>
                )}
            </Box>

            <Box
                className="info-card-icon"
                sx={{
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: `${accentColor}15`,
                    color: accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.4s ease",
                }}
            >
                <Icon sx={{ fontSize: 20 }} />
            </Box>
        </Paper>
    );
};