import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp} from "react-icons/io5";

import {Main,Logo,Middle,Input,Rigth,ProfileImage} from "./../header/style"

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
