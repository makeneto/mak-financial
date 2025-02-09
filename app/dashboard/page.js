"use client"
import ReusableNav from "@/src/components/ui/ReusableNav"
import SalesChart from "@/src/components/ui/SalesChart"
import { useAppContext } from "@/src/context/AppContext"
import { formatCurrency } from "@/src/helpers/utils"
import Link from "next/link"
import { HiOutlineArrowLeft, HiOutlineTrendingDown, HiOutlineTrendingUp } from "react-icons/hi"
import styled from "styled-components"

const Main = styled.main`
    background-color: #152126;
    height: 100dvh;
    overflow-y: hidden;
`

const TotalBalance = styled.main`
    text-align: center;
    color: white;
    margin-top: 3.6rem;

    & h3 {
        font-size: 1.2rem;
        font-weight: 500;
    }

    & h1 {
        font-size: 1.9rem;
        font-weight: 500;
    }
`

const Totals = styled.article`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.3rem;
    padding: 0 5%;
    margin-top: 3.6rem;
`

const TotalBlock = styled.div`
    background-color: white;
    padding: 0.5rem 0.9rem;
    border-radius: 0.7rem;
    display: flex;
    align-items: center;
    color: black;
    gap: 0.7rem;

    & svg {
        width: 21px;
        height: 21px;
        color: black;
    }

    & div {
        & h4 {
        font-size: 0.9rem;
        font-weight: 600;
        }

        & p {
            font-size: 0.6rem;
        }
    }
    
`

export default function Page() {
    const { balance, totalIncome, totalExpenditure } = useAppContext()

    return (
        <Main>
            <ReusableNav textColor='white'>
                <Link href="/"><HiOutlineArrowLeft /></Link>
                <h3>Statistics</h3>
            </ReusableNav>

            <TotalBalance>
                <h3>Total Balance</h3>
                <h1>{formatCurrency(balance)}</h1>

                <Totals>
                    <TotalBlock>
                        <HiOutlineTrendingUp />
                        <div>
                            <h4>{formatCurrency(totalIncome)}</h4>
                            <p>Total Income</p>
                        </div>
                    </TotalBlock>

                    <TotalBlock>
                        <HiOutlineTrendingDown />
                        <div>
                            <h4>{formatCurrency(totalExpenditure)}</h4>
                            <p>Expenditure</p>
                        </div>
                    </TotalBlock>
                </Totals>
            </TotalBalance>
            <SalesChart />
        </Main>
    )
}
