import React, { useEffect, useState } from "react";
// import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { recover } from "../redux/apiCalls";
import UpdatePassword from "./UpdatePassword";
import { useDispatch } from "react-redux";


const EmailBox=styled.div`
  width:40%;
  height:350px;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background-color:#fff;
  border-radius:10px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  z-index:10;
  padding:15px;
  @media screen and (max-width:1024px) {
    width:70%;
  }
  @media screen and (max-width:485px) {
    width:80%;
  }
`
const ButtonClose=styled.button`
  border:none;
  width:30px;
  height:30px;
  border-radius:50%;
  background-color:#f3f3f3;
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  right:15px;
  top:15px;
`
const ButtonArrow=styled.button`
    border:none;
    background-color:#fff;
    position:absolute;
    left:15px;
    top:25px;
`
const Title=styled.h2`
  text-align:center;
  margin-top:25px;
  font-family: 'Roboto Condensed', sans-serif;
`
const Parag=styled.p`
  text-align:center;
  margin-top:25px;
  font-family: 'Roboto Condensed', sans-serif;
`
const Input=styled.input`
  width:200px;
  height:40px;
  border-radius:5px;
  border:1px solid #d3cbcb;
  margin-top:25px;
  font-family: 'Roboto Condensed', sans-serif;
`
const Button=styled.button`
   width:200px;
   height:40px;
   border-radius:5px;
   background-color:teal;
   font-family: 'Roboto Condensed', sans-serif;
   margin-top:25px;
   border:none;
   color:#fff;
   font-size:17px;
`

const Home = () => {
  const loc=useLocation()
  const[sendemail,setSendemail]=useState(loc.state?.updatePassword)
  const nav=useNavigate()
  const closeIconClick=()=>{
    setSendemail(false)
  }
  const backArrowClick=()=>{
    nav("/login")
  }
  const[email,setEmail]=useState('')
  const handleChange=(e)=>{
    setEmail(e.target.value)
  }
  const dispatch=useDispatch();
  const sendPasswordOnEmail=()=>{
    recover(dispatch,email,setSendemail)
  }
  
  return (
    <div>
      <Slider/>
      <Categories/>
      <Newsletter/>
     {sendemail&& <EmailBox>
        <ButtonArrow onClick={backArrowClick}>
          <ArrowBackIcon/>
        </ButtonArrow>
        <ButtonClose onClick={closeIconClick}>
          <CloseIcon style={{fontSize:15}}/>
        </ButtonClose>
        <Title>Forgot your password?</Title>
        <Parag>Please enter your email address to reset your password</Parag>
        <Input name='email' onChange={(e)=>handleChange(e)} type="email" placeholder='Email'/>
        <Button onClick={sendPasswordOnEmail}>Send</Button>
      </EmailBox>}
    </div>
  );
};

export default Home;