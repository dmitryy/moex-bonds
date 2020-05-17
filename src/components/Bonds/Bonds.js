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

    // TODO: убрать валюту, перенести в фильтры

    // TODO: объединить столбцы "погашение", "выплаты", "купонов", "период" в 1 компонент, 
    //       который графически показывает выплаты в виде ячеек с буквой месяца, 
    //       и шкалой от 1 до макс. купонов

    // TODO: заменить кнопки на иконки

    // TODO: сделать стили более сжатыми, чтобы помещалось больше колонок и строк

    // TODO: добавить ссылку рядом с именем на https://www.moex.com/ru/issue.aspx?board=TQOD&code=XS0088543193

    // TODO: индикатор, что облигация уже в портфеле

    // TODO: поиск по имени и isin

    return (
        <div>
            <BondsTable bonds={bonds} columns={[
                { id: 'name', numeric: false, disablePadding: false, label: 'Название' },
                { id: 'currency', numeric: true, disablePadding: true, label: 'Валюта' },
                { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
                { id: 'expireDate', numeric: true, disablePadding: false, label: 'Погашение' },
                { id: 'months', numeric: true, disablePadding: false, label: 'Выплаты' },
                { id: 'couponCount', numeric: true, disablePadding: false, label: 'Купонов' },
                { id: 'couponPeriod', numeric: true, disablePadding: false, label: 'Период' },
                { id: 'coupon', numeric: true, disablePadding: false, label: 'Купон' },
                { id: 'couponAccumulated', numeric: true, disablePadding: false, label: 'НКД' },
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
