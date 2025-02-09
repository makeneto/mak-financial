"use client"
import { createContext, useContext, useState, useEffect } from "react"

const AppContext = createContext()

export function AppProvider({ children }) {
    const [balance, setBalance] = useState(() => {
        const storedBalance = localStorage.getItem('balance')
        return storedBalance ? JSON.parse(storedBalance) : 0
    })

    useEffect(() => {
        localStorage.setItem('balance', JSON.stringify(balance))
    }, [balance])

    const [transactions, setTransactions] = useState(() => {
        const storedTransactions = localStorage.getItem("transactions")
        return storedTransactions ? JSON.parse(storedTransactions) : {}
    })

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions))
    }, [transactions])

    const [totalIncome, setTotalIncome] = useState(0)
    const [totalExpenditure, setTotalExpenditure] = useState(0)

    useEffect(() => {
        const values = Object.values(transactions) // Converte o objeto em array

        const incomeTotal = values
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0)

        const expenditureTotal = values
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0)

        setTotalIncome(incomeTotal)
        setTotalExpenditure(expenditureTotal)
    }, [transactions])

    const [changeAmount, setChangeAmount] = useState(false)

    return (
        <AppContext.Provider value={{
            balance, setBalance,
            transactions, setTransactions,
            totalIncome, totalExpenditure,
            changeAmount, setChangeAmount
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}
