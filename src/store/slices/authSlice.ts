import {createSlice} from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:'auth',
    initialState:{
        isAuth: Boolean(localStorage.getItem("username")&&localStorage.getItem("RE_LOGIN_CODE"))
    },
    reducers:{
        setAuth(state){
            state.isAuth=true;
        },
        clearAuth(state){
            state.isAuth=false;
        }
    }
});
export const {setAuth, clearAuth}=authSlice.actions;
export default authSlice.reducer;