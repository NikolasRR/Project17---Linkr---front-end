import styled from "styled-components";


export const Main = styled.div`
    width: 100%;
    height: 72px;
    background: #151515;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    position: relative;
`

export const Logo = styled.p`
    width: 108px;
    height: 54px;
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
    cursor:pointer;
`

export const Middle = styled.div`
    position: relative;
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:10px;
    z-index: 1;
    input{
        width: 100%;
        height: 100%;
        background: #FFFFFF;
        border-radius: 8px;
        border: none;
        padding: 5px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #515151;
        cursor: pointer;
        textarea:focus, input:focus {
        box-shadow: 0 0 0 0;
        outline: 0;
        }
        ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;    
    } 
    }
    textarea:focus, input:focus, select:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
    
    div{
        color: #C6C6C6;
        font-size: 25px;
        cursor:pointer;
    }  
    
    @media(max-width: 611px) {

        margin-top: 150px;
        width: 90vw;
        right: 21vw;
        /* display:none; */
    }

`

export const Input = styled.input`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    border: none;
    padding: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
    cursor: pointer;
    textarea:focus, input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
}

    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;    
    } 

  
`

export const ProfileImage = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    object-fit: cover; 
    
`

export const Rigth = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90px;
    height: 100%;
    justify-content: space-between;
    cursor:pointer;
    
    div{
       font-size: 30px;
       color: #fff;
    }
`

export const UserOptions = styled.div`
    position: absolute;
    right: 0;
    top: 72px;
    background-color: #171717;
    border-radius: 0px 0px 0 20px;
    display: ${({opened}) => opened ? "initial" : "none"};
    width: ${({opened}) => opened ? "130px" : "0px"};
    height: ${({opened}) => opened ? "55px" : "0px"};
    transition: height 150ms ease;
    letter-spacing: 0.05em;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
`

export const Option = styled.p`
    display: ${({opened}) => opened ? "initial" : "none"};
    font-weight: 700;
    font-family: 'Lato';
    font-size: 17px;
    line-height: 20px;
    margin-bottom: 5px;
    
    &:hover {
        cursor: pointer;
    }
`
export const Content = styled.div`
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* margin-top: 35px; */
    
    width: 47%;
`;

export const ResultStyle = styled.div`
    margin-top: -10px;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #E7E7E7;
    border-radius: 8px;
    @media(max-width: 611px) {
        width: 90vw;
        left: -45%;

        /* z-index:3; */
    }
`;