import axios from "axios";
import { useState, useContext, useEffect } from "react";

import { CgHeart, CgTrash } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import { Content, ProfileImage, Publication, Name, Text, Url, Left, Data, Title, Description, Ancor, Image, ImageData } from "./style"

import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";

function Post({ id, publicationId, userName, url, profile, totalLikes, content, title, description, image, setIsModalOpen }) {
    const { userData } = useContext(UserContext);
    const { setDeletionData } = useContext(deletionDataContext)

    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        setIsUser(userName === userData?.userName);
    }, [userData])

    return (
        <Content>
            <Left>
                <ProfileImage alt={url} src={profile}></ProfileImage>
                <div>
                    <CgHeart></CgHeart>
                    <p>{totalLikes === 0 ? `${totalLikes} likes` : null}</p>
                </div>
            </Left>
            <Publication>
                <Name>
                    <p>{userName}</p>
                    <div>
                        {isUser ? 
                            <><TiPencil></TiPencil><CgTrash onClick={() => {setDeletionData({id, publicationId}); setIsModalOpen(true)}}></CgTrash></> 
                            : null
                        }
                        
                    </div>

                </Name>
                <Text> {content}</Text>

                <Url target={"_blank"} href={url}>
                    <Data>
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                        <Ancor target={"_blank"} href={url}>{url}</Ancor>
                    </Data>
                    <Image><ImageData alt={image} src={image}></ImageData></Image>
                </Url>
            </Publication>
        </Content>
    )
}

export default Post;



