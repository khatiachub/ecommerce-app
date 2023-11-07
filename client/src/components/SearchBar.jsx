import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Product from './Product';


const SearchContainer=styled.div`
    width:95%;
    min-height:100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin:0 auto;
    padding-bottom:20vh;
`
const SearchBox=styled.div`
  
`
export default function SearchBar() {
const[products,setProducts]=useState([])

const location=useLocation();
  const value=location.state?.search
  
 useEffect(()=>{
        const getProducts=async()=>{
          try{
            const res=await axios.get("https://ecommerce-1k48jdnrz-khatia-chubinidzes-projects.vercel.app/api/products/")
            setProducts(res.data);
          }catch(err){ }
        }
        getProducts();
},[value])


const [product,setProduct]=useState([])
useEffect(()=>{
    setProduct(products&&products.filter((product)=>(product.categories[0].toLowerCase().includes(value.toLowerCase()))))
},[value])

  return (
    <SearchContainer >
     {value&&product&&product.map((item)=>{
        return(
          // <SearchBox  key={item._id}>
          <>
          {item.img&&item.img.map((image,i)=>(
            <Product  size={image.size}   color={image.color} productImg={image} item={item}  key={i} />
          ))}
          </>
          // </SearchBox>
        )
      })}  
    </SearchContainer>
  )
}
