import styled, {css} from "styled-components";
import { mobile } from "../responsive";
import { useEffect, useRef, useState } from "react";
import { login, registerUser } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from '../images/avatar.png'
import { registerSuccess } from "../redux/userRedux";
import { useForm } from 'react-hook-form'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ErrorMessage } from '@hookform/error-message';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { publicRequest, userRequest } from "../requestMethods";


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
  width:45%;
  height:350px;
  border-radius:5px;
  background-color:teal;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  display:flex;
  justify-content:center;
  align-items: center;
  padding-left:15px;
  padding-right:15px;
  font-size:30px;
  text-align:center;
  color:#fff;
  @media screen and (max-width:768px) {
    font-size:20px;
    width:75%;
  }
`
const ErrorFields=styled.div`
  min-width:50%;
  position: relative;
  @media screen and (max-width:1032px) {
    width:100%;
  }
`
const Input = styled.input`
  min-width: 85%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const ErrorMessages=styled.p`
  color:red;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top:10px;
  font-size:12px;
`
const Visible=styled.div`
  position:absolute;
  right:25px;
  top:26px;
  @media screen and (max-width:1032px) {
    right:45px;
  }
  @media screen and (max-width:768px) {
    right:65px;
  }
  @media screen and (max-width:600px) {
    right:45px;
  }
`

const Register = () => {
  const { register, handleSubmit,watch, reset, formState: { errors } } = useForm({ criteriaMode: "all" });
  const name=watch("name")
  const lastname=watch("lastname")
  const username=watch("username")
  const email=watch("email")
  const password=watch("password")
  const confirmpassword=watch("confirmpassword")
  const address=watch("address")
  const city=watch("city")
  const phonenumber=watch("phonenumber")


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

    const firstName = register('name', { required: true, 
      pattern:{
        value:/^[A-Za-zა-ჰ]+$/i,
        message:"Only symbols are allowed"
      }})
    const lastName = register('lastname', { required: true, 
      pattern:{
        value:/^[A-Za-zა-ჰ]+$/i,
        message:"Only symbols are allowed"
      }})
    const userName = register('username', { required: true,  minLength: 2 })
    const Email = register('email', {
      required: true,
      pattern: {
        value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
        message: "Invalid email address",
      },
      minLength: 2,
    });
    
    const Password = register('password', {
       required: true, 
       pattern: {
        value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-Z0-9@#$%^&+=!]).{8,}$/,
        message:"Password is too weak!"
       },
        minLength: 8 })
    const confirmPassword = register('confirmpassword', { required: true })
    const Number = register('phonenumber', { required: true, pattern: {
      value:/^(\+?995)?(79\d{7}|5\d{8})$/,
      message:"Invalid mobile number"
    }})
    const Address = register('address', { required: true, minLength: 2 })
    const City = register('city', { required: true, pattern:{
      value: /^[A-Za-z]+$/i,
      message:"Only symbols are allowed"
    }, minLength: 2 })
    const[visiblePassword,setVisiblePassword]=useState(false)
    const[visibleConfirm,setVisibleConfirm]=useState(false)
    const handleClick=()=>{
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
      if(password!==confirmpassword){
        return
      }else{
        registerUser(dispatch,formData,setSuccess)
      }
      console.log(formData);
    }
    const[Emails,setEmails]=useState('')
    const loginUser = useSelector((state) => state.user?.currentUser);
    useEffect(() => {
      async function fetchData(){
        try{
        const response=await publicRequest.get("users")
        setEmails(response.data);
        } catch(error){
          console.error('Error fetching data:', error);
        };
      }
        fetchData();
    },[]); 
    const userEmail=Emails&&Emails.map((email)=>(
      email.email
    ))
    const filteredEmail=userEmail&&userEmail.filter((emails)=>(emails===email))

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <div style={{display:"flex", flexDirection:"column", alignItems:"baseline",justifyContent:"center"}}> 
        {<Img onClick={onImageClick} src={image?image:avatar}/>}
        <ImageButton onClick={() => document.querySelector('.uploadbutton').click()} >upload image</ImageButton>
        </div>
        <Form onSubmit={handleSubmit(handleClick)}>
          <Input 
          ref={ref} onChange={uploadImage} 
          accept="image/*" 
          className="uploadbutton" 
          name="image"  
          style={{display:"none"}} 
          type="file"/>
          <ErrorFields>
          <Input 
          className=""
          {...firstName}
          placeholder="name" 
          name="name"
          style={{border:`${errors.name||name===''?'1px solid red':'1px solid grey'}`}}
          />
          {name===''&&<ErrorMessages>this field is required!</ErrorMessages>}
          <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <ErrorMessages key={type}>{message}</ErrorMessages>
                ))
              }
          />
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...lastName}
          placeholder="last name" 
          name="lastname"
          style={{border:`${errors.lastname||lastname===''?'1px solid red':'1px solid grey'}`}}
          />
           {lastname===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           <ErrorMessage
              errors={errors}
              name="lastname"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                 <ErrorMessages key={type}>{message}</ErrorMessages>
              ))
              }
          />
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...userName}
          placeholder="username" 
          name="username"
          style={{border:`${errors.username||username===''?'1px solid red':'1px solid grey'}`}}
          />
           {username===''&&<ErrorMessages>this field is required!</ErrorMessages>}
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...Email}
          placeholder="email" 
          name="email"
          style={{border:`${errors.email||email===''?'1px solid red':'1px solid grey'}`}}
          />
           {email===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           {(filteredEmail[0]&&filteredEmail[0])&&<ErrorMessages>An account already exists with this email</ErrorMessages>}
           <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <ErrorMessages key={type}>{message}</ErrorMessages>
                ))
              }
          />
          </ErrorFields>
          <ErrorFields>
          <Input 
          type={`${visiblePassword?'':'password'}`}
          {...Password}
          placeholder="password" 
          name="password"
          style={{border:`${errors.password||password===''?'1px solid red':'1px solid grey'}`}}
          />
           {password===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <ErrorMessages key={type}>{message}</ErrorMessages>
                ))
              }
          />
          <Visible>
          {visiblePassword?<VisibilityIcon  onClick={()=>setVisiblePassword(false)}/>:<VisibilityOffIcon onClick={()=>setVisiblePassword(true)}/>}
           </Visible>
          </ErrorFields>
          
          <ErrorFields>
          <Input 
          type={`${visibleConfirm?'':'password'}`}
          {...confirmPassword}
          placeholder="confirm password"
          name="confirmpassword" 
          style={{border:`${errors.confirmpassword||confirmpassword===''?'1px solid red':'1px solid grey'}`}}
          />
          <Visible>
           {visibleConfirm?<VisibilityIcon  onClick={()=>setVisibleConfirm(false)}/>:<VisibilityOffIcon onClick={()=>setVisibleConfirm(true)}/>}
           </Visible>
           {confirmpassword===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           {<ErrorMessages>{password===confirmpassword||confirmpassword===''?'':'passwords did not match'}</ErrorMessages>}
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...City}
          placeholder="city" 
          name="city"
          style={{border:`${errors.city||city===''?'1px solid red':'1px solid grey'}`}}
          />
           {city===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           <ErrorMessage
              errors={errors}
              name="city"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <ErrorMessages key={type}>{message}</ErrorMessages>
                ))
              }
          />
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...Address}
          placeholder="your address" 
          name="address"
          style={{border:`${errors.address||address===''?'1px solid red':'1px solid grey'}`}}
          />
           {address===''&&<ErrorMessages>this field is required!</ErrorMessages>}
          </ErrorFields>
          <ErrorFields>
          <Input 
          {...Number}
          placeholder="phonenumber" 
          name="phonenumber"
          style={{border:`${errors.phonenumber||phonenumber===''?'1px solid red':'1px solid grey'}`}}
          />
           {phonenumber===''&&<ErrorMessages>this field is required!</ErrorMessages>}
           <ErrorMessage
              errors={errors}
              name="phonenumber"
              render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <ErrorMessages key={type}>{message}</ErrorMessages>
                ))
              }
          />
          </ErrorFields>
          {success&&<SuccessBox ><p>You registered successfully! Please verify your account, link is sent to your email.</p></SuccessBox>}
          {error}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;