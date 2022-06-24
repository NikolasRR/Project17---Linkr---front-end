import styled from "styled-components"

export const BoxComment = styled.div`
    display: flex;
    min-width: 100%;
    background-color: #1E1E1E;
    z-index: -1px;
    &:first-child{
        margin-top: -40px;
    }
    &:last-child{
        margin-bottom: 40px;
    }
`
export const ProfileImage = styled.img`
    width: 39px;
    height: 39px;
    margin-top: 25px;
    border-radius: 26.5px;
    display: flex;
    flex-direction: column;
    align-items:center;  
    object-fit: cover;
    margin-left: 25px;
    
    @media(max-width: 611px) {
        width: 40px;
        height: 40px;
    }
`
export const Infos = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 25px;
    margin-left: 18px;

    div{
        display:flex;

        span{
            font-family: Lato;
            font-size: 14px;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: 0em;
            text-align: left;
            color: #ACACAC;
            margin-left: 8px;
        }
    }

    h1{
        font-family: Lato;
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        letter-spacing: 0em;
        color: #F3F3F3;
    }

    p{
        margin-top: 3px;
        font-family: Lato;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        color: #ACACAC
    }
`