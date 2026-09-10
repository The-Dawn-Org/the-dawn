import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import GenericTableRow from "./TableRow";
import type { Column } from "../../types/tableTypes";
import { Box } from "@mui/system";
import type { ReactElement } from "react";
import { BACKGROUND_GREEN, DEFAULT_TEXT_COLOR, HIGHLIGHT_WHITE, SOFT_GREEN } from "./consts";

interface GenericTableProps<T> {
    targetSubjects: T[];
    columns: Column<T>[];
    title: string;
    icon: ReactElement;
    onRowClick?: (subject: T) => void;
    textColor?: string
    contentHeight?: string
}

const GenericTable = <T,>({
    targetSubjects,
    columns,
    title,
    icon,
    onRowClick,
    textColor = DEFAULT_TEXT_COLOR,
    contentHeight = "calc(50vh - 43px)",
}: GenericTableProps<T>) => {
    return (
        <Box>
            <Box
                sx={{
                    height: 43,
                    px: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #263326",
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {icon}
 
                    <Typography sx={{ fontWeight: 600 }} >
                        {title}
                    </Typography>
 
                    <Typography sx={{ color: textColor }} >
                        ({targetSubjects.length})
                    </Typography>
                </Box>
            </Box>

            <TableContainer component={Paper} >
                    <Table sx={{
                        minWidth: 400,
                        width: "100%",
                        tableLayout: "fixed",
                        }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                <TableCell  align="center" key={column.key}>
                                    {column.display}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <TableContainer sx={{
                            height: contentHeight,
                            overflowY: "auto",
                            overflowX: "hidden",
                            background: BACKGROUND_GREEN,

                            "&::-webkit-scrollbar": {
                                width: "8px",
                              },
                          
                              "&::-webkit-scrollbar-track": {
                                background: BACKGROUND_GREEN,
                              },
                          
                              "&::-webkit-scrollbar-thumb": {
                                background: SOFT_GREEN,
                                borderRadius: "4px",
                              },
                          
                              "&::-webkit-scrollbar-thumb:hover": {
                                background: HIGHLIGHT_WHITE,
                              },
                        }}>
                    <Table sx={{
                        width: "100%",
                        tableLayout: "fixed",
                    }}>
                        <TableBody>
                        {targetSubjects.map((subject, index) => (
                                <GenericTableRow
                                key={index}
                                targetSubject={subject}
                                columns={columns}
                                onRowClick={onRowClick}
                                textColor={textColor}
                                />
                            ))}
                    </TableBody>
                    </Table>
                </TableContainer>
        </Box>
    );
}

export default GenericTable;
