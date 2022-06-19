import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "react-hashtag";
import { CgHeart, CgTrash } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import { Content, ProfileImage, Publication, Name, Text, Url, Left, Data, Title, Description, Ancor, Image, ImageData } from "./style"

import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";

function Post({ userId, id, publicationId, userName, url, profile, totalLikes, content, title, description, image, setIsModalOpen }) {
    const { userData } = useContext(UserContext);
    const { setDeletionData } = useContext(deletionDataContext)

    const [isUser, setIsUser] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setIsUser(userName === userData?.userName);
    }, [userData])
    console.log(isUser, userName, userData.userName);

    function goToUserPage() {
        navigate(`/user/${userId}`, { state: { userName, profile } })
    }

    return (
        <Content>
            <Left>
                <ProfileImage onClick={() => goToUserPage()} alt={url} src={profile}></ProfileImage>
                <div>
                    <CgHeart></CgHeart>
                    <p>{totalLikes === 0 ? `${totalLikes} likes` : null}</p>
                </div>
            </Left>
            <Publication>
                <Name>
                    <p onClick={() => goToUserPage()}>{userName}</p>
                    <div>
                        {
                            isUser &&
                            <>
                                <TiPencil style={{ cursor: "pointer" }}></TiPencil>
                                <CgTrash style={{ cursor: "pointer" }} onClick={() => { setDeletionData({ id, publicationId }); setIsModalOpen(true) }}></CgTrash>
                            </>
                        }

                    </div>
                </Name>
                <Text> {content}</Text>

                <Url target={"_blank"} href={url}>
                    <Data>
                        <Title>{title}</Title>
                        <Description>
                            <ReactHashtag onHashtagClick={val => alert(val)}>
                                {description}
                            </ReactHashtag>
                        </Description>
                        <Ancor target={"_blank"} href={url}>{url}</Ancor>
                    </Data>
                    <Image><ImageData alt={image} src={image}></ImageData></Image>
                </Url>
            </Publication>
        </Content>
    )
}

export default Post;



