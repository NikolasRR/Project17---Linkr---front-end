import styled from "styled-components"

export const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 16px;
    align-items: center;
    width: 100%;
    background: #E7E7E7;
    &:hover {
        cursor: pointer;
    }
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    p{
        font-family: 'Lato';
        margin-left: 10px;
        font-size: 19px;
        color: #515151;
        
    }
    p2{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        margin-left: 1ch;
        color: #B5B5B5
    }

`;