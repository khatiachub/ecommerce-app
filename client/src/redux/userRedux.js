import {createSlice} from '@reduxjs/toolkit'


const userReducer=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        registerUser:null,
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
       }

    }
})

export const {loginSuccess,registerSuccess,registerFailure}=userReducer.actions
export default userReducer.reducer