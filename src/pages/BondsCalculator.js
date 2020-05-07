import React, { useContext, useEffect } from 'react'
import { MoexBondsContext } from '../context/MoexBondsContext'
import { Calendar } from '../components/Calendar/Calendar';
import { BondsTable } from '../components/Bonds/BondsTable';

export const BondsCalculator = () => {
    const { getBoards, getBonds, boards, bonds } = useContext(MoexBondsContext);

    useEffect(() => {
        //getBoards();
        getBonds();
    }, []);

    const uniqBoards = [ ...new Set(bonds.map(bond => bond.board))];
    const filteredBoards = boards.filter(board => uniqBoards.includes(board.boardid));
    const selectedBoards = ['TQOD', 'TQOB', 'TQCB'];
    const filteredBonds = bonds.filter(bond => selectedBoards.includes(bond.board) && bond.price != null && bond.currency === 'SUR');
    const januaryBonds = filteredBonds.filter(bond => bond.expireDate.indexOf(`-01-`) !== -1);

    // TODO: учитывать периодичность выплат при выборе месяца

    //console.log(uniqBoards);
    console.log(januaryBonds);

    // let bondsMap = new Map();
    // for (let i = 1; i < 13; i++){
    //     let month = i < 10 ? `0${i}` : `${i}`;
    //     bondsMap.set(i, filteredBonds.filter(bond => bond.expireDate.indexOf(`-${month}-`) !== -1));
    // }

    //window.bondsMap = bondsMap;
    //console.log(bondsMap);

    const renderBondsMap = () => {
        let output = [];

        // bondsMap.forEach((arr, key) => {
        //     output.push(
        //         <tr key={`bond-${key}`}>
        //             <td colSpan="6">{key}</td>
        //         </tr>
        //     );
        //     arr.map(bond => 
        //         output.push(
        //             <tr key={`${bond.board}-${bond.isin}`}>
        //                 <td>{bond.board}</td>
        //                 <td>{bond.isin}</td>
        //                 <td>{bond.name}</td>
        //                 <td>{bond.expireDate}</td>
        //                 <td>{bond.price}</td>
        //                 <td>{bond.couponPercent}</td>
        //             </tr>
        //         )
        //     );
        // });

        return output;
    }

    return (
        <div>
            <Calendar />
            <hr/>
            <BondsTable bonds={januaryBonds} />
            <hr/>
            {/* <Button variant="contained" color="primary">Hello</Button> */}
            {/* <div>
                {filteredBoards.map(board => 
                    <div key={board.boardid}>
                        {board.boardid} {board.board_title}
                    </div>
                )}
            </div> */}
            {/* <table>
                <tbody>
                    {renderBondsMap()}
                </tbody>
            </table> */}
        </div>
    )
}
