import { createSlice } from "@reduxjs/toolkit";

const navbar=createSlice({
    name:"navbar",
    initialState:false,
    reducers:{
        setNavbar(state,action){
            state=action.payload;
            return state;
        }
    }
})

export default navbar.reducer;

export const {setNavbar} = navbar.actions;

