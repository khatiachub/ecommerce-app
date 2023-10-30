import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import {Badge} from "@mui/material"
import { mobile } from "../responsive";
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import Announcement from "./Announcement";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Container = styled.div`
  height: 60px;
  padding-top:30px;
  width:95%;
  margin:0 auto;
  @media screen and (max-width:768px) {
    flex-direction:column;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width:837px) {
    width:100%;
    margin:0 auto;
  }
  @media screen and (max-width:485px) {
    align-items:center;
  }
`;

const Left = styled.div`
  display: flex;
  align-items:center;
  justify-content:space-between;
  @media screen and (max-width:768px) {
    flex-direction:column;
    justify-content:flex-start;
    align-items:self-start;
  }`;

// const Language = styled.option`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left:3px;
// `;

const SearchContainer = styled.div`
  border: 0.5px solid #fff;
  display: flex;
  align-items: center;
  justify-content:center;
  width:60%;
  height:35px;
  transition:0.5s;
  margin:0 auto;
  margin-top:60px;
  border-radius:36px;
  padding-right:10px;
`;

const Input = styled.input`
  border: none;
  width:100%;
  height:100%;
  border-radius:36px;


`;
const SearchButton=styled.div`
  display:none;
  @media screen and (max-width:768px) {
    display:block;
    font-size:20px;
    margin-top:5px;
  }
`
const SearchButtonLight=styled.div`
  font-size:22px;
`
const SearchOverlay=styled.div`
  width:100%;
  height:100vh;
  position:fixed;
  display:flex;
  justify-content: center;
  left:0;
  top:0;
  background-color: #000;
  opacity:90%;
  transform: ${({ searchbutton }) => (searchbutton ? 'translateY(0)' : 'translateY(-400vw)')};
  transition:0.7s linear;
  z-index: 27;
  padding-top:50px;

`
const BackArrow=styled.div`
  margin-left:10px;
  color:#fff;
  margin-top:60px;
  font-weight:lighter;
`


const Logo = styled.h1`
font-family: 'Roboto Condensed', sans-serif;
  color:teal;
  ${mobile({fontSize:22})}
  @media screen and (max-width:768px) {
    font-size:44px;
  }
  @media screen and (max-width:485px) {
    font-size:30px;
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:25px;
  display:${({type})=>(type==='user'&&'none')};
  @media screen and (max-width:837px) {
    display:${({ type }) => (type==='account'?'none':type==='user'?'block':'')};
  }
  @media screen and (max-width:485px) {
    font-size:12px;
    margin-left:18px;
    display:none;
  }
`;
const UserLink=styled(Link)`
  color:teal;
  font-family: 'Roboto', sans-serif;
  position: relative;
  &::before{
    content: "";
    height:1px;
    background-color:#000;
    position:absolute;
    top:20px;
    left:0px;
    width:0px;;
  }
  &:hover&::before{
    transition:0.5s;
    width:100%;
  }
`


const Overlay=styled.div`
width:100%;
/* @media screen and (max-width:768px) {
  width:100%;
  height:100vh;
} */
`

const Search=styled.div`
  display:flex;
  border-radius:36px;
  height:40px;
  width:100%;
  background-color:teal;
  border:1px solid teal;
  @media screen and (max-width:768px) {
    display:none;
  }
`
const InputSearchButton=styled.div`
   margin-right:10px;
   margin-top:7px;
   color:#fff;
`
const InputSearch=styled.input`
  width:100%;
  background-color:#fff;
  border-radius:36px;
  border:1px solid teal;
  padding:3px;
`
const LinkItem=styled(Link)`
  width:30px;
  height:30px;
  display:flex;
  color:teal;
  justify-content:center;
  align-items:center;
  &:hover{
    background-color:teal;
    transition:0.5s;
    color:#fff;
    border-radius:5px;
  }
`

const Navbar = () => {
  const quantity=useSelector(state=>state.cart.quantity)
  const favQuantity=useSelector(state=>state.cart.favQuantity)

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
      <Announcement/>
    <Container>
      <Wrapper>
        <Left>
        <Link  to='/'>
           <Logo>CORAL.</Logo>
        </Link>
        </Left>
          {/* <select>
          <Language>EN</Language>
          <Language>GE</Language>
          </select> */}
          <SearchOverlay searchbutton={search}>
            <BackArrow onClick={onBackClick}>
               <ArrowBackOutlinedIcon style={{fontSize:30}}/>
            </BackArrow>
          <SearchContainer >
            <Input  placeholder="Search" />
            <SearchButtonLight >
             <SearchIcon  onClick={onSearchClick} style={{ color: "#fff", fontSize: 25,marginTop:3,marginLeft:3}} />
             </SearchButtonLight>
          </SearchContainer>
          </SearchOverlay>
          
          <Right >
          <Search onClick={onSearchClick}>
            <InputSearch  placeholder="Search" />
            <InputSearchButton >
             <SearchIcon />
             </InputSearchButton>
          </Search>
        <SearchButton >
             <i onClick={onSearchClick}   class="fa-solid fa-magnifying-glass"></i>
          </SearchButton>
          <MenuItem  type='account'>
            <UserLink  to="/register">
              REGISTER
            </UserLink>
          </MenuItem>
          <MenuItem type='account'>
            <UserLink   to={loginUser?.username?`/userprofile/${loginUser?._id}`:"/login"}>
            {loginUser?loginUser?.username:"SIGNIN"}
            </UserLink>
          </MenuItem>
          <MenuItem  type='user'>   
          <LinkItem type='user'  to={loginUser?.username?`/userprofile/${loginUser?._id}`:"/login"}>
          <PersonOutlineOutlinedIcon />      
          </LinkItem>
          </MenuItem>
          <MenuItem type='heart'>
            <LinkItem   to={'/wishlist'}>
            {favQuantity > 0 ? (
            <Badge badgeContent={favQuantity} color='primary'>
               <FavoriteBorderOutlinedIcon />
            </Badge>
             ) : (
              <FavoriteBorderOutlinedIcon />
              )}
            </LinkItem>
          </MenuItem>
          <MenuItem style={{paddingRight:`${quantity>0?'10px':'0px'}`}} type='carts'>
          <LinkItem   to={'/cart'}>
          {quantity > 0 ? (
          <Badge badgeContent={quantity} color='primary'>
                <ShoppingBagOutlinedIcon style={{ marginBottom: 2}} />
          </Badge>
          ) : (
          <ShoppingBagOutlinedIcon style={{ marginBottom: 2 }} />
           )}
          </LinkItem>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
    </Overlay>
  );
};

export default Navbar;