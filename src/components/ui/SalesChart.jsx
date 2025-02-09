import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { format } from "date-fns";
import { useAppContext } from "@/src/context/AppContext";
import Transactions from "./Transactions";
import SingleTransaction from "./SingleTransaction";

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }

    & h5 {
        font-size: 1rem;
        font-weight: 600;
    }
`;

function SalesChart() {
    const { transactions } = useAppContext();

    // Inicializar os valores para cada mês
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
        label: format(new Date(2025, i, 1), "MMM"),
        totalIncome: 0,
        totalExpenditure: 0,
    }));

    // Processar as transações e somar os valores correspondentes a cada mês
    Object.values(transactions).forEach(({ type, date, amount }) => {
        const monthIndex = new Date(date).getMonth();
        if (type === "income") {
            monthlyData[monthIndex].totalIncome += amount;
        } else if (type === "expense") {
            monthlyData[monthIndex].totalExpenditure += amount;
        }
    });

    const colors = {
        totalIncome: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalExpenditure: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
        grid: "#e5e7eb"
    };

    return (
        <StyledSalesChart>
            <h5>Financial History (Jan - Dec)</h5>

            <ResponsiveContainer height={300} width="100%">
                <AreaChart data={monthlyData}>
                    <XAxis
                        dataKey="label"
                        tick={{ fill: colors.text }}
                        tickLine={{ stroke: colors.text }}
                    />
                    <YAxis
                        unit="$"
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
                        unit="$"
                    />
                    <Area
                        dataKey="totalExpenditure"
                        type="monotone"
                        stroke={colors.totalExpenditure.stroke}
                        fill={colors.totalExpenditure.fill}
                        strokeWidth={2}
                        name="Expenditure"
                        unit="$"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}

export default SalesChart;
