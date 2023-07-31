import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Sidebar from '../Components/Sidebar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    width: 96vw;
    
`
const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #22A890;
    font-family: cursive;
`

const Image = styled.img`
    margin: 20px ;
    width: 45vw;
    height:80vh;
`

const ImageContainer = styled.div`
    flex: 4;
`

const DetailsContainer = styled.div`
    padding: 10px 20px 10px 40px;
    flex: 2;
`

const Title = styled.h1`
    font-size: 35px;

`

const P = styled.p`
    font-size:  25px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 400;
`

const Button = styled.button`
    width:150px;
    padding: 10px;
`

const Input = styled.input`
    padding: 6px;
    margin-left: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #555;
    outline: none;
    width:250px;
    color:black;
    border-color:black ;
    &:focus {
    border-color: #F5ED1B;
    box-shadow: 0 0 0 0.2rem #F5D7C2;
    }
    &::placeholder{
        color:black;
        opacity: 0.7;
    }

`

const InputTitle = styled.div`
    font-size: 18px;
    width:150px;
`
const InputContainer = styled.div`
    margin: 20px 0;
    display: flex;
    width: 40vw;
    height: 30px;
    align-items: center;
`

const Select = styled.select`
    width:70px;
    height:30px;
    margin-left: 10px;
`
const Option = styled.option`
    width: 70px;
`



const Item = () => {
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

    const [isFound,setFound] = useState(item.found);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const handleClick = ()=>{
        axios.put("http://localhost:5000/api/items/update/" + itemId,{
            found:isFound,
            returnedTo:name,
            emailOfReturned:email
        })
    }

    return (
        <Container>
            <Sidebar />
            <Wrapper>
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
                        <P style={{color:'black'}}>Before Returning the Item, Please Fill the details below:</P>
                        <InputContainer>
                            <P>Found:</P>
                            <Select onChange={(e)=>{setFound(e.target.value)}}>
                                <Option value='true'>
                                    Yes
                                </Option>
                                <Option selected value='false'>
                                    No
                                </Option>
                            </Select>
                        </InputContainer>
                        <InputContainer>
                            <InputTitle >Owner Name:</InputTitle>
                            <Input placeholder='Name Of the product owner' defaultValue={item.returnedTo} onChange={(e)=>{setName(e.target.value)}} />
                        </InputContainer>
                        <InputContainer>
                            <InputTitle>Email Of Owner:</InputTitle>
                            <Input placeholder='Email Of the product owner' defaultValue={item.emailOfReturned} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </InputContainer>
                        <Button onClick={handleClick}>Update</Button>
                    </DetailsContainer>
                </Wrapper>
            </Wrapper>

        </Container>
    );
}

export default Item;
