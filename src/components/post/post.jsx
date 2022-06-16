import {CgHeart} from "react-icons/cg";
import {Content,ProfileImage, Publication, Name, Text, Url, Left} from "./style"
import styled from "styled-components"

   

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
                        <a href={url}>{url}</a>
                    </Data>
                    <Image><img src={image}></img></Image>                
                </Url>                           
            </Publication>
        </Content> 
    )
}

export default Post;

const Data = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

`

const Image = styled.div`
    height: 100%;
    img{
        object-fit: contain;
    }
`
const Title = styled.p`
    
`

const Description = styled.p`
    
`

