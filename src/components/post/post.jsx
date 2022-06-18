import ReactHashtag from "react-hashtag";
import {useNavigate} from 'react-router-dom';
import {CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url, Left,Data,Title,Description,Ancor, Image, ImageData} from "./style"



function Post({userName,url, profile,totalLikes, content, title, description, image}){
    const navigate = useNavigate();
    function clickHash(hashtag){
        navigate(`/hashtag/${hashtag.replace("#","")}`);
        window.location.reload();
    }
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
                <Text> <ReactHashtag onHashtagClick={val => clickHash(val)}>{content}</ReactHashtag></Text>
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



