import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import Loading from "../../components/loading/loading"
import {Content,Posts,Sidebar,Title,ProfileImage,LittleHeader} from "./style"

import axios from "axios"
import {useState,useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"



import isModalOpenContext from "../../contexts/isModalOpenContext";
import deletionDataContext from "../../contexts/deletionDataContext";


function UserPage(){

    const{id} = useParams();
    const location = useLocation();
    let {userName} = location.state;
    let {profile} = location.state;

    const {isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)
    const {reloadPage} = useContext(deletionDataContext)

    const [errorMessage, setErrorMessage] = useState("");  
    const [publications, setPublications] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);


    useEffect(() => fetchPublications(),[reloadPage])

    function fetchPublications(){
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {withCredentials: true})
        promise.then(({data})=>{   
            console.log(data)         
            setPublications(data)
            if(data.length===0){
                setErrorMessage("Ainda não há postagens!")
                setIsModalOpen(true)
            }
            setIsLoadingPosts(false)
        })
        promise.catch((error)=>{
            console.error(error)            
            setErrorMessage("Houve um erro ao tentar buscar os posts. Por favor, atualize a página")
            setIsModalOpen(true)
                        
        })
    }



    return(
        <>  
            {isModalOpen?<Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} />:null}
            <Header></Header>
            <Content>
                <Posts>
                    <LittleHeader>
                        <ProfileImage src={profile}></ProfileImage>
                        <Title>{`${userName}'s posts`}</Title>               
                    </LittleHeader>
                    {isLoadingPosts?<Loading></Loading>:null}
                    {publications.map((publication, index)=>{
                        return( <Post key={index} {...publication} ></Post>
                        )
                    })}
                
                </Posts> 
                <Sidebar><Trending></Trending></Sidebar>
            </Content>    
        </>        
    )
}

export default UserPage;

