import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { MoexBondsContext } from '../../context/MoexBondsContext';

export const Filter = () => {

    const { filter, setFilter } = useContext(MoexBondsContext);

    const clearFilter = () => {
        const modifiedFilter = { ...filter };
        modifiedFilter.month = null;
        setFilter(modifiedFilter);
    }

    const filterByMonth = (month) => {
        const modifiedFilter = { ...filter };
        modifiedFilter.month = month;
        setFilter(modifiedFilter);
    }

    return (
        <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                <Button key={month} onClick={() => filterByMonth(month)}>{month}</Button>
            ))}
            <Button onClick={clearFilter}>Clear</Button>
        </div>
    )
}
