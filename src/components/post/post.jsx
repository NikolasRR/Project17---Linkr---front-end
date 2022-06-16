import {CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url, Left,Data,Title,Description,Ancor, Image} from "./style"



function Post({userName,url, profile,totalLikes, content, title, description, image}){
    return(
        <Content>
            <Left>
                <ProfileImage alt={url} src={profile}></ProfileImage>
                <div>
                    <CgHeart></CgHeart> 
                    <p>{totalLikes===0?`${totalLikes} likes`:null}</p>                   
                </div> 
            </Left>                         
            <Publication> 
                <Name>{userName}</Name>
                <Text> {content}</Text>
                <Url>
                    <Data>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                        <Ancor href={url}>{url}</Ancor>
                    </Data>
                    <Image><img alt ={image} src={image}></img></Image>                
                </Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;



