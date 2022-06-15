import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Header () {
    const navigate = useNavigate();

    useEffect(() => {
        async function logout () {
            try {
                await axios.get("http://localhost:5000/logout", { withCredentials: true });
                navigate("/");
            } catch (error) {
                alert('Something went wrong');
            }
        }
        logout();
    })
}

export default Header;