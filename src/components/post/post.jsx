/* eslint-disable react-hooks/exhaustive-deps */
import { TiHeartFullOutline } from "react-icons/ti";
import axios from "axios"
import ReactTooltip from "react-tooltip";
import ReactHashtag from "react-hashtag";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgTrash } from "react-icons/cg";
import { TiPencil } from "react-icons/ti";
import { Content, ProfileImage, Publication, Name, Text, Url, Left, Data, Title, Description, Ancor, Image, ImageData,ContainerCountLikes } from "./style"

import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";

function Post({ userId, id, publicationId, userName, url, profile, totalLikes, content, title, description, image, selected }) {
    const { userData } = useContext(UserContext);
    const { setDeletionData } = useContext(deletionDataContext)
    const { setIsModalOpen } = useContext(isModalOpenContext)



    const [selecionado, setSelecionado] = useState(false)
    const [total, setTotal] = useState([]);
    const [result, setResult] = useState("")
    const [refresh, setRefresh] = useState([])

    const navigate = useNavigate();

    useEffect(() => {

        if (selected) {
            setSelecionado(true)
        } else {
            setSelecionado(false)
        }

    }, [selected])

    useEffect(() => {
        const id = publicationId
        const promise = axios.get(`http://localhost:5000/like/count/${id}`, { withCredentials: true })

        promise.then(({ data }) => {
            setTotal(data)
        })

        promise.catch((e) => {
            console.error(e.data)
        })
    }, [selecionado])



    useEffect(() => {
        const id = publicationId

        const promise = axios.get(`http://localhost:5000/like/get/${id}`, { withCredentials: true });

        promise.then((response) => {
            console.log("NOVO", response)
            setRefresh(response.data)
        })
        promise.catch((e) => {
            console.error(e)
        })

    }, [total])

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
            res =` Curtido por ${newLikesNames[0]}`
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

        const promise = axios.post("http://localhost:5000/like", body, { withCredentials: true })
        promise.then(() => {
            //console.log("entrou aqui")
            setSelecionado(true)
        })

        promise.catch((e) => {
            console.error(e)
        })
    }

    function deslike() {
        const id = publicationId
        const promise = axios.delete(`http://localhost:5000/like/${id}`, { withCredentials: true })

        promise.then(() => {
            setSelecionado(false)
        })

        promise.catch((e) => {
            console.error(e)
        })
    }

    function hashtagClick(hashtag) {
        const aux = hashtag.replace("#","")
        navigate(`/hashtag/${aux}`)
    }

    function goToUserPage() {
        navigate(`/user/${userId}`, { state: { userName, profile } })
    }

    return (
        <Content>
            <Left>
                <ProfileImage onClick={() => console.log("testando")} alt={url} src={profile}></ProfileImage>
                <div onClick={() => {
                    if (selecionado === false) {
                        like()
                    } else if (selecionado === true) {
                        deslike()
                    }
                }}>

                    <TiHeartFullOutline style={{ color: selecionado ? "#AC0000" : "#ffffff", cursor: "pointer" }}></TiHeartFullOutline>

                    <ContainerCountLikes data-tip data-for="total">
                        <a data-tip={`${result}`}><p>{total ? `${total} likes `: null}</p></a>
                        <ReactTooltip className="ReactTooltip" place="bottom" effect="solid" />
                    </ContainerCountLikes>
                </div>
            </Left>
            <Publication>
                <Name>
                    <p onClick={() => goToUserPage()}>{userName}</p>
                    <div>
                        {
                            userName === userData?.userName &&
                            <>
                                <TiPencil style={{ cursor: "pointer" }}></TiPencil>
                                <CgTrash style={{ cursor: "pointer" }} onClick={() => { setDeletionData({ id, publicationId }); setIsModalOpen(true) }}></CgTrash>
                            </>
                        }

                    </div>
                </Name>
                <Text> <ReactHashtag onHashtagClick={val => hashtagClick(val)}>{content}</ReactHashtag></Text>

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



