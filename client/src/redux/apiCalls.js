import {  loginSuccess,registerSuccess,loginFailure ,registerFailure,recoverPassword} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { addProductId } from "./cartRedux";



export const login = async (dispatch,user,setErrorMessage) => {
  try {
    const res = await publicRequest.post("/auth/signin",user);
    dispatch(loginSuccess(res.data));
    if (res.status === 200) {
      window.location.reload()
    } 
  } catch (err) {
    setErrorMessage(true)
  }
};
export const recover = async (dispatch,email,setSendemail)=>{
  try{
    const res=await publicRequest.post("/auth/sendemail",{email:email},{ headers: { 'Content-Type': 'application/json' }})
    // if (res.status === 200) {
    //   window.location.reload()
      setSendemail(false)
      console.log(res.data);
      dispatch(recoverPassword(res.data));

    // }     
  }catch(err){
    console.log(err);
  }
}


export const registerUser = async (dispatch,formData,setSuccess) => {
  try {
    const res = await publicRequest.post("/auth/signup",formData);
    console.log(res.data);
    dispatch(registerSuccess({ registerUser: res.data }));
    setSuccess(true)
  } catch (err) {
    dispatch(registerFailure);
  }
};

export const update=async(dispatch,id,user)=>{
  try {
    const res = await userRequest.put(`/users/${id}`, user);
      // dispatch(loginSuccess(res.data));
      window.location.reload()
  } catch (err) {
    console.log(err);
    console.log('araaaaaaa');
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
// export const addToCart=async(data,dispatch)=>{
//   try{
//     const res=await userRequest.post("/carts/",data)
//     console.log(res.data);
//     dispatch(addProductId(res.data))
//   }catch(err){
//     console.log(err);
//   }
// }

// export const deleteProduct=async(productId)=>{
//   try{
//     const res=await userRequest.delete(`/carts/${productId}`)
//     // console.log(res);

//   }catch(err){
//     // console.log(err);
//   }
// }


