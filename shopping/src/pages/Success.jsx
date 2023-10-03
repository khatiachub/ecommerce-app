import React from 'react'
import { useLocation } from 'react-router-dom'
export default function Success() {
  const loc=useLocation()
  console.log(loc);
  return (
    <div>
      <h1>successfull payment</h1>
    </div>
  )
}
