import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categorySlice from '../features/categorySlice'
import subHeaderMenuSlice from '../features/subHeaderMenuSlice'
import examSlice from '../features/examSlice'
import userSlice from '../features/userSlice'
import commonSlice from '../features/commonSlice'
import courseSlice from '../features/courseSlice'
import collegeSlice from '../features/collegeSlice'
import feedbackSlice from '../features/feedbackSlice'
const reducers = combineReducers({
  user: userSlice,
  subheadermenu: subHeaderMenuSlice,
  category: categorySlice,
  exam: examSlice,
  common: commonSlice,
  course: courseSlice,
  college: collegeSlice,
  feedback: feedbackSlice
})
const store = configureStore({
  reducer: reducers
})

export default store
