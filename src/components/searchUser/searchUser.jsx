import { useNavigate } from "react-router-dom";

import {Main} from "./style";

export default function Result(props){
    const navigate = useNavigate();
    const { value } = props;
    const userName = value.userName;
    const profile = value.image;
    return(
        <Main onClick={() => navigate(`/user/${value.id}`,{ state: { userName, profile } })}>
            
            <img src={value.image} alt ={value.userName} />
            <p>{value.userName}</p>
            
        </Main>
    )
}