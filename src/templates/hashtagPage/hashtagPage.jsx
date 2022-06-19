/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import {useState, useContext, useEffect} from "react"
import { useParams} from "react-router-dom";
// import ReactHashtag from "react-hashtag";

import Header from "../../components/header/header"
import Post from "../../components/post/post"
import Trending from "../../components/sidebar/sidebar"
import Modal from "../../components/modal/modal"
import {Content,Posts,Sidebar,Title} from "./../timeline/style"

import isModalOpenContext from "../../contexts/isModalOpenContext";

function Hashtag(){

    // const {isLoading,setIsLoading} = useContext(isLoadingContext)
    const {isModalOpen, setIsModalOpen} = useContext(isModalOpenContext)
    const [post, setPost] = useState([]);
    const { hashtag } = useParams();
    console.log(hashtag);
    useEffect(() => getData(), []);

    const getData = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`, {withCredentials: true});
            setPost(data);
        } catch (error) {
            console.log(error.response);
        }
        
    }
    console.log(post);
    return(
        <>  
            {isModalOpen?<Modal setIsModalOpen={setIsModalOpen} />:null}
            <Header></Header>
            <Content>
                <Posts>
                    <Title>#{hashtag}</Title>
                    {post.map((publication, index)=>{
                        return( <Post key={index} {...publication} ></Post>
                        )
                    })}
                </Posts> 
                <Sidebar><Trending></Trending></Sidebar>
            </Content>    
        </>        
    )
}

export default Hashtag;

