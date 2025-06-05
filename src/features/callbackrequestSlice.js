import { createSlice } from '@reduxjs/toolkit'
import { constants } from '../utils/constants'
import { fetchAllCallbackRequestList, fetchCallbackRequestDetailsByEmail } from '../utils/reduxThunk/callbackrequestThunk'
import { deepParseTypedJSON } from '../utils/deepParseTypedJSON'

const initialState = {
  getAllCallbackRequestList: [],
  userQueryDetails: []
}
function filterUniqueUser(data) {
  return data.reduce((acc, item) => {
    if (!acc.some((obj) => obj.email === item.email)) {
      acc.push(item)
    }
    return acc
  }, [])
}
const feedbackSlice = createSlice({
  name: 'callbackrequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCallbackRequestList.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        const callbackRequestList = payload.data.map((callbackRequest) => deepParseTypedJSON(callbackRequest))
        const uniqueUsers = filterUniqueUser(callbackRequestList)
        state.getAllCallbackRequestList = uniqueUsers
      }
    })
    builder.addCase(fetchCallbackRequestDetailsByEmail.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        state.userQueryDetails = payload.data.map((callbackRequest) => deepParseTypedJSON(callbackRequest))
      }
    })
  }
})

export const {} = feedbackSlice.actions
export default feedbackSlice.reducer
