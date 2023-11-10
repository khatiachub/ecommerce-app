import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, update, recoverPassword } from "../redux/apiCalls";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import { useForm } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';



const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: teal;
  @media screen and (max-width:970px) {
    width:30%;
  }
  @media screen and (max-width:815px) {
    width:45%;
  };
  @media screen and (max-width:600px) {
    width:60%;
  }
  @media screen and (max-width:485px) {
    width:85%;
  }
`;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
//   color:#fff;
//   font-family: 'Roboto Condensed', sans-serif;
// `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  font-family: 'Roboto Condensed', sans-serif;
  background-color: #57dfdf;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top:10px;
  &:disabled{
    color:green;
    cursor:not-allowed
  }
`;

const Links = styled(Link)`
  margin: 5px 0px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color:#fff;
`;
const Error=styled.p`
  color:red;
`
const Visibility=styled.div`
position: relative;
display:flex;
flex-direction:column;
  
`
const LinksPassword=styled.p`
   margin: 5px 0px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color:#fff;
`










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
// const Input=styled.input`
//   width:200px;
//   height:40px;
//   border-radius:5px;
//   border:1px solid #d3cbcb;
//   margin-top:25px;
//   font-family: 'Roboto Condensed', sans-serif;
// `
// const Button=styled.button`
//    width:200px;
//    height:40px;
//    border-radius:5px;
//    background-color:teal;
//    font-family: 'Roboto Condensed', sans-serif;
//    margin-top:25px;
//    border:none;
//    color:#fff;
//    font-size:17px;
// `


const Login = () => {
  const { register, handleSubmit,watch, reset, formState: { errors } } = useForm({ criteriaMode: "all" });
  const username=watch("username")
  const password=watch("password")
  const[errorMessage,setErrorMessage]=useState(false)
  const dispatch=useDispatch();
  const handleClick=()=>{
    if(username===''||password===''){
      return
    }else{
      login(dispatch,{username,password},setErrorMessage)
    }
    // UpdatePassword(dispatch,{username,password})
  }
  
  const userName=register("username",{required:true})
  const Password=register("password",{required:true})
  const[visible,setVisible]=useState(false)
  const[updatePassword,setUpdatePassword]=useState(true)
  const nav=useNavigate();
  const handlePasswordUpdate=()=>{
    // nav("/",{
    //   state:{updatePassword:updatePassword}
    // })
  }
  const loc=useLocation()
  const[sendemail,setSendemail]=useState(true)
  // const nav=useNavigate()
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
  const sendPasswordOnEmail=()=>{
    recoverPassword(email)
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(handleClick)}>
          <Input  {...userName} placeholder="username" style={{border:`${errors.username||username===''?'1px solid red':'1px solid grey'}`}}/>
          {errors.username&&<Error>This field is mandatory</Error>}
          <Visibility>
          <Input {...Password} style={{border:`${errors.password||password===''?'1px solid red':'1px solid grey'}`}}  placeholder="password" type={`${visible?'':"password"}`} />
          {visible?<VisibilityIcon style={{position:"absolute", right:20,top:15}} onClick={()=>setVisible(false)}/>:<VisibilityOffIcon style={{position:"absolute", right:20,top:15}} onClick={()=>setVisible(true)}/>}
          </Visibility>
          {errors.password&&<Error>This field is mandatory</Error>}
          {(password!==''&&username!=='')&&(errorMessage&&<Error>Wrong credentials!</Error>)}
          <Button onClick={handleClick} disabled={username===""||password===""}>LOGIN</Button>
          <LinksPassword onClick={handlePasswordUpdate} to='/'>DO NOT YOU REMEMBER THE PASSWORD?</LinksPassword>
          <Links to='/register'>CREATE A NEW ACCOUNT</Links>
        </Form>
      </Wrapper>
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
    </Container>
  );
};
export default Login;