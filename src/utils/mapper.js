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

        let expireDate = value.MATDATE != '0000-00-00' ? value.MATDATE : value.BUYBACKDATE;
        let couponCount = calculateCouponCount(value.NEXTCOUPON, value.MATDATE != '0000-00-00' ? value.MATDATE : value.BUYBACKDATE, value.COUPONPERIOD);
        let buyBackPrice = value.MATDATE != '0000-00-00' ? value.LOTVALUE : value.BUYBACKPRICE; // BUYBACKPRICE
        
        const returnValue = {
            name: value.SHORTNAME,
            price: value.PREVPRICE,
            expireDate: expireDate,
            coupon: value.COUPONVALUE,
            couponPeriod: value.COUPONPERIOD,
            couponPercent: value.YIELDATPREVWAPRICE, // value.COUPONPERCENT,
            couponDate: value.NEXTCOUPON,
            couponAccumulated: value.ACCRUEDINT, // НКД
            couponCount: couponCount,
            currency: value.FACEUNIT, // value.CURRENCYID,
            value: buyBackPrice,
            board: value.BOARDID,
            isin: value.ISIN,

            // months that coupon paid, starting from 1 till 12
            months: calculateCouponMonths(value.NEXTCOUPON, value.MATDATE, value.COUPONPERIOD),
            // expire days
            //expireDays: calculateExpireDays(value.MATDATE)
            type: value.SECTYPE
        };

        returnValue.profitPercent = calculateBondAnnualProfit(returnValue);

        if (bond[2] === 'ФинАвиа 01') {
            console.log(value)
            console.log(returnValue)
        }
        // if (returnValue.isin == 'RU000A0JXE06') {
        //     console.log('RU000A0JXE06', returnValue);
        // }
        if (bond[2] === 'RUS-28') {
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
    let paysPerYear = Math.floor(368 / period);

    while (couponDate <= expireDate && Object.keys(months).length < paysPerYear) {
        months[couponDate.getMonth() + 1] = couponDate;
        couponDate.setDate(couponDate.getDate() + period);
    }

    return Object.keys(months).map(m => parseInt(m));
}

const calculateExpireDays = (expireDateStr) => {
    let expireDate = new Date(expireDateStr);
    let currentDate = new Date();
    let days = Math.round((expireDate - currentDate) / (1000 * 3600 * 24));
    return days;
}

const calculateCouponCount = (couponDateStr, expireDateStr, period) => {
    let couponDate = new Date(couponDateStr);
    let expireDate = new Date(expireDateStr);
    return Math.round((expireDate - couponDate) / (1000 * 3600 * 24) / period + 1);
}

const calculateBondAnnualProfit = (bond) => {
    const currentDate = new Date();
    const expireDate = new Date(bond.expireDate);
    const millisecondsInYear = 31556952000;
    let yearsCount = Math.abs(expireDate - currentDate) / millisecondsInYear
    let price = bond.value * bond.price / 100;
    let returnProfit = bond.couponCount * bond.coupon + bond.value - bond.couponAccumulated;
    let annualProfit =  Math.round((Math.log(returnProfit / price) / yearsCount * 100) * 100) / 100;
    return annualProfit;
}