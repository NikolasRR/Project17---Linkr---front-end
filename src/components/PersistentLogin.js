import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/UserContext";

function PersistLogin () {
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const user = await axios.get("http://localhost:5000/session", { withCredentials: true });
                setUserData(user);
            } catch (error) {
                if (error.response.status === 400) {
                    alert('Session expired');
                }
                navigate("/");
            }

        }
        getUser();
    }, []);

    return null;
}

export default PersistLogin;