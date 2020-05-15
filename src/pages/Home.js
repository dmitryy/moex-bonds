import React, { useContext, useEffect } from 'react';
import { MoexBondsContext } from '../context/MoexBondsContext';
import { Bonds } from '../components/Bonds/Bonds';
import { Filter } from '../components/Filter/Filter';
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Chart } from '../components/Chart/Chart';
import './Home.scss';

export const Home = () => {

    const { getBonds } = useContext(MoexBondsContext);

    useEffect(() => {
        getBonds();
    }, []);

    return (
        <div className="container">
            <div className="portfolio-chart">
                <Chart />
            </div>
            <div className="bonds-filter">
                <Filter />
            </div>
            <div className="bonds-list">
                <Bonds />
            </div>
            <div className="portfolio-list">
                <Portfolio />
            </div>
        </div>
    )
}
