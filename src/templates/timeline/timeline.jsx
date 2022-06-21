import Header from "../../components/header/header";
import Post from "../../components/post/post";
import Trending from "../../components/sidebar/sidebar";
import Modal from "../../components/modal/modal";
import Loading from "../../components/loading/loading";
import { Content, Posts, Sidebar, Title, PostInput, ProfileImage, Input, Question, UrlInput, TextInput, NewPostsWarning } from "./style";
import { AiOutlineReload } from "react-icons/ai";

import axios from "axios"
import { useState, useContext, useEffect } from "react"
import useInterval from "use-interval";

import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";
import deletionDataContext from "../../contexts/deletionDataContext";
import UserContext from "../../contexts/UserContext"

function Timeline() {
    const { isLoading, setIsLoading } = useContext(isLoadingContext);
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
    const { reloadPage, setReloadPage } = useContext(deletionDataContext);
    const { userData } = useContext(UserContext);

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [publications, setPublications] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [likesInfo, setLikesInfo] = useState([]);
    const [newPostsAmount, setNewPostsAmount] = useState(null);
    const [newestPostTS, setNewestPostTS] = useState();
    const [delay, setDelay] = useState(null);


    useEffect(() => {
        fetchPublications();
        fetchLikes();
    }, [reloadPage]);

    useInterval(async () => {
        console.log('aaa');
        console.log(newestPostTS);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/newposts`, { createdAt: newestPostTS }, { withCredentials: true });
            if (res.status === 200) {
                setNewPostsAmount(res.data.amount);
            }
        } catch (error) {
            console.log(error);
        }
        
    }, delay);

    function fetchPublications() {
        setDelay(null);
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications(data);
            setNewPostsAmount(null);
            setNewestPostTS(data[0].timestamp);
            setDelay(15000);
            if (data.length === 0) {
                setErrorMessage("There are no posts yet");
                setIsModalOpen(true);
            }
            setIsLoadingPosts(false);
        })
        promise.catch((error) => {
            console.error(error);
            setErrorMessage("An error occured while trying to fetch the posts, please refresh the page");
            setIsModalOpen(true);

        })
    }

    function fetchLikes() {

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/like/get`, { withCredentials: true })

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


        const promise = axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, { withCredentials: true })
        promise.then(() => {
            setUrl("");
            setText("");
            setIsLoading(false);
            window.location.reload();
        })
        promise.catch((error) => {
            setIsLoading(false);
            setErrorMessage("Houve um erro ao publicar seu link");
            setIsModalOpen(true);
        })
    }


    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} /> : null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>timeline</Title>
                    <PostInput>
                        <ProfileImage src={userData.image}></ProfileImage>
                        <Input>
                            <Question>What are you going to share today?</Question>
                            <form onSubmit={handleSubmit}>
                                <UrlInput disabled={isLoading} type="url" value={url} id="url" placeholder="http://" onChange={(e) => setUrl(e.target.value)}></UrlInput>
                                <TextInput disabled={isLoading} type="text" value={text} id="text" onChange={(e) => setText(e.target.value)} placeholder="Awesome article about #javascript"></TextInput>
                                <div><button disabled={isLoading} >{isLoading ? "Publishing..." : "Publish"}</button> </div>
                            </form>
                        </Input>
                    </PostInput>
                    {
                        newPostsAmount &&
                        <NewPostsWarning onClick={() => setReloadPage(!reloadPage)}><p>{newPostsAmount} new posts, load more!</p><AiOutlineReload></AiOutlineReload></NewPostsWarning>
                    }
                    {isLoadingPosts ? <Loading></Loading> : null}
                    {publications.map((publication, index) => {
                        let info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                        )
                    })}

                </Posts>
                <Sidebar><Trending></Trending></Sidebar>
            </Content>
        </>
    )
}

export default Timeline;

