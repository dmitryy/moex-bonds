import React, { useContext } from 'react'
import { MoexBondsContext } from '../../context/MoexBondsContext';
import { PortfolioItem } from '../PortfolioItem/PortfolioItem';
import './Portfolio.scss';

export const Portfolio = (props) => {
    const { portfolio, setPortfolio } = useContext(MoexBondsContext);

    const changeCount = (event, bond) => {
        const changedPortfolio = portfolio.concat();
        const portfolioBond = changedPortfolio.filter(p => p.bond.isin == bond.isin)[0];
        portfolioBond.count = event.target.value;
        setPortfolio(changedPortfolio);
    }

    const removeItem = (bond) => {
        const changedPortfolio = portfolio.concat().filter(p => p.bond.isin != bond.isin);
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
                        <PortfolioItem 
                            key={item.bond.isin} 
                            bond={item.bond} 
                            count={item.count} 
                            changeCount={changeCount}
                            removeItem={removeItem}
                        />
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
