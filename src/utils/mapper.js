/**
 * 
 * @param {*} arr 
 * @param {*} columns 
 */
const convertArrayToObject = (arr, columns) => {
    const obj = {};
    
    columns.forEach((col, index) => {
        obj[col] = arr[index]
    });

    return obj;    
}

/**
 * 
 * @param {*} boards 
 * @param {*} columns 
 */
export const mapResponseToBoards = (boards, columns) => {
    return boards.map(board => {
        return convertArrayToObject(board, columns)
    });
}

/**
 * 
 * @param {*} securities 
 * @param {*} columns 
 */
export const mapResponseToBonds = (securities, columns) => {
    return securities.map(bond => {
        
        const value = convertArrayToObject(bond, columns);

        const returnValue = {
            name: value.SHORTNAME,
            price: value.PREVPRICE,
            expireDate: value.MATDATE,
            coupon: value.COUPONVALUE,
            couponPeriod: value.COUPONPERIOD,
            couponPercent: value.COUPONPERCENT,
            couponDate: value.NEXTCOUPON,
            currency: value.CURRENCYID,
            value: value.LOTVALUE,
            board: value.BOARDID,
            isin: value.ISIN
        };

        if (bond[2] === 'ОФЗ 26227') {
            console.log('securities')
            console.log(value)
            console.log(returnValue)
        }

        return returnValue;
    });
}