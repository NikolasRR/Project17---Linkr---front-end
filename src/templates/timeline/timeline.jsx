import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import {Content,Posts,Sidebar,Title,PostInput,ProfileImage,Input,Question,UrlInput,TextInput} from "./style"

import axios from "axios"
import {useState,useContext, useEffect} from "react"

import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";

function Timeline(){

    const {isLoading,setIsLoading} = useContext(isLoadingContext)
    const {isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  
    const [publications, setPublications] = useState([]);
    // const [isLoadingPost, setIsLoadingPosts] = useState(false);
   

    // setIsLoadingPosts(true)

    useEffect(() => fetchPublications() ,[])

    function fetchPublications(){
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/timeline`,{withCredentials: true})
        promise.then(({data})=>{
            setPublications(data)
            // setIsLoadingPosts(false)
        })
        promise.catch((e)=>{
            console.error(e.data)
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        setIsLoading(true)
        if(!url){            
            setErrorMessage("Por favor, preencha o campo de url.")
            setIsModalOpen(true)
            setIsLoading(false)
            return
        }

        const body = {
            url,
            text,
        }


        const promise = axios.post(`${process.env.REACT_APP_API_URL}/timeline`, body, {withCredentials: true})
        promise.then((data)=>{
            setUrl("");
            setText("");
            setIsLoading(false);
            fetchPublications();
        })
        promise.catch((e)=>{
            setIsLoading(false)
            setErrorMessage("Houve um erro ao publicar seu link")
            setIsModalOpen(true)
            console.error(e)
        })
    }


    return(
        <>  
            {isModalOpen?<Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} />:null}
            {/* {isLoadingPost?<Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} />:null} */}
            <Header></Header>
            <Content>
               <Posts>
                    <Title>timeline</Title>
                    <PostInput>
                        <ProfileImage></ProfileImage>
                        <Input> 
                            <Question>What are you going to share today?</Question>                            
                            <form onSubmit={handleSubmit}>
                                <UrlInput disabled={isLoading} type="url" value={url} id="url" placeholder="http://" onChange={(e)=>setUrl(e.target.value)}></UrlInput>
                                <TextInput disabled={isLoading} type="text"  value={text} id="text" onChange={(e)=>setText(e.target.value)} placeholder="Awesome article about #javascript"></TextInput>    
                                <div><button disabled={isLoading} >{isLoading?"Publishing...":"Publish"}</button> </div>  
                            </form>                                                                            
                        </Input>
                    </PostInput>

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

export default Timeline;

