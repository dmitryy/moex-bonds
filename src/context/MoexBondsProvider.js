import React, { useReducer } from 'react'
import { MoexBondsReducer } from './MoexBondsReducer'
import { GET_ALL_BOARDS, GET_ALL_BONDS, SET_LOADING } from './ActionTypes';
import { MoexBondsContext } from './MoexBondsContext';
import { 
    getBonds as getMoexBonds, 
    getBoards as getMoexBoards
} from '../api/moex';

export const MoexBondsProvider = ({children}) => {

    const initialState = {
        boards: [],
        bonds: [],
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

        dispatch({
            type: GET_ALL_BONDS,
            payload: bonds
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

    const { boards, bonds, loading } = state;

    return (
        <MoexBondsContext.Provider value={{
            getBoards, getBonds, setLoading,
            boards, bonds, loading 
        }}>
            {children}
        </MoexBondsContext.Provider>
    )
}
