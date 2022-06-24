import { TiHeartFullOutline } from "react-icons/ti";
import { AiOutlineComment } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import ReactHashtag from "react-hashtag";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdRepeat } from "react-icons/md"
import { CgTrash } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import { Content, ProfileImage, Publication, Name, Text, Url, Left, Data, Title, Description, Ancor, Image, ImageData, ContainerCountLikes, EditInput, Repost, ContainerRepost, Main, PostBox, CommentImage } from "./style"

import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";
import RepostContext from "../../contexts/repostContext";

import Comment from "../comment/comment";

function Post({ index, userId, id, publicationId, userName, url, profile, content, title, description, image, selected, repostedBy, repostId, resposts }) {
    const { userData } = useContext(UserContext);
    const { setDeletionData } = useContext(deletionDataContext)
    const { setIsModalOpen } = useContext(isModalOpenContext)
    const { setRepost } = useContext(RepostContext)
    const inputRef = useRef(null);

    const [selecionado, setSelecionado] = useState(false)
    const [total, setTotal] = useState([]);
    const [result, setResult] = useState("");
    const [refresh, setRefresh] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentContent, setCurrentContent] = useState(content);
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [newContent, setNewContent] = useState();

    const [openCommentBox, setOpenCommentBox] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [totalComments, setTotalComments] = useState([]);
    const [refreshComment, setRefreshComment] = useState(false)
    const [followers, setFollowers] = useState("")
    const userImage = userData.image;

    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing, disabledEdit]);

    useEffect(() => {

        if (selected) {
            setSelecionado(true)
        } else {
            setSelecionado(false)
        }

    }, [selected]);

    useEffect(() => {
        const id = publicationId
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/like/count/${id}`, { withCredentials: true })

        promise.then(({ data }) => {
            setTotal(data)
        })

        promise.catch((e) => {
            console.error(e.data)
        })
    }, [selecionado]);

    useEffect(() => {
        const id = publicationId

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/like/get/${id}`, { withCredentials: true });

        promise.then((response) => {
            setRefresh(response.data)
        })
        promise.catch((e) => {
            console.error(e)
        })

    }, [total]);

    useEffect(() => {

        let newLikesNames = []

        for (let i = 0; i < refresh.length; i++) {

            if (refresh[i].userName !== userData.userName) {
                newLikesNames.push(refresh[i].userName);
            }
        }

        let res = '';

        if (refresh.length === 0) {
            res = null;
            setResult(res)

        } else if (refresh.length === 1 && selecionado) {
            res = "Você curtiu";
            setResult(res)

        } else if (newLikesNames.length === 1 && !selecionado) {
            res = ` Curtido por ${newLikesNames[0]}`
            setResult(res)

        } else if (refresh.length === 2 && selecionado) {
            res = `Voce e ${newLikesNames[0]} curtiram`
            setResult(res)

        } else if (newLikesNames.length === 2 && !selecionado) {
            res = `${newLikesNames[0]} e ${newLikesNames[1]} curtiram`
            setResult(res)

        } else if (refresh.length >= 3 && selecionado) {
            res = `Você, ${newLikesNames[0]} e mais ${total - 2} curtiram`
            setResult(res)

        } else if (newLikesNames.length >= 3 && !selecionado) {
            res = `${newLikesNames[0]}, ${newLikesNames[1]} e mais ${total - 2} curtiram`
            setResult(res)
        }

    }, [refresh])

    function like() {

        const body = {
            publicationId: publicationId
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/like`, body, { withCredentials: true })
        promise.then(() => {
            //console.log("entrou aqui")
            setSelecionado(true)
        })

        promise.catch((e) => {
            console.error(e)
        })
    }

    function deslike() {
        const id = publicationId;
        const promise = axios.delete(`${process.env.REACT_APP_API_URL}/like/${id}`, { withCredentials: true });

        promise.then(() => {
            setSelecionado(false)
        })

        promise.catch((e) => {
            console.error(e)
        })
    }

    function hashtagClick(hashtag) {
        const aux = hashtag.replace("#", "")
        navigate(`/hashtag/${aux}`)
    }

    function goToUserPage() {
        navigate(`/user/${userId}`, { state: { userName, profile } })
    }

    async function sendEditedPost() {
        setDisabledEdit(true);

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/post?postId=${publicationId}`, { text: currentContent }, { withCredentials: true });
            setDisabledEdit(false);
            setIsEditing(false);
            setNewContent(currentContent);
        } catch (error) {
            console.log(error);
            alert('Couldn`t save changes');
            setDisabledEdit(false);
        }

    }

    // Requisição para buscar comentários

    function fetchComments() {
        const id = publicationId
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/comment/${id}`, { withCredentials: true });

        promise.then(response => {
            refreshComment === true ? setRefreshComment(false) : setRefreshComment(true)
            setComments(response.data)
            console.log("comentários", response.data)
        })

        promise.catch((e) => {
            console.error(e.data)
        })
    }

    // Requisição para postar um comentário

    function handleComment(e) {
        e.preventDefault()

        const obj = {
            userId: userData.id,
            publicationId: publicationId,
            content: commentContent
        }

        console.log("objPost", obj)

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/comment`, obj, { withCredentials: true })
        promise.then(() => {
            console.log("entrou na requisição do post");
            setCommentContent("")
            fetchComments()
        })

        promise.catch((error) => {
            console.error(error.data)
        })
    }

    //Requisição para contar número de comentários
    useEffect(() => {
        const id = publicationId
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/comment/count/${id}`, { withCredentials: true })

        promise.then(({ data }) => {
            setTotalComments(data)
        })

        promise.catch((e) => {
            console.error(e.data)
        })
    }, [refreshComment]);

    return (
        <Main>
            {/* <Alert alert = "Deseja relamente compartilhar esse post?" bottomCancel="Não, cancelar" bottomConfirm="Sim, compartilhe!"/> */}
            <Repost model={repostedBy !== undefined ? "false" : "true"}>
                <MdRepeat className="icon" />
                <p2>Repostado por <span>{repostId === userData.id ? 'você' : repostedBy}</span></p2>
            </Repost>
            <Content>
                <Left>
                    <ProfileImage onClick={() => goToUserPage()} alt={url} src={profile}></ProfileImage>
                    
                    <div onClick={() => {
                        if (selecionado === false) {
                            like()
                        } else if (selecionado === true) {
                            deslike()
                        }
                    }}>

                        <TiHeartFullOutline style={{ color: selecionado ? "#AC0000" : "#ffffff", cursor: "pointer" }}></TiHeartFullOutline>

                        <ContainerCountLikes data-tip data-for="total">
                            <a data-tip={`${result}`}><p>{total ? `${total} Likes ` : null}</p></a>
                            <ReactTooltip className="ReactTooltip" place="bottom" effect="solid" />
                        </ContainerCountLikes>
                    </div>
                    
                    <div onClick={() => {
                        fetchComments()
                        openCommentBox === false ? setOpenCommentBox(true) : setOpenCommentBox(false)
                    }}>

                        <AiOutlineComment style={{ cursor: "pointer" }} > </AiOutlineComment>

                        <ContainerCountLikes>
                            <p>{totalComments ? `${totalComments} Comments ` : null}</p>
                        </ContainerCountLikes>

                    </div>
                    
                    <ContainerRepost onClick={() => setRepost([userData.id, publicationId])}>
                        <MdRepeat style={{ cursor: "pointer" }} />
                        <p>{resposts}</p>
                    </ContainerRepost>
                </Left>
                <Publication>
                    <Name>
                        <p onClick={() => goToUserPage()}>{userName}</p>
                        <div>
                            {
                                userName === userData?.userName &&
                                <>
                                    <TiPencil style={{ cursor: "pointer" }} onClick={() => setIsEditing(!isEditing)}></TiPencil>
                                    <CgTrash style={{ cursor: "pointer" }} onClick={() => { setDeletionData({ id, publicationId, index }); setIsModalOpen(true) }}></CgTrash>
                                </>
                            }

                        </div>
                    </Name>
                    {
                        isEditing &&
                        <EditInput disabled={disabledEdit} ref={inputRef} value={currentContent} onKeyDown={ev => {
                            if (ev.code === 'Escape') {
                                setIsEditing(!isEditing);
                            } else if (ev.code === 'Enter') {
                                sendEditedPost();
                            }
                        }} onChange={ev => setCurrentContent(ev.target.value)}></EditInput>
                    }
                    {
                        !isEditing &&
                        <Text><ReactHashtag onHashtagClick={val => hashtagClick(val)}>{newContent ? newContent : content}</ReactHashtag></Text>
                    }
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
            <div>
                <div>
                    {
                        openCommentBox && comments ?
                            comments.map(comment => <Comment {...comment} infoId={followers} ></Comment>)
                            :
                            <></>
                    }
                </div>
                {
                    openCommentBox ?
                        <PostBox>

                            <CommentImage alt={userImage} src={userImage}></CommentImage>


                            <input type="text" placeholder="write a comment..." value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                            <FiSend onClick={e => {
                                handleComment(e)
                            }}></FiSend>


                        </PostBox>
                        :
                        <></>
                }
            </div>
        </Main>
    )
}

export default Post;