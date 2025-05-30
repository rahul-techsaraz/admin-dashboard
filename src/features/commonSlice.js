import { isPending, isRejected, isFulfilled, createSlice } from '@reduxjs/toolkit'
import { fetchAllUsersList, fetchUserByEmail } from '../utils/reduxThunk/commonThunk'

const initialState = {
  isLoading: false,
  isError: false,
  isOpenToast: false,
  errorMessage: '',
  errorType: '',
  getAllUsersList: [],
  userDetailsByEmail: []
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateLoader: (state, { payload }) => {
      state.isLoading = payload.flag
    },
    updateError: (state, { payload }) => {
      state.errorType = payload.errorType
      state.errorMessage = payload.errorMessage
      state.isOpenToast = payload.flag
      state.isError = payload.flag
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsersList.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.getAllUsersList = payload.userlist ?? []
    }),
      builder.addCase(fetchUserByEmail.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.userDetailsByEmail = payload?.data ?? []
      }),
      builder
        .addMatcher(isPending, (state) => {
          state.isLoading = true
        })
        .addMatcher(
          (action) => isFulfilled(action),
          (state) => {
            state.isLoading = false
          }
        )
        .addMatcher(
          (action) => isRejected(action),
          (state, action) => {
            state.isLoading = false
            state.isError = true
            state.errorMessage = action?.payload?.message ?? 'Something went wrong . Please try again'
            state.errorType = 'error'
          }
        )
  }
})
export const { updateLoader, updateError } = commonSlice.actions
export default commonSlice.reducer
