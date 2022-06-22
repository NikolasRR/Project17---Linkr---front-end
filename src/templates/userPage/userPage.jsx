import Header from "../../components/header/header";
import Post from "../../components/post/post";
import Trending from "../../components/sidebar/sidebar";
import Modal from "../../components/modal/modal";
import Loading from "../../components/loading/loading";
import { Content, Posts, Sidebar, Title, ProfileImage, LittleHeader, NoMorePosts } from "./style";
import InfiniteScroll from "react-infinite-scroller";


import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";




import isModalOpenContext from "../../contexts/isModalOpenContext";
import deletionDataContext from "../../contexts/deletionDataContext";
import UserContext from "../../contexts/UserContext"


function UserPage() {
    const { id } = useParams();
    const location = useLocation();
    let { userName } = location.state;
    let { profile } = location.state;

    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext);
    const { reloadPage } = useContext(deletionDataContext);
    const { userData } = useContext(UserContext);

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
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${id}?lastId=${lastId}`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications([...publications, ...data]);

            if (data.length > 0) {
                const i = data.length - 1;
                setLastId(data[i].publicationId);
                return;
            }
            if (data.length === 0 && publications.length === 0) {
                setErrorMessage("There are no posts from this user yet");
                setIsModalOpen(true);
            }
            setNoMorePosts(true);

        })
        promise.catch((error) => {
            console.error(error)
            setErrorMessage("Houve um erro ao tentar buscar os posts. Por favor, atualize a página")
            setIsModalOpen(true)

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



    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} /> : null}
            <Header></Header>
            <Content>
                <Posts>
                    <LittleHeader>
                        <ProfileImage src={profile}></ProfileImage>
                        <Title>{`${userName}'s posts`}</Title>
                    </LittleHeader>
                    {/* {publications.map((publication, index) => {
                        let info;
                        if (likesInfo) {
                            info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        } return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
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

export default UserPage;

