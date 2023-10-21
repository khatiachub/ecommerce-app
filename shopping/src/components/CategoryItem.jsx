import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    width:280px;
    margin-top:10px;
    padding:10px;
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  position:absolute;
  top:0;
  left:0;
`;

const Info = styled.div`
  width:100%;
  background-color:pink;
  height: 70vh;
  position: relative;
`;

const Title = styled.h1`
    color:white;
    font-size:20px;
    position:absolute;
    top:45%;
    left:50%;
    transform:translate(-50%,-50%);
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    position:absolute;
    top:55%;
    left:50%;
    transform:translate(-50%,-50%);
`;
  

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
      <Info>
        <Image src={item.img}/>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;