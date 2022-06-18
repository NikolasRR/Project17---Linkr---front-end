import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignUp from "./signUp/SignUp";
import Timeline from "../templates/timeline/timeline";
import SignInScreen from "./SignInScreen";
import PersistLogin from "./PersistentLogin";

import UserContext from "../contexts/UserContext";
import isLoadingContext from "../contexts/isLoadingContext"
import isModalOpenContext from "../contexts/isModalOpenContext"


function App() {

    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [userData, setUserData] = useState({})
    //const [total, setTotal] = useState([]);

    const contextValue = { userData, setUserData }

    return (
        <>
            <BrowserRouter>
                <isLoadingContext.Provider value={{ isLoading, setIsLoading }}>
                    <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
                        <UserContext.Provider value={contextValue}>
                            <PersistLogin />
                            <Routes>
                                <Route path="/" element={<SignInScreen />} />
                                <Route path="/timeline" element={<Timeline />} />
                                <Route path="/sign-up" element={<SignUp />} />
                            </Routes>
                        </UserContext.Provider>
                    </isModalOpenContext.Provider>
                </isLoadingContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;