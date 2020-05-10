export const columns = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Название' },
    { id: 'value', numeric: true, disablePadding: true, label: 'Номинал' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Тек.Цена' },
    { id: 'expireDate', numeric: false, disablePadding: false, label: 'Погашение' },
    { id: 'couponPeriod', numeric: true, disablePadding: true, label: 'Периодичность'},
    { id: 'coupon', numeric: true, disablePadding: false, label: 'Купон' },
    { id: 'couponPercent', numeric: true, disablePadding: false, label: 'Доходность' }
];