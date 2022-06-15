import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import SignInScreen from "./signInScreen";

function App() {
console.log('teste');
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignInScreen />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;