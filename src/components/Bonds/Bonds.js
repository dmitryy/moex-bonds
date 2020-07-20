import React, { useContext } from 'react'
import { MoexBondsContext } from '../../context/MoexBondsContext'
import { Link } from '@material-ui/core'
import { BondsTable } from '../BondsTable/BondsTable'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './Bonds.scss';

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

    // TODO: убрать валюту, перенести в фильтры

    // TODO: объединить столбцы "погашение", "выплаты", "купонов", "период" в 1 компонент, 
    //       который графически показывает выплаты в виде ячеек с буквой месяца, 
    //       и шкалой от 1 до макс. купонов

    // TODO: сделать стили более сжатыми, чтобы помещалось больше колонок и строк

    // TODO: добавить ссылку рядом с именем на https://www.moex.com/ru/issue.aspx?board=TQOD&code=XS0088543193

    // TODO: индикатор, что облигация уже в портфеле

    // TODO: поиск по имени и isin

    return (
        <div>
            <BondsTable bonds={bonds} columns={[
                { id: 'name', numeric: false, disablePadding: false, label: 'Название',
                    template: (bond) => (
                        <Link
                            target='_blank'
                            href={`https://www.moex.com/ru/issue.aspx?board=${bond.board}&code=${bond.isin}`}
                        >
                            {bond.name}
                        </Link> 
                    )
                },
                //{ id: 'currency', numeric: true, disablePadding: true, label: 'Валюта' },
                { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
                { id: 'expireDate', numeric: true, disablePadding: false, label: 'Погашение' },
                //{ id: 'months', numeric: true, disablePadding: false, label: 'Выплаты' },
                { id: 'couponCount', numeric: true, disablePadding: false, label: 'Купонов' },
                { id: 'couponPeriod', numeric: true, disablePadding: false, label: 'Период' },
                { id: 'coupon', numeric: true, disablePadding: false, label: 'Купон' },
                { id: 'couponAccumulated', numeric: true, disablePadding: false, label: 'НКД' },
                { id: 'price', numeric: true, disablePadding: false, label: 'Тек.Цена' },                
                { id: 'couponPercent', numeric: true, disablePadding: false, label: 'Доходность (Бирж)' },
                { id: 'profitPercent', numeric: true, disablePadding: false, label: 'Доходность (Расч)' },
                { id: 'isin', numeric: false, disablePadding: false, 
                    template: (bond) => (
                        <Link
                            className='add-link' 
                            onClick={() => addBondToPortfolio(bond)}
                        >
                            <AddCircleIcon/>
                        </Link>
                    )
                }
            ]} />
        </div>
    )
}
