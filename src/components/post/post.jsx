import {CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url, Left} from "./style"



function Post({userName,url, image,totalLikes, content}){
    return(
        <Content>
            <Left>
                <ProfileImage alt={url} src={image}></ProfileImage>
                <div>
                    {totalLikes===0?<CgHeart></CgHeart>:null} 
                    <p>{totalLikes===0?`${totalLikes} likes`:null}</p>                   
                </div> 
            </Left>                         
            <Publication> 
                <Name>{userName}</Name>
                <Text> {content}</Text>
                <Url>{url}</Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;


