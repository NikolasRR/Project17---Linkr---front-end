import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SignInScreen from "./signInScreen";

function App() {
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;