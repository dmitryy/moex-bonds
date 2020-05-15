import React from 'react'
import { useContext } from 'react';
import { MoexBondsContext } from '../../context/MoexBondsContext';

const months = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
];

export const Chart = () => {
    const { portfolio } = useContext(MoexBondsContext);
    const portfolioMonths = {};

    const calculateTotalCoupon = (items) => {
        let total = 0;
        
        items.map(item => {
            total += item.count * parseFloat(item.bond.coupon);
        });

        return Math.round(total * 100) / 100;
    }

    portfolio.map(item => {
        item.bond.months.map(month => {
            if (!portfolioMonths[month]) {
                portfolioMonths[month] = {
                    items: [],
                    coupon: 0
                };
            }
            portfolioMonths[month].items.push(item);
            portfolioMonths[month].coupon = calculateTotalCoupon(portfolioMonths[month].items)
        })
    });

    // let total = 0;

    // months.map(m => {
    //     if (portfolioMonths[m]) {
    //         const items = portfolioMonths[m];
    //         items.map(p => parseFloat(p.bond.coupon) * p.count )
    //     }
    // });
    // console.log(portfolio);
    // console.log(portfolioMonths);

    return (
        <div className="chart">
            {months.map(m => (
                <div className="month">
                    {m}: {portfolioMonths[m] ? portfolioMonths[m].coupon : 0}
                </div>
            ))}
        </div>
    )
}
