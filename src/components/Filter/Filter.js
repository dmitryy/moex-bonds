import React, { useContext } from 'react'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
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

    const changeMonth = (event) => {
        const month = event.target.value;
        const modifiedFilter = { ...filter };
        modifiedFilter.month = month;
        setFilter(modifiedFilter);
    }


    // TODO: добавить валюты

    // TODO: сделать фильтр по экспирации в виде слайдера

    // TODO: сделать фильтр по доходности в виде слайдера

    return (
        <div className="filter">
            <FormControl className='select-month'>
                <InputLabel id='filter-month'>Месяц выплат</InputLabel>
                <Select
                    labelId='filter-month'
                    value={filter.month || 0}
                    onChange={changeMonth}
                >
                    <MenuItem value={0}>Все</MenuItem>
                    {months.map((month, index) => (
                        <MenuItem
                            value={index + 1}
                            key={index + 1}
                        >
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
