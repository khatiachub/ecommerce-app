import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { useLocation, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useDispatch, useSelector } from "react-redux";
import {addProduct} from '../redux/cartRedux'
import ProductSlider from './ProductSlider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const Container = styled.div`
 width:100%;
 margin:0 auto;
 margin-top:10vh;

`;

const Wrapper = styled.div`
  display: flex;
  width:95%;
  margin:0 auto;
  justify-content: space-around;
  @media screen and (max-width:768px) {
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  @media screen and (min-width:1400px) {
    width:75%;
  }

`;

const ImgContainer = styled.div`
   height:700px;
   /* background-color:red; */
   max-width:440px;
   width:100%;
   @media screen and (max-width:880px) {
    max-width:400px;
  }
   @media screen and (max-width:768px) {
    max-width:600px;
  }
  @media screen and (min-width:1150px) {
    max-width:600px;
  }
`;

const InfoContainer = styled.div`
   max-width:450px;
   margin-top:20px;
   width:100%;
   @media screen and (max-width:768px) {
    max-width:600px;
    margin-top:0;
  }
  @media screen and (min-width:768px) {
    padding-left:30px;
  }
  
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 25px 0px;
  max-width:300px;
  width:100%;
  line-height:1.5;
  font-size:15px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width:100px;
  display: flex;
  flex-direction:column;
  /* justify-content: space-between; */
  @media screen and (max-width:768px) {
    flex-direction:column;
  }


`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-top:25px;

  @media screen and (max-width:768px) {
  }
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  height:50px;
  display: flex;
  align-items: center;
  margin-left:10px;
  margin-top:25px;
  justify-content: space-between;
  @media screen and (max-width:768px) {
   position:sticky;
   bottom:0;
   z-index:10;
  }
  @media screen and (max-width:485px) {
   width:93%;
   margin-left:0;
  }
`;
const Wishlist=styled.div`
  display:flex;
  width:25%;
  justify-content: center;
  align-items: center;
  height:50px;
  padding:0 15px 0 15px;
  box-sizing:border-box;
  background-color:#83dbf8;
  border-radius:5px;
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top:20px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  width:70%;
  height:50px;
  border:none;
  background-color:#83dbf8;
  border-radius:5px;
  color:#fff;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f5fbfd;
      color:#1f1e1e;
      transition:0.5s linear;
  }
`;
const ItemContainer=styled.div`
  display:flex;
  @media screen and (max-width:485px) {
   flex-direction:column;
  }

`

const Product = () => {
  const location=useLocation();
  const id=location.pathname.split("/")[2]
  const [product, setProduct] = useState({});
  const[quantity,setQuantity]=useState(1)
  const[color,setColor]=useState('')
  const[size,setSize]=useState('')
  const dispatch=useDispatch();

  const handleRemove=()=>{
    if(quantity===1){
      return
    }else{
      setQuantity(quantity-1)
    }
  }
  const handleAdd=()=>{
    setQuantity(quantity+1)
  }
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleClick=()=>{
   dispatch(addProduct({...product,quantity,color,size}))
  }
  const loc=useLocation()
  const colorSet=loc.state?.color
  const navigate=useNavigate()
  console.log(loc);


  // dispatch(addProduct({color}))
  // const storedColor=useSelector(state=>state.cart.setColor)

  const onClickColor=(storedColor)=>{
    setColor(storedColor)
    // if(color.length>0){
      navigate(loc.pathname, { state: {...loc.state, color: '' } });
    // }else{
    //   navigate(loc.pathname, { state: {...loc.state, color: colorSet } });
    // }

  }
  console.log(loc.state.color);
  console.log(color);

  // console.log(cart);



  return (
    <>
    <Container>
      <Wrapper>
        <ImgContainer>
        <ProductSlider setcolor={color} color={loc.state?.color}   image={product.img}/>

        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>product code:{product._id}</Desc>
          <Desc>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.img&&product.img.map((color,i)=>{
                return(
                  <FilterColor key={i} onClick={()=>onClickColor(color.color)}  color={color.color} ></FilterColor>               
                )
              })} 
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {product.size&&product.size.map((s,i)=>{
                  return(
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  )
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <ItemContainer >
            <AmountContainer>
              <RemoveIcon  onClick={handleRemove}/>
              <Amount>{quantity}</Amount>
              <AddIcon onClick={handleAdd}/>
            </AmountContainer>
            <AddContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
              <Wishlist><FavoriteBorderIcon style={{color:"#fff"}}/></Wishlist>
          </AddContainer>
          </ItemContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
    </>
  );
};

export default Product;