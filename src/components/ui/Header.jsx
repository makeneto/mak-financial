"use client"
import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Header() {
    const [greeting, setGreeting] = useState('Morning')

    useEffect(() => {
        const now = moment()
        const hour = now.hours()

        if (hour < 12) {
            setGreeting('Morning')
        }
        else if (hour < 18) {
            setGreeting('Afternoon')
        }
        else {
            setGreeting('Evening')
        }

    }, [greeting, setGreeting])

    return (
        <header className='header__main'>
            <h1>Good {greeting}</h1>
            <p>Hi, Makene Neto</p>
        </header>
    )
}
