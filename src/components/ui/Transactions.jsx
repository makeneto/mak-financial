"use client"

import styled from "styled-components"
import { useAppContext } from "@/src/context/AppContext"
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi"
import { formatCurrency } from "@/src/helpers/utils"
import SingleTransaction from "./SingleTransaction"


const TransactionContainer = styled.div`
    background-color: white;
    margin-top: 1.9rem;

    & h4 {
        font-weight: 500;
    }
`

const TransactionSide = styled.div`
    margin-top: 0.9rem;
    max-height: 40dvh;
    overflow-y: scroll;
    scrollbar-width: none;
    box-shadow: 0 0 20px rgb(0 0 0 / 4%);
    border-radius: 0.9rem;
    padding: 1.3rem 1.5rem;

    &::-webkit-scrollbar {
        display: none;
    }

    & .transactions {
        display: grid;
        gap: 1rem;
    }
`

export default function Transactions() {
    const { transactions } = useAppContext()

    return (
        Object.values(transactions).length > 0 && (
            <TransactionContainer>
                <h4>Transactions</h4>

                <TransactionSide>
                    <ul className="transactions">
                        {Object.values(transactions).map((transaction, index) => (
                            <SingleTransaction key={index} transObj={transaction} />
                        ))}
                    </ul>
                </TransactionSide>
            </TransactionContainer>
        )
    )
}