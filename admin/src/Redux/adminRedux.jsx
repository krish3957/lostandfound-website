import {createSlice} from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name:'admin',
    initialState:{
        isAdmin:false
    },
    reducers:{
        loggingIn:(state)=>{
            state.isAdmin = true;
        },

        loggingOut:(state)=>{
            state.isAdmin = false;
        }
    }
})

export const {loggingIn,loggingOut} = adminSlice.actions;

export default adminSlice.reducer;

