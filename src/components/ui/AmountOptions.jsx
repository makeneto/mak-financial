"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import styled from "styled-components"
import { HiOutlineTrendingDown, HiOutlineTrendingUp, HiOutlineAnnotation } from "react-icons/hi"
import moment from "moment"

import { Input } from "./Card"
import { useAppContext } from "@/src/context/AppContext"

const Form = styled.form`
    display: grid;
    gap: 1.2rem;
`

const AmountBlocks = styled.div`
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 1rem;
    
    & div {
        background-color: #bfbfbf4d;
        padding: 0.3rem;
        border-radius: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        & svg {
            width: 66px;
            height: 26px;
            color: black;
        }

        & div {
            background-color: transparent;
            display: grid;

            & span {
                color: rgb(134, 134, 134);
                font-size: 0.8rem;
            }
        }
    }
`

const Button = styled.button`
    background-color: #152126;
    width: 100%;
    border: none;
    color: white;
    padding: 0.7rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
    font-size: 0.9rem;
    font-family: inherit;
    margin-top: ${(props) => props.mt === '1rem' ? '1rem' : ''};
`

const DescriptionSide = styled.div`

    & div {
        background-color: #bfbfbf4d;
        padding: 0.7rem 0.3rem;
        border-radius: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.2rem;
        
        & svg {
            width: 44px;
            height: 26px;
            stroke: #152126;
        }
        
        & aside {
            background-color: transparent;
            display: grid;
            width: 100%;

            & label {
                color: rgb(134, 134, 134);
                font-size: 0.8rem;
            }

            & input {
                background-color: transparent;
                width: 100%;
                border: none;
                outline: none;
                color: black;
                font-weight: 500;
                font-size: 0.9rem;
                font-weight: 500;
                margin-top: 0.2rem;

                &::placeholder {
                    color:rgb(168, 168, 168);
                }
            }
        }
    }
`

const Error = styled.span`
    color: red;
    font-size: 0.8rem;
`

export default function AmountOptions() {
    const { balance, setBalance, setTransactions, changeAmount } = useAppContext()
    const [income, setIncome] = useState("")
    const [expense, setExpense] = useState("")
    const [spanInput, setSpanInput] = useState("")

    // 1 Passo
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleChangeIncome = (e) => {
        let newValue = e.target.value.replace(/[^0-9]/g, "")
        setIncome(newValue ? `$${newValue}` : "")
    }

    const handleChangeExpense = (e) => {
        let newValue = e.target.value.replace(/[^0-9]/g, "")
        setExpense(newValue ? `$${newValue}` : "")
    }

    // 2 Passo
    function onSubmit(data) {
        const incomeValue = income ? parseFloat(income.replace("$", "")) : 0
        const expenseValue = expense ? parseFloat(expense.replace("$", "")) : 0

        if (expenseValue > balance) {
            toast.error("Operation Denied")
            return
        }

        setBalance(prevBalance => prevBalance + incomeValue - expenseValue)
        toast.success("Accepted operation")

        const newTransaction = {
            type: incomeValue > 0 ? "income" : "expense",
            description: data.text,
            date: moment().format("LL"),
            amount: incomeValue > 0 ? incomeValue : expenseValue
        }

        setTransactions(prevTransactions => ({
            [moment().valueOf()]: newTransaction,
            ...prevTransactions,
        }))

        setIncome("")
        setExpense("")
    }

    useEffect(() => {
        if (income.length >= 2) {
            setSpanInput("Description")
        } else if (expense.length >= 2) {
            setSpanInput("Purpose")
        }
    }, [income, expense])

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <AmountBlocks>
                <div>
                    <HiOutlineTrendingUp />
                    <div>
                        <span>Income</span>
                        <Input
                            type="text"
                            size="big"
                            color="black"
                            text="small"
                            placeholder="0"
                            disabled={expense.length > 1}
                            value={income}
                            onChange={handleChangeIncome}
                        />
                    </div>
                </div>
                <div>
                    <HiOutlineTrendingDown />
                    <div>
                        <span>Expense</span>
                        <Input
                            size="big"
                            color="black"
                            text="small"
                            type="text"
                            placeholder="0"
                            disabled={income.length > 1}
                            value={expense}
                            onChange={handleChangeExpense}
                        />
                    </div>
                </div>
            </AmountBlocks>

            {(income.length > 1 || expense.length > 1) && (
                <DescriptionSide>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M64 464c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z" /></svg>

                        <aside>
                            <label id="description">
                                {spanInput}
                                <input
                                    type="text"
                                    id="description"
                                    placeholder="Write something..."
                                    // 3 Passo
                                    {...register("text", { required: "This field is required" })}
                                />
                            </label>
                        </aside>
                    </div>

                    {/* 4 Passo */}
                    {errors.text && <Error>{errors.text.message}</Error>}

                    <Button type="submit" mt="1rem">
                        Aplicar
                    </Button>
                </DescriptionSide>
            )}
        </Form>
    )
}