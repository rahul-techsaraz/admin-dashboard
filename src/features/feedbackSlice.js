import { createSlice } from '@reduxjs/toolkit'
import { fetchAllFeedbackList, fetchFeedbackByEmail } from '../utils/reduxThunk/feedbackThunk'
import { constants } from '../utils/constants'
import { json } from 'react-router-dom'

const initialState = {
  allfeedbackList: [],
  feedback: []
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFeedbackList.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        state.allfeedbackList = payload.data.map((userFeedback) => ({ ...userFeedback, feedback: JSON.parse(userFeedback.feedback) }))
      }
    })
    builder.addCase(fetchFeedbackByEmail.fulfilled, (state, { payload }) => {
      console.log(payload)
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        state.feedback = payload.data.map((userFeedback) => ({ ...userFeedback, feedback: JSON.parse(userFeedback.feedback) }))
      }
    })
  }
})

export const {} = feedbackSlice.actions
export default feedbackSlice.reducer
