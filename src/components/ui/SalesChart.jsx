import styled from "styled-components"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { format } from "date-fns"

import { useAppContext } from "../../context/AppContext"
import DashboardBox from "./DashboardBox"
import Transactions from "../Transactions"

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300)
    }

    & h5 {
        font-size: 1rem;
        font-weight: 600;
    }
`

function SalesChart() {
    const { transactions, selectCurrency } = useAppContext()
    let currencySign = ""

    if (selectCurrency === "AOA") {
        currencySign = "AOA"
    }
    else if (selectCurrency === "CAD") {
        currencySign = "CA$"
    }
    else if (selectCurrency === "EUR") {
        currencySign = "€"
    }
    else if (selectCurrency === "GBP") {
        currencySign = "£"
    }
    else if (selectCurrency === "BRL") {
        currencySign = "R$"
    }
    else if (selectCurrency === "USD") {
        currencySign = "$"
    }

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        label: format(new Date(2025, i, 1), "MMM"),
        totalIncome: 0,
        totalExpenditure: 0,
    }))

    Object.values(transactions).forEach(({ type, date, amount }) => {
        const monthIndex = new Date(date).getMonth()
        if (type === "income") {
            monthlyData[monthIndex].totalIncome += amount
        } else if (type === "expense") {
            monthlyData[monthIndex].totalExpenditure += amount
        }
    })

    const colors = {
        totalIncome: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalExpenditure: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
        grid: "#e5e7eb"
    }

    return (
        <StyledSalesChart>
            <h5>Financial History (Jan - Dec)</h5>

            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={monthlyData}>
                    <YAxis
                        tickFormatter={(value) => {
                            if (value >= 1000000) {
                                return `${(value / 1000000).toFixed(1)}M ${currencySign}`
                            } else if (value >= 1000) {
                                return `${(value / 1000).toFixed(1)}k ${currencySign}`
                            }
                            return `${value} ${currencySign}`
                        }}
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <CartesianGrid strokeDasharray="4" stroke={colors.grid} />
                    <Tooltip contentStyle={{ backgroundColor: colors.background }} />
                    <Area
                        dataKey="totalIncome"
                        type="monotone"
                        stroke={colors.totalIncome.stroke}
                        fill={colors.totalIncome.fill}
                        strokeWidth={2}
                        name="Total Income"
                        unit={` ${currencySign}`}
                        tickFormatter={(value) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: currencySign }).format(value)}
                    />
                    <Area
                        dataKey="totalExpenditure"
                        type="monotone"
                        stroke={colors.totalExpenditure.stroke}
                        fill={colors.totalExpenditure.fill}
                        strokeWidth={2}
                        name="Expenditure"
                        unit={` ${currencySign}`}
                        tickFormatter={(value) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: currencySign }).format(value)}
                    />
                </AreaChart>
            </ResponsiveContainer>
            <Transactions>Latest transactions</Transactions>
        </StyledSalesChart>
    )
}

export default SalesChart
