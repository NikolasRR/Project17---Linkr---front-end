import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "../contexts/UserContext";
import SignUp from "./signUp/SignUp";

function App() {

    const [userData, setUserData] = useState({})

    const contextValue = { userData, setUserData }

    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={contextValue}>
                    <Routes>
                        <Route path="/sign-up" element={<SignUp />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;