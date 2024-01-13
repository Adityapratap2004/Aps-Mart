import { createSlice } from "@reduxjs/toolkit";

const category=createSlice({
    name:"category",
    initialState:[],
    reducers:{
        setCategory(state,action){
            state=action.payload;
            return state;
        }
    }
})

export default category.reducer;

export const {setCategory} = category.actions;

