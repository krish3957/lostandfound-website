import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div``
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Image = styled.img`
    width: 45vw;
    height:100vh;
`

const ImageContainer = styled.div`
    flex: 1;
`

const DetailsContainer = styled.div`
    flex: 1;
`

const Title = styled.h1`
    font-size: 35px;

`

const P = styled.p`
    font-size:  25px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
`

const Mes = styled.span`
    color: red;

`

const Component = () => {
    const location = useLocation();
    const itemId = location.pathname.split('/')[2];
    const [item, setItem] = useState({});

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/items/find/" + itemId);
                setItem(res.data.item);
            }
            catch (err) {
                console.log(err);
            }
        }
        getItem(); 
    },
        [itemId]);

    return (
        <Container>
            <Navbar />
            <Wrapper>
                <ImageContainer>
                    <Image src={item.image} />
                </ImageContainer>
                <DetailsContainer>
                    <Title>{item.item}</Title>
                    <P>{item.desc}</P>
                    <P>Block: {item.block}</P>
                    <P>Venue: {item.venue}r</P>
                    <P>Found By:{item.foundBy}</P>
                    <P>
                        Contact details:
                    </P>
                    <P>Email : {item.emailOfFinder}</P>
                    {item.found && <Mes>Returned!</Mes>}
                    {item.found && <P>Returned To:{item.returnedTo}</P>}
                    {item.find && <P>Contacgt Details: {item.emailOfReturned}</P>}
                </DetailsContainer>
            </Wrapper>
        </Container>
    );
}

export default Component;
