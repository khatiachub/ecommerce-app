  import styled from "styled-components";
  import { useNavigate} from "react-router-dom";
  
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
    width:300px;
    height:500px;
    margin-top:100px;
    padding:3px;
    display: flex;
    flex-direction:column;
    align-items: self-start;
    justify-content: start;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
    @media screen and (max-width:485px) {
      height:300px;
      width:180px;
    }
    @media screen and (max-width:410px) {
      height:250px;
      width:140px;
    }

  `;
  
  const Image = styled.img`
    height:500px;
    width:300px;
    object-fit:cover;
    z-index: 2;
    @media screen and (max-width:485px) {
      height:300px;
      width:180px;
    }
    @media screen and (max-width:410px) {
      height:250px;
      width:140px;
    }
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
    @media screen and (max-width:485px) {
      height:30px;
      width:30px;
    }
  `;
  const Title=styled.p`
    font-family: 'Roboto Condensed', sans-serif;
    font-weight:100;
  `
  const Price=styled.p`
    font-family: 'Roboto Condensed', sans-serif;
    margin-top:10px;
    
  `
  const Desc=styled.div`
    flex-direction:column;
    justify-content:start;
    margin-top:10px;
  `
  const Product = ({ item ,productImg,color,size}) => {
    const nav=useNavigate()
    const handleClick=()=>{
      nav(`/product/${item._id}`,{
        state:{
          color:color,
          size:size
        }
      })
    }
    return (
      <Container onClick={handleClick}>
        <div>
        <Image src={productImg.image}/>
        <Info>
        </Info>
        </div>
        <Desc>
          <Title>{item.title}</Title>
          <Price>US$ {item.price}</Price>
        </Desc>
      </Container>
    );
  };
  
  export default Product;