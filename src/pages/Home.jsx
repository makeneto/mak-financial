import styled from 'styled-components'

import Header from '../components/ui/Header'
import NavBar from '../components/ui/NavBar'
import Card from '../components/ui/Card'
import AmountOptions from '../components/AmountOptions'
import Transactions from '../components/Transactions'
import { useAppContext } from '../context/AppContext'

const ContentBody = styled.main`
    padding: 5% 5%;
`

export default function Home() {
    const { changeAmount } = useAppContext()
    return (
        <ContentBody>
            <NavBar />
            <Header />
            <main>
                <Card />
                {changeAmount &&
                    <AmountOptions />
                }
                <Transactions>Transactions</Transactions>
            </main>
        </ContentBody>
    )
}
