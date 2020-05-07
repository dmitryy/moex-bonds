import React from 'react'
import { TableCell, TableRow } from '@material-ui/core';

export const BondTableRow = (props) => {
    const { row, columns, onClick } = props;
    return (
        <TableRow onClick={(event) => onClick(event, row.name)} hover>
            {columns.map(col => 
                <TableCell align="right" key={col.id}>
                    {row[col.id]}
                </TableCell>
            )}
        </TableRow>
    )
}
