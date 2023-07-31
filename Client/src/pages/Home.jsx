import React from 'react';
import { styled } from 'styled-components';
import Navbar from '../components/Navbar';
import Slider from '../components/slider';
import Category from '../components/Category';


const Container = styled.div`

`

const CategoryContainer= styled.div`
    width: 99vw;
    margin:20px 0;
    display: flex;
    flex-wrap: wrap;
`
const Home = () => {
    return (
        <Container>
            <Navbar />
            <Slider />
            
            <CategoryContainer>

                <Category title="Electronic Items"
                    scenceLink="https://prod.spline.design/esenKW5q7L6xnPps/scene.splinecode"
                    category="personal belongings"
                />
                <Category title="Stationaries"
                    scenceLink="https://prod.spline.design/zqLn8KZvwJtS5FvE/scene.splinecode"
                    category="stationaries"
                />
                <Category title="Cards"
                    scenceLink="https://prod.spline.design/hmLC4jfpduDe3X0M/scene.splinecode"
                    category="id card"
                />
                <Category title="Keys"
                    scenceLink="https://prod.spline.design/LLTNUxzoDpVC9VTP/scene.splinecode"
                    category="keys"
                />
                <Category title="Personal Belonggings"
                    scenceLink="https://prod.spline.design/zdtKqytyoseCHAJE/scene.splinecode"
                />
                <Category title="Sports"
                    scenceLink="https://prod.spline.design/WaM0E2Tl2ERpkaB4/scene.splinecode"
                    category="sports"
                />
                
                
            </CategoryContainer>
        </Container>
    );
}

export default Home;
