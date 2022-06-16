import { CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url} from "./style"

   

function Post(){
    return(
        <Content>
            <ProfileImage>
                <div>
                    <CgHeart></CgHeart>                    
                </div> 
                <p>likes</p>              
            </ProfileImage>
            <Publication> 
                <Name>Juvenal Juvêncio</Name>
                <Text> Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Text>
                <Url></Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;


