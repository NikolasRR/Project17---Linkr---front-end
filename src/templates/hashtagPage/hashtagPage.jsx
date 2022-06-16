import axios from "axios"
import {useState,useContext} from "react"
import { useParams} from "react-router-dom";

import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import {Content,Posts,Sidebar,Title} from "./../timeline/style"

import isLoadingContext from "../../contexts/isLoadingContext";
import isModalOpenContext from "../../contexts/isModalOpenContext";

function Hashtag(){

    // const {isLoading,setIsLoading} = useContext(isLoadingContext)
    const {isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)

    const { hashtag } = useParams();




    return(
        <>  
            {isModalOpen?<Modal setIsModalOpen={setIsModalOpen} />:null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>#{hashtag}</Title>

                    {/* TOFIX : IMPLEMENTAR MAP DOS POSTS */}
                    <Post></Post>
                    <Post></Post>
                    <Post></Post>
                </Posts> 
                <Sidebar><Trending></Trending></Sidebar>
            </Content>    
        </>        
    )
}

export default Hashtag;

