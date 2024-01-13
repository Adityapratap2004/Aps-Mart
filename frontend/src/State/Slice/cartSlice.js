import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        setCart(state,action){
            state=action.payload;
            return state;
        },
        addCart(state,action){
            console.log("ADD TO CART");
            state=[...state,action.payload];
            console.log(state);
            return state;
        },
        deleteCart(state,action){
            state=state.filter(c=> c._id!==action.payload);
            return state;
        },
        updateCart(state,action){
            for(var item in state){
                if(state[item]._id===action.payload.id){                    
                    state[item].qty=action.payload.qty;
                }
            }
            return state;
        }
    }
})

export default cartSlice.reducer;

export const {setCart,updateCart,deleteCart,addCart} = cartSlice.actions;

