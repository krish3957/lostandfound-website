import Spline from '@splinetool/react-spline';
import React from 'react';
import { styled } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';


const Container = styled.div`
    margin:10px;
    width: 23vw;
    height:60vh;
    background-color: #ccfff5;
`



const Title = styled.h2`
    
    text-align: center;

`
const Link = styled.a`
    position: relative;
    top:-70px;
    color: black;
    text-decoration: none;
`

const Icon = styled.div`
    display: flex;    
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 50px;
    left:20vw;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    opacity: 1;
    transition: all 0.5s ease;

    &:hover{
        background-color: #ffdfee;
        transform: scale(1.1);
    }
`

const Category = ({ title, scenceLink,category}) => {
    return (
        <Container>
            <Spline scene={scenceLink} />
            <Link href={`/items/${category}`}>
            <Title>
                {title}
            </Title>
            <Icon>
                <SearchIcon fontSize="large" />
            </Icon>
            </Link>

        </Container>
    )
}

export default Category;
