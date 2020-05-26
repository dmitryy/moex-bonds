import React, { useContext } from 'react'
import { MoexBondsContext } from '../../context/MoexBondsContext';
import './ChartCumulative.scss';

export const ChartCumulative = () => {
    
    const { portfolio } = useContext(MoexBondsContext);

    const monthDiff = (d1, d2) => {
        let months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    const arraySum = (arr) => {
        return arr.length ? Math.round(arr.reduce((acc, val) => acc + val) * 100) / 100 : 0;
    }

    const getHeightString = (ret) => {
        const max = drawReturns[drawReturns.length - 1];
        const percent = ret * 100 / max;
        return percent + '%';
    }

    const calculateCost = (bond, count) => {
        const value = parseFloat(bond.value);
        const price = parseFloat(bond.price);
        const couponAccumulated = parseFloat(bond.couponAccumulated);
        return Math.round(value * price * count / 100) + couponAccumulated * count;
    }

    const calculateTotal = () => {
        let total = 0;
        portfolio.map(p => total += calculateCost(p.bond, p.count));
        return Math.round(total * 100) / 100;
    }

    const payments = [];
    let returns = [];
    const sortedBonds = portfolio
        .map(p => { return { ...p.bond, count: p.count } })
        .sort((a, b) => a.expireDate < b.expireDate ? -1 : 1);

    if (sortedBonds.length) {
        const curDate = new Date();
        const curMonth = curDate.getMonth() + 1; // starting from 1..12
        const lastDate = new Date(sortedBonds[sortedBonds.length - 1].expireDate);
        const months = monthDiff(curDate, lastDate);
        returns = new Array(months + 1);

        for (let i = 0; i < sortedBonds.length; i++) {
            const bond = sortedBonds[i];
            let nextMonths = bond.months.filter(m => m > curMonth);
            let monthIndex = nextMonths.length ? bond.months.indexOf(nextMonths[0]) : 0;
            let month = 0;
            let fromCurrent = bond.months[monthIndex] - curMonth;
            const monthDelta = bond.months.length > 1 ? bond.months[1] - bond.months[0] : 0;

            for (let j = 0; j < bond.couponCount; j++) {

                month = bond.months[monthIndex];
                
                payments.push({ 
                    bond: bond,
                    month: month,
                    inMonths: fromCurrent,
                    type: 'coupon', 
                    value: bond.coupon * bond.count
                });

                monthIndex++;
                
                if (monthIndex >= bond.months.length) {
                    monthIndex = 0;
                }

                if (j == bond.couponCount - 1) {
                    payments.push({ 
                        bond: bond, 
                        month: month, 
                        inMonths: fromCurrent,
                        type: 'expiration', 
                        value: bond.value * bond.count
                    });
                }

                fromCurrent += monthDelta;
            }
        }
        
        payments.sort((a, b) => a.inMonths < b.inMonths ? -1 : 1);

        for (let m = 0; m < returns.length; m++) {
            const paymentsFiltered = payments.filter(p => p.inMonths < m + 1);
            returns[m] = arraySum(paymentsFiltered.map(p => p.value));
        }
    }

    const round = (num) => {
        return Math.round(num * 100) / 100;
    }

    const portfolioTotal = calculateTotal();
    const returnTotal = returns[returns.length - 1] || 0;
    const profit = round(returnTotal - portfolioTotal);
    //const profitPercent = profit > 0 ? round((returnTotal / portfolioTotal) * 100) : 0;
    const drawLimit = 100;
    const drawReturns = returns.length > drawLimit ? returns.concat().splice(returns.length - drawLimit) : returns;
    const yearsCount = round(returns.length/12);
    const annualProfit = portfolioTotal > 0 ? round(Math.log(returnTotal / portfolioTotal) / yearsCount * 100) : 0;

    // TODO: учитывать номинальную стоимость купона при возврате средств
    // TODO: refactor code and move some function to utils
    
    return (
        <div className='chart-cumulative-container'>
            <h2>Возврат</h2>
            <p>
                Через {returns.length} месяцев возврат средств составит {returnTotal}р.<br/>
                Прибыль через <b>{yearsCount}</b> лет составит {profit}р. или <b>{annualProfit}%</b> годовых.
            </p>        
            <div className='chart-cumulative'>
                {drawReturns.map((r, index) => 
                    <div
                        key={index}
                        className='chart-cumulative-bar'
                        style={{ height: getHeightString(r) }}
                    >
                        <div className='return'>{r}</div>
                        <div className='month'>{index + 1}</div>
                    </div>
                )}
            </div>
        </div>
    )
}
