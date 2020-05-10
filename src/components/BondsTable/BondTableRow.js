import React from 'react'
import { TableCell, TableRow } from '@material-ui/core';

export const BondTableRow = (props) => {
    const { row, columns } = props;

    const handleRowClick = (row, col) => {
        col.onClick(row);
    }

    return (
        <TableRow hover>
            {columns.map(col => 
                <TableCell align="right" key={col.id}>
                    {col.template
                        ? React.cloneElement(col.template, {onClick: () => { handleRowClick(row, col)}})
                        : row[col.id]
                    }
                </TableCell>
            )}
        </TableRow>
    )
}
