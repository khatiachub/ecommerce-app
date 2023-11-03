import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import { useForm } from 'react-hook-form'


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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color:#fff;
  font-family: 'Roboto Condensed', sans-serif;
`;

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

const Login = () => {
  const { register, handleSubmit,watch, reset, formState: { errors } } = useForm({ criteriaMode: "all" });
  const username=watch("username")
  const password=watch("password")
  const[errorMessage,setErrorMessage]=useState(false)
  const dispatch=useDispatch();
  const handleClick=()=>{
    login(dispatch,{username,password},setErrorMessage)
    // UpdatePassword(dispatch,{username,password})
  }
  
  const userName=register("username",{required:true})
  const Password=register("password",{required:true})
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(handleClick)}>
          <Input  {...userName} placeholder="username" style={{border:`${errors.username||username===''?'1px solid red':'1px solid grey'}`}}/>
          {errors.username&&<Error>This field is mandatory</Error>}

          <Input {...Password} style={{border:`${errors.password||password===''?'1px solid red':'1px solid grey'}`}}  placeholder="password" type="password" />
          {errors.password&&<Error>This field is mandatory</Error>}
          {errorMessage&&password!==''||username!==''?<Error>Wrong credentials!</Error>:''}
          <Button onClick={handleClick} disabled={username===""||password===""}>LOGIN</Button>
          <Links to='/updatepassword'>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Links to='/register'>CREATE A NEW ACCOUNT</Links>
        </Form>
      </Wrapper>
    </Container>
  );
};
export default Login;