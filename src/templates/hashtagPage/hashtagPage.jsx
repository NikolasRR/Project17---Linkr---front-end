/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useParams } from "react-router-dom";
// import ReactHashtag from "react-hashtag";

import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import { Content, Posts, Sidebar, Title } from "./../timeline/style"

import isModalOpenContext from "../../contexts/isModalOpenContext";
import UserContext from "../../contexts/UserContext";
import deletionDataContext from "../../contexts/deletionDataContext";

function Hashtag() {
    // const {isLoading,setIsLoading} = useContext(isLoadingContext)
    const { isModalOpen, setIsModalOpen } = useContext(isModalOpenContext)
    const { userData } = useContext(UserContext);
    const { reloadPage } = useContext(deletionDataContext);

    const [likesInfo, setLikesInfo] = useState([]);
    const [post, setPost] = useState([]);

    const { hashtag } = useParams();

    useEffect(() => {
        getData();
        fetchLikes();
    }, [reloadPage]);

    const getData = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`, { withCredentials: true });
            setPost(data);
        } catch (error) {
            console.log(error.response);
        }

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

    console.log(post);
    return (
        <>
            {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>#{hashtag}</Title>
                    {post.map((publication, index) => {
                        let info;
                        if (likesInfo) {
                            info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        } return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                        )
                    })}

                    {/* <ul>
                    
                        <li><ReactHashtag onHashtagClick={val => alert(val)}>teste #teste1</ReactHashtag></li>
                        <li><ReactHashtag onHashtagClick={val => alert(val)}>teste #teste2</ReactHashtag></li>
                        <li><ReactHashtag onHashtagClick={val => alert(val)}>teste #teste3</ReactHashtag></li>
                    
                    </ul> */}

                </Posts>
                <Sidebar><Trending></Trending></Sidebar>
            </Content>
        </>
    )
}

export default Hashtag;

