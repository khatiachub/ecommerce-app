import styled from "styled-components";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";
import { useState } from "react";



const Container = styled.div`
   width:95%;
   margin:0 auto;
   margin-top:50px;
   padding-bottom:100px;
`;

const Title = styled.h3`
  margin-top: 20px;
  font-family: 'Roboto Condensed', sans-serif;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin:0 auto;
  margin-top:20px;
`;

const Filter = styled.div`
  @media screen and (max-width:736px) {
    display:flex;
    flex-direction:column; 
  }

`;

const FilterText = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-right: 20px;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Select = styled.select`
  padding: 10px;
  margin-top:10px;
  margin-left:${(props) => props.name === "size" && "20px"};
  @media screen and (max-width:736px) {
    margin-left:${(props) => props.name === "size" && "0px"};
  }
  @media screen and (max-width:360px) {
    width:100px;
  }

`;
const Option = styled.option`
  font-family: 'Roboto Condensed', sans-serif;

`;

const ProductList = () => {
  const location=useLocation();
  const cat=location.pathname.split("/")[2]
  const[filters,setFilters]=useState('')
  const[sort,setSort]=useState("Newest")
  const handleFilter=(e)=>{
    setFilters({
      ...filters,
      [e.target.name]:e.target.value
    })
  }

  return (
    <Container>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select  name='color' onChange={(e)=>handleFilter(e)}>
            <Option  >
              COLOR
            </Option>
            <Option>WHITE</Option>
            <Option>BEIGE</Option>
            <Option>BLACK</Option>
            <Option>RED</Option>
            <Option>BLUE</Option>
            <Option>LIGHTBLUE</Option>
            <Option>GREEN</Option>
            <Option>GREY</Option>
            <Option>DARK GREY</Option>
            <Option>BROWN</Option>
            <Option>PINK</Option>
            <Option>GOLD</Option>
            <Option>DARKRED</Option>
            <Option>TAN</Option>

          </Select>
          <Select name='size' onChange={handleFilter} >
            <Option  >
              SIZE
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=>setSort(e.target.value)}>
            <Option value='newest'>Newest</Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort}/>
    </Container>
  );
};

export default ProductList;