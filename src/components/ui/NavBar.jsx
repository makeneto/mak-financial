"use client"

import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { HiOutlineChartSquareBar } from 'react-icons/hi'

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.4rem;

    & h1{
        font-weight: 500;
        font-size: 1.1rem;
    }

    & .user {
        cursor: pointer;
        border-radius: 50%;
        border: 2px solid black;

    }
`

const StatisticalButton = styled(Link)`
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 13px 0px #0000000a;
    cursor: pointer;

    & svg {
        width: 1.7rem;
        height: 1.7rem;
        fill: #152126;
    }
`

export default function NavBar() {
    return (
        <Nav>
            <Link href="/account">
                <Image
                    className='user'
                    src="/user-profile.png"
                    alt='Profile pic'
                    width={35}
                    height={35}
                />
            </Link>

            <h1>Home</h1>

            <StatisticalButton href="/dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" /></svg>
            </StatisticalButton>
        </Nav>
    )
}