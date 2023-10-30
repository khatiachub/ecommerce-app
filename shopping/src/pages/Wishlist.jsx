import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { clearWishlist, removeFromWishlist } from '../redux/cartRedux'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from 'react-router-dom';




const Empty=styled.div`
width:95%;
/* height:100vh; */
margin:0 auto;
`
const Title=styled.h3`
text-align:center;
font-family: 'Roboto Condensed', sans-serif;
margin-top:20vh;
`
const Parag=styled.p`
text-align:center;
margin-top:20px;
font-family: 'Roboto Condensed', sans-serif;
`
const WishList=styled.h1`
margin-top:20px;
font-family: 'Roboto Condensed', sans-serif;
`
const Image=styled.img`
  width:310px;
  height:420px;
  object-fit:cover;
  margin-top:40px;
`
const Wrapper=styled.div`
    position: relative;
    width:310px;


`
const Container=styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:space-between;
  margin:0 auto;
  margin-top:50px;
  width:100%;
  height:auto;
`
const ProductTitle=styled.h4`
  position: absolute;
  bottom:10px;
  left:10px;
  font-family: 'Roboto Condensed', sans-serif;
`
const ProductPrice=styled.h4`
  position: absolute;
  bottom:10px;
  font-family: 'Roboto Condensed', sans-serif;
  right:10px;
`
const TopButton = styled.button`
  padding: 10px;
  margin-top:40px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
  props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


export default function Wishlist() {

const cart=useSelector(state=>state.cart.wishlist)
const dispatch=useDispatch()
const navigate=useNavigate()


const handleDelete=(index)=>{
  dispatch(removeFromWishlist(index))
}
const handleClick=(color,size,id)=>{
  navigate(`/product/${id}`,{
    state:{
      color:color,
      size:size,
    }
  })
}
const handleRemove=()=>{
  dispatch(clearWishlist())
}
const favQuantity=useSelector(state=>state.cart.favQuantity)


  return (
    <div>
      <Empty>
        <WishList>YOUR WISH LIST ({favQuantity})</WishList>
        <TopButton  onClick={handleRemove}>CLEAR WISHLIST</TopButton>
        {cart?.length===0?<><Title>Your list is empty</Title>
        <Parag>Start adding products :)</Parag></>:
        <Container>
          {cart&&cart.map((product,i)=>(
            <div key={product._id}  style={{flexDirection:'column'}}>
            <Wrapper>
            <Image onClick={()=>handleClick(product.color,product.size,product._id)} src={product.image}/>

            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>${product.price}</ProductPrice>
            </Wrapper>
            <div style={{marginTop:5}}>
            <DeleteOutlineOutlinedIcon onClick={()=>handleDelete(i)}/>
            </div>
            </div>
          ))}
        </Container>
        }
      </Empty>
    </div>
  )
}
