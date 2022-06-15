import styled from "styled-components";
import Header from "../components/header"
import Post from "../components/post"
import Trending from "../components/sidebar/sidebar"
import Modal from "../components/modal"

import axios from "axios"
import {useState,useContext} from "react"

import isLoadingContext from "../contexts/isLoadingContext";
import isModalOpenContext from "../contexts/isModalOpenContext";

function Timeline(){

    const {isLoading,setIsLoading} = useContext(isLoadingContext)
    const {isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)

    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");  

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
            // userName,
            url,
            text,
        }

        const promise = axios.post(`${process.env.REACT_APP_API_URL}/`, body)
        promise.then((data)=>{
            setUrl("");
            setText("");
            setIsLoading(false);
        })
        promise.catch((e)=>{
            setIsLoading(false)
            setErrorMessage("Houve um erro ao publicar seu link")
            setIsModalOpen(true)
        })
    }


    return(
        <>  
            {isModalOpen?<Modal setIsModalOpen={setIsModalOpen} errorMessage={errorMessage} />:null}
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

                    {/* TOFIX : IMPLEMENTAR MAP DOS POSTS */}
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
               </Posts> 
               <Sidebar><Trending></Trending></Sidebar>
            </Content>    
        </>        
    )
}

export default Timeline;

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    width:100%;  
`

const Posts = styled.div`
    display: flex;
    flex-direction: column;
    max-width:50%;
    @media(max-width: 611px) {
        max-width:611px;
    }
`

const Sidebar = styled.div`
    margin-top: 160px;
    @media(max-width: 611px) {
        display:none;
    }
`
const Title = styled.p`
    margin-top: 53px;
    margin-bottom: 43px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    @media(max-width: 611px) {
        margin-top: 19px;
        margin-bottom: 19px;
        margin-left: 19px;
        font-size: 33px;
        line-height: 49px;
    }


`

const PostInput = styled.div`
    width: 100%;
    min-height: 209px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display:flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding:22px;
    margin-bottom: 29px;
    @media(max-width: 611px) {
        align-items: space-between;
        justify-content: center;
        max-width:611px;
        border-radius: 0px;
        min-height: 164px;
        margin-bottom: 19px;
    }

`
const ProfileImage = styled.div`
    width: 53px;
    height: 53px;
    background: yellow;
    border-radius: 26.5px;
    @media(max-width: 611px) {
        display:none;
    }
`

const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    height: 100%;
    margin-left: 18px;
    @media(max-width: 611px) {
        margin-left: 0px;
    }

    div{
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
    button{
        width: 25%;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;    
        border:none;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #FFFFFF;
    }
  
`

const Question = styled.p`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    margin-bottom:10px;
`

const UrlInput = styled.input`
    width: 100%;
    height: 30px;
    background: #EFEFEF;
    border-radius: 5px;
    border:none;
    margin-bottom:5px;
    ::placeholder{
        padding:10px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
    }
`

const TextInput = styled.input`
    width: 100%;
    height: 66px;
    background: #EFEFEF;
    border-radius: 5px;
    border:none;
    margin-bottom:5px;
    ::placeholder{
        padding:10px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
    }
`