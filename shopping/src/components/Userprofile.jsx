import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userRedux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Register from '../pages/Register';
import { publicRequest } from '../requestMethods';
import axios from 'axios';
// import { Delete, update } from '../redux/apiCalls';

import jwtDecode from 'jwt-decode';


const UserDiv=styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;
`

const UserBox=styled.div`
  width:400px;
  display:flex;
  flex-direction:column;
  background-color:pink;
  justify-content: center;
  align-items: center;
  margin-top:10%;
  height:200px;

`
const UserName=styled.p`
  margin-top:15px;
  font-size:20px;
  font-weight:400;
   
`
const Button=styled.button`
  width:120px;
  height: 40px;
  background-color:pink;
  border:none;
  margin-top:20px;
  border-radius:5px;

`
// const LastName=styled.h3`
    
// `
// const Email=styled.h3`
    
// `
// const PhoneNumber=styled.h3`
    
// `
// const Address=styled.h3`
    
// `
// const City=styled.h3`
    
// `
const UserImg=styled.img`
    
`
const Input=styled.input`
  
`
export default function Userprofile() {
    const loginUser = useSelector((state) => state.user.currentUser);
    const token = loginUser.accessToken;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);



    const {id}=useParams()
    console.log(id);
    const dispatch=useDispatch()
    const nav=useNavigate()
    const handleClick=()=>{
        dispatch(loginSuccess(loginUser.username==="",loginUser.password===""),nav("/"))
    }
    console.log(loginUser.accessToken);
    const handleDelete=(id)=>{
      // Delete(id,loginUser.accessToken,nav("/"))
    }

    const[user,setUser]=useState({
      name:'',
      lastname:'',
      // username:'',
      // email:'',
      // password:'',
      // confirmpassword:'',
      // address:'',
      // city:'',
      // phonenumber:null
    })
const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmY0MjMwZGNkYWY3NjQ1MzE1ZWE1MyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTYzNjA2NzUsImV4cCI6MTY5NjYxOTg3NX0.5IOpJBfh9gF_jftjDWy84TXbDMZ2q5pdCQDrX_ixj0k"
    useEffect(()=>{
      axios.get("http://localhost:5001/api/users/find/"+id,{
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        }
      })
      .then(res=>{
        setUser({...user,name:res.data.name,lastname:res.data.lastname})
      })
      .catch(err =>console.log(err))
    },[])



    const handleUpdate=()=>{
      // update(dispatch,id,user,nav("/"),loginUser.accessToken)
      // axios.put("http://localhost:5000/api/users/"+id,{user},{
        // headers: {
        //   Authorization: `Bearer ${loginUser.accessToken}`,
        // },
      // })
      // .then(res=>{
      //   if(res.data.updated){
      //     setValues(res.data.data)
      //     nav("/")
      //   }else{
      //     console.log("erooooooor");
      //   }
      // })
    }
    const handleChange=(e)=>{
      const name=e.target.name
      const value=e.target.value
      setUser({...user,[name]:value})
    }
  return (
    <UserDiv >
        <UserBox>
          {/* <Input name='name' value={user.name} onChange={(e)=>handleChange(e)} placeholder="name" />
          <Input name='lastname' value={user.lastname} onChange={(e)=>handleChange(e)}  placeholder="last name" />
          <Input name='username'   value={user.username} onChange={(e)=>handleChange(e)}  placeholder="username" />
          <Input name='email'  value={user.email} onChange={(e)=>handleChange(e)}  placeholder="email" />
          <Input name='password'  value={user.password} onChange={(e)=>handleChange(e)}  placeholder="password" />
          <Input name='confirmpassword'  value={user.confirmpassword} onChange={(e)=>handleChange(e)}  placeholder="confirm password" />
          <Input name='city'  value={user.city} onChange={(e)=>handleChange(e)}  placeholder="city" />
          <Input name='address'  value={user.address} onChange={(e)=>handleChange(e)}  placeholder="your address" />
          <Input name='phonenumber'  value={user.phonenumber} onChange={(e)=>handleChange(e)}  placeholder="phonenumber" /> */}
          <input name='name' type="text" value={user.name}/>
          <input name='lastname' type="text" value={user.lastname}/>
        </UserBox>
        <Button onClick={handleClick}>Logout</Button>
        <Button onClick={handleDelete(loginUser._id)}>Delete account</Button>
        <Button onClick={handleUpdate}>Update</Button>
    </UserDiv>
  )
}
