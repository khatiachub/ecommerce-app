import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js'
import { addProduct, addProductId, clearCart, decrementItem, incrementItem, removeProduct } from '../redux/cartRedux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteProduct } from '../redux/apiCalls';


const Container = styled.div`
    width:100%;
`;

const Wrapper = styled.div`
  width:95%;
  margin:0 auto;
  margin-top:20px;

`;

const Title = styled.h2`
  font-weight: 300;
  text-align:start;
  border-bottom:1px solid #000;
  padding-bottom:5px;
  margin-top:50px; 
  @media screen and (max-width:485px) {
    font-weight:100;
    font-size:22px;
    /* margin-top:110px;  */
    } 
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top:50px;
  @media screen and (max-width:485px) {
    width:100%;
    } 
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ width:120,height:50})}

`;


const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:'column'})}
  @media screen and (max-width:768px) {
    flex-direction:column;
    } 
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top:25px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  @media screen and (max-width:485px) {
    /* flex-direction:column; */
    /* justify-content:center; */
    align-items:center;
    margin-top:20px;
  }
`;

const Image = styled.img`
  width: 200px;
  cursor: pointer;
  @media screen and (max-width:485px) {
    max-width:200px;
    width:100%;
    height:360px;
    object-fit:cover;
  }
  @media screen and (max-width:390px) {
    max-width:170px;
    width:100%;
    height:300px;
    object-fit:cover;
  }
`;

const Details = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width:485px) {
    max-width:280px;
    width:100%;
    height:200px;
  }
  @media screen and (max-width:390px) {
    padding-left:10px;
  }

`;

const ProductName = styled.span`
  max-width:400px;
  width:100%;
  font-size:15px;
  @media screen and (max-width:390px) {
    font-size:12px;
  }
`;

const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left:10px;
  background-color: ${(props) => props.color};
`;
const ProductColor = styled.span`
    display:flex;
    align-items:center;
    @media screen and (max-width:390px) {
      font-size:14px;
  }
`;

const ProductSize = styled.span`
@media screen and (max-width:390px) {
  font-size:14px;
  }
`;
const Price=styled.div`
  display:flex;
  align-items:center;
  @media screen and (max-width:390px) {
    font-size:14px;
  }

`

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width:485px) {
    margin-top:20px;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-left:10px;
  @media screen and (max-width:390px) {
    font-size:16px;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 30px;
  margin-top:23px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Text=styled.h2`
  margin-top:20%;
  padding-bottom:100px;
`
const Cart = () => {
  const cart=useSelector(state=>state.cart)
  const makePayment=async()=>{
    const stripe=await loadStripe("pk_test_51Ns2YUF4BbozQhllhG1mC07b90Jcz0c2AvoZ8RRSqB9FoE0jGLeeVoY21vWphHwdN2peKRMpzxp4XJvolrJ5Xtc000uPQUksYH")
    const body={
      cart:cart
    }
    const headers={
      "Content-Type":"application/json"
    }
    const response=await fetch("http://localhost:5002/api/payment",{
      method:"POST",
      headers:headers,
      body:JSON.stringify(body)
    })
    const session=await response.json();
    const result=stripe.redirectToCheckout({
      sessionId:session.id
    })
    if(result.error){
      console.log(result.error);
    }
  }
  const dispatch=useDispatch()
  const ClearCart=()=>{
    dispatch(clearCart())
  }
const nav=useNavigate()
const handleNavigation=(id,color,size)=>{
  nav(`/product/${id}`,{
    state:{
      color:color,
      size:size
    }
  })
}

const increment=(i)=>{
  dispatch(incrementItem(i))
}
const decrement=(i)=>{
    dispatch(decrementItem(i))
}

const deleteItem=(index,productId)=>{
  deleteProduct(productId)
  dispatch(removeProduct(index))
}
console.log(cart.products);
  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={ClearCart}>CLEAR CART</TopButton>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        {cart.products.length===0?<Text> Your cart is empty..</Text>:''}
        <Bottom>
          <Info >
            {cart.products&&cart.products.map((product,i)=>(
            <div  key={i}>            
            <Product>
              <ProductDetail>
                <Image src={product.image} onClick={()=>handleNavigation(product._id,product.color,product.size)}/>
              <Details>
                  <ProductName>
                    <b>PRODUCT:</b> {product.title}
                  </ProductName>
                  <ProductColor>
                  <b>COLOR:</b> 
                  <Color color={product.color} />
                  </ProductColor>
                  <ProductSize>
                    <b>SIZE:</b> {product.size}
                  </ProductSize>
                  <Price >
                  <b>PRICE:</b><ProductPrice >${product.price*product.quantity}</ProductPrice>
                  </Price>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon onClick={()=>increment(i)}/>
                  <ProductAmount>{product.quantity}</ProductAmount>
                  {product.quantity===1?<DeleteOutlineIcon onClick={()=>deleteItem(i,product._id)}/>:
                  <RemoveIcon onClick={()=>decrement(i)}/>}
                </ProductAmountContainer>
                <DeleteOutlineIcon style={{display:`${product.quantity===1?'none':'block'}`}} onClick={()=>deleteItem(i,product._id)}/>
              </PriceDetail>
            </Product>
            <Hr />
            </div>
             ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
              <Button onClick={makePayment}>CHECKOUT NOW</Button>
            </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;