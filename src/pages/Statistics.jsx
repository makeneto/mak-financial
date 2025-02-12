import { Link } from "react-router-dom"
import { HiOutlineArrowLeft } from "react-icons/hi"
import styled from "styled-components"

import { useAppContext } from "../context/AppContext"
import formatCurrency from "../helpers/utils"
import ReusableNav from "../components/ui/ReusableNav"
import SalesChart from "../components/ui/SalesChart"

const Main = styled.main`
    background-image: repeating-radial-gradient(  #0c0a0a 80%,#2f312f 90%,#3f4549 90%);
    background-size: 60px 60px;
    height: 100dvh;
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

export default function Statistics() {
    const { balance } = useAppContext()
    const currency = localStorage.getItem("currency")

    return (
        <Main>
            <ReusableNav textColor='white'>
                <Link to="/"><HiOutlineArrowLeft /></Link>
                <h3>Statistics</h3>
            </ReusableNav>

            <TotalBalance>
                <h3>Total Balance</h3>
                <h1>{formatCurrency(balance, currency)}</h1>
            </TotalBalance>

            <SalesChart />
        </Main>
    )
}
