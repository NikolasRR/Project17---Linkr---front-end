/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

import {SideBar} from './style';

export default function Trending(){
    const [trending, setTrending] = useState();
    useEffect(() => {
        const getData = async () => {
            try {
                const {data} = await axios.get('http://localhost:5000/trending');
                setTrending(data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getData();
    }, []);
    return(
        <SideBar>
            <h1>trending</h1>
            <ul>
                {trending && trending.map((item, index) => {
                    return(
                        <li key={index}>
                            <Link to={`/hashtag/${item.content}`}>
                            <p>#{item.content}</p>
                            </Link>
                        </li>
                    )
                }
                )}
            </ul>
        </SideBar>
    );
}