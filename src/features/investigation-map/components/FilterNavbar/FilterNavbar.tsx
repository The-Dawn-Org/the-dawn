import SearchIcon from "@mui/icons-material/Search";
import { Box, Button } from "@mui/material";
import { type FC } from "react";
import { FilterDropdown } from "../FilterEvents/FilterEvents";
import { useMapFilters } from "../../context/MapFiltersContext";

export const FiltersNavbar: FC = () => {
    const { applyFilters, hasPendingChanges, loading } = useMapFilters();

    return (
        <Box
            dir={"rtl"}
            sx={{
                width: "100%",
                height: 66,
                borderRadius: "12px",
                border: "1px solid #33472A",
                background: "linear-gradient(135deg, #151e14 0%, #121a11 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "right",
                gap: "15px",
                boxSizing: "border-box",
                padding: "15px",
                marginTop: "20px",
            }}
        >
            {/* Dropdowns sit on the right (RTL start); the search button is
                rendered after them so it lands to their left. */}
            <Box sx={{ marginLeft: "15px" }}>
                <FilterDropdown />
            </Box>

            <Button
                onClick={applyFilters}
                disabled={loading}
                endIcon={<SearchIcon />}
                variant="contained"
                sx={{
                    flexShrink: 0,
                    height: 40,
                    textTransform: "none",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    borderRadius: "8px",
                    backgroundColor: hasPendingChanges ? "#D4A843" : "#33472A",
                    color: hasPendingChanges ? "#151e14" : "#dfe7dc",
                    "&:hover": {
                        backgroundColor: hasPendingChanges ? "#e0b955" : "#3f5733",
                    },
                }}
            >
                חיפוש
            </Button>
        </Box>
    );
};
