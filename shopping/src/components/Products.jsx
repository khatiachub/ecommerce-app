import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { useEffect, useState } from "react";
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
      const res=await axios.get(`http://localhost:5001/api/products?category=${cat}`)
      setProducts(res.data);
    }catch(err){ }
  }
  getProducts();
},[cat])

useEffect(() => {
  cat &&
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          item[key].includes(value)
        )
      )
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
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>b.price-a.price)
  )}
},[sort])
  return (
    <Container>
      {filteredproducts.map((item) => <Product item={item} key={item.id} />)}
    </Container>
    
  );
  }

export default Products;