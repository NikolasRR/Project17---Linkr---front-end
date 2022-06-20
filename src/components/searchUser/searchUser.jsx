import { useNavigate } from "react-router-dom";

import {Main} from "./style";

export default function Result(props){
    const { value } = props;
    return(
        <Main>
            
            <img src={value.image} alt ={value.userName} />
            <p>{value.userName}</p>
            
        </Main>
    )
}