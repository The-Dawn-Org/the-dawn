import { TableCell, TableRow } from "@mui/material";
import type { Column } from "../../types/tableTypes";
import { HIGHLIGHT_GREEN } from "./consts";

interface GenericTableRowProps<T> {
    targetSubject: T;
    columns: Column<T>[];
    textColor: string;
    onRowClick?: (subject: T) => void;
  }

const GenericTableRow = <T,>({
    targetSubject,
    columns,
    textColor,
    onRowClick,
}: GenericTableRowProps<T>) => {
    console.log(targetSubject);

    return (
        <TableRow 
        onClick={() => onRowClick?.(targetSubject)}
        sx={{
            cursor: onRowClick ? "pointer" : "default",

            "&:last-child td, &:last-child th": {
              border: 0,
            },
            "&:hover": {
              backgroundColor: HIGHLIGHT_GREEN,
              // cursor: onRowClick ? "pointer" : "default",
            },
          }}>
        {columns.map((column) => (
                <TableCell 
                key={column.key}
                sx={{
                    color: column.color?.(targetSubject) ?? textColor,
                  }}
                align="right"
                  >
                    {column.render(targetSubject)}
                </TableCell>
            ))}

        </TableRow>
    );
}

export default GenericTableRow;
