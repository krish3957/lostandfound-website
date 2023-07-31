import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from "react-redux";
import { loggingIn } from '../Redux/adminRedux';

const Container = styled.div`
    width: 100vw;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width:500px;
    height:400px;
    background-color: #ffebf3;
`

const Input = styled.input`
    margin:20px;
    width:200px;
    height:30px;
    padding-left: 5px;
`

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    margin-top: 10px;
    padding: 12.5px 50px;
    border: 0;
    border-radius: 100px;
    background-color: #2ba8fb;
    color: #ffffff;
    font-weight: Bold;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    cursor: pointer;
    
    &:hover{ 
    background-color: #6fc5ff;
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.1);
    }
    &:active {
    background-color: #3d94cf;
    transition: all 0.25s;
    -webkit-transition: all 0.25s;
    box-shadow: none;
    transform: scale(0.98);
    }
`
const Login = () => {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        if(e.target.name === 'username'){
            setUsername(e.target.value);
            console.log(username);
        }
        else{
            setPassword(e.target.value);
        }
    }
    const handleClick= () =>{
        if(username !== process.env.REACT_APP_USERNAME){
            alert('Username not found');
        }
        else if(password !== process.env.REACT_APP_PASSWORD){
            alert('Wrong Password!');
        }
        else{
            console.log("dispatching");
            dispatch(loggingIn());
        }
    }
    return (
        <Container>
            <Wrapper>
                <InputContainer>
                    <p>Username: </p>
                    <Input placeholder='Enter Usename Here' type='text' name='username' onChange={handleChange} required/>
                </InputContainer>
                <InputContainer>
                    <p>Password: </p>
                    <Input placeholder='Enter Password Here' name='password' type='password' onChange={handleChange} required/>
                </InputContainer>
                <Button onClick={handleClick}>Login</Button>
            </Wrapper>
        </Container>
    );
}

export default Login;
