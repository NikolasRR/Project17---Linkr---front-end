import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width:100%;  
    span {
        color: #fff;
        font-weight: 700;
    }
`

export const Posts = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 50%;
    max-width:50%;

    @media(max-width: 611px) {
        max-width:611px;
    }
`

export const Sidebar = styled.div`
    margin-top: 160px;
    @media(max-width: 611px) {
        display:none;
    }
`
export const Title = styled.p`
    margin-top: 53px;
    margin-bottom: 43px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    @media(max-width: 611px) {
        margin-top: 90px;
        margin-bottom: 19px;
        margin-left: 19px;
        font-size: 33px;
        line-height: 49px;
    }
`

export const PostInput = styled.div`
    width: 100%;
    min-height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding:22px;
    margin-bottom: 29px;
    @media(max-width: 611px) {
        align-items: space-between;
        justify-content: center;
        max-width:611px;
        border-radius: 0px;
        min-height: 164px;
        margin-bottom: 19px;
    }
`
export const ProfileImage = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    object-fit: cover; 

    @media(max-width: 611px) {
        display:none;
    }
`

export const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    height: 100%;
    margin-left: 18px;
    @media(max-width: 611px) {
        margin-left: 0px;
    }
    div{
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
    button{
        width: 25%;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;    
        border:none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
        cursor: pointer;
    }
`

export const Question = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom:10px;
`

export const UrlInput = styled.input`
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border:none;
    margin-bottom:5px;
    padding: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;
    textarea:focus, input:focus, select:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
    }
`

export const TextInput = styled.input`
    width: 100%;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;
    border:none;
    margin-bottom:5px;
    padding: 10px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    cursor: pointer;
   
    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
    }

    textarea:focus, input:focus, select:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
`

export const NoMorePosts = styled.div`
    width: 100%;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    p {
        color: #6D6D6D;
        font-family: 'Lato';
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.05em;
    }
`

export const NewPostsWarning = styled.div`
    cursor: pointer;
    width: 100%;
    height: 61px;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 17px;
    color: #FFFFFF;
    p {
        font-family: 'Lato';
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        margin-right: 5px;
    }
    
    @media(max-width: 611px) {
        border-radius: 0;
    }
`

export const MiniNotice = styled.button`
    position: fixed;
    left: calc(50% - 60px);
    top: 20px;
    transition: height 150ms ease;
    width: 120px;
    height: 30px;
    background-color: #1877F2;
    color: #FFFFFF;
    z-index: 2;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`