import React from 'react';
import { styled } from 'styled-components';
import Sidebar from '../Components/Sidebar';
import Login from '../Components/Login';
const Container = styled.div`
`
const Home = () => {
    return (
        <Container>
            <Sidebar/>
            <Login/>
        </Container>
    );
}

export default Home;
