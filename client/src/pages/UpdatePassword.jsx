import React, { useEffect, useState } from 'react'
import { publicRequest } from '../requestMethods';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { update } from '../redux/apiCalls';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginSuccess } from '../redux/userRedux';



const Container=styled.div`
  height:600px;
  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const Input=styled.input`
  outline:none;
  border:1px solid #7e7878;
  width:250px;
  height:30px;
  border-radius:7px;
  margin-top:20px;
`
const Button=styled.button`
  width:250px;
  border:none;
  height:30px;
  background-color:teal;
  color:#fff;
  margin-top:20px;
  font-family: 'Roboto Condensed', sans-serif;
`

export default function UpdatePassword() {
  const dispatch=useDispatch();
  const[user,setUser]=useState({
    password:'',
    confirmPassword:''
  })
 

  const TOKEN = useSelector((state) => state.user?.currentUser?.accessToken);
  // const id = useSelector((state) => state.user?.currentUser?.userId);
  const params=useParams();
  const id=params.id
console.log(id);
  
  const UpdateInfo = () => {
    const recoverPassword = async () => {
      try {
        const res = await axios({
          method: 'put', // Use the appropriate HTTP method (put, post, get, etc.)
          url: `https://ecommerce-app-six-rose.vercel.app/api/users/${id}`,
          data: user,
          headers: { token: `Bearer ${TOKEN}`}
        });
  
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          // window.location.reload()
        }
  
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    recoverPassword();
  };
  


  const handleChange=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setUser({...user,[name]:value})  }
  return (
    <Container>
      <Input type='password' name='password' onChange={(e)=>handleChange(e)} placeholder='Enter new password'/>
      <Input type='password' name='confirmpassword' onChange={(e)=>handleChange(e)} placeholder='Confirm password'/>
      <Button onClick={UpdateInfo}>change</Button>
    </Container>
  )
}
