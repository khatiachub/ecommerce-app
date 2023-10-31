import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    width:100%;
    margin-top:10px;
    @media screen and (min-width:485px) {
      max-width:400px;
      padding:10px;
    }
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  position:absolute;
  top:0;
  left:0;
`;

const Info = styled.div`
  width:100%;
  height: 90vh;
  position: relative;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Title = styled.h1`
    color:white;
    font-size:20px;
    position:absolute;
    top:45%;
    font-family: 'Roboto Condensed', sans-serif;
    left:50%;
    transform:translate(-50%,-50%);
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: white;
    color:gray;
    font-family: 'Roboto Condensed', sans-serif;
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