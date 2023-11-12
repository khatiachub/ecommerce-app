import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import styled from 'styled-components'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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
    width:76%;
    margin:0 auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:60px;

  `
  const Links=styled(Link)`
      color:#fff;
      display:flex;
      justify-content:center;
      align-items:center;
      &:hover{
        color:teal;
        background-color:#fff;
        border-radius:5px;
        transition:0.5s;
      }
  `

export default function Root() {
  const loginUser = useSelector((state) => state.user.currentUser);
  const quantity=useSelector(state=>state.cart.quantity)
  const favQuantity=useSelector(state=>state.cart.favQuantity)
  const loc=useLocation()
 
  
  return (
    <div style={{  overflowAnchor: "none "   }}>
      {/* {loc.pathname==='/users/:id/verify/:token'?'':<Navbar/>} */}
      <Navbar/>
      <Outlet/>
      <NavigateBar>
        <Nav>
          <Links to='/'>
          <HomeOutlinedIcon style={{ fontSize:34}}/>
          </Links>
          <Links  to={'/cart'}>
          {quantity > 0 ? (
          <Badge badgeContent={quantity} color='primary'>
                <ShoppingBagOutlinedIcon style={{fontSize:30}} />
          </Badge>
          ) : (
          <ShoppingBagOutlinedIcon style={{ fontSize:30}} />
           )}
          </Links>
            <Links  to={loginUser?.username?`/userprofile/${loginUser?._id}`:"/login"}>
                <PersonOutlineOutlinedIcon style={{ fontSize:30}}/>      
            </Links>
            <Links  to={'/wishlist'}>
            {favQuantity > 0 ? (
            <Badge badgeContent={favQuantity} color='primary'>
               <FavoriteBorderOutlinedIcon style={{  fontSize:30}}/>
            </Badge>
             ) : (
              <FavoriteBorderOutlinedIcon style={{ fontSize:30}}/>
              )}
            </Links>
        </Nav>
      </NavigateBar>
      {/* {loc.pathname==='/users/:id/verify/:token'?'':<Footer/>} */}
      <Footer/>
    </div>
  )
}
