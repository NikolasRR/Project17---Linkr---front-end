import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState } from "react";

import Timeline from "../templates/timeline";
import isLoadingContext from "../contexts/isLoadingContext"


function App() {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <BrowserRouter>
                <isLoadingContext.Provider value={{isLoading, setIsLoading}}>
                    <Routes>
                            <Route path="/" element={<Timeline />} />
                    </Routes> 
                </isLoadingContext.Provider>                              
            </BrowserRouter>
        </>
    )
}

export default App;