import type { CSSProperties, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import "./ChartsRow.css";

interface ChartsRowProps extends PropsWithChildren {
  /** How many charts share the row. Defaults to two. */
  columns?: number;
}

/**
 * One row of the analysis screen. Every chart in a row gets an equal share of
 * the width, so future rows only need their own `ChartsRow` wrapper.
 */
export const ChartsRow = ({ columns = 2, children }: ChartsRowProps) => {
  return (
    <Box className="charts-row" style={{ "--charts-row-columns": columns } as CSSProperties}>
      {children}
    </Box>
  );
};
