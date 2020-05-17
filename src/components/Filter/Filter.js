import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { MoexBondsContext } from '../../context/MoexBondsContext';
import { months } from '../../common/months';
import './Filter.scss';

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

    // TODO: добавить валюты

    // TODO: сделать Select для месяцев вместо кнопок

    // TODO: сделать фильтр по экспирации в виде слайдера

    // TODO: сделать фильтр по доходности в виде слайдера

    return (
        <div className="filter">
            <Button
                onClick={clearFilter}
                variant='contained'
                color={!filter.month ? 'primary' : ''}
            >
                Все
            </Button>

            {months.map((month, index) => (
                <Button 
                    key={month} 
                    variant='contained'
                    color={filter.month == (index + 1) ? 'primary' : ''}
                    onClick={() => filterByMonth(index + 1)}
                >
                    {month}
                </Button>
            ))}
        </div>
    )
}
