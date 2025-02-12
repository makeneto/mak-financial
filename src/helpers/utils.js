export default function formatCurrency(value, currency) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency
    }).format(value)
}

export function tickFormatter(value, currency) {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M ${currency}`
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k ${currency}`
    }
    return `${value} ${currency}`
}