import React, { useContext } from 'react'
import { MoexBondsContext } from '../../context/MoexBondsContext';
import { TextField } from '@material-ui/core';
import './Portfolio.scss';

export const Portfolio = (props) => {
    const { portfolio, setPortfolio } = useContext(MoexBondsContext);

    const changeCount = (event, bond) => {
        const changedPortfolio = portfolio.concat();
        const portfolioBond = changedPortfolio.filter(p => p.bond.isin == bond.isin)[0];
        portfolioBond.count = event.target.value;
        setPortfolio(changedPortfolio);
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

    // TODO: удалить из портфеля
    
    // TODO: более компактный стиль

    // TODO: отображать фоновым баром процент от общего портфеля

    // TODO: при клике или наведении на бар, подсвечивать облигации в этом баре

    // TODO: сделать возможность поиска при клике

    return (
        <div className="portfolio">
            <h2>Портфель</h2>

            {!!portfolio.length 
                && <div className="list">
                    {portfolio.map(item => (
                        <div key={item.bond.isin} className="bond">
                            <div className="name">
                                {item.bond.name} ({item.bond.expireDate})
                            </div>
                            <div className="coupon">
                                {item.bond.couponPercent}%
                            </div>
                            <div className="count">
                                <TextField
                                    type="number"
                                    value={item.count}
                                    onChange={(event) => changeCount(event, item.bond)}
                                />
                            </div>
                            <div className="cost">
                                {calculateCost(item.bond, item.count)} р.
                            </div>
                        </div>
                    ))}
                    <div className="total">
                        {calculateTotal()} р.
                    </div>
                </div>
            }

            {!portfolio.length 
                && <p className="empty">Здесь пока пусто</p>
            }
        </div>
    )
}
