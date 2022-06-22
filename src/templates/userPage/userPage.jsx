import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import Loading from "../../components/loading/loading"
import { Content, Posts, Sidebar, Title, ProfileImage, LittleHeader, Follow } from "./style"

import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"



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
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [likesInfo, setLikesInfo] = useState([]);
    const [isFollowing, setIsFollowing] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFollowing();
        fetchPublications();
        fetchLikes();
    }, [reloadPage]);

    function fetchPublications() {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, { withCredentials: true })
        promise.then(({ data }) => {
            setPublications(data)
            if (data.length === 0) {
                setErrorMessage("Ainda não há postagens!")
                setIsModalOpen(true)
            }
            setIsLoadingPosts(false)
        })
        promise.catch((error) => {
            console.error(error)
            setErrorMessage("Houve um erro ao tentar buscar os posts. Por favor, atualize a página")
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
            setErrorMessage("Houve um erro pra saber se é seguidor ou não")
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
                    {isLoadingPosts ? <Loading></Loading> : null}
                    {publications.map((publication, index) => {
                        let info;
                        if (likesInfo) {
                            info = likesInfo.find((like) => like.publicationId === publication.publicationId && like.userId === userData.id)
                        } return (<Post key={index} {...publication} setIsModalOpen={setIsModalOpen} selected={info ? true : false} ></Post>
                        )
                    })}

                </Posts>                
                <Sidebar margin={userData.id===parseInt(id)}>
                    {userData.id===parseInt(id)?null:<Follow disabled={isLoading} onClick={()=> toggleFollower()}>{isFollowing?`Unfollow`:`Follow`}</Follow>}
                    <Trending></Trending>
                </Sidebar>
            </Content>
        </>
    )
}

export default UserPage;

