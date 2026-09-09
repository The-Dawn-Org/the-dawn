import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import GenericTableRow from "./TableRow";
import type { Column } from "../../types/tableTypes";

interface GenericTableProps<T> {
    targetSubjects: T[];
    columns: Column<T>[];
}

const GenericTable = <T,>({
    targetSubjects,
    columns,
}: GenericTableProps<T>) => {
    console.log(targetSubjects);
    console.log(columns);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell key={column.key}>
                            {column.display}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {targetSubjects.map((subject, index) => (
                        <GenericTableRow
                        key={index}
                        targetSubject={subject}
                        columns={columns}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default GenericTable;
