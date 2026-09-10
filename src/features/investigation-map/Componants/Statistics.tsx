import { Box, Grid, Typography } from "@mui/material";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import type { FC } from "react";
import type { Event } from "../../../types";

type StatisticsProps = {
    events: Event[];
};

const GREEN = "#8BAE5A";
const YELLOW = "#D4A843";
const RED = "#C44536";

export const Statistics: FC<StatisticsProps> = ({ events }) => {
    const intercepted = events.filter((event) => event.interceptionStatus === "יורט").length;

    const notIntercepted = events.filter((event) => event.interceptionStatus === "לא יורט").length;

    const interceptedPercentage = (intercepted * 100) / events.length;

    const totalPrice = events.reduce(
        (totalPrice, event) => totalPrice + event.interceptor.price,
        0
    );

    const formatPrice =
        totalPrice <= 1000
            ? totalPrice
            : totalPrice <= 1000000
            ? `$${(totalPrice / 1_000).toFixed(1)}K`
            : `$${(totalPrice / 1_000_000).toFixed(1)}M`;

    const totalInjured = events.reduce(
        (totalInjured, event) => totalInjured + event.droneInjuryCount,
        0
    );

    const stats = [
        {
            label: "אירועים",
            value: events.length.toString(),
            color: GREEN,
            icon: <ShowChartIcon />,
        },
        {
            label: "יורטו",
            value: intercepted.toString(),
            color: GREEN,
            icon: <ShieldOutlinedIcon />,
        },
        {
            label: "לא יורטו",
            value: notIntercepted.toString(),
            color: RED,
            icon: <TrackChangesIcon />,
        },
        {
            label: "אחוז הצלחה",
            value: interceptedPercentage.toString(),
            color:
                interceptedPercentage >= 90 ? GREEN : interceptedPercentage <= 70 ? RED : YELLOW,
            icon: <PercentOutlinedIcon />,
        },
        {
            label: "נפגעים",
            value: totalInjured.toString(),
            color: YELLOW,
            icon: <PeopleAltOutlinedIcon />,
        },
        {
            label: "עלות מבצעית",
            value: formatPrice.toString(),
            color: totalPrice < 3000000 ? GREEN : totalPrice < 10000000 ? YELLOW : RED,
            icon: <AttachMoneyIcon />,
        },
    ];

    return (
        <Grid container spacing={1} sx={{ mb: 1.5 }}>
            {stats.map((stat) => (
                <Grid key={stat.label} size={{ xs: 6 }}>
                    <Stats {...stat} />
                </Grid>
            ))}
        </Grid>
    );
};

export const Stats = ({
    label,
    value,
    color,
    icon,
}: {
    label: string;
    value: string;
    color: string;
    icon: React.ReactNode;
}) => {
    return (
        <Box
            sx={{
                height: 66,
                borderRadius: "12px",
                border: "1px solid #263d20",
                background: "linear-gradient(135deg, #151e14 0%, #121a11 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Icon */}
            <Box
                sx={{
                    position: "absolute",
                    top: 9,
                    left: 9,
                    color,
                    display: "flex",
                    "& svg": {
                        fontSize: 16,
                    },
                }}
            >
                {icon}
            </Box>

            {/* Label */}
            <Typography
                sx={{
                    position: "absolute",
                    top: 9,
                    right: 10,
                    color: "#667563",
                    fontSize: 10,
                    fontWeight: 500,
                }}
            >
                {label}
            </Typography>

            {/* Value */}
            <Typography
                sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 10,
                    color,
                    fontSize: 20,
                    fontWeight: 600,
                    lineHeight: 1,
                    direction: "ltr",
                }}
            >
                {value}
            </Typography>
        </Box>
    );
};
