import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.main`
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

export const Propaganda = styled.div`
    width: calc(100% - 535px);
    background-color: #151515;
    color: #FFFFFF;
    @media (max-width: 900px) {
        width: 100%;
        height: 175px;
        display: flex;
        justify-content: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;

export const Text = styled.div`
    margin-top: calc(50vh - 200px);
    margin-left: calc(25vw - 200px);
    @media (max-width: 900px) {
        margin: 0 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const H1 = styled.h1`
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    @media (max-width: 1100px) {
        font-size: 76px;
        line-height: 84px;
    }
    font-family: 'Passion One';
`;

export const H2 = styled.h2`
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    width: 442px;
    @media (max-width: 1100px) {
        font-size: 23px;
        line-height: 34px;
        width: 242px
    }
    font-family: 'Oswald';
`;

export const LogInBar = styled.div`
    box-sizing: border-box;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 535px;
    height: 100vh;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 429px;
    margin-top: 30vh;
    @media (max-width: 900px) {
        margin-top: 40px;
    }
`;

export const Input = styled.input`
    padding-left: 15px;
    width: 429px;
    height: 65px;
    border-radius: 6px;
    margin-bottom: 13px;
    font-size: 27px;
    line-height: 40px;
    font-family: 'Oswald';
    font-weight: 700;
    border: none;
    @media (max-width: 900px) {
        width: 330px;
        height: 55px;
    }
`;

export const Button = styled.button`
    width: 429px;
    height: 65px;
    border-radius: 6px;
    background-color:  #1877F2;
    border: none;
    margin-bottom: 22px;
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    color: #ffff;
    font-weight: 700;
    font-family: 'Oswald';
    &:hover {
        cursor: ${({ isDisabled }) => isDisabled ? "default" : "pointer"};
    }
    opacity: ${({ isDisabled }) => isDisabled ? "0.7" : "1"};
    @media (max-width: 900px) {
        width: 330px;
        height: 55px;
    }
`;

export const StyledLink = styled(Link)`
    color: #ffff;
    font-size: 20px;
    line-height: 24px;
    text-decoration: underline;
    @media (max-width: 900px) {
        font-size: 17px;
        line-height: 20px;
    }
    font-family: 'Lato';
`;