import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

import {
    Box,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
    Typography,
} from "@mui/material";

const selectsConfig = [
    { key: "גזרות", title: "גזרות", options: ["צפון", "דרום", "מרכז", "גליל מערבי"] },

    {
        key: "מערכות",
        title: "מערכות",
        options: [
            "BuzzStop-15",
            "NetWing-30",
            "DartFox-S",
            "SpearMini-70",
            "SkyLance-M",
            "FalconClip-H",
            "SwarmMist-5",
            "MicroNet-R",
        ],
    },

    { key: "מקום שיגור", title: "מקום שיגור", options: ["עזה", "לבנון"] },

    { key: "סטטוס יירוט", title: "סטטוס יירוט", options: ["יורט", "לא יורט", "יש נפגעים"] },
];

export const FilterDropdown = () => {
    const [values, setValues] = useState(
        Object.fromEntries(selectsConfig.map((cfg) => [cfg.key, []]))
    );

    const handleChange = (key) => (event) => {
        const { value } = event.target;

        setValues((prev) => ({
            ...prev,

            [key]: typeof value === "string" ? value.split(",") : value,
        }));
    };

    const renderValue = (title) => (selected) => {
        const selectedValues = selected as string[];

        return (
            <Box
                sx={{
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    textTransform: "none",
                    justifyContent: "center",
                    minHeight: "25px",
                    maxWidth: "130px",
                }}
            >
                <Typography
                    sx={{
                        color: "#777",
                        fontSize: 12,
                        marginLeft: "auto",
                        marginRight: 1,
                        fontWeight: "light",
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        color: "#fff",
                        fontSize: 16,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginLeft: "auto",
                        marginRight: 1,
                    }}
                >
                    {selectedValues.length > 1
                        ? `${selected.length} נבחרו`
                        : selectedValues.length === 0
                        ? "הכל"
                        : selected[0]}
                </Typography>
            </Box>
        );
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, direction: "rtl" }}>
            {selectsConfig.map((cfg) => (
                <FormControl key={cfg.key} size="small" sx={{ flex: 1, minWidth: 180 }}>
                    <Select
                        multiple
                        displayEmpty
                        value={values[cfg.key]}
                        onChange={handleChange(cfg.key)}
                        input={<OutlinedInput />}
                        renderValue={renderValue(cfg.title)}
                        sx={{ direction: "rtl", textAlign: "right" }}
                        MenuProps={{ PaperProps: { sx: { direction: "rtl" } } }}
                    >
                        {cfg.options.map((opt) => (
                            <MenuItem
                                key={opt}
                                value={opt}
                                sx={{
                                    "&.Mui-selected": {
                                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                                        "&:hover": {
                                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={opt}
                                    sx={{
                                        maxWidth: "120px",
                                        height: "25px",
                                        "& .MuiListItemText-primary": {
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            fontSize: 12,
                                        },
                                    }}
                                />
                                <Checkbox
                                    checked={values[cfg.key].indexOf(opt) > -1}
                                    icon={<span />}
                                    checkedIcon={<CheckIcon sx={{ color: "#D4A843" }} />}
                                    sx={{ padding: 0 }}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ))}
        </Box>
    );
};
