import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import styled from "styled-components"
import axios from 'axios';

import UserContext from "../../contexts/UserContext";

import {CointainerSignUp} from "./style"
import {Header} from "./style"
import {Text} from "./style"
import {H1} from "./style"
import {H2} from "./style"
import {Inputs} from "./style"
import {Form} from "./style"
import {Input} from "./style"
import {Button} from "./style"

function SignUp() {

    const { userData, setUserData } = useContext(UserContext);
    const [isloading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const objRegister = {
        email: userData.email,
        password: userData.password,
        userName: userData.userName,
        image: userData.image
    }

    const URL = `${process.env.REACT_APP_API_URL}/sign-up`;
    
    const handleRegister = async function (e) {
        e.preventDefault()
        setIsLoading(true)

        if (userData.email === "" || userData.password === "" || userData.userName === "" || userData.image === "") {
            alert("Preencha todos os campos!");
            setIsLoading(false);
            return;
        }

        if (userData.image.length > 150) {
            alert("URL da imagem muito grande!");
            setIsLoading(false);
            return;
        }

        try {
            await axios.post(URL, objRegister)
                .then(res => {
                    setIsLoading(false);
                    setUserData({});
                    navigate("/");
                });

        } catch (error) {

            if (error.response.status === 409) {
                alert("E-mail ou UserName já cadastrado");
                setIsLoading(false);
                return;
            }

            alert("Algo deu errado, tente novamente mais tarde");
            setIsLoading(false);
        }
    }

        return (
            <>
                <CointainerSignUp>

                    <Header>
                        <Text>
                            <H1>linkr</H1>
                            <H2>save, share and discover the best links on the web</H2>
                        </Text>
                    </Header>

                    <Inputs>
                        
                        <Form onSubmit={e => handleRegister(e)}>
                            <Input type="email" placeholder="e-mail" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                            <Input type="password" placeholder="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                            <Input type="text" placeholder="username" value={userData.userName} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                            <Input type="text" placeholder="picture url" value={userData.image} onChange={(e) => setUserData({ ...userData, image: e.target.value })} />
                            <Button isDisabled={isloading} disabled={isloading} type="submit">Log Up</Button>
                        </Form>
                        
                        <StyledLink to="/">Switch back to log in</StyledLink>
                    
                    </Inputs>

                </CointainerSignUp>
            </>
        )
    }

export default SignUp;

const StyledLink = styled(Link)`
    color: #ffff;
    font-size: 20px;
    line-height: 24px;
    text-decoration: underline;
    @media (max-width: 900px) {
        font-size: 17px;
        line-height: 20px;
    }
`;
