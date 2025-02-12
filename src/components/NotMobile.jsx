import styled from "styled-components";

const Title = styled.h1`
    text-align: center;
    font-weight: 500;
    font-size: 1rem;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export default function NotMobile() {
    return (
        <>
            <div className="container-loader">
                <div className="loader-m loader-1"></div>
                <div className="loader-m loader-2"></div>
                <div className="loader-m loader-3"></div>
            </div>

            <Title>Please, access this app on a phone</Title>
        </>
    );
}
