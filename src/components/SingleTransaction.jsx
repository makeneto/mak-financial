import { HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi"
import styled from "styled-components"

import formatCurrency from "../helpers/utils"

const TransactionContent = styled.ul`
    display: grid;  

    & p:first-child {
        font-size: 0.8rem;
        font-weight: 500;
    }

    & p:nth-child(2) {
        font-size: 0.6rem;
        color: gray;
    }
`

const Transaction = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .data_first {
        display: flex;
        align-items: center;
        gap: 0.89rem;

        & svg {
            width: 1.3rem;
            height: 1.3rem;
        }
    }

    & h1 { 
        font-size: 0.8rem;
        font-weight: 500;
    }
`

export default function SingleTransaction({ transObj }) {
    const { type, description, date, amount } = transObj
    const currency = localStorage.getItem("currency")

    return (
        <>
            <Transaction>
                <div className="data_first">
                    {type === 'income' ?
                        <HiOutlineTrendingUp /> :
                        <HiOutlineTrendingDown />
                    }
                    <TransactionContent>
                        <p>{description}</p>
                        <p>{date}</p>
                    </TransactionContent>
                </div>
                <h1><span>{type === 'income' ? '+' : '-'}</span>{formatCurrency(amount, currency)}</h1>
            </Transaction>
        </>
    )
}