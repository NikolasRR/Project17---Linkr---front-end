import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import SignUp from "./signUp/SignUp";
import Timeline from "../templates/timeline/timeline";
import Hashtag from "./../templates/hashtagPage/hashtagPage";
import SignInScreen from "./signIn/SignInScreen";
import PersistLogin from "./PersistentLogin";
import UserPage from "../templates/userPage/userPage";

import UserContext from "../contexts/UserContext";
import isLoadingContext from "../contexts/isLoadingContext"
import isModalOpenContext from "../contexts/isModalOpenContext"
import deletionDataContext from "../contexts/deletionDataContext";
import RepostContext from "../contexts/repostContext";

function App() {
    const [likesInfo, setLikesInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletionData, setDeletionData] = useState({});
    const [reloadPage, setReloadPage] = useState(false);
    const [userData, setUserData] = useState({});
    const [repost, setRepost] = useState([]);
    const [switchedUserPage, setSwitchedUserPage] = useState(false);

    return (
        <>
            <BrowserRouter>
                <deletionDataContext.Provider value={{ deletionData, setDeletionData, reloadPage, setReloadPage }}>
                    <isLoadingContext.Provider value={{ isLoading, setIsLoading }}>
                        <isModalOpenContext.Provider value={{ isModalOpen, setIsModalOpen }}>
                            <UserContext.Provider value={{ userData, setUserData, switchedUserPage, setSwitchedUserPage }}>
                                <RepostContext.Provider value={{repost, setRepost}}>
                                    <PersistLogin />
                                    <Routes>
                                        <Route path="/" element={<SignInScreen />} />
                                        <Route path="/timeline" element={<Timeline />} />
                                        <Route path="/sign-up" element={<SignUp />} />
                                        <Route path="/hashtag/:hashtag" element={<Hashtag />} />
                                        <Route path="/user/:id" element={<UserPage />} />
                                    </Routes>
                                </RepostContext.Provider>
                            </UserContext.Provider>
                        </isModalOpenContext.Provider>
                    </isLoadingContext.Provider>
                </deletionDataContext.Provider>
            </BrowserRouter>
        </>
    )
}

export default App;