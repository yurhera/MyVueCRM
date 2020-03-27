export default function currencyFilter(value, currency = 'UAH'){
    const cur =  new Intl.NumberFormat('ua-UA', {
        style: 'currency',
        currency
    })
    return cur.format(value)
}