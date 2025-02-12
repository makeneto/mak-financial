import styled from 'styled-components'

const StatisticsNav = styled.nav` 
    display: flex;
    justify-content: space-between;
    color: ${(props) => props.color === 'white' ? 'white' : 'black'};
    padding: 5%;

    & svg {
        width: 36px;
        height: 26px;
        color: ${(props) => props.color === 'white' ? 'white' : 'black'};
    }

    & h3 {
        font-weight: 500;
        font-size: 1.1rem;
    }
`

export default function ReusableNav({ children, textColor }) {
    return (
        <StatisticsNav color={textColor}>
            {children}
        </StatisticsNav>
    )
}
