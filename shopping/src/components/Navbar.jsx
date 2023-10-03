import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import {Badge} from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../responsive";
import MenuIcon from '@mui/icons-material/Menu';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link } from "react-router-dom";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
import {useSelector} from 'react-redux'


const Container = styled.div`
  height: 60px;
  ${mobile({height:'50px'})}
  padding: 10px 0;
  width:91%;
  margin:0 auto;
  @media screen and (max-width:768px) {
    flex-direction:column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding:'10px 0px' })};
  @media screen and (max-width:837px) {
    width:100%;
    margin:0 auto;
  }
`;

const Left = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  width:100px;
  @media screen and (max-width:400px) {
    width:50px;
  }
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-left:3px;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  justify-content:center;
  width:50%;
  height:30px;
  transition:0.5s;
  margin:0 auto;
  margin-top:60px;
`;

const Input = styled.input`
  border: none;
  width:100%;
  height:100%;
`;
const SearchButton=styled.div`
  font-size:22px;
`
const SearchOverlay=styled.div`
  width:100%;
  height:100vh;
  position:absolute;
  display:flex;
  justify-content: center;
  left:0;
  top:0;
  background-color: #000;
  opacity:50%;
  transform: ${({ searchbutton }) => (searchbutton ? 'translateY(0)' : 'translateY(-300vw)')};
  transition:0.57s linear;
  z-index: 27;
  padding-top:30px;

`
const BackArrow=styled.div`
  margin-left:10px;
  color:#fff;
  margin-top:60px;
  font-weight:lighter;
`

const Center = styled.div`
  text-align: center;
  @media screen and (max-width:837px) {
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize:22})}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({justifyContent:'center'})};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:${({ type }) => (type==='user'?'0px':'25px')};
  display:${({type})=>(type==='user'&&'none')};
  @media screen and (max-width:837px) {
    display:${({ type }) => (type==='account'?'none':type==='user'?'block':'')};
  }
  @media screen and (max-width:485px) {
    font-size:12px;
  }
  @media screen and (max-width:400px) {
    margin-left:5px;
  }
`;
const BurgerLogo=styled.h1`
  text-align:center;
  font-size:25px;
`

const LeftBurger=styled.div`
  display:flex;
  justify-content:space-between;
  width:90%;
  align-items: baseline;

`
const Burger=styled.div`
  display:none;
  @media screen and (max-width:768px) {
    display:block;
    transition:0.5s;
  }
  @media screen and (max-width:400px) {
    position:absolute;
    top:60px;
    z-index:1;
  }
`
const Burgerbar=styled.div`  
  display:none;
  z-index:2;
  @media screen and (max-width:768px) {
    transform: ${({ open }) => (open ? 'translateX(-200vw)' : 'translateX(0)')};
    max-width:250px;
    width:100%;
    height:100vh;
    background-color:#f5fbfd;
    padding-left:15px;
    padding-top:15px;
    display:flex;
    transition:0.5s linear;
    position:absolute;
    top:0;
    left:0;
  }
`
const Overlay=styled.div`
@media screen and (max-width:768px) {
  width:100%;
  height:100vh;
}
`
const RemoveButton=styled.div`
  
`
const Navbar = () => {
  const quantity=useSelector(state=>state.cart.quantity)

  const[state,setState]=useState(false)
  const handleRemove=()=>{
    setState(!state)
  }
  const handleClick=()=>{
    setState(!state)
  }
  const[search,setSearch]=useState(false)
  const onSearchClick=()=>{
    setSearch(true)
  }
  const onBackClick=()=>{
    setSearch(false)
  }
  const loginUser = useSelector((state) => state.user.currentUser);

  return (
    <Overlay >
    <Container>
      <Wrapper>
        <Burgerbar open={state}>
        <LeftBurger>
        <RemoveButton open={state} onClick={handleRemove}>
              <ClearOutlinedIcon/> 
          </RemoveButton>
          <BurgerLogo>CORAL.</BurgerLogo>
        </LeftBurger>
        </Burgerbar>
        <Left>
          <Language>EN</Language>
          <SearchOverlay searchbutton={search}>
            <BackArrow onClick={onBackClick}>
               <ArrowBackOutlinedIcon style={{fontSize:30}}/>
            </BackArrow>
          <SearchContainer input={search}>
            <Input input={search}  placeholder="Search" />
            <SearchButton >
             <SearchIcon  onClick={onSearchClick} style={{ color: "gray", fontSize: 25}} />
          </SearchButton>
          </SearchContainer>
          </SearchOverlay>
          <SearchButton >
             <SearchIcon  onClick={onSearchClick} style={{ color: "gray", fontSize: 25 }} />
          </SearchButton>
        </Left>
        <Center>
          <Logo>CORAL.</Logo>
        </Center>
        <Right>
          <MenuItem type='account'>
            <Link to="/register">
              REGISTER
            </Link>
          </MenuItem>
          <MenuItem type='account'>
            <Link to={loginUser?.username?`/userprofile/${loginUser?._id}`:"/login"}>
            {loginUser?loginUser?.username:"SIGNIN"}
            </Link>
          </MenuItem>
          <MenuItem type='user'>   
            <PersonOutlineOutlinedIcon/>      
          </MenuItem>
          <MenuItem type='heart'>
            < FavoriteBorderOutlinedIcon/>
          </MenuItem>
          <Link to={'/cart'}>
          <MenuItem type='carts'>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon/>
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      <Burger  open={state} onClick={handleClick}>
           <MenuIcon />
        </Burger>
    </Container>
    </Overlay>
  );
};

export default Navbar;