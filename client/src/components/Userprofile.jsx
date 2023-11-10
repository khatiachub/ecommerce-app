import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userRedux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Register from '../pages/Register';
import { publicRequest, userRequest } from '../requestMethods';
import axios from 'axios';
import { Delete, update,DeleteImage} from '../redux/apiCalls';
import avatar from '../images/avatar.png'

const UserDiv=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:baseline;
  width:93.5%;
  margin:0 auto;
  @media screen and (max-width:562px) {
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
`

const UserBox=styled.form`
  width:60%;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width:870px) {
    width:95%;
  }
  
`
const UserName=styled.p`
  margin-top:15px;
  font-size:20px;
  font-weight:400;
   
`
const Button = styled.button`
  width: ${(props) => props.type === 'update'?'100%':'140px'};
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  margin-top:25px;
  height:auto;
`;


const UserImg=styled.img`
    
`
const Input=styled.input`
  border:none;
  border-bottom:1px solid grey;
  margin-top:10px;
  font-family: 'Roboto', sans-serif;
  word-break:break-all;

`
const Title=styled.h2`
  font-size:22px;
  margin-top:30px;
  font-family: 'Roboto', sans-serif;
  @media screen and (max-width:562px) {
   text-align:center;
  }
`
const Titlediv=styled.div`
  display:flex;
  width:100%;
  margin-top:50px;
  @media screen and (max-width:562px) {
   justify-content:center;
  }
`
const Label=styled.label`
  font-size:13px;
  font-family: 'Roboto', sans-serif;
`
const Img=styled.img`
  border-radius:50%;
  width:130px;
  height:130px;
  margin-top:25px;
  object-fit:cover;
`
const UserInput=styled.div`
  display:flex;
  flex-direction:column;
  margin-top:55px;
  width:45%;
`
const UserInputDiv=styled.div`
  display:flex;
  justify-content:space-between;
  width:100%;
`
const ButtonsBox=styled.div`
  display:flex;
  flex-direction:column;
  @media screen and (max-width:562px) {
    justify-content:center;
    align-items:center;    
    margin-top:30px;
  }
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

    const[isLoading,setIsLoading]=useState(true)
    const handleUpdate=()=>{
      update(dispatch,id,user)
    }
    useEffect(() => {
      async function fetchData(){
        try{
        const response=await userRequest.get(`users/find/${loginUser._id}`)
        setUser(response.data);
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
        setUser({...user,image:reader.result})
      }
    }
    const deleteImage=()=>{
      DeleteImage(id)
    }
    const Name=user.name.toLocaleUpperCase()
    const Surname=user.lastname.toLocaleUpperCase()
   
  return (
    <>
    <UserDiv>
      <ButtonsBox>
      <Title>HELLO, {Name} {Surname}</Title>
      <Img onClick={onImageClick} src={user?.image?user?.image:avatar}/>
      <input style={{display:"none"}} ref={ref} type='file' onChange={handleImageChange}/>
      <Button style={{marginBottom:25}} onClick={deleteImage}>delete profile picture</Button>
      <Button style={{marginBottom:25}} onClick={handleClick}>Logout</Button>
      <Button  onClick={(e)=>handleDelete(e)}>Delete account</Button>
      </ButtonsBox>
        <UserBox >
          <Titlediv >
              <Title>YOUR PERSONAL DETAILS</Title>
          </Titlediv>
          <UserInputDiv >
          <UserInput >
          <Label>Name</Label>
          <Input name='name' 
          value={user.name} 
          onChange={(e)=>handleChange(e)} placeholder="name" />
          </UserInput>
          <UserInput >
          <Label>Surname</Label>
          <Input name='lastname' 
          value={user.lastname} 
          onChange={(e)=>handleChange(e)}  placeholder="last name" />
          </UserInput>
          </UserInputDiv>
          <UserInputDiv >
          <UserInput >
          <Label>Username</Label>
          <Input name='username'   
          value={user.username} 
          onChange={(e)=>handleChange(e)}  placeholder="username" />
          </UserInput>
           <UserInput >
           <Label>Email</Label>
          <Input name='email'  
          value={user.email} 
          onChange={(e)=>handleChange(e)}  placeholder="email" />
          </UserInput>
          </UserInputDiv>
          <div >
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
          <UserInputDiv >
          <UserInput >
          <Label>City</Label>
          <Input name='city'  
          value={user.city} 
          onChange={(e)=>handleChange(e)}  placeholder="city" />
          </UserInput>
           <UserInput >
           <Label>Address</Label>
          <Input name='address'  
          value={user.address} 
          onChange={(e)=>handleChange(e)}  placeholder="your address" />
          </UserInput>
          </UserInputDiv>
           <UserInputDiv style={{display:"flex", flexDirection:"column", width:"100%",marginTop:"25px"}}>
           <Label>Telephone number</Label>
          <Input
          style={{marginTop:"25px", width:"100%"}}
           name='phonenumber'  
          value={user.phonenumber} 
          onChange={(e)=>handleChange(e)}  placeholder="phonenumber" />
          </UserInputDiv>
          <Button type='update' style={{marginTop:55, alignSelf:"flex-start"}} onClick={handleUpdate}>Update</Button>
        </UserBox>
    </UserDiv>
    </>
  )
}
