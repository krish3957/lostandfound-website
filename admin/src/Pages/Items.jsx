import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
const Wrapper = styled.div`
    display: flex;
    width: calc(100vw - 20px);
    height:100vh;

`

const Left = styled.div`
    background-color: #2B3fed;
    flex:1;
    display: flex;
    flex-direction: column;
`
const Right = styled.div`
    background-color: #ececec;
    flex:5;
`

const SearchContainer = styled.div`
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    text-align: center;
`

const SearchInput = styled.input`
    font-family: inherit;
  font-size: inherit;
  background-color: #f4f2f2;
  border: none;
  color: #646464;
  padding: 0.7rem 1rem;
  border-radius: 30px;
  width: 12em;
  transition: all ease-in-out .5s;
    margin-top: 10px;

`

const Svg = styled.svg`
    margin: 0 0 -10px -30px ;
    height:20px;
    width:20px;
    opacity: 0.5;
    
`
const SubTitle = styled.h3`
    margin-left:15px;
    color: white;
    font-size: 24px;
    font-weight: 300;
`

const CheckBox = styled.input`
    margin-left:15px;
    align-self: flex-start;
    width: 20px;
    height: 20px;
    border: 2px solid #30cfd0;
    border-radius: 5px;
    background-color: transparent;
    display: inline-block;
    position: relative;
    margin-right: 10px;
  cursor: pointer;
`

const Label = styled.label`
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
`

const Itemscontainer = styled.div`
    display: flex;
    flex-wrap: wrap;

`

const ItemWrapper = styled.div`
    max-width:20vw;
    margin:10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    height:55vh;

`

const ItemTitle = styled.h2`
    color:black;
    margin: 5px;
`

const Image = styled.img`
    width: 20vw;
    height:35vh;
`
const Desc = styled.span`
    font-size:18px;
    margin:5px;
`

const Blur = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20vw;
    z-index: 3;
    height: 55vh;
    background-color: black;
    opacity: 0;
    &:hover{
        opacity: 0.5;
    }
`

const Icon = styled.div`
    margin: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;

    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;

    &:hover{
        background-color: #ffdfee;
        transform: scale(1.1);
    }
    `
const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
`
const Button = styled.div` 
    cursor: pointer;
    margin: 5px;
    background-color:#fff;
    width:50px;
    height:50px;
    color: #000;
   border-radius: 50%;
   display: flex;
    justify-content: center;
    align-items: center;

`
const Link = styled.a`
    color: black;
    text-decoration: none;
`


const Option = styled.option`
    width:50px;
`

const Select = styled.select`
    width: 50px;
    margin-left: 20px;
    height:20px;
`
const Returned = styled.div`
    background-color: orange;
    color: white;
    width:70px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    border-radius: 5px;
    
`


const Items = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [block, setBlock] = useState([]);
    const [search, setSearch] = useState("");
    const [items, setItems] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const blockOptions = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "Others"
    ];
    const [returned,setReturned] = useState("All")
    const handleReturned = (({ currentTarget: input }) => {
        setReturned(input.value);
    });
    useEffect(() => {
        const getItems = () => {
            const url = cat ? `http://localhost:5000/api/items?page=${page - 1}&block=${block}&sort=Date,asc&search=${search}&category=${cat}&returned=${returned}` : `http://localhost:5000/api/items?page=${page - 1}&block=${block}&sort=Date,asc&search=${search}&returned=${returned}`;
            axios.get(url).then(result => {
                setItems(result.data.items);
                setCount(result.data.count);

            });
        }
        getItems();
    }, [block, page, search, cat, count,returned]);

    const handleChange = (({ currentTarget: input }) => {
        if (input.checked) {
            const state = [...block, input.value];
            setBlock(state);

        }
        else {
            const state = block.filter((val) => val !== input.value);
            setBlock(state);

        }
    });

    let totalPages = 0;
    let c = count;
    let limit = 20;
    while (c <= limit) {
        totalPages = totalPages + 1;
        c = c + limit;
    }

    const onClick = (newPage) => {
        setPage(newPage + 1);

    }

    return (
        <div>
            <Sidebar />
            <Wrapper>
                <Left>
                    <SearchContainer>
                        <SearchInput placeholder='Search Item Here' name='search' onChange={(e) => {
                            setSearch(e.target.value);
                        }} />
                        <Svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                            </g>
                        </Svg>
                    </SearchContainer>
                    <SubTitle>Filter By Block:</SubTitle>
                    {
                        blockOptions.map(val => (
                            <Label>
                                <CheckBox type="checkbox" onChange={handleChange} value={val} />
                                {val}</Label>
                        ))
                    }
                    <SubTitle>Filter By:</SubTitle>
                    <Select onChange={handleReturned}>
                        <Option value="All">
                            All
                        </Option>
                        <Option value={true}>
                            Returned
                        </Option>
                        <Option value={false}>
                            Not Returned
                        </Option>
                    </Select>

                </Left>
                <Right>
                    <Itemscontainer>
                        {items && items.map((item, index) => (
                            <ItemWrapper key={index}>
                                <Image src={item.image} />
                                <ItemTitle>
                                    {item.item}
                                </ItemTitle>
                                <Desc>
                                    Block: {item.block}
                                </Desc>
                                <Desc>
                                    Venue: {item.venue}
                                </Desc>
                                <Desc>
                                    Found By: {item.foundBy}
                                </Desc>
                                <Blur>
                                    <Link href={`/item/${item._id}`}>
                                        <Icon>
                                            <SearchIcon fontSize="large" />
                                        </Icon>
                                    </Link>
                                </Blur>
                                {item.found &&  <Returned>Returned</Returned>}
                            </ItemWrapper>
                        ))}
                    </Itemscontainer>
                    <PageContainer>
                        {totalPages > 0 &&
                            [...Array(totalPages)].map((val, index) => (
                                <Button
                                    onClick={() => onClick(index)}
                                    key={index}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                    </PageContainer>
                </Right>
            </Wrapper>
        </div>
    );
}

export default Items;
