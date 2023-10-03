import {  loginSuccess,registerSuccess,loginFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";



export const login = async (dispatch,user) => {
  try {
    const res = await publicRequest.post("/auth/signin",user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(loginFailure)
  }
};

export const register = async (dispatch,user,nav) => {
  try {
    const res = await publicRequest.post("/auth/signup",user);
    dispatch(registerSuccess(res.data));
    dispatch(registerSuccess(null),nav);
  } catch (err) {
    console.log(err);
  }
};

export const update=async(dispatch,id,user,nav,token)=>{
  try {
    const res = await publicRequest.put(`/users/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      // Successful response
      dispatch(loginSuccess(res.data.data));
      nav("/"); // Navigate to the desired route upon success
    } else {
      // Handle other status codes or errors here
      console.log("Request failed with status code:", res.status);
    }

    console.log(res.data,"dataaaaaaaa");
  } catch (err) {
    console.log(err);
  }
}

export const Delete=async(id,token)=>{
  try{
    await publicRequest.delete("/users/"+id,id,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
   })
    window.location.reload()
    
    console.log(token);

 }catch(err){
   console.log(err);
 }
}

