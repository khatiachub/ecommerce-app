import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Newsletter from "../components/Newsletter";
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { useDispatch, useSelector } from "react-redux";
import {addProduct, addtoWishlist, removeFromWishlist} from '../redux/cartRedux'
import ProductSlider from './ProductSlider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToCart } from '../redux/apiCalls';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';



const Container = styled.div`
 width:100%;
 margin:0 auto;
 margin-top:10vh;

`;

const Wrapper = styled.div`
  display: flex;
  width:95%;
  margin:0 auto;
  justify-content:space-between;
  @media screen and (max-width:768px) {
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  @media screen and (min-width:1024px) {
    width:60%;
  }
  @media screen and (min-width:1400px) {
    width:50%;
  }
`;

const ImgContainer = styled.div`
   height:auto;
   max-width:440px;
   width:100%;
   @media screen and (max-width:880px) {
    max-width:400px;
  }
   @media screen and (max-width:768px) {
    max-width:600px;
  }
`;

const InfoContainer = styled.div`
   max-width:450px;
   margin-top:50px;
   width:100%;
   @media screen and (max-width:768px) {
    max-width:600px;
    margin-top:60px;
  }
  @media screen and (min-width:768px) {
    padding-left:30px;
  }
`;

const Title = styled.h2`
  font-weight: 200;
  font-family: 'Roboto Condensed', sans-serif;
  @media screen and (max-width:485px) {
  font-size:17px;
  }
`;

const Desc = styled.p`
font-family: 'Roboto', sans-serif;
  margin: 25px 0px;
  max-width:300px;
  width:100%;
  line-height:1.5;
  font-size:15px;
  @media screen and (max-width:768px) {
    display: ${(props) => props.accordeon};
  }
`;
const DescCode=styled.p`
  font-family: 'Roboto', sans-serif;
  margin: 25px 0px;
  max-width:300px;
  width:100%;
  line-height:1.5;
  font-size:15px;
  @media screen and (max-width:768px) {
    display: ${(props) => props.accordeon};
  }
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  font-family: 'Roboto', sans-serif;
`;

const FilterContainer = styled.div`
  display: flex;
  max-width:300px;
  width:100%;
  justify-content: space-between;
  align-items:center;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-top:25px;
`;

const FilterTitle = styled.p`
  font-size: 20px;
  font-weight: 200;
  font-family: 'Roboto', sans-serif;
`;

const FilterColor = styled.div`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props) =>props.isselected&&"1.5px solid #83dbf8"};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option`
  
`;

const AddContainer = styled.div`
 max-width:300px;
  width:100%;  height:50px;
  display: flex;
  align-items: center;
  margin-top:25px;
  justify-content: space-between;
  @media screen and (max-width:768px) {
   position:sticky;
   bottom:0;
   z-index:10;
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
  background-color:teal;
  border-radius:5px;
  cursor: pointer;
`

const Button = styled.button`
  width:70%;
  height:50px;
  font-family: 'Roboto', sans-serif;
  border:none;
  background-color:teal;
  background-color: teal;
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

const Accordeon=styled.p`
  display:none;
  @media screen  and (max-width:768px){
    display:block;
  }
`
const AccordeonDiv=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:130px;
  margin-top:20px;
  padding-bottom:20px;
`
const Arrow=styled.div`
  display:none;
  @media screen  and (max-width:768px){
    display:block;
  }
`




const Product = () => {
  const loc=useLocation()
  const colorSet=loc.state?.color
  const sizeSet=loc.state?.size
  const location=useLocation();
  const id=location.pathname.split("/")[2]
  const [product, setProduct] = useState({});
  const[quantity,setQuantity]=useState(1)
  const[color,setColor]=useState(colorSet)
  const[size,setSize]=useState(sizeSet[0])
  const dispatch=useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);
  const nav=useNavigate()
  const filtered=product.img&&product.img.filter((element)=>element.color===color)
  const image=filtered&&filtered.map((image)=>(image.image).map((image)=>(image)))
  const loginUser = useSelector((state) => state.user?.currentUser);
  const data={
    userId:loginUser?._id,
    products:[
      {
        productId:id,
        quantity:quantity
      }
    ]
  }
  const filteredSize=product.img&&product.img.filter((size)=>(
    size.color===color
  ))
  
  const handleClick=()=>{
   if(color){
    nav('/cart')
    dispatch(addProduct({...product,quantity,color,size,image}))
    // addToCart(data,dispatch)
   }else{
    return
   }
  }


  const cart=useSelector(state=>state.cart.wishlist)
  const addToFavorites=(id)=>{
    const isProductInWishlist = cart.some((item) => item._id === id);
    if (!isProductInWishlist) {
      dispatch(addtoWishlist({ ...product, color, size, image }));
    } else {
      console.log('Product is already in the wishlist');
    }
  }
  const params=useParams()
  const favourites=cart&&cart.filter((product)=>(product._id===params.id))
  const favs=favourites&&favourites.map((favorite)=>(favorite.favorite))


  const removefromFavorites=(index)=>{
    dispatch(removeFromWishlist(index))
  }

  const[currentColor,setCurrentColor]=useState('')
  const onClickColor=(storedColor)=>{
      setColor(storedColor)
      setCurrentColor(storedColor)
  }
 
  const[closed,setClosed]=useState(true)
  const handleOpen=()=>{
    setClosed(false)
  }
  const handleClose=()=>{
    setClosed(true)
  }
  return (
    <>
    <Container>
      <Wrapper>
        <ImgContainer>
        <ProductSlider 
        size={filteredSize}
        setcolor={color}
        image={product.img}/>

        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <AccordeonDiv >
          <Accordeon>Product details</Accordeon>
          <Arrow>
          {closed?<KeyboardArrowDownOutlinedIcon onClick={handleOpen}/>:
          <KeyboardArrowUpOutlinedIcon onClick={handleClose}/>}</Arrow>
          </AccordeonDiv>
          <DescCode accordeon={closed?'none':'block'}>product code:{product._id}</DescCode>
          <Desc accordeon={closed?'none':'block'}>
            {product.desc}
          </Desc>
          <Price>$ {product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.img&&product.img.map((color,i)=>{
                return(
                  <FilterColor isselected={color.color===currentColor}  key={i} onClick={()=>onClickColor(color.color)}  color={color.color} ></FilterColor>               
                )
              })} 
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e)=>setSize(e.target.value)}>
                {filteredSize&&filteredSize.map((size,i)=>{
                  return(
                    size.size.map((size)=>(
                      <FilterSizeOption key={size}>{size}</FilterSizeOption>
                    ))
                  )
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>
            <AddContainer>
              <Button size={size} onClick={handleClick}>ADD TO CART</Button>
              <Wishlist >
             {favs[0] ? 
               <FavoriteOutlinedIcon onClick={() => removefromFavorites(product._id)} style={{ color: "#fff" }} />
                : 
               <FavoriteBorderIcon onClick={() => addToFavorites(product._id)} style={{ color: "#fff" }} />}
              
              </Wishlist>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
    </Container>
    </>
  );
};

export default Product;