import React, { useContext, useEffect } from 'react'
import { MoexBondsContext } from '../context/MoexBondsContext'
import { Calendar } from '../components/Calendar/Calendar';

export const BondsCalculator = () => {
    const { getBonds } = useContext(MoexBondsContext);

    useEffect(() => {
        getBonds();
    }, []);

    return (
        <div>
            <Calendar />
        </div>
    )
}
