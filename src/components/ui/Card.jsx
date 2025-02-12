import { useState, useEffect } from "react"
import { HiOutlineCreditCard } from "react-icons/hi"
import styled from "styled-components"

import { useAppContext } from "../../context/AppContext"
import { tickFormatter } from "../../helpers/utils"

const CardStyled = styled.div`
    margin-top: 1.5rem;
    display: grid;
    gap: 1.6rem;
    background-image: repeating-radial-gradient(  #0c0a0a 80%,#2f312f 90%,#3f4549 90%);
    background-size: 65px 65px;
    padding: 1.2rem 1.7rem;
    border-radius: 1.6rem;
    box-shadow: 0 0 16px #00000045;;
`

const FirstPart = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & svg {
        stroke: white;
        width: 1.5rem;
        height: auto;
    }
`

export const Input = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    color: ${(props) => props.color === 'black' ? 'black' : 'white'};
    font-weight: 500;
    font-size: ${(props) => props.text === 'small' ? '1.1rem' : '1.3rem'};
    font-weight: 500;
    width: ${(props) => props.size === 'big' ? '100%' : '20%'};

    &::placeholder {
        color: ${(props) => props.color === 'black' ? 'black' : 'white'};
        font-size: ${(props) => (props.size === "small" ? "1rem" : "")};
    }

    &:disabled {
        cursor: not-allowed;
    }
`

const SecondPart = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & h1 {
        color: white;
        font-size: 1.3rem;
        font-weight: 500;
    }
`

const ThirdPart = styled.div`
    display: grid;

    & {
        font-size: 0.8rem;
        color: gray;
    }

    & div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & h1 {
            display: flex;
            align-items: center;
            gap: 4px;
            color: white;
            font-size: 1.3rem;
            font-weight: 500;
            cursor: pointer;

            & svg {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
`

export default function Card() {
    const { balance, changeAmount, setChangeAmount, selectCurrency } = useAppContext()

    let currencySign

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
        currencySign = "US$"
    }

    const [cardNumber, setCardNumber] = useState(() => {
        return localStorage.getItem('cardNumber') || ''
    })

    const [cardValidate, setCardValidate] = useState(() => {
        return localStorage.getItem('cardValidate') || ''
    })

    useEffect(() => {
        localStorage.setItem('cardNumber', cardNumber)
    }, [cardNumber])

    useEffect(() => {
        localStorage.setItem('cardValidate', cardValidate)
    }, [cardValidate])

    const handleChangeCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        value = value.substring(0, 16)
        let formattedValue = value.replace(/(\d{4})/g, "$1 ").trim()

        setCardNumber(formattedValue)
    }

    const handleChangeCardValidate = (e) => {
        let inputValidate = e.target.value.replace(/\D/g, "").substring(0, 4)
        let formattedValidate = inputValidate.replace(/(\d{2})(\d{1,2})?/, (_, g1, g2) => (g2 ? `${g1}/${g2}` : g1))

        setCardValidate(formattedValidate)
    }

    function handleChangeAmount() {
        setChangeAmount(!changeAmount)
    }

    return (
        <CardStyled>
            <FirstPart>
                <HiOutlineCreditCard />
                <img
                    src='/visa-logo.png'
                    alt='Visa Logo'
                    width={60}
                    height={34}
                />
            </FirstPart>
            <SecondPart>
                <Input
                    type="text"
                    value={cardNumber}
                    onChange={handleChangeCardNumber}
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    size='big'
                />
            </SecondPart>

            <ThirdPart>
                <span>Current Balance</span>
                <div>
                    <h1 onClick={handleChangeAmount}>
                        {tickFormatter(balance, currencySign)}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>

                    </h1>
                    <Input
                        type="text"
                        value={cardValidate}
                        onChange={handleChangeCardValidate}
                        placeholder="MM/AA"
                        maxLength="5"
                        size='small'
                    />
                </div>
            </ThirdPart>
        </CardStyled>
    )
}