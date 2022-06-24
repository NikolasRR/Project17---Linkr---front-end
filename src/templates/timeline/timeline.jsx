import Header from "../../components/header/header";
import Post from "../../components/post/post";
import Trending from "../../components/sidebar/sidebar";
import Modal from "../../components/modal/modal";
import Loading from "../../components/loading/loading";
import { Content, Posts, Sidebar, Title, PostInput, ProfileImage, Input, Question, UrlInput, TextInput, NoMorePosts, NewPostsWarning } from "./style";
import InfiniteScroll from "react-infinite-scroller";
import AlertRepost from "../../components/repost/repost";
import { AiOutlineReload } from "react-icons/ai";

import axios from "axios"
import { useState, useContext, useEffect } from "react"
import useInterval from "use-interval";

import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";
import deletionDataContext from "../../contexts/deletionDataContext";
import UserContext from "../../contexts/UserContext"
import  RepostContext from "../../contexts/repostContext";

function Timeline() {
    const { isLoading, setIsLoading } = useContext(isLoadingContext);
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
    const { deletionData, setDeletionData, reloadPage, setReloadPage } = useContext(deletionDataContext);
    const { userData } = useContext(UserContext);
    const { repost } = useContext(RepostContext)

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [publications, setPublications] = useState([]);
    const [likesInfo, setLikesInfo] = useState([]);
    const [start, setStart] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [newPostsAmount, setNewPostsAmount] = useState(null);
    const [newestPostTS, setNewestPostTS] = useState();
    const [refreshed, setRefreshed] = useState(false);
    const [delay, setDelay] = useState(15000);

    console.log(publications);
    useEffect(() => {
        fetchPublications();
        fetchLikes();
    }, [reloadPage]);

    useInterval(async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/newposts?timestamp=${newestPostTS}`, { withCredentials: true });
            console.log('oi');
            if (res.status === 200) {
                setNewPostsAmount(res.data.length);
            }
        } catch (error) {
            console.log(error);
        }
        
    }, delay);

    function fetchPublications() {
        setDelay(null);
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline?start=${start}`, { withCredentials: true });
        promise.then(({ data }) => {
            setDelay(15000);
            if (data.length > 0) {
                setStart(start + 10);
                if (start === 0) {
                    setNewestPostTS(data[0].timestamp);
                }
            }

            if (data.length === 0 && publications.length === 0) {
                setErrorMessage("There are no posts yet");
                setIsModalOpen(true);
                setNoMorePosts(true);
                return;
            }

            if (deletionData?.publicationId || refreshed) {
                setPublications(data);
                setDeletionData({});
                setRefreshed(false);
                setNewPostsAmount(null);
                setNoMorePosts(false);
                setStart(0);
                return;
            }
            
            setPublications([...publications, ...data]);
            
            if (data.length === 0) {
                setNoMorePosts(true);
            }
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
            setErrorMessage("Please fill in the url input correctly")
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
            setStart(0);
            setIsLoading(false);
            setRefreshed(true);
            setReloadPage(!reloadPage);
        })
        promise.catch((error) => {
            setIsLoading(false);
            setErrorMessage("An error ocurred while trying to post this link");
            setIsModalOpen(true);
        })
    }


    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} /> : null}
            {repost.length>0? <AlertRepost/>:null}
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
                        <NewPostsWarning onClick={() => { setStart(0); setRefreshed(true); setReloadPage(!reloadPage);}}><p>{newPostsAmount} new posts, load more!</p><AiOutlineReload></AiOutlineReload></NewPostsWarning>
                    }
                    <InfiniteScroll
                        loadMore={fetchPublications}
                        hasMore={!noMorePosts}
                        initialLoad={false}
                        loader={<Loading key={0}></Loading>}
                    >
                        {publications?.map((publication, index) => {
                            let info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                            return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} index={index} selected={info ? true : false} ></Post>
                            )
                        })}
                    </InfiniteScroll>
                    {
                        noMorePosts &&
                        <NoMorePosts><p>{errorMessage !== '' ? "There are no posts yet" : 'There are no more posts!'}</p></NoMorePosts>
                    }
                </Posts>
                <Sidebar><Trending></Trending></Sidebar>
            </Content>
        </>
    )
}

export default Timeline;