import { useState, useContext, useEffect } from "react"
import axios from "axios"

import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"

import { Content, Posts, Sidebar, Title, PostInput, ProfileImage, Input, Question, UrlInput, TextInput } from "./style"

import UserContext from "../../contexts/UserContext";
import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";

function Timeline() {

    const { userData } = useContext(UserContext);

    const { isLoading, setIsLoading } = useContext(isLoadingContext)
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext)

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [publications, setPublications] = useState([]);
    const [likesInfo, setLikesInfo] = useState([])
    // const [isLoadingPost, setIsLoadingPosts] = useState(false);


    // setIsLoadingPosts(true)

    useEffect(() => fetchPublications(), [])
    useEffect(() => fetchLikes(), [])

    function fetchPublications() {
        const promise = axios.get("http://localhost:5000/timeline", { withCredentials: true })
        
        promise.then(({ data }) => {
            setPublications(data)
        })
        
        promise.catch((e) => {
            console.error(e.data)
        })
    }

    function fetchLikes() {
        
        const promise = axios.get("http://localhost:5000/like/get", { withCredentials: true })
        
        promise.then(({ data }) => {
            setLikesInfo(data)
        })
        
        promise.catch((e) => {
            console.error(e.data)
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        if (!url) {
            setErrorMessage("Por favor, preencha o campo de url.")
            setIsModalOpen(true)
            setIsLoading(false)
            return
        }

        const body = {
            url,
            text,
        }


        const promise = axios.post("http://localhost:5000/timeline", body, { withCredentials: true })
        promise.then((data) => {
            setUrl("");
            setText("");
            setIsLoading(false);
            fetchPublications();
        })
        promise.catch((e) => {
            setIsLoading(false)
            setErrorMessage("Houve um erro ao publicar seu link")
            setIsModalOpen(true)
            console.error(e)
        })
    }


    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} /> : null}
            {/* {isLoadingPost?<Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} />:null} */}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>timeline</Title>
                    <PostInput>
                        <ProfileImage></ProfileImage>
                        <Input>
                            <Question>What are you going to share today?</Question>
                            <form onSubmit={handleSubmit}>
                                <UrlInput disabled={isLoading} type="url" value={url} id="url" placeholder="http://" onChange={(e) => setUrl(e.target.value)}></UrlInput>
                                <TextInput disabled={isLoading} type="text" value={text} id="text" onChange={(e) => setText(e.target.value)} placeholder="Awesome article about #javascript"></TextInput>
                                <div><button disabled={isLoading} >{isLoading ? "Publishing..." : "Publish"}</button> </div>
                            </form>
                        </Input>
                    </PostInput>

                    {publications.map((publication, index) => {
                        let info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        return (<Post key={index} {...publication} selected={info ? true : false} ></Post>
                        )
                    })}

                </Posts>
                <Sidebar><Trending></Trending></Sidebar>
            </Content>
        </>
    )
}

export default Timeline;