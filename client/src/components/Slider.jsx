import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const ArrowLeft= styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform:translateY(-50%);
  left:10px;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const ArrowRight= styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform:translateY(-50%);
  right: 10px;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideindex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  background-image:url(${props => props.imageurl});
  background-repeat:no-repeat;
  background-size:cover;
  background-position:top;
  @media screen and (max-width:485px) {
    height:600px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  font-family: 'Roboto Condensed', sans-serif;
  @media screen and (max-width:485px) {
    font-size:25px;
  }
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
  font-family: 'Roboto Condensed', sans-serif;
  @media screen and (max-width:485px) {
    font-size: 15px;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideindex, setSlideIndex] = useState(0);
  const handleLeftClick = () => {
      setSlideIndex(slideindex > 0 ? slideindex - 1 : 2);
    }
    const handleRightClick = () => {
      setSlideIndex(slideindex < 2 ? slideindex + 1 : 0);
    }
  

  return (
    <Container>
      <ArrowLeft  onClick={handleLeftClick}>
        <ArrowLeftOutlinedIcon />
      </ArrowLeft>
      <Wrapper 
      slideindex={slideindex}
      >
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id} imageurl={item.img}>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <ArrowRight  onClick={handleRightClick}>
        <ArrowRightOutlinedIcon />
      </ArrowRight>
    </Container>
  );
};

export default Slider;