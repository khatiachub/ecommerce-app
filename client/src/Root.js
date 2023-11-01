import React from 'react'
import Navbar from './components/Navbar'
import { Link, Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import styled from 'styled-components'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useSelector } from 'react-redux'
import {Badge} from "@mui/material"


const NavigateBar=styled.div`
     width:100%;
     height:60px;
     background-color: teal;
     position:fixed;
     z-index:100;
     bottom:0;
     left:0;
     display:none;
     @media screen and (max-width:485px) {
      display:block;
  }
  `
  const Nav=styled.div`
    width:80%;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
    /* background-color:red; */
    height:60px;

  `
  const Links=styled(Link)`
      color:#fff;
      display:flex;
      justify-content:color-interpolation-filters;
      align-items:center;
      &:hover{
        color:teal;
        background-color:#fff;
        border-radius:5px;
        transition:0.5s;
      }
  `
  const Language = styled.option`
      font-size: 14px;
      cursor: pointer;
      margin-left:3px;
`;
  const Select=styled.select`
      border-radius:50%;
      color:#fff;
      background-color: teal;
      border:1px solid #fff;
      padding:3px;
      height:30px;
      margin-bottom:4px;
  `
export default function Root() {
  const loginUser = useSelector((state) => state.user.currentUser);
  const quantity=useSelector(state=>state.cart.quantity)
  const favQuantity=useSelector(state=>state.cart.favQuantity)

  
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <NavigateBar>
        <Nav>
          <Links to='/'>
          <HomeOutlinedIcon style={{ marginBottom: 3 ,fontSize:30}}/>
          </Links>
          <Links  to={'/cart'}>
          {quantity > 0 ? (
          <Badge badgeContent={quantity} color='primary'>
                <ShoppingBagOutlinedIcon style={{ marginBottom: 3 ,fontSize:30}} />
          </Badge>
          ) : (
          <ShoppingBagOutlinedIcon style={{ marginBottom: 3,fontSize:30}} />
           )}
          </Links>
            <Links  to={loginUser?.username?`/userprofile/${loginUser?._id}`:"/login"}>
                <PersonOutlineOutlinedIcon style={{ marginBottom: 3 ,fontSize:30}}/>      
            </Links>
            <Links  to={'/wishlist'}>
            {favQuantity > 0 ? (
            <Badge badgeContent={favQuantity} color='primary'>
               <FavoriteBorderOutlinedIcon />
            </Badge>
             ) : (
              <FavoriteBorderOutlinedIcon style={{ marginBottom: 3 ,fontSize:30}}/>
              )}
            </Links>
            
             <Select>
                 <Language>EN</Language>
                 <Language>GE</Language>
            </Select>
        </Nav>

      </NavigateBar>
      <Footer/>
    </div>
  )
}
