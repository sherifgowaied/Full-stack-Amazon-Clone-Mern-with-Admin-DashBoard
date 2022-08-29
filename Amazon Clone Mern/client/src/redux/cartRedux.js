import {createSlice} from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
        state.quantity += 1
        state.products.push(action.payload)
        state.total += action.payload.price * action.payload.quaninty
    },
        removeProduct:(state,action)=>{
        state.quantity = state.quantity > 0 ? state.quantity - 1 :  state.quantity
        state.products=state.products.filter((product)=>product._id !==action.payload.product._id)
        state.total -= state.total > 0 ? action.payload.product.price * action.payload.product.quaninty :state.total
    }
     }
})

export const {addProduct,removeProduct} = cartSlice.actions;
export default cartSlice.reducer