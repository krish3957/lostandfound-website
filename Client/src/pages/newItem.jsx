import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from 'react';
import { styled } from 'styled-components';
import app from '../firebase';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Navigate } from "react-router-dom";


const Container = styled.div`
    height:calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url('https://images.unsplash.com/photo-1617785899222-fe06b15b6dd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80');
    background-size: cover;
`

const Wrapper = styled.div`
    display: flex;
    height: 80vh;
    width: calc(30vw + 30px);
    align-self: center;
    flex-direction: column;
    padding: 20px;
    background-color: #ececec;
`
const Title = styled.h2`
    font-weight: 400;
`




const Input = styled.input`
    --input-focus: #2d8cf0;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --main-color: #323232;
  width: 30vw;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
  margin-bottom: 10px;
  ::placeholder{
    color: var(--font-color-sub);
    opacity: 0.8;
  };
  :focus{
    border: 2px solid var(--input-focus);
  };
    
`

const Image = styled.input`
    margin-bottom: 10px;
`



const Select = styled.select`
    height:30px;
`

const Option = styled.option`

`

const Message = styled.span`
    font-size: 14px;
    margin-bottom: 10px;
`

const Button = styled.button`
    padding:10px;
    font-weight: 300;
    font-size: 18px;
    width: 200px;
    background-color: white;
    border-radius: 5px;
`


const NewItem = () => {

    const [file, setFile] = useState(null);
    const [input, setInput] = useState({block:'A'});

    const handleChange = (e) => {
        setInput((prev) => {
            return { ...prev, [e.target.name] : e.target.value };
        });
    };
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads

            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInput((prev)=>{
                        return {...prev,image:downloadURL};
                    })
                    axios.post('http://localhost:5000/api/items', {
                        item:input.item,
                        desc:input.desc,
                        foundBy:input.foundBy,
                        emailOfFinder:input.emailOfFinder,
                        venue:input.venue,
                        image:downloadURL,
                        block:input.block,
                        category:input.category.toLowerCase()

                    }).then(result => {
                        <Navigate to={'/items'} />
                    })
                });
            }
        );
    }

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>
                        Add a new Item
                    </Title>
                    <Input placeholder='Enter name of the found Item' name='item' onChange={handleChange} required/>
                    <Input placeholder='Describe the found Item' name='desc' onChange={handleChange} required/>
                    <Input placeholder='Your Name' name='foundBy' onChange={handleChange} required />
                    <Input placeholder='Your Email' name='emailOfFinder' type="email" onChange={handleChange} required />
                    <Input placeholder='Enter the venue you found Item from' name='venue' onChange={handleChange} required />
                    <h3 style={{ margin: 0 }}>Select the block of the venue</h3>
                    <Select name='block'  onChange={handleChange} required >
                        <Option disabled>Select</Option>
                        <Option>A</Option>
                        <Option>B</Option>
                        <Option>C</Option>
                        <Option>D</Option>
                        <Option>E</Option>
                        <Option>F</Option>
                        <Option>Others</Option>
                    </Select>
                    <Message>For other blocks,please mention exact venue</Message>
                    <Select name='category' onChange={handleChange} > 
                        <Option disabled>Select</Option>
                        <Option>ID card</Option>
                        <Option>Electroninc Items</Option>
                        <Option>Keys</Option>
                        <Option>Personal Belongings</Option>
                        <Option>Sports</Option>
                        <Option>Stationaries</Option>
                        <Option>Others</Option>
                    </Select>
                    <Image
                        type="file"
                        id="file"
                        accept="image/x-png,image/jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />

                    <Button onClick={handleClick}>
                        Add Item
                    </Button>
                </Wrapper>
            </Container>
        </div>
    );
}

export default NewItem;
