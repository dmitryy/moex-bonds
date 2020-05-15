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

    console.log(couponDate)
    console.log(expireDate)
    console.log('---')


    while (couponDate < expireDate) {
        console.log('couponDate', couponDate)
        console.log('month', couponDate.getMonth() + 1)
        months[couponDate.getMonth() + 1] = couponDate;
        couponDate.setDate(couponDate.getDate() + period);
    }

    console.log('---')
    console.log(Object.keys(months).map(m => parseInt(m)))
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
console.log(calculateCouponMonths("2020-08-06", "2032-01-22", 91))
