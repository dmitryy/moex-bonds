import React from 'react'
import { TextField, Link } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import './PortfolioItem.scss';

export const PortfolioItem = ({ bond, count, changeCount, removeItem }) => {

    const calculateCost = (bond, count) => {
        const value = parseFloat(bond.value);
        const price = parseFloat(bond.price);
        const couponAccumulated = parseFloat(bond.couponAccumulated);
        return Math.round(value * price * count / 100) + couponAccumulated * count;
    }

    return (
        <div className="bond">
            <div className="name">
                <Link
                    className='remove-item' 
                    onClick={() => removeItem(bond)}>
                    <RemoveCircleOutlineIcon />
                </Link>
                {bond.name} ({bond.expireDate})
            </div>
            <div className="coupon">
                {bond.couponPercent}%
            </div>
            <div className="count">
                <TextField
                    type="number"
                    value={count}
                    onChange={(event) => changeCount(event, bond)}
                />
            </div>
            <div className="cost">
                {calculateCost(bond, count)} р.
            </div>
        </div>
    )
}
