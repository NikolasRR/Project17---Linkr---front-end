import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";

function SignInScreen() {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
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
            await axios.post("http://localhost:5000/sign-in", user, { withCredentials: true })
                .then(res => {
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

const Container = styled.main`
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const Propaganda = styled.div`
    width: calc(100% - 535px);
    background-color: #151515;
    color: #FFFFFF;
    @media (max-width: 900px) {
        width: 100%;
        height: 175px;
        display: flex;
        justify-content: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
`;

const Text = styled.div`
    margin-top: calc(50vh - 200px);
    margin-left: calc(25vw - 200px);
    @media (max-width: 900px) {
        margin: 0 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const H1 = styled.h1`
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    @media (max-width: 1100px) {
        font-size: 76px;
        line-height: 84px;
    }
    font-family: 'Passion One';
`;

const H2 = styled.h2`
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    width: 442px;
    @media (max-width: 1100px) {
        font-size: 23px;
        line-height: 34px;
        width: 242px
    }
    font-family: 'Oswald';
`;

const LogInBar = styled.div`
    box-sizing: border-box;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items:center;
    width: 535px;
    height: 100vh;
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 429px;
    margin-top: 30vh;
    @media (max-width: 900px) {
        margin-top: 40px;
    }
`;

const Input = styled.input`
    padding-left: 15px;
    width: 429px;
    height: 65px;
    border-radius: 6px;
    margin-bottom: 13px;
    font-size: 27px;
    line-height: 40px;
    font-family: 'Oswald';
    font-weight: 700;
    border: none;
    @media (max-width: 900px) {
        width: 330px;
        height: 55px;
    }
`;

const Button = styled.button`
    width: 429px;
    height: 65px;
    border-radius: 6px;
    background-color:  #1877F2;
    border: none;
    margin-bottom: 22px;
    font-weight: 700;
    font-size: 22px;
    line-height: 33px;
    color: #ffff;
    font-weight: 700;
    font-family: 'Oswald';
    &:hover {
        cursor: ${({ isDisabled }) => isDisabled ? "default" : "pointer"};
    }
    opacity: ${({ isDisabled }) => isDisabled ? "0.7" : "1"};
    @media (max-width: 900px) {
        width: 330px;
        height: 55px;
    }
`;

const StyledLink = styled(Link)`
    color: #ffff;
    font-size: 20px;
    line-height: 24px;
    text-decoration: underline;
    @media (max-width: 900px) {
        font-size: 17px;
        line-height: 20px;
    }
    font-family: 'Lato';
`;

