import { createSlice } from '@reduxjs/toolkit'
import { fetchAllAdminUserList, loginUsers } from '../utils/reduxThunk/commonThunk'

const initialState = {
  isUserAuthenticated: false,
  isSettingPopup: false,
  isChangePassword: false,
  userToken: '',
  userInfo: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : '',
  userList: [],
  filteredUserList: [],
  isDisabled: true,
  newAdmin: {
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    password: '',
    account_name: '',
    institute_name: '',
    designation: '',
    user_role: '',
  }
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
    },
    UpdateAdminData: (state, { payload }) => {
      if (payload.key !== undefined) {
        state[payload.classKey][payload.key] = payload.value
      } else {
        state[payload.classKey] = payload.value
      }
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

export const { handleUserAuthentication, updateUserToken, updateUserInfo, updateUserList, updatefilteredUserList, UpdateAdminData } = userSlice.actions

export default userSlice.reducer
