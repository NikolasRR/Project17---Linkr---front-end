import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp} from "react-icons/io5"

function Header(){
    return(
    <Main>
        <Logo>Linkr</Logo>
        <Middle>
            <Input placeholder="Search for people"></Input>
            <div><IoSearchSharp></IoSearchSharp></div>
        </Middle>
        <Rigth>
            <div><IoIosArrowDown></IoIosArrowDown></div>
            <ProfileImage></ProfileImage>
        </Rigth>
    </Main>
    )
}

export default Header;

const Main = styled.div`
    width: 100%;
    height: 72px;
    background: #151515;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

const Logo = styled.p`
    width: 108px;
    height: 54px;
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    color: #FFFFFF;
`

const Middle = styled.div`
    width: 47%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding:10px;
    
    div{
        color: #C6C6C6;
        font-size: 25px;
    }  
    
    @media(max-width: 611px) {
        display:none;
    }

`

const Input = styled.input`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 8px;
    border: none;
    ::placeholder{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #C6C6C6;    
    } 

  
`
const ProfileImage = styled.div`
    width: 53px;
    height: 53px;
    background: red;
    border-radius: 26.5px;
`

const Rigth = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90px;
    height: 100%;
    justify-content: space-between;
    div{
       font-size: 30px;
       color: #fff;
    }
`