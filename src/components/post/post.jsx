import { TiHeartFullOutline } from "react-icons/ti";
import { useState } from "react";
import { Content, ProfileImage, Publication, Name, Text, Url, Left, Data, Title, Description, Ancor, Image } from "./style"
import { useEffect, useContext } from "react";

import axios from "axios"
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

function Post({ userName, publicationId, url, profile, content, title, description, image, selected }) {

    const { userData } = useContext(UserContext);

    const [selecionado, setSelecionado] = useState(false)
    const [total, setTotal] = useState([]);
    const [result, setResult] = useState("")
    const [refresh, setRefresh] = useState([])

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
            
            if (refresh[i].userName != userData.userName) {
                newLikesNames.push(refresh[i].userName);
            }
        }
        
        let res = '';

        if (refresh.length == 0) {
            res = null;
            setResult(res)
        
        } else if (refresh.length == 1 && selecionado) {
            res = "Você curtiu";
            setResult(res)
        
        } else if (newLikesNames.length == 1 && !selecionado) {
            res = `Curtido por ${newLikesNames[0]}`
            setResult(res)
        
        } else if (refresh.length == 2 && selecionado) {
            res = `Voce e ${newLikesNames[0]} curtiram`
            setResult(res)
        
        } else if (newLikesNames.length == 2 && !selecionado) {
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

    return (
        <Content>
            <Left>
                <ProfileImage alt={url} src={profile}></ProfileImage>

                <div onClick={() => {
                    if (selecionado === false) {
                        like()
                    } else if (selecionado === true) {
                        deslike()
                    }
                }}>

                    <TiHeartFullOutline style={{ color: selecionado ? "#AC0000" : "#ffffff", cursor: "pointer" }}></TiHeartFullOutline>

                    <ContainerCountLikes data-tip data-for="total">
                        <a data-tip={`${result}`}><p>{total ? `${total} likes` : null}</p></a>
                        <ReactTooltip className="ReactTooltip" place="bottom" effect="solid"  />
                    </ContainerCountLikes>
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
                    <Image><img alt={image} src={image}></img></Image>
                </Url>
            </Publication>
        </Content >
    )
}

export default Post;

const ContainerCountLikes = styled.div`

    .ReactTooltip{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        text-align: center;
        color: #505050;
        background-color: white;
        cursor: pointer;
    }
`;