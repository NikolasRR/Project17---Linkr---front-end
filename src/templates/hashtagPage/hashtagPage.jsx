import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/header/header";
import Post from "../../components/post/post";
import Trending from "../../components/sidebar/sidebar";
import Modal from "../../components/modal/modal";
import { Content, Posts, Sidebar, Title, NoMorePosts } from "./../timeline/style";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../../components/loading/loading";

import isModalOpenContext from "../../contexts/isModalOpenContext";
import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";

function Hashtag() {
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext)
    const { userData } = useContext(UserContext);
    const { deletionData, setDeletionData, reloadPage } = useContext(deletionDataContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [likesInfo, setLikesInfo] = useState([]);
    const [publications, setPublications] = useState([]);
    const [noMorePosts, setNoMorePosts] = useState(false);
    const [start, setStart] = useState(0);
    console.log(publications);
    const { hashtag } = useParams();

    useEffect(() => {
        getData();
        fetchLikes();
    }, [reloadPage]);

    const getData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?start=${start}`, { withCredentials: true });
            console.log(data);
                if (data.length > 0) {
                    setStart(start + 10);
                }

                if (data.length === 0 && publications.length === 0) {
                    setErrorMessage("There are no posts yet");
                    setIsModalOpen(true);
                    setNoMorePosts(true);
                    return;
                }

                if (deletionData?.publicationId) {
                    setPublications(data);
                    setDeletionData({});
                    setNoMorePosts(false);
                    setStart(0);
                    return;
                }

                setPublications([...publications, ...data]);

                if (data.length === 0) {
                    setNoMorePosts(true);
                }

        } catch (error) {
            console.log(error.response);
        }
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

    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} /> : null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>#{hashtag}</Title>
                    <InfiniteScroll
                        loadMore={getData}
                        hasMore={!noMorePosts}
                        loader={<Loading key={0}></Loading>}
                        initialLoad={false}
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

export default Hashtag;

