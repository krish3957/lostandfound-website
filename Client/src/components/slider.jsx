import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Spline from '@splinetool/react-spline';


const Container = styled.div`
    height:100;
    width:100%;
    background-color: #ececec;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ImageContainer = styled.div`
    
`



const TextContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top:35%;
    left:34%;
`

const Title = styled.h1`
    font-size: 50px;
    z-index: 2;
    color: #000;
`
const Subtitle = styled.h3`
    font-size: 24px;
    color: #000;
    margin-top:-10px
`
const Buttons = styled.div`
    display: flex;
`
const Button = styled.button`
    height: 50px;
    width: 200px;
    margin-left:10px;
    border-radius: 5px;
    font-size: 20px;
    background-color: ${props =>props.type === 'filled' ? '#2b35cf' : 'white'};
    color: ${props =>props.type === 'filled' ? 'white' : 'black'};
    cursor:pointer;
`

const Slider = () => {
    return (
        <Container>
            <ImageContainer>
                <Spline scene="https://prod.spline.design/yy9lUvwaYTamf9g3/scene.splinecode" />
            </ImageContainer>
            <TextContainer>
                <Title>
                    Campus Lost & Found
                </Title>
                <Subtitle>
                    Where Lost Items Await Reunion
                </Subtitle>
                <Buttons>
                <Link style={{ textDecoration: "none" }} to={'/items'}>
                    <Button>
                        Find Item
                    </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to={'/add'}>
                    <Button type='filled'>
                        Add Item
                    </Button>
                </Link>
                </Buttons>
            </TextContainer>
        </Container>
    );
}

export default Slider;
