/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import { SideBar } from './style';
import deletionDataContext from '../../contexts/deletionDataContext';

export default function Trending() {
    const { reloadPage } = useContext(deletionDataContext);

    const [trending, setTrending] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/trending`, { withCredentials: true });
                setTrending(data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getData();
    }, [reloadPage]);

    function newHash(hashtag) {
        navigate(`/hashtag/${hashtag}`);
        window.location.reload();
    }

    return (
        <SideBar>
            <h1>trending</h1>
            <ul>
                {trending && trending.map((item, index) => {
                    return (
                        <li key={index}>
                            <p onClick={() => newHash(item.content)}>#{item.content}</p>
                        </li>
                    )}
                )}
            </ul>
        </SideBar>
    );
}