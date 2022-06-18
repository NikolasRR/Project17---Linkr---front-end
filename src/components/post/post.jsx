import {CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url, Left,Data,Title,Description,Ancor, Image, ImageData} from "./style"
import { useNavigate } from "react-router-dom";


function Post({userId,userName,url, profile,totalLikes, content, title, description, image}){

    const navigate = useNavigate();

    function goToUserPage(){
        navigate(`/user/${userId}`, {state:{userName, profile}})

    }

    return(
        <Content>
            <Left>
                <ProfileImage onClick={()=>goToUserPage()} alt={url} src={profile}></ProfileImage>
                <div>
                    <CgHeart></CgHeart> 
                    <p>{totalLikes===0?`${totalLikes} likes`:null}</p>                   
                </div> 
            </Left>                         
            <Publication> 
                <Name onClick={()=>goToUserPage()} >{userName}</Name>
                <Text> {content}</Text>
                <Url target={"_blank"} href={url}>
                    <Data>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                        <Ancor target={"_blank"} href={url}>{url}</Ancor>
                    </Data>
                    <Image><ImageData alt ={image} src={image}></ImageData></Image>                
                </Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;



