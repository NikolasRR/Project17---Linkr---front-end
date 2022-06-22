import Header from "../../components/header/header";
import Post from "../../components/post/post";
import Trending from "../../components/sidebar/sidebar";
import Modal from "../../components/modal/modal";
import Loading from "../../components/loading/loading";
import { Content, Posts, Sidebar, Title, PostInput, ProfileImage, Input, Question, UrlInput, TextInput, NoMorePosts } from "./style";
import InfiniteScroll from "react-infinite-scroller";

import axios from "axios"
import { useState, useContext, useEffect } from "react"

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
    const [likesInfo, setLikesInfo] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);


    useEffect(() => {
        fetchPublications();
        fetchLikes();
    }, [reloadPage]);

    function fetchPublications() {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline?lastId=${lastId}`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications([...publications, ...data]);

            if (data.length > 0) {
                const i = data.length - 1;
                setLastId(data[i].publicationId);
                return;
            }
            if (data.length === 0 && publications.length === 0) {
                setErrorMessage("There are no posts yet");
                setIsModalOpen(true);
            }
            setNoMorePosts(true);

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
                    {/* {publications.map((publication, index) => {
                        let info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                        )
                    })} */}
                    <InfiniteScroll
                        loadMore={fetchPublications}
                        hasMore={!noMorePosts}
                        loader={<Loading key={0}></Loading>}
                        useWindow={true}
                    >
                        {publications.map((publication, index) => {
                            let info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                            return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                            )
                        })}
                    </InfiniteScroll>
                    {
                        noMorePosts &&
                        <NoMorePosts><p>There are no more posts!</p></NoMorePosts>
                    }
                </Posts>
                <Sidebar><Trending></Trending></Sidebar>
            </Content>
        </>
    )
}

export default Timeline;

