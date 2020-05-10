import React, { useReducer } from 'react'
import { MoexBondsReducer } from './MoexBondsReducer'
import { GET_ALL_BOARDS, GET_ALL_BONDS, SET_LOADING, SET_FILTERED_BONDS } from '../store/actions/ActionTypes';
import { MoexBondsContext } from './MoexBondsContext';
import { 
    getBonds as getMoexBonds, 
    getBoards as getMoexBoards
} from '../api/moex';

export const MoexBondsProvider = ({children}) => {

    const initialState = {
        boards: [],
        bonds: [],
        filteredBoards: ['TQOD', 'TQOB', 'TQCB'],
        filteredBonds: [],
        currencies: ['SUR'],
        loading: false
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
        const boards = state.filteredBoards;
        const currencies = state.currencies;
        const filteredBonds = bonds.filter(bond => boards.includes(bond.board)
            && currencies.includes(bond.currency) 
            && bond.price != null
            && bond.coupon > 0
        );

        setFilteredBonds(filteredBonds);

        dispatch({
            type: GET_ALL_BONDS,
            payload: bonds
        });
    }

    /**
     * 
     */
    const setFilteredBonds = (filteredBonds) => {
        dispatch({
            type: SET_FILTERED_BONDS,
            payload: filteredBonds
        });
    }

    /**
     * set loading
     */
    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    const { bonds, filteredBonds } = state;

    return (
        <MoexBondsContext.Provider value={{
            getBonds,
            bonds, filteredBonds 
        }}>
            {children}
        </MoexBondsContext.Provider>
    )
}
