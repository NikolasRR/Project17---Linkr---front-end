import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Result from "./../searchUser/searchUser";
import { DebounceInput } from 'react-debounce-input';

import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";

import { Main, Logo, Middle, Input, Rigth, ProfileImage, UserOptions, Option, ResultStyle, Content } from "./../header/style"

function Header() {
    const navigate = useNavigate();

    const { userData, setUserData, setSwitchedUserPage } = useContext(UserContext);
    const { reloadPage, setReloadPage } = useContext(deletionDataContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [searchData, setSearchData] = useState([]);

    function goToTimeLine() {
        navigate(`/`)
    }

    async function search(e) {
        e.preventDefault()
        const { value } = e.target;
        if (value.length > 2) {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/search/${value}`, { withCredentials: true });
                const { data } = response;
                setSearchData(data)
            } catch (error) {
                console.error(error);
            }
        }
        else { setSearchData([]); }
    }

    async function logout() {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true });
            setUserData({});
            navigate("/");
        } catch (error) {
            alert('Something went wrong');
        }
    }
    function goToUserPage() {
        const profile = userData.image;
        const userName = userData.userName;
        navigate(`/user/${userData.id}`, { state: { userName, profile } });
        setSwitchedUserPage(true);
        setReloadPage(!reloadPage);
    }


    return (
        <Main>
            <Logo onClick={() => goToTimeLine()} >Linkr</Logo>
            <Content>
                <Middle>

                    <DebounceInput debounceTimeout={300} placeholder="Search for people" onChange={search} />


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
                <UserOptions opened={menuOpen}>
                    <Option opened={menuOpen} onClick={() => goToUserPage()}>Mypage</Option>
                    <Option opened={menuOpen} onClick={() => logout()}>Logout</Option>

                </UserOptions>
            </Rigth>
        </Main>
    )
}

export default Header;
