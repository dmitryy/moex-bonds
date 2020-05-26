import axios from 'axios';
import { mapResponseToBoards, mapResponseToBonds } from '../utils/mapper';

/**
 * Moex boards documentation: http://ftp.moex.com/pub/ClientsAPI/ASTS/docs/ASTS_Markets_and_Boards.pdf
 */
const moexBaseUrl = 'https://iss.moex.com/iss';
const moexBoardsUrl = `${moexBaseUrl}/index.json`;
const moexBondsUrl = `${moexBaseUrl}/engines/stock/markets/bonds/securities.json`;

/**
 * 
 */
export const getBoards = async () => {
    const response = await axios.get(moexBoardsUrl);
    const columns = response.data.boards.columns;
    const boards = response.data.boards.data;
    return mapResponseToBoards(boards, columns);
}

/**
 * 
 */
export const getBonds = async () => {
    const response = await axios.get(moexBondsUrl);
    const columns = response.data.securities.columns;
    const securities =  response.data.securities.data;
    return mapResponseToBonds(securities, columns);
}