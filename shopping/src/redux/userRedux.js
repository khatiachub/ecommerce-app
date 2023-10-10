import {createSlice} from '@reduxjs/toolkit'


const userReducer=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        registerUser:null,
        error:null
    },
    reducers:{
    //    loginStart:(state)=>{
    //     state.isFetching=true
    //    },
       loginSuccess:(state,action)=>{
        state.currentUser=action.payload
       },
       registerSuccess:(state,action)=>{
        state.registerUser=action.payload
       },
       registerFailure:(state,action)=>{
        state.error=true
       },
       loginFailure:(state)=>{
        state.error='wrong credentials'
       }

    }
})



export const {loginSuccess,registerSuccess,loginFailure,registerFailure}=userReducer.actions
export default userReducer.reducer