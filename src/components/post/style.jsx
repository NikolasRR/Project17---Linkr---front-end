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
    position: relative;
    @media(max-width: 611px) {
        min-height: 232px;
        border-radius:0;
        margin-bottom: 19px;
    }

`

export const Left = styled.div`
    div{   
        display: flex;
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
            margin-top: -17px;
        } 
    svg{
        /* margin-bottom: 20px; */
    }
`
export const ProfileImage = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    display: flex;
    flex-direction: column;
    align-items:center;  
    object-fit: cover;
    cursor: pointer;    

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

export const Name = styled.div`
    height: 23px;
    color: #FFFFFF;
    margin-bottom:10px;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;    
    @media(max-width: 611px) {
        margin-bottom:7px;
        }
    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        cursor: pointer;
        @media(max-width: 611px) {
        font-size: 17px;
        line-height: 20px;
        }
    }
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        width: 43px;
    }
`

export const Text = styled.p`
    max-width: 100%;
    word-wrap: break-word;
    min-height: 52px;
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
    span{
        cursor:pointer;
    }
`

export const EditInput = styled.input`
    width: 100%;
    height: 52px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #B7B7B7;
    margin-bottom:10px;
    border-radius: 7px;
    border: none;
    color: #4C4C4C;
    @media(max-width: 611px) {
        font-size: 12px;
        line-height: 15px;
        color: #B7B7B7;
        margin-bottom: 13px;
    }
`

export const Url = styled.a`
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
    width: 70%;
    height: 100%;    
`

export const Image = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;  
    border-left : 1px solid #4D4D4D;
    
`

export const ImageData = styled.img`
    /* object-fit: contain; */
    border-top-right-radius: 9px;
    border-bottom-right-radius: 9px;
    max-width: 100%;
    width: auto;
    /* object-fit: auto; */
    object-fit: cover; 
    overflow: hidden;
`

export const Title = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #CECECE;
    height: 30%;
    width: 100%;
`

export const Ancor = styled.a`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #CECECE;
    height: 10%;
    overflow: hidden;
    width: 100%;
`

export const Description = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #9B9595;
    height: 40%;
    overflow: hidden;
    width: 100%;
`

export const ContainerCountLikes = styled.div`

    .ReactTooltip{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #505050;
        background-color: white;
        cursor: pointer;
    }
`;

export const Repost = styled.div`
    
    position: relative;
    background-color: #1E1E1E;
    padding-top: 33px;
    margin-bottom: -10px;
    border-radius: 16px 16px 0 0;
    display: flex;
    text-align: center;
    z-index: 0;
    ${(props) =>( props.model === `true` ? `display: none`:`display: flex`)};
    p2{
        position: relative;
        color: #fff;
        top: -15px;
        left:19px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
    }
    span{
        font-weight: 700;
        font-style: bold;
        font-size: 12px;
    }
    svg{
        position: relative;
        top: -15px;
        color:#fff;
        width: 20px;
        left: 13px;
    }
`;
export const ContainerRepost = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    svg{
        position: relative;
        color:#fff;
        width: 20px;
        margin-bottom: 20px;
    }
`