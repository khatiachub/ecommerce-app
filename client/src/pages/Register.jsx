import styled, {css} from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useRef, useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from '../images/avatar.png'
import { registerSuccess } from "../redux/userRedux";

const Container = styled.div`
  width: 100%;
  height:auto;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 50px 0px 50px 0px;
  @media screen and (max-width:768px) {
    width:70%;
  }
  @media screen and (max-width:485px) {
    width:90%;
  }

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position:relative;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  font-family: 'Roboto Condensed', sans-serif;
`;

const Button = styled.button`
  width: 40%;
  font-family: 'Roboto Condensed', sans-serif;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  @media screen and (max-width:568px) {
    width:60%;
  }
`;
const ImageButton=styled.button`
  width: 30%;
  border: none;
  padding: 10px 10px;
  background-color: teal;
  font-family: 'Roboto Condensed', sans-serif;
  color: white;
  margin-top:20px;
  @media screen and (max-width:768px) {
    width:40%;
  }
`
const Img=styled.img`
  border-radius:50%;
  width:110px;
  height:110px;
  margin-top:20px;
  object-fit:contain;
  ${({ src }) =>
    !src &&
    css`
      content: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    `}
`
const SuccessBox=styled.div`
  width:520px;
  height:350px;
  border-radius:5px;
  background-color:teal;
  position:absolute;
  top:30%;
  left:50%;
  transform:translate(-50%,-50%);
  display:flex;
  justify-content:center;
  align-items: center;
  padding-left:10px;
  padding-right:10px;
`

const Register = () => {
  const[name,setName]=useState("")
  const[lastname,setLastname]=useState("")
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmpassword,setConfirmpassword]=useState("")
  const[address,setAddress]=useState("")
  const[city,setCity]=useState("")
  const[phonenumber,setPhonenumber]=useState(null)
  const[image,setImage]=useState("")
  const ref=useRef(null)
  const error= useSelector((state) => state.user.error);
  const[success,setSuccess]=useState(false)

  const dispatch=useDispatch();
  const nav=useNavigate();

  const uploadImage=(e)=>{
    var reader=new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      setImage(reader.result)
    }
  }
  const handleClick=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('lastname', lastname);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmpassword', confirmpassword);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('phonenumber', phonenumber);
    formData.append('image', image);
    register(dispatch,formData,setSuccess)
  }


  useEffect(()=>{
    if(success){
      const timeoutId = setTimeout(() => {
        nav('/login'); 
        dispatch(registerSuccess({ registerUser: null}));
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
   },[success])

    const onImageClick=()=>{
      ref.current.click();
    }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <div style={{display:"flex", flexDirection:"column", alignItems:"baseline",justifyContent:"center"}}> 
        {<Img onClick={onImageClick} src={image?image:avatar}/>}
        <ImageButton onClick={() => document.querySelector('.uploadbutton').click()} >upload image</ImageButton>
        </div>
        <Form method="post" encType="multipart/form-data">
          <Input ref={ref} onChange={uploadImage} accept="image/*" className="uploadbutton" name="image"  style={{display:"none"}} type="file"/>
          <Input onChange={(e)=>setName(e.target.value)} placeholder="name" name="name"/>
          <Input onChange={(e)=>setLastname(e.target.value)} placeholder="last name" name="lastname"/>
          <Input onChange={(e)=>setUsername(e.target.value)} placeholder="username" name="username"/>
          <Input onChange={(e)=>setEmail(e.target.value)} placeholder="email" name="email"/>
          <Input onChange={(e)=>setPassword(e.target.value)} placeholder="password" name="password"/>
          <Input onChange={(e)=>setConfirmpassword(e.target.value)} placeholder="confirm password"name="confirmpassword" />
          <Input onChange={(e)=>setCity(e.target.value)} placeholder="city" name="city"/>
          <Input onChange={(e)=>setAddress(e.target.value)} placeholder="your address" name="address"/>
          <Input onChange={(e)=>setPhonenumber(e.target.value)} placeholder="phonenumber" name="phonenumber"/>
          {success&&<SuccessBox ><p style={{fontSize:35,color:"#fff",textAlign:"center"}}>You registered successfully! Please verify your account, link is sent to your email.</p></SuccessBox>}
          {error}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;