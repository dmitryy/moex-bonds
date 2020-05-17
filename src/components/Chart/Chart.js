import React from 'react'
import { useContext } from 'react';
import { MoexBondsContext } from '../../context/MoexBondsContext';
import { months } from '../../common/months';
import './Chart.scss';

export const Chart = () => {
    const { portfolio } = useContext(MoexBondsContext);
    const portfolioMonths = {};
    let maxCouponValue = 0;
    let minCouponValue = 0;

    const calculateTotalCoupon = (items) => {
        let total = 0;
        items.map(item => {
            total += item.count * parseFloat(item.bond.coupon);
        });
        return Math.round(total);
    }

    const getCouponValue = (monthIndex) => {
        return portfolioMonths[monthIndex] ? portfolioMonths[monthIndex].coupon : 0;
    }

    const getBarHeightString = (monthIndex) => {
        const coupon = getCouponValue(monthIndex);
        let percent = coupon * 100 / maxCouponValue;
        if (percent < 8) percent = 8;
        return percent + '%';
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

    let keys = Object.keys(portfolioMonths);
    let coupons = keys.map(key => portfolioMonths[key].coupon);
    maxCouponValue = Math.max(...coupons);
    minCouponValue = Math.min(...coupons);

    // TODO: возврат средств от момента вложения до последнего погашения
    // TODO: регулировать прозрачность в зависимости от количества платежей, чем меньше тем прозрачнее

    return (
        <div className="chart-container">
            <h2>Ежемесячный доход</h2>
            <div className="chart">
                {months.map((month, index) => (
                    <div key={month} className="month" style={{ 
                        height: getBarHeightString(index + 1) 
                    }}>
                        <div className="price">{getCouponValue(index + 1)}р</div>
                        <div className="label">{month}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
