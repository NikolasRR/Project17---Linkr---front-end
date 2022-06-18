import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import UserContext from "../../contexts/UserContext";

import { Main, Logo, Middle, Input, Rigth, ProfileImage, UserOptions, LogoutOption } from "./../header/style"

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const {userData,setUserData } = useContext(UserContext);

    function goToTimeLine(){
        navigate(`/`)
    }
    
    async function logout () {
        try {
            await axios.get("http://localhost:5000/logout", { withCredentials: true });
            setUserData({});
            navigate("/");
        } catch (error) {
            alert('Something went wrong');
        }
    }

   

    return (
        <Main>
            <Logo onClick={()=> goToTimeLine()} >Linkr</Logo>
            <Middle>
                <Input placeholder="Search for people"></Input>
                <div><IoSearchSharp></IoSearchSharp></div>
            </Middle>
            <Rigth onClick={() => setMenuOpen(!menuOpen)}>
                <div>{menuOpen ? <IoIosArrowUp></IoIosArrowUp> : <IoIosArrowDown></IoIosArrowDown>}</div>
                <ProfileImage src={userData.image}></ProfileImage>
                <UserOptions opened={menuOpen}><LogoutOption opened={menuOpen} onClick={() => logout()}>Logout</LogoutOption></UserOptions>
            </Rigth>
        </Main>
    )
}

export default Header;
