import React, { useContext, useEffect, useState } from 'react';
import { MoexBondsContext } from '../context/MoexBondsContext';
import { Calendar } from '../components/Calendar/Calendar';

export const Home = () => {

    const { getBonds } = useContext(MoexBondsContext);
    const [ portfolio, setPorfolio ] = useState([]);

    useEffect(() => {
        getBonds();
    }, []);

    const addPortfolioHandler = (bond) => {
        const newPortfolio = portfolio.concat();
        newPortfolio.push(bond);
        setPorfolio(newPortfolio); // TODO: check for duplicates
    }

    const removePortfolioHandler = (bond) => {
        const newPortfolio = portfolio.filter(b => b.isin != bond.isin).concat();
        setPorfolio(newPortfolio);
    }

    return (
        <div>
            <Calendar
                portfolio={portfolio}
                addPortfolio={addPortfolioHandler}
                removePortfolio={removePortfolioHandler} />
        </div>
    )
}
