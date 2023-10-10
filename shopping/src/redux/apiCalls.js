import {  loginSuccess,registerSuccess,loginFailure ,registerFailure} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import axios from "axios";



export const login = async (dispatch,user) => {
  try {
    const res = await publicRequest.post("/auth/signin",user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure)
  }
};

export const register = async (dispatch,formData,setSuccess) => {
  try {
    const res = await publicRequest.post("/auth/signup",formData);
    console.log(res.data);
    dispatch(registerSuccess(res.data));
    dispatch(registerSuccess(null));
  } catch (err) {
    console.log(err);
    dispatch(registerFailure);
  }
};

export const update=async(dispatch,id,user)=>{
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    if (res.status === 200) {
      dispatch(loginSuccess(res.data));
    } 
  } catch (err) {
    console.log(err);
  }
}

export const Delete=async(id)=>{
  try{
    const res=await userRequest.delete("/users/"+id)
    if (res.status === 200) {
      window.location.reload()
    } 
 }catch(err){
   console.log(err);
 }
}
export const DeleteImage=async(id)=>{
  try{
    const res=await userRequest.delete(`/users/${id}/image`)
    if (res.status === 200) {
      window.location.reload()
    } 
 }catch(err){
   console.log(err);
 }
}


