import styled from "styled-components"

export const Content = styled.div`
    margin-bottom: 29px;
    min-width: 100%;
    min-height: 276px;
    background: #171717;
    border-radius: 16px;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding:22px;
    @media(max-width: 611px) {
        min-height: 232px;
        border-radius:0;
        margin-bottom: 19px;
    }

`

export const Left = styled.div`
     div{   display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFF;
            font-size: 90;
            font-weight: 900;
            margin-top: 20px;
        }

        p{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            text-align: center;
            color: #FFFFFF;
            margin-top: 5px;
        } 



`
export const ProfileImage = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    display: flex;
    flex-direction: column;
    align-items:center;      

    @media(max-width: 611px) {
        width: 40px;
        height: 40px;
        
    }

`

export const Publication = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 89%;
    height: 100%;
    margin-left:5px;

    div{
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
   
`

export const Name = styled.p`
    height: 23px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    margin-bottom:10px;
    width: 100%;
    overflow-x: hidden;
    
    @media(max-width: 611px) {
        font-size: 17px;
        line-height: 20px;
        margin-bottom:7px;
    }
    
`
export const Text = styled.p`
    width: 100%;
    height: 52px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-bottom:10px;
    @media(max-width: 611px) {
        font-size: 15px;
        line-height: 18px;
        color: #B7B7B7;
        margin-bottom: 13px;
    }
`

export const Url = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
`
