import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {styled} from 'styled-components'
import { loggingOut } from '../Redux/adminRedux';

const Container = styled.div`
    display: flex;
    width: 98vw;
    
`

const Heading = styled.h1`
    margin:5px 15px;
    flex:5;
`

const Right = styled.div`
    padding: 10px;
    flex: 2;
    display: flex;
`

const Button = styled.button`
    width: 200px;
    margin:0 10px;
    height: 50px;
    font-size: 18px;
    background-color: ${props => props.type === 'filled' ? '#2b35cf' : 'white'};
    color: ${props => props.type === 'filled' ? 'white' : 'black'};
`
const MinButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Link = styled.a`
    color: black;
    text-decoration: none;
`

const Sidebar = () => {
    const dispatch = useDispatch()
    const admin = useSelector(state => state.admin).isAdmin;
    const handleLogout = ()=>{
        dispatch(loggingOut());
    }
    return (
        <Container>
           <Heading> <Link href='/' >Lost&Found</Link></Heading>
            <Right>
                <Button type='filled'>Update Item</Button>
                <Button>Add Item</Button>
                
                { admin && <MinButton onClick={handleLogout}>Logout</MinButton>}
                {!admin && <Link href='/'><MinButton>Login</MinButton></Link>}
            </Right>
        </Container>
    );
}

export default Sidebar;
