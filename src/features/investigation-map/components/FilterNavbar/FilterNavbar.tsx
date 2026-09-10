import { Box } from "@mui/material";
import { type FC } from "react";
import { FilterDropdown } from "../FilterEvents/FilterEvents";

export const FiltersNavbar: FC = () => {
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
                boxSizing: "border-box",
                padding: "15px",
                marginTop: "20px",
            }}
        >
            <Box sx={{ marginLeft: "15px" }}>
                <FilterDropdown />
            </Box>
        </Box>
    );
};
