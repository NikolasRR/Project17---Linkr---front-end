import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import UserContext from "../contexts/UserContext";

import SignInScreen from "./signInScreen";

function App() {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser () {
            try {
                const user = await axios.get("http://localhost:5000/session", { withCredentials: true });
                setUserData(user);
            } catch (error) {
                alert('Session expired');
                navigate("/");
            }
            
        }
        getUser();
    }, []);

    const contextValue = { userData, setUserData };

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/" element={<SignInScreen />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;