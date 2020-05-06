import React, { useContext, useEffect } from 'react'
import { MoexBondsContext } from '../context/MoexBondsContext'

export const BondsCalculator = () => {
    const { getBonds, bonds } = useContext(MoexBondsContext);

    useEffect(() => {
        getBonds();
    }, []);

    const filteredBonds = bonds.filter(bond => bond.BOARDID === 'TQOB');

    // TODO: 
    // - get API to get all boards - BOARDID
    // - create filter to filter by board with multiple select
    // 
    
    return (
        <div>
            {filteredBonds.map(bond => <div key={`${bond.BOARDID}-${bond.SECID}`}>
                {bond.BOARDID} {bond.SECID} {bond.SHORTNAME} {bond.MATDATE} {bond.PREVPRICE}
            </div>)}
        </div>
    )
}
