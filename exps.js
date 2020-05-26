// board: "TQOB"
// coupon: 36.9
// couponDate: "2020-07-22"
// couponPercent: 7.4
// couponPeriod: 182
// currency: "SUR"
// expireDate: "2024-07-17"
// isin: "RU000A1007F4"
// months: []
// name: "ОФЗ 26227"
// price: 107.205
// value: 1000

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

//console.log(calculateCouponMonths("2020-07-22", "2024-07-17", 91))

    // board: "TQCB"
    // coupon: 27.42
    // couponDate: "2020-08-06"
    // couponPercent: 11
    // couponPeriod: 91
    // currency: "SUR"
    // expireDate: "2032-01-22"
    // isin: "RU000A0JXE06"
    // months: (8) [1, 2, 4, 5, 7, 8, 10, 11]
    // name: "ГТЛК 1P-03"
    // price: 112.06
//console.log(calculateCouponMonths("2020-08-06", "2032-01-22", 91))

    // board: "TQCB"
    // coupon: 41.14
    // couponDate: "2020-09-15"
    // couponPercent: 8.25
    // couponPeriod: 182
    // currency: "SUR"
    // expireDate: "2020-09-15"
    // isin: "RU000A0JR209"
    // months: []
    // name: "ФСК ЕЭС-08"
    // price: 101.4
    // value: 1000
//console.log(calculateCouponMonths("2020-09-15", "2020-09-15", 182))

const calculateCouponCount = (couponDateStr, expireDateStr, period) => {
    //const paysPerYear = Math.floor(365 / period);
    let couponDate = new Date(couponDateStr);
    let expireDate = new Date(expireDateStr);

    return (expireDate - couponDate) / (1000 * 3600 * 24) / period + 1
}

console.log(calculateCouponMonths("2020-09-15", "2020-09-15", 182))
//console.log(calculateCouponCount("2020-09-15", "2020-09-15", 182))