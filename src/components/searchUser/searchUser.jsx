import { useNavigate } from "react-router-dom";

import {Main} from "./style";

export default function Result(props){
    const navigate = useNavigate();
    const { value } = props;
    const userName = value.userName;
    const profile = value.image;
    return(
        <Main onClick={() => navigate(`/user/${value.id}`,{ state: { userName, profile } })}>
            
            <img src={profile} alt ={value.userName} />
            <p>{userName}</p>
            {value.follower&& <p2>• seguindo</p2>}
        </Main>
    )
}