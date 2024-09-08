import { createSlice } from '@reduxjs/toolkit'
import { fetchAllAdminUserList, loginUsers } from '../utils/reduxThunk/commonThunk'

const initialState = {
  isUserAuthenticated: false,
  userToken: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  userInfo: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : '',
  userList: [],
  filteredUserList: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleUserAuthentication: (state, { payload }) => {
      state.isUserAuthenticated = payload.flag
    },
    updateUserToken: (state, { payload }) => {
      state.userToken = payload.token
    },
    updateUserInfo: (state, { payload }) => {
      state.userInfo = payload.userInfo
    },
    updateUserList: (state, { payload }) => {
      state.userList = payload.userList
    },
    updatefilteredUserList: (state, { payload }) => {
      state.filteredUserList = payload.filteredUserList
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUsers.fulfilled, (state, { payload }) => {
      if (payload.status === 1) {
        state.userToken = payload.userToken
        state.userInfo = payload.userInfo
      }
    })
    builder.addCase(fetchAllAdminUserList.fulfilled, (state, { payload }) => {
      if (payload.success === 1) {
        state.userList = payload.userlist
        state.filteredUserList = payload.userlist.filter((user) => user.user_status.toLowerCase() === 'inactive')
      }
    })
  }
})

export const { handleUserAuthentication, updateUserToken, updateUserInfo, updateUserList, updatefilteredUserList } = userSlice.actions

export default userSlice.reducer
