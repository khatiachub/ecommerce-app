  import styled from "styled-components";
  import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorder';
  import SearchOutlinedIcon from '@mui/icons-material/Search';
  import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
  import { mobile } from "../responsive";
  import { Link } from "react-router-dom";
  const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;
  
  const Container = styled.div`
    flex: 1;
    max-width: 370px;
    width:100%;
    height: 370px;
    margin-top:20px;
    padding:3px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;
  
  const Image = styled.img`
    height:370px;
    width:370px;
    object-fit:cover;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;
  
  const Product = ({ item }) => {
    return (
      <Container>
        <Image src={item.img}/>
        <Info>
          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
            <SearchOutlinedIcon />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlinedIcon />
          </Icon>
        </Info>
      </Container>
    );
  };
  
  export default Product;