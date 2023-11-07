// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,  useNavigate, useParams } from 'react-router-dom'
import { userRequest } from '../requestMethods'
import styled from 'styled-components'


const SuccessVerify=styled.div`
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

export default function VerifyEmail() {
    const[validurl,setValidurl]=useState(false)
    const params=useParams()
    const nav=useNavigate()
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            nav('/login'); 
          }, 3000);
          return () => clearTimeout(timeoutId);
      
       },[nav])
    
    useEffect(()=>{
        const VerifyEmailUrl=async()=>{
            try{
                const url=`/auth/${params.id}/verify/${params.token}`
                const{data}=await userRequest.get(url)
                setValidurl(true)

            }catch(error){
                 setValidurl(false)
            }
        }
        VerifyEmailUrl()
    },[params])
  return (
    <>
        {validurl?
        <SuccessVerify>
            Email verified successfully
        </SuccessVerify>:<p>Error</p>}
    </>
  )
}
