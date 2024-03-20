import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";

const initialState = {
  isUserAuthenticated: false,
  userToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userInfo:localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : ''
 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      handleUserAuthentication: (state, { payload }) => {
          state.isUserAuthenticated = payload.flag;
    },
    updateUserToken: (state, { payload }) => {
          state.userToken = payload.token;
    },
    updateUserInfo: (state, { payload }) => {
          state.userInfo = payload.userInfo;
    }
   

  },
});

export const { 
    handleUserAuthentication,updateUserToken,updateUserInfo
 } = userSlice.actions;

export default userSlice.reducer;