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
    const { reloadPage } = useContext(deletionDataContext);

    const [errorMessage, setErrorMessage] = useState("");
    const [likesInfo, setLikesInfo] = useState([]);
    const [publications, setPublications] = useState([]);
    const [lastId, setLastId] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);

    const { hashtag } = useParams();

    useEffect(() => {
        getData();
        fetchLikes();
    }, [reloadPage]);

    const getData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?lastId=${lastId}`, { withCredentials: true });
            setPublications([...publications, ...data]);
            
            if (data.length > 0) {
                const i = data.length - 1;
                setLastId(data[i].publicationId);
                return;
            }
            if (data.length === 0 && publications.length === 0) {
                setErrorMessage("There are no posts with this hashtag");
                setIsModalOpen(true);
            }
            setNoMorePosts(true);

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
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage}/> : null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>#{hashtag}</Title>
                    {/* {post.map((publication, index) => {
                        let info;
                        if (likesInfo) {
                            info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        } return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                        )
                    })} */}
                    <InfiniteScroll
                        loadMore={getData}
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

export default Hashtag;

