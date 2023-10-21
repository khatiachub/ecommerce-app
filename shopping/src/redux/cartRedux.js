import {createSlice} from '@reduxjs/toolkit'


const cartSlice=createSlice({
    name:'card',
    initialState:{
        products:[],
        quantity:0,
        total:0,
        setcolor:''
    },
    reducers:{
        addProduct: (state,action)=>{
            state.quantity+=action.payload.quantity;
            state.products.push(action.payload)
            state.total+=action.payload.price*action.payload.quantity
            state.setcolor=action.payload
        }
    }
})

export const {addProduct}=cartSlice.actions
export default cartSlice.reducer