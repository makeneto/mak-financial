import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Header() {
    const [greeting, setGreeting] = useState('Morning')
    const savedValues = JSON.parse(localStorage.getItem("formValues")) || {}
    const { name } = savedValues

    useEffect(() => {
        const hour = moment().hours()

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
            <p>{!name ? 'Welcome to The Mak Financial' : `Hi, ${name}`}</p>
        </header>
    )
}
