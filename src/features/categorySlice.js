import { createSlice } from '@reduxjs/toolkit'
import { fetchCategory, fetchCategoryById } from '../utils/reduxThunk/commonThunk'

const initialState = {
  categoryData: [],
  categoryInputValue: '',
  isValidateError: true
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateACategoryInputValue: (state, { payload }) => {
      state.categoryInputValue = payload.data
    },
    updateIsValidateError: (state, { payload }) => {
      state.isValidateError = payload.data
    },
    resetCategory: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      state.categoryData = payload.data
    })
    builder.addCase(fetchCategoryById.fulfilled, (state, { payload }) => {
      state.categoryData = payload.data
    })
  }
})

export const { updateACategoryInputValue, updateIsValidateError, resetCategory } = categorySlice.actions

export default categorySlice.reducer
