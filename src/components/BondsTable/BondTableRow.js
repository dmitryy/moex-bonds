import React from 'react'
import { TableCell, TableRow } from '@material-ui/core';

export const BondTableRow = (props) => {
    const { row, columns } = props;

    return (
        <TableRow hover>
            {columns.map(col => 
                <TableCell 
                    key={col.id}    
                    align={col.numeric ? 'right' : 'left'}
                >
                    {col.template && typeof(col.template) == 'function' ? col.template(row) : row[col.id]}
                </TableCell>
            )}
        </TableRow>
    )
}
