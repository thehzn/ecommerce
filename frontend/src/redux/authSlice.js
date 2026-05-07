import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "../utils/storageHandler";

const initialUser = loadUser();

const slice=createSlice({
    name:'auth',
    initialState:{
        user: initialUser,
        // If initialUser exists, they are authenticated
        isAuthenticated: !!initialUser,
        allUsers: [],
    },

reducers:{
    register(state,action){
        state.user=action.payload;
        //  localStorage.setItem('user',JSON.stringify(action.payload));
        state.isAuthenticated = true;
        localStorage.setItem('user',JSON.stringify(action.payload));
    },
    login(state,action){
        state.user=action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user',JSON.stringify(action.payload));
    },  
    logout(state){
        state.user=null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
            state.user =action.payload;
            
            localStorage.setItem('user', JSON.stringify(state.user));
    },
    setUsers:(state,action)=>{
        state.allUsers=action.payload;
        localStorage.setItem('users',JSON.stringify(state.user));
    },
    updateUserStatus:(state,action)=>{
        const userIndex =state.allUsers.findIndex((u)=>u._id ===action.payload._id);
        if(userIndex !== -1){
            state.allUsers[userIndex]= action.payload;
        }
        if (state.user && state.user._id === action.payload._id) {
        state.user = action.payload;
    }
    }

}

});

export const { register, login, logout,updateProfile,setUsers,updateUserStatus } = slice.actions;
export default slice.reducer;