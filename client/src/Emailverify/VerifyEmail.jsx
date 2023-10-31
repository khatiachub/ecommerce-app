// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { userRequest } from '../requestMethods'



export default function VerifyEmail() {
    const[validurl,setValidurl]=useState(false)
    const params=useParams()
    console.log(params);
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
                console.log(data);
                setValidurl(true)

            }catch(error){
                 console.log(error);
                 setValidurl(false)
            }
        }
        VerifyEmailUrl()
    },[params])
  return (
    <>
        {validurl?
        <div>
            <h1>Email verified successfully</h1>
        </div>:
        <p>404 NOT FOUND</p>}
    </>
  )
}
