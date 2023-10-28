import styled from "styled-components";
import Products from "../components/Products";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const Container = styled.div`
   width:95%;
   margin:0 auto;
   margin-top:80px;
`;

const Title = styled.h3`
  margin-top: 20px;
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
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
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
const Option = styled.option``;

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
            <Option>BLACK</Option>
            <Option>RED</Option>
            <Option>BLUE</Option>
            <Option>YELLOW</Option>
            <Option>GREEN</Option>
            <Option>GREY</Option>
            <Option>DARK GREY</Option>
            <Option>BROWN</Option>
            <Option>PINK</Option>
            <Option>GOLD</Option>
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