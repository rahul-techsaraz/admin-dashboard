import { configureStore, combineReducers } from '@reduxjs/toolkit'
import categorySlice from '../features/categorySlice'
import subHeaderMenuSlice from '../features/subHeaderMenuSlice'
import examSlice from '../features/examSlice'
import userSlice from '../features/userSlice'
import commonSlice from '../features/commonSlice'
import courseSlice from '../features/courseSlice'
import collegeSlice from '../features/collegeSlice'
import feedbackSlice from '../features/feedbackSlice'
import newCollegeSlice from '../features/newCollegeSlice'

const reducers = combineReducers({
  user: userSlice,
  subheadermenu: subHeaderMenuSlice,
  category: categorySlice,
  exam: examSlice,
  common: commonSlice,
  course: courseSlice,
  college: collegeSlice,
  newCollege: newCollegeSlice,
  feedback: feedbackSlice
})
const store = configureStore({
  reducer: reducers
})

export default store
