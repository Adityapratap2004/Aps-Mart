import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:[],
    reducers:{
        setProduct(state,action){
            state=action.payload
            return state
        },
        addProduct(state,action){
            state=[...state,action.payload];
            return state
        },
        deleteProduct(state,action){
            state=state.filter(p=> p._id!==action.payload);
            return state            
        }

    }
    
})


export default productSlice.reducer

export const {setProduct,addProduct,deleteProduct}=productSlice.actions
