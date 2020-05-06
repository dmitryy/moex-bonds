import { GET_ALL_BONDS, SET_LOADING } from "./ActionTypes";

const handlers = {
    [GET_ALL_BONDS]: (state, action) => ({ ...state, bonds: action.payload, loading: false }),
    [SET_LOADING]: (state) => ({ ...state, loading: true }),
    DEFAULT: state => state
}

export const MoexBondsReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}