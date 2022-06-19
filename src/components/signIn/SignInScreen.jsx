import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { Container, Propaganda, Text, H1, H2, LogInBar, Form, Input, Button, StyledLink } from "./style"

import UserContext from "../../contexts/UserContext";

function SignInScreen() {
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [user, setUser] = useState({ email: "", password: "" });
    const [logginIn, setLogginIn] = useState(false);

    useEffect(() => {
        if (userData.email) {
            navigate("/timeline");
        }
    }, [userData])

    const LogIn = async function (ev) {
        ev.preventDefault();
        setLogginIn(true);
        if (user.email === "" || user.password === "") {
            alert("Preencha os campos");
            setLogginIn(false);
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, user, { withCredentials: true })
                .then(res => {
                    setUserData(res.data);
                    navigate("/timeline");
                })
        } catch (error) {
            if (error.response.status === 401) {
                alert("Email ou senha incorretos");
                setLogginIn(false);
                return;
            }
            if (error.response.status === 422) {
                alert("Verifique se escreveu os dados corretamente");
                setLogginIn(false);
                return;
            }
            alert("Algo deu errado, tente novamente mais tarde");
            setLogginIn(false);
        }

    }

    return (
        <Container>
            <Propaganda>
                <Text>
                    <H1>linkr</H1>
                    <H2>save, share and discover the best links on the web</H2>
                </Text>
            </Propaganda>
            <LogInBar>
                <Form onSubmit={ev => LogIn(ev)}>
                    <Input placeholder="E-mail" value={user.email} type="email" onChange={ev => setUser({ ...user, email: ev.target.value })}></Input>
                    <Input placeholder="Senha" value={user.password} type="password" onChange={ev => setUser({ ...user, password: ev.target.value })}></Input>
                    <Button isDisabled={logginIn} disabled={logginIn} type="submit">Log In</Button>
                </Form>
                <StyledLink to="/sign-up">First time? Create an account!</StyledLink>
            </LogInBar>

        </Container>

    )
}

export default SignInScreen;


