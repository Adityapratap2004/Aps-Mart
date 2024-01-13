import { createSlice } from "@reduxjs/toolkit";

const toastify=createSlice({
    name:"Toastify",
    initialState:{show:false,msg:""},
    reducers:{
        setToastify(state,action){
            state.show=action.payload.show;
            state.msg=action.payload.msg;
            return state;
        }
    }
})

export default toastify.reducer
export const {setToastify}=toastify.actions