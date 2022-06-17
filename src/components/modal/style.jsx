import styled from "styled-components";

export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; 
    z-index:2;
`

export const ModalContainer = styled.div`
    width: 597px;
    height: 262px;
    left: 413px;
    top: 349px;
    background: #333333;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index:3;

`

export const Body = styled.div`
    width: 338px;
    height: 82px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
`

export const Footer = styled.div`

    button {
        width: 134px;
        height: 37px;
        left: 733px;
        top: 509px;
        background: #1877F2;
        border-radius: 5px;
        border: none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
        cursor: pointer;
    }  

`