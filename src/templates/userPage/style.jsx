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

export const ProfileImage = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;    
    object-fit: cover; 
    margin-right: 18px;
    @media(max-width: 611px) {
        display:none;
    }
`

export const LittleHeader = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-top: 53px;
    margin-bottom:44px;
    width: 100%;    
`

export const Posts = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 50%;
    max-width:50%;
    position:relative;
    
    @media(max-width: 611px) {
        max-width:611px;
    }
`

export const Sidebar = styled.div`
    margin-top: ${props => props.margin?`160px`:`75px`};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media(max-width: 611px) {
        display:none;
    }
`
export const Title = styled.p`
    
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    z-index: -1;
    @media(max-width: 611px) {
        margin-top: 19px;
        margin-bottom: 19px;
        margin-left: 19px;
        font-size: 33px;
        line-height: 49px;
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

export const Follow = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    border: none;
    margin-bottom: 55px;
    cursor:pointer;
`
