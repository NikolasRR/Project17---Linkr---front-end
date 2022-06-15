import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState } from "react";

import Timeline from "../templates/timeline/timeline";

import isLoadingContext from "../contexts/isLoadingContext"
import isModalOpenContext from "../contexts/isModalOpenContext"


function App() {

    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <BrowserRouter>
                <isLoadingContext.Provider value={{isLoading, setIsLoading}}>
                    <isModalOpenContext.Provider value={{isModalOpen, setIsModalOpen}}>
                            <Routes>
                                    <Route path="/timeline" element={<Timeline />} />
                            </Routes>
                    </isModalOpenContext.Provider>  
                </isLoadingContext.Provider>                              
            </BrowserRouter>
        </>
    )
}

export default App;