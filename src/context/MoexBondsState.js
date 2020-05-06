import React, { useReducer } from 'react'
import { MoexBondsReducer } from './MoexBondsReducer'
import { GET_ALL_BONDS, SET_LOADING } from './ActionTypes';
import { MoexBondsContext } from './MoexBondsContext';
import { getBonds as getMoexBonds } from '../api/moex';

export const MoexBondsState = ({children}) => {

    const initialState = {
        bonds: [],
        loading: false
    }

    const [state, dispatch] = useReducer(MoexBondsReducer, initialState);

    const getBonds = async () => {
        setLoading()
        
        const bonds = await getMoexBonds();

        dispatch({
            type: GET_ALL_BONDS,
            payload: bonds
        })
    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    const { bonds, loading } = state;

    return (
        <MoexBondsContext.Provider value={{ getBonds, setLoading, bonds, loading }}>
            {children}
        </MoexBondsContext.Provider>
    )
}
