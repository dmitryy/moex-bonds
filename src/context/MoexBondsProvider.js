import React, { useReducer } from 'react'
import { MoexBondsReducer } from './MoexBondsReducer'
import { GET_ALL_BOARDS, GET_ALL_BONDS, SET_LOADING, SET_FILTERED_BONDS, SET_FILTER, SET_PORTFOLIO } from '../store/actions/ActionTypes';
import { MoexBondsContext } from './MoexBondsContext';
import { 
    getBonds as getMoexBonds, 
    getBoards as getMoexBoards
} from '../api/moex';

export const MoexBondsProvider = ({children}) => {

    const initialState = {
        boards: [],
        bonds: [],
        filter: {
            boards: ['TQOD', 'TQOB', 'TQCB'],
            currencies: ['SUR'],
            month: null,
        },
        initialBonds: [],
        loading: false,
        portfolio: []
    }

    const [state, dispatch] = useReducer(MoexBondsReducer, initialState);

    /**
     * get moex boards
     */
    const getBoards = async () => {
        setLoading();

        const boards = await getMoexBoards();

        dispatch({
            type: GET_ALL_BOARDS,
            payload: boards
        });
    }

    /**
     * get moex bonds
     */
    const getBonds = async () => {
        setLoading();
        
        const bonds = await getMoexBonds();

        dispatch({
            type: GET_ALL_BONDS,
            payload: {
                initialBonds: bonds,
                bonds: getFilteredBonds(bonds, state.filter)
            }
        });
    }

    /**
     * 
     * @param {object} filter - bonds filter
     */
    const setFilter = (filter) => {
        dispatch({
            type: SET_FILTER,
            payload: {
                filter: filter,
                bonds: getFilteredBonds(state.initialBonds, filter)
            }
        });
    }

    /**
     * get bonds according to filter set
     */
    const getFilteredBonds = (bonds, filter) => {
        const boards = filter.boards;
        const currencies = filter.currencies;
        const month = filter.month;
        const filteredBonds = bonds.concat().filter(bond => boards.includes(bond.board)
            && currencies.includes(bond.currency)
            && (!month || bond.months.includes(month))
            && bond.price != null
            && bond.coupon > 0
        );
        // console.log(bonds);
        // console.log(bonds[1810])
        // console.log(filteredBonds[238])
        return filteredBonds;
    }

    /**
     * set loading
     */
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    /**
     * 
     * @param {object} portfolio 
     */
    const setPortfolio = (portfolio) => {
        dispatch({
            type: SET_PORTFOLIO,
            payload: portfolio
        })
    }

    const { bonds, filter, portfolio } = state;

    return (
        <MoexBondsContext.Provider value={{
            bonds, filter, portfolio,
            getBonds, setFilter, setPortfolio
        }}>
            {children}
        </MoexBondsContext.Provider>
    )
}
