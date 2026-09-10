import CheckIcon from "@mui/icons-material/Check";

import {
    Box,
    Checkbox,
    FormControl,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
    type SelectChangeEvent,
} from "@mui/material";

import { SYSTEM_OPTIONS, type FilterOption } from "../../constants/systems";
import {
    useMapFilters,
    type MapFilterSelections,
} from "../../context/MapFiltersContext";

interface SelectConfig {
    key: keyof MapFilterSelections;
    title: string;
    options: FilterOption[];
}

/** For dropdowns where the label and the filter value are the same string. */
const toOptions = (values: string[]): FilterOption[] =>
    values.map((value) => ({ value, label: value }));

const selectsConfig: SelectConfig[] = [
    {
        key: "region",
        title: "גזרות",
        options: toOptions(["צפון", "דרום", "מרכז", "גליל מערבי"]),
    },

    {
        key: "type",
        title: "מערכות",
        // Hebrew label is shown, English value is used for filtering.
        options: SYSTEM_OPTIONS,
    },

    {
        key: "launchRegion",
        title: "מקום שיגור",
        options: toOptions(["עזה", "לבנון"]),
    },

    {
        key: "status",
        title: "סטטוס יירוט",
        options: toOptions(["יורט", "לא יורט", "יש נפגעים"]),
    },
];

export const FilterDropdown = () => {
    const { selections, setSelection } = useMapFilters();

    const handleChange =
        (key: keyof MapFilterSelections) =>
        (event: SelectChangeEvent<string[]>) => {
            const { value } = event.target;

            setSelection(
                key,
                typeof value === "string" ? value.split(",") : value,
            );
        };

    const renderValue = (config: SelectConfig) => (selected: string[]) => {
        const labels = selected.map(
            (value) =>
                config.options.find((option) => option.value === value)?.label ??
                value,
        );

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
                    {config.title}
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
                    {labels.length > 1
                        ? `${labels.length} נבחרו`
                        : labels.length === 0
                        ? "הכל"
                        : labels[0]}
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
                        value={selections[cfg.key]}
                        onChange={handleChange(cfg.key)}
                        input={<OutlinedInput />}
                        renderValue={renderValue(cfg)}
                        sx={{ direction: "rtl", textAlign: "right" }}
                        MenuProps={{ slotProps: { paper: { sx: { direction: "rtl" } } } }}
                    >
                        {cfg.options.map((opt) => (
                            <MenuItem
                                key={opt.value}
                                value={opt.value}
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
                                    primary={opt.label}
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
                                    checked={selections[cfg.key].indexOf(opt.value) > -1}
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
