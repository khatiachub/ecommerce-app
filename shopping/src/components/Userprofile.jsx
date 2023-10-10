import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userRedux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Register from '../pages/Register';
import { publicRequest, userRequest } from '../requestMethods';
import axios from 'axios';
import { Delete, update,DeleteImage} from '../redux/apiCalls';
import Navbar from './Navbar'
import avatar from '../images/avatar.png'

const UserDiv=styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  flex-direction:column;
`

const UserBox=styled.form`
  width:50%;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  /* margin-top:50px; */

`
const UserName=styled.p`
  margin-top:15px;
  font-size:20px;
  font-weight:400;
   
`
const Button = styled.button`
  width: 150px;
  height:50px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  @media screen and (max-width:568px) {
    width:50%;
  }
`;
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
  border:none;
  border-bottom:1px solid grey;
  margin-top:10px;
`
const Title=styled.h2`
  font-size:22px;
  margin-top:30px;
`
const Label=styled.label`
  font-size:13px;
`
const Img=styled.img`
  border-radius:50%;
  width:260px;
  height:260px;
  margin-top:20px;
  object-fit:contain;
`
export default function Userprofile() {
    const loginUser = useSelector((state) => state.user?.currentUser);
    const {id}=useParams()
    const dispatch=useDispatch()
    const nav=useNavigate()
    const handleClick=()=>{
        dispatch(loginSuccess(loginUser.username==="",loginUser.password===""),nav("/"))
    }
    const handleDelete=(e)=>{
      e.preventDefault();
      Delete(id,nav("/"))
      dispatch(loginSuccess(loginUser.username==="",loginUser.password===""))
    }


    const[user,setUser]=useState({
      name:'',
      lastname:'',
      username:'',
      email:'',
      address:'',
      city:'',
      phonenumber:null,
      image:''
    })
    // const[image,setImage]=useState('')


    const[isLoading,setIsLoading]=useState(true)
    const handleUpdate=()=>{
      update(dispatch,id,user)
    }
   
    useEffect(() => {
      async function fetchData(){
        try{
        const response=await userRequest.get(`users/find/${loginUser._id}`)
        setUser(response?.data);

        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    },[]); 


    const handleChange=(e)=>{
      const name=e.target.name
      const value=e.target.value
      setUser({...user,[name]:value})
    }
    const ref=useRef(null)
    const onImageClick=()=>{
      ref.current.click();
    }
    const handleImageChange=(e)=>{
      var reader=new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload=()=>{
        console.log(reader.result);
        setUser({...user,image:reader.result})
      }
    }
    const deleteImage=()=>{
      DeleteImage(id)
    }
    
  return (
    <>
    <Navbar/>
    <UserDiv>
      <Img onClick={onImageClick} src={user?.image?user?.image:avatar}/>
      <Button onClick={deleteImage}>delete profile picture</Button>
      <input style={{display:"none"}} ref={ref} type='file' onChange={handleImageChange}/>
      <div style={{display:"flex",width:"100%",justifyContent:"end",alignItems:"baseline"}}>
              <Button style={{marginRight:15}} onClick={handleClick}>Logout</Button>
              <Button  onClick={(e)=>handleDelete(e)}>Delete account</Button>
      </div>
        <UserBox >
          <div style={{display:"flex",width:"100%",justifyContent:"space-between",alignItems:"baseline"}} >
              <Title>YOUR PERSONAL DETAILS</Title>
          </div>
          <div style={{display:"flex", width:"100%", justifyContent:'space-between'}}>
          <div style={{display:"flex", flexDirection:"column", width:"45%", marginTop:"25px"}}>
          <Label>Name</Label>
          <Input name='name' 
          value={user.name} 
          onChange={(e)=>handleChange(e)} placeholder="name" /></div>
          <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
          <Label>Surname</Label>
          <Input name='lastname' 
          value={user.lastname} 
          onChange={(e)=>handleChange(e)}  placeholder="last name" /></div>
          </div>
          <div style={{display:"flex",  width:"100%", justifyContent:'space-between'}}>
          <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
          <Label>Username</Label>
          <Input name='username'   
          value={user.username} 
          onChange={(e)=>handleChange(e)}  placeholder="username" /></div>
           <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
           <Label>Email</Label>
          <Input name='email'  
          value={user.email} 
          onChange={(e)=>handleChange(e)}  placeholder="email" /></div></div>
          <div style={{display:"flex",  width:"100%", justifyContent:'space-between'}}>
          {/* <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
          <Label>Password</Label>
          <Input name='password'  
          value={user.password} 
          onChange={(e)=>handleChange(e)}  placeholder="password" /></div> */}
           {/* <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
           <Label>Confirm password</Label>
          <Input name='confirmpassword'  
          value={user.confirmpassword} 
          onChange={(e)=>handleChange(e)}  placeholder="confirm password" /></div> */}
          </div>
          <div style={{display:"flex", width:"100%", justifyContent:'space-between'}}>
          <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
          <Label>City</Label>
          <Input name='city'  
          value={user.city} 
          onChange={(e)=>handleChange(e)}  placeholder="city" /></div>
           <div style={{display:"flex", flexDirection:"column", width:"45%",marginTop:"25px"}}>
           <Label>Address</Label>
          <Input name='address'  
          value={user.address} 
          onChange={(e)=>handleChange(e)}  placeholder="your address" /></div></div>
           <div style={{display:"flex", flexDirection:"column", width:"100%",marginTop:"25px"}}>
           <Label>Telephone number</Label>
          <Input
          style={{marginTop:"25px", width:"100%"}}
           name='phonenumber'  
          value={user.phonenumber} 
          onChange={(e)=>handleChange(e)}  placeholder="phonenumber" /></div>
          <Button style={{marginTop:40, alignSelf:"flex-start"}} onClick={handleUpdate}>Update</Button>
        </UserBox>
    </UserDiv>
    </>
  )
}
