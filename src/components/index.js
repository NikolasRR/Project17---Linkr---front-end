import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Trending from "./sidebar/sidebar"

function App(){
    return(
        <BrowserRouter>
            {<Trending/>}
            <Routes>
                <Route path='/' element={<p>LALALA</p>}/>
            </Routes>
        </BrowserRouter>
        
    )
}

export default App;