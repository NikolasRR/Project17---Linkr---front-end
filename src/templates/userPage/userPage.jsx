<<<<<<< HEAD
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
=======
import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import Loading from "../../components/loading/loading"
import { Content, Posts, Sidebar, Title, ProfileImage, LittleHeader, Follow } from "./style"
>>>>>>> dev




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
<<<<<<< HEAD
    const [lastId, setLastId] = useState(0);
    const [noMorePosts, setNoMorePosts] = useState(false);
=======
    const [isFollowing, setIsFollowing] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
>>>>>>> dev

    useEffect(() => {
        fetchFollowing();
        fetchPublications();
        fetchLikes();
    }, [reloadPage]);

    function fetchPublications() {
<<<<<<< HEAD
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${id}?lastId=${lastId}`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications([...publications, ...data]);

            if (data.length > 0) {
                const i = data.length - 1;
                setLastId(data[i].publicationId);
                return;
=======
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/reposts/${id}`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications(data.data)
            if (data.data.length === 0) {
                setErrorMessage("There are no posts yet!")
                setIsModalOpen(true)
>>>>>>> dev
            }
            if (data.length === 0 && publications.length === 0) {
                setErrorMessage("There are no posts from this user yet");
                setIsModalOpen(true);
            }
            setNoMorePosts(true);

        })
        promise.catch((error) => {
            console.error(error)
            setErrorMessage("An error occured while trying to fetch the posts, please refresh the page")
            setIsModalOpen(true)

        })
    }
    
    function fetchFollowing(){

        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/get-follow/${id}`,{ withCredentials: true })
        promise.then(({data})=>{
            if(data.length===0){
                setIsFollowing(false)
            }  
            setIsLoading(false)
        })
        promise.catch((error)=>{
            console.error(error)
            setErrorMessage("An error occured while trying to verify if this user follows you")
            setIsModalOpen(true)
            setIsLoading(false)
                        
        })
    }

    function toggleFollower(){
            setIsLoading(true)
            if(!isFollowing){  
                
                const promise = axios.post(`${process.env.REACT_APP_API_URL}/user/follow/${id}`, {},{ withCredentials: true })
                promise.then(()=>{
                    setIsFollowing(true)   
                    setIsLoading(false) 
                })
                promise.catch((error)=>{
                    console.error(error)
                    setErrorMessage("Houve um erro ao seguir esse usuário")
                    setIsModalOpen(true)
                    setIsLoading(false) 
                })
            }else{      
                const promise = axios.delete(`${process.env.REACT_APP_API_URL}/user/unfollow/${id}`, { withCredentials: true })
                promise.then(()=>{
                    setIsFollowing(false)  
                    setIsLoading(false)   
                })
                promise.catch((error)=>{
                    console.error(error)
                    setErrorMessage("Houve um erro ao deixar de seguir esse usuário")
                    setIsModalOpen(true)
                    setIsLoading(false) 
                })
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
<<<<<<< HEAD
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
=======
                    })}

                </Posts>                
                <Sidebar margin={userData.id===parseInt(id)}>
                    {userData.id===parseInt(id)?null:<Follow disabled={isLoading} onClick={()=> toggleFollower()}>{isFollowing?`Unfollow`:`Follow`}</Follow>}
                    <Trending></Trending>
                </Sidebar>
>>>>>>> dev
            </Content>
        </>
    )
}

export default UserPage;

