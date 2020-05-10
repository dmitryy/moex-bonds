import React, { useContext, useEffect } from 'react'
import { MoexBondsContext } from '../context/MoexBondsContext'
import { Calendar } from '../components/Calendar/Calendar';
import { BondsTable } from '../components/Bonds/BondsTable';

export const BondsCalculator = () => {
    const { getBoards, getBonds, boards, bonds } = useContext(MoexBondsContext);

    useEffect(() => {
        getBoards();
        getBonds();
    }, []);

    // const uniqBoards = [ ...new Set(bonds.map(bond => bond.board))];
    // const filteredBoards = boards.filter(board => uniqBoards.includes(board.boardid));
    // const selectedBoards = ['TQOD', 'TQOB', 'TQCB'];
    // const filteredBonds = bonds.filter(bond => selectedBoards.includes(bond.board) && bond.price != null && bond.currency === 'SUR');
    // const januaryBonds = filteredBonds.filter(bond => bond.expireDate.indexOf(`-01-`) !== -1);
    // const portfolioBonds = januaryBonds.splice(0, 2);
    // TODO: учитывать периодичность выплат при выборе месяца

    //console.log(uniqBoards);
    // console.log(januaryBonds);
    // console.log(portfolioBonds);

    return (
        <div>
            <Calendar />

            {/* <BondsTable bonds={portfolioBonds} />

            <BondsTable bonds={januaryBonds} />             */}
        </div>
    )
}
