import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Result from "./../searchUser/searchUser";
import  { DebounceInput }  from  'react-debounce-input' ;

import UserContext from "../../contexts/UserContext";


import { Main, Logo, Middle, Input, Rigth, ProfileImage, UserOptions, LogoutOption, ResultStyle, Content } from "./../header/style"

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const {userData,setUserData } = useContext(UserContext);
    const [searchData, setSearchData] = useState([]);
    function goToTimeLine(){
        navigate(`/`)
    }
    
    async function search(e){
        e.preventDefault()
        const { value } = e.target;
        if(value.length > 2){
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${value}`, { withCredentials: true });
            const {data} = response;
            setSearchData(data)
        }catch(error){
            console.error(error);
        }
        }
        else{setSearchData([]);}
    }

    async function logout () {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
            setUserData({});
            navigate("/");
        } catch (error) {
            alert('Something went wrong');
        }
    }



    return (
        <Main>
            <Logo onClick={()=> goToTimeLine()} >Linkr</Logo>
            <Content>
            <Middle>
            
                <DebounceInput debounceTimeout = { 300 } placeholder="Search for people" onChange={search}/>
            
            
                <div><IoSearchSharp></IoSearchSharp></div>
            </Middle>
            <ResultStyle>
                {searchData.length > 0 && searchData.map((data, index) => 
                <Result key={index} value={data}></Result>) 
                }
            </ResultStyle>
            </Content>
            <Rigth onClick={() => setMenuOpen(!menuOpen)}>
                <div>{menuOpen ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown>}</div>
                <ProfileImage src={userData.image}></ProfileImage>
                <UserOptions opened={menuOpen}><LogoutOption opened={menuOpen} onClick={() => logout()}>Logout</LogoutOption></UserOptions>
            </Rigth>
        </Main>
    )
}

export default Header;
