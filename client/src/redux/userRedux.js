import {createSlice} from '@reduxjs/toolkit'


const userReducer=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        registerUser:null,
        recoverPassword:null
    },
    reducers:{
       loginSuccess:(state,action)=>{
        state.currentUser=action.payload
       },
       registerSuccess:(state,action)=>{
        state.registerUser=action.payload
       },
       registerFailure:(state,action)=>{
        state.error=true
       },
       recoverPassword:(state,action)=>{
        state.passwordChange=action.payload
       },

    }
})

export const {loginSuccess,registerSuccess,registerFailure,recoverPassword}=userReducer.actions
export default userReducer.reducer