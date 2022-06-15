import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";

function Header () {
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    useEffect(() => {
        async function logout () {
            try {
                await axios.get("http://localhost:5000/logout", { withCredentials: true });
                setUserData({});
                navigate("/");
            } catch (error) {
                alert('Something went wrong');
            }
        }
        logout();
    })
}

export default Header;