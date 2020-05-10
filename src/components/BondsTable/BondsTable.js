import React from 'react'
import { Table, TableContainer, TableBody, Paper, TablePagination } from '@material-ui/core'
import { BondTableRow } from './BondTableRow'
import { BondTableHead } from './BondTableHead'
import { columns } from './Columns';
import { getComparator, stableSort } from './SortUtils';
import { useStyles } from './StyleUtils';

export const BondsTable = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const rows = props.bonds;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    return (
        <Paper>
            <TableContainer>
                <Table size='small'>
                    <BondTableHead
                        classes={classes}
                        columns={props.columns || columns}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                return <BondTableRow
                                    key={row.name}
                                    row={row}
                                    columns={props.columns || columns}
                                />
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 15, 20, 25, 30]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
