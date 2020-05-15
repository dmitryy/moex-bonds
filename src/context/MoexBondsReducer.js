import { 
    GET_ALL_BONDS, 
    SET_LOADING, 
    GET_ALL_BOARDS, 
    SET_FILTERED_BONDS, 
    SET_FILTER, 
    SET_PORTFOLIO
} from "../store/actions/ActionTypes";

const handlers = {
    [GET_ALL_BONDS]: (state, action) => ({ ...state, initialBonds: action.payload.initialBonds, 
        bonds: action.payload.bonds, loading: false }),
    [GET_ALL_BOARDS]: (state, action) => ({ ...state, boards: action.payload, loading: false }),
    [SET_LOADING]: (state) => ({ ...state, loading: true }),
    [SET_FILTER]: (state, action) => ({ ...state, filter: action.payload.filter, 
        bonds: action.payload.bonds }),
    [SET_FILTERED_BONDS]: (state, action) => ({ ...state, bonds: action.payload }),
    [SET_PORTFOLIO]: (state, action) => ({ ...state, portfolio: action.payload }),
    DEFAULT: state => state
}

export const MoexBondsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}