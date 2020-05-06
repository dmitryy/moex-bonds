import axios from 'axios';

const moexBaseUrl = 'http://iss.moex.com/iss';

export const getBonds = async () => {

    const response = await axios.get(`${moexBaseUrl}/engines/stock/markets/bonds/securities.json`);
    //const marketdata = response.data.marketdata.data;
    //const marketdata_yields = response.data.marketdata_yields.data;
    const columns = response.data.securities.columns;
    const securities =  response.data.securities.data;

    // console.log('run getBonds');

    // marketdata.map(bond => {
    //     if (bond[2] == 'ОФЗ 26227') {
    //         console.log('marketdata')
    //         console.log(bond)
    //     }
    // });

    // marketdata_yields.map(bond => {
    //     if (bond[2] == 'ОФЗ 26227') {
    //         console.log('marketdata_yields')
    //         console.log(bond)
    //     }
    // });

    // http://ftp.moex.com/pub/ClientsAPI/ASTS/docs/ASTS_Markets_and_Boards.pdf

    return mapSecurityBonds(securities, columns);
}



const mapSecurityBonds = (securities, columns) => {
    return securities.map(bond => {
        
        const value = {};

        columns.forEach((col, index) => {
            value[col] = bond[index]
        });

        if (bond[2] == 'ОФЗ 26227') {
            console.log('securities')
            console.log(bond)
            console.log(value)
        }

        return value;
    });
}