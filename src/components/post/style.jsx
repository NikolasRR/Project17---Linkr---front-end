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
            font-size: 25px;
            font-weight: 900;
            margin-top: 20px;
            border: white;
        }
        p{
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            text-align: center;
            color: #FFFFFF;
            margin-top: -17px;
        } 
        .Heart{
                border: white;
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
   
    display: flex;
    justify-content: center;        
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
    width: 100%;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: space-between;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
`
export const Data = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-items: flex-start;
    padding: 15px;
    
`

export const Image = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 153px;   
    img{
        object-fit: auto;
    }
`
   
export const Title = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
`

export const Ancor = styled.a`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
`

export const Description = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
`