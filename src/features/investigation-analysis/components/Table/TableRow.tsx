import { TableCell, TableRow } from "@mui/material";
import type { Column } from "../../types/tableTypes";

interface GenericTableRowProps<T> {
    targetSubject: T;
    columns: Column<T>[];
  }

const GenericTableRow = <T,>({
    targetSubject,
    columns,
}: GenericTableRowProps<T>) => {
    console.log(targetSubject);

    return (
        <TableRow 
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {columns.map((column) => (
                <TableCell 
                key={column.key}
                sx={{
                    color: column.color?.(targetSubject),
                  }}>
                    {column.render(targetSubject)}
                </TableCell>
            ))}

        </TableRow>
    );
}

export default GenericTableRow;
