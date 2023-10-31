import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
    name:'card',
    initialState:{
        products:[],
        quantity:0,
        total:0,
        productId:'',
        wishlist:[],
        favQuantity:0
    },
    reducers:{
        addProduct: (state,action)=>{
            state.quantity+=action.payload.quantity;
            state.products.push(action.payload)
            state.total+=action.payload.price*action.payload.quantity
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            state.productId=''
          },
          addProductId:(state,action)=>{
            state.productId=action.payload
        },
        removeProduct: (state, action) => {
            const indexToRemove = action.payload;
            const productToRemove = state.products[indexToRemove];
            if (productToRemove) {
              if(state.quantity>1){
                state.quantity -= productToRemove.quantity;
              }
              state.total -= productToRemove.price * productToRemove.quantity;
              state.products.splice(indexToRemove, 1);
            }
          },
          decrementItem: (state, action) => {
            const indexToDecrement = action.payload;
            const productToDecrement = state.products[indexToDecrement];
            if (productToDecrement) {
                if (productToDecrement.quantity > 1) {
                    productToDecrement.quantity -= 1;
                  state.quantity -= 1;
                  state.total -= productToDecrement.price;
                }
            }
        },
        incrementItem:(state,action)=>{
            const indexToIncrement=action.payload;
            const productToIncrement=state.products[indexToIncrement];
            productToIncrement.quantity+=1;
            state.quantity+=1
            state.total+=productToIncrement.price
        },
        addtoWishlist: (state,action)=>{
          state.wishlist.unshift({...action.payload,favorite:true});
          state.favQuantity+=1
        },
        removeFromWishlist: (state,action)=>{
          const index=action.payload;
          state.wishlist.splice(index,1)
          if(state.favQuantity>0){
            state.favQuantity-=1
          }
        },
        clearWishlist:(state,action)=>{
          state.wishlist=[]
          state.favQuantity=0
        },
}
})

export const {clearWishlist,addProduct,clearCart,addProductId,removeProduct,decrementItem,incrementItem,addtoWishlist,removeFromWishlist}=cartSlice.actions
export default cartSlice.reducer