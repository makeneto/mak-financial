export default function formatCurrency(value, currency) {
    return new Intl.NumberFormat('pt-PT', {
        style: 'currency',
        currency
    }).format(value)
}