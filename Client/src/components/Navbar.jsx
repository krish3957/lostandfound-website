import Spline from '@splinetool/react-spline';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Container = styled.div`
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Left = styled.div`
    flex: 5;
`;

const Right = styled.div`
    flex:2;
    display: flex;
    
`;
const Button = styled.button`
    height: 45px;
    width: 200px;
    margin-left:10px;
    border-radius: 5px;
    font-size: 20px;
    background-color: ${props => props.type === 'filled' ? '#2b35cf' : 'white'};
    color: ${props => props.type === 'filled' ? 'white' : 'black'};
    cursor:pointer;
`

const Navbar = () => {
    return (
        <Container>
            <Left>
                <Link to={'/'} style={{ textDecoration: "none" , color:"black"}}>
                    {/* <H1>Lost&Found</H1> */}
                    <Spline scene="https://prod.spline.design/HzyhbqrLA15nanee/scene.splinecode" style={{height:'150px',marginTop:'40px',marginLeft:'40px',fontSize:'40px', width:'200px'}} />
                </Link>
            </Left>
            <Right>
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
            </Right>
        </Container>
    );
}

export default Navbar;
