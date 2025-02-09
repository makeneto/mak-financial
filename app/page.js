"use client"
import Header from '@/src/components/ui/Header'
import NavBar from '@/src/components/ui/NavBar'
import Card from '@/src/components/ui/Card'
import AmountOptions from '@/src/components/ui/AmountOptions'
import Transactions from '@/src/components/ui/Transactions'
import styled from 'styled-components'
import { useAppContext } from '@/src/context/AppContext'

const ContentBody = styled.main`
  padding: 5% 5%;
`

export default function Page() {
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
        <Transactions />
      </main>
    </ContentBody>
  )
}