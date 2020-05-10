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
            isin: value.ISIN,

            // months that coupon paid, starting from 1 till 12
            months: calculateCouponMonths(value.NEXTCOUPON, value.MATDATE, value.COUPONPERIOD)
        };

        if (bond[2] === 'ОФЗ 26227') {
            console.log(value)
            console.log(returnValue)
        }

        return returnValue;
    });
}

/**
 * Returns array of month with coupon paind, starting from 1 till 12
 * @param {*} couponDateStr 
 * @param {*} expireDateStr 
 * @param {*} period 
 */
const calculateCouponMonths = (couponDateStr, expireDateStr, period) => {
    let couponDate = new Date(couponDateStr);
    let expireDate = new Date(expireDateStr);
    let months = {};

    while (couponDate < expireDate) {
        months[couponDate.getMonth() + 1] = couponDate;
        couponDate.setDate(couponDate.getDate() + period);
    }

    return Object.keys(months).map(m => parseInt(m));
}