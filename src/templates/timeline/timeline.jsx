import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import Loading from "../../components/loading/loading"
import { Content, Posts, Sidebar, Title, PostInput, ProfileImage, Input, Question, UrlInput, TextInput } from "./style"

import axios from "axios"
import { useState, useContext, useEffect } from "react"

import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";
import deletionDataContext from "../../contexts/deletionDataContext";

function Timeline() {

    const { isLoading, setIsLoading } = useContext(isLoadingContext)
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext)

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [publications, setPublications] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [deletionData, setDeletionData] = useState({});

    useEffect(() => fetchPublications(), [])

    function fetchPublications() {
        const promise = axios.get(`http://localhost:5000/timeline`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications(data)
            if (data.length === 0) {
                setErrorMessage("There are no posts yet")
                setIsModalOpen(true)
            }
            setIsLoadingPosts(false)
        })
        promise.catch((error) => {
            console.error(error)
            if (error.response.status !== undefined) {
                setErrorMessage("An error occured while trying to fetch the posts, please refresh the page")
            }
            setIsModalOpen(true)
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


        const promise = axios.post(`http://localhost:5000/timeline`, body, { withCredentials: true })
        promise.then((data) => {
            setUrl("");
            setText("");
            setIsLoading(false);
            fetchPublications();
        })
        promise.catch((error) => {
            setIsLoading(false)
            if (error.response.status !== undefined) {
                setErrorMessage("Houve um erro ao publicar seu link")
            }
            setIsModalOpen(true)
        })
    }


    return (
        <>
            <deletionDataContext.Provider value={{ deletionData, setDeletionData }}>
                {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage}/> : null}
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

                        {isLoadingPosts ? <Loading></Loading> : null}
                        {publications.map((publication, index) => {
                            return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen}></Post>
                            )
                        })}

                    </Posts>
                    <Sidebar><Trending></Trending></Sidebar>
                </Content>
            </deletionDataContext.Provider>
        </>
    )
}

export default Timeline;

