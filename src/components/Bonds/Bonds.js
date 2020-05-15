import React, { useContext } from 'react'
import { MoexBondsContext } from '../../context/MoexBondsContext'
import { Button } from '@material-ui/core'
import { BondsTable } from '../BondsTable/BondsTable'

export const Bonds = () => {
    
    const { bonds, portfolio, setPortfolio } = useContext(MoexBondsContext);

    const addBondToPortfolio = (bond) => {
        const modifiedPortfolio = portfolio.concat();
        const portfolioItem = modifiedPortfolio.filter(p => p.bond.isin == bond.isin);

        if (portfolioItem.length) {
            portfolioItem[0].count++;
        } else {
            modifiedPortfolio.push({ count: 1, bond: bond });
        }
        
        setPortfolio(modifiedPortfolio);
    }

    return (
        <div>
            <BondsTable bonds={bonds} columns={[
                { id: 'name', numeric: false, disablePadding: false, label: 'Название' },
                { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
                { id: 'expireDate', numeric: true, disablePadding: false, label: 'Погашение' },
                { id: 'months', numeric: true, disablePadding: false, label: 'Выплаты' },
                { id: 'couponPeriod', numeric: true, disablePadding: false, label: 'Период' },
                { id: 'coupon', numeric: true, disablePadding: false, label: 'Купон' },
                { id: 'price', numeric: true, disablePadding: false, label: 'Тек.Цена' },                
                { id: 'couponPercent', numeric: true, disablePadding: false, label: 'Доходность' },
                { id: 'isin', numeric: false, disablePadding: false, 
                    template: <Button>add</Button>, 
                    onClick: addBondToPortfolio
                }
            ]} />
        </div>
    )
}
