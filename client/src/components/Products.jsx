import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width:100%;
    margin:0 auto;
    margin-top:40px;
`;


const Products = ({cat,filters,sort}) => {
  const[products,setProducts]=useState([]);
  const[filteredproducts,setFilteredProducts]=useState([])
useEffect(()=>{
  const getProducts=async()=>{
    try{
      const res=await axios.get(`https://ecommerce-1k48jdnrz-khatia-chubinidzes-projects.vercel.app/api/products/?category=${cat}`)
      setProducts(res.data);
    }catch(err){ }
  }
  getProducts();
},[cat])


useEffect(() => {
  cat &&
    setFilteredProducts(
      products
        .map((item) => {
          const filteredImages = item.img.filter((image) => (
            Object.entries(filters).every(([key, value]) =>
            image[key].includes(value)
          )
          ));
          
          return { _id: item._id, images: filteredImages,price:item.price,createdAt:item.createdAt,updatedAt:item.updatedAt };
        })
    );
}, [products, cat, filters]);


useEffect(()=>{
  if(sort==="Newest"){
      setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.createdAt-b.createdAt)
    )
      setProducts((prev)=>
      [...prev].sort((a,b)=>a.createdAt-b.createdAt)
    )
    
  }else if(sort==="asc"){
      setFilteredProducts((prev)=>
      [...prev].sort((a,b)=>a.price-b.price)
      )
      setProducts((prev)=>
      [...prev].sort((a,b)=>a.price-b.price)
    )
    
  }else{
      setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>b.price-a.price)
    )
      setProducts((prev)=>
    [...prev].sort((a,b)=>b.price-a.price)
  )
    }
},[sort])
  return (
    <Container>
      {filters?filteredproducts&&filteredproducts.map((item)=>{
        return(
          <div key={item._id}>
          {item.images&&item.images.map((image,i)=>(
            <Product size={image.size}   color={image.color} productImg={image} item={item}  key={i} />
          ))}
          </div>
        )
      }):products.map((item,i)=>(
        item.img.map((image,i)=>(
          <>
          <Product  size={image.size}  color={image.color} productImg={image} item={item} key={i} />
          </>
        ))
      ))}
    </Container>
  );
  }

export default Products;