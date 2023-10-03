import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuccessRegister() {
   const nav=useNavigate()
   useEffect(()=>{
    const timeoutId = setTimeout(() => {
        nav('/login'); 
      }, 5000);
      return () => clearTimeout(timeoutId);
  
   },[nav])

  return (
    <p style={{textAlign:'center', marginTop:50, color:"green",fontSize:30}}>
        Congratulations! you registered successfully!
    </p>
  )
}
