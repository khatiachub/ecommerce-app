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

// ygqn gvpd bdsk wjoj

const Products = ({cat,filters,sort}) => {
  const[products,setProducts]=useState([]);
  const[filteredproducts,setFilteredProducts]=useState([])
useEffect(()=>{
  const getProducts=async()=>{
    try{
      const res=await axios.get(`http://localhost:5002/api/products?category=${cat}`)
      setProducts(res.data);
      console.log(res.data);
    }catch(err){ }
  }
  getProducts();
},[cat])



useEffect(() => {
  cat &&
    setFilteredProducts(
      products
        .map((item) => {
          const filteredImages = item.img.filter((image) => {
            
          });
          
          return { _id: item._id, images: filteredImages,price:item.price,createdAt:item.createdAt,updatedAt:item.updatedAt };
        })
    );
}, [products, cat, filters]);


useEffect(()=>{
  if(sort==="Newest"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.createdAt-b.createdAt)

    )
  }else if(sort==="asc"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.price-b.price)
    )
  }else{
    if(filters){
      setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>b.price-a.price)
    )
    }else{
      setProducts((prev)=>
    [...prev].sort((a,b)=>b.price-a.price)
  )
    }
    }
},[sort])
console.log(filteredproducts);
  return (
    <Container>
      {filters?filteredproducts.map((item)=>{
        return(
          <div key={item._id}>
          {item.images.map((image,i)=>(
            <Product color={image.color} image={image} item={item}  key={i} />
          ))}
          </div>
        )
      }):products.map((item,i)=>(
        item.img.map((image,i)=>(
          <>
          {image.color}

          <Product color={image.color} image={image} item={item} key={i} />
          </>
        ))
      ))}
    </Container>
  );
  }

export default Products;