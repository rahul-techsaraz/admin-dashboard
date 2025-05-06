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
import newCoursesSlice from '../features/newCoursesSlice'
import newExamSlice from '../features/newExamSlice'

const loggerMiddleware = store => next => action => {
  console.log('Dispatching action:', action.type);
  console.trace();  // Shows the call stack to see which file/component called it
  return next(action);
};
const reducers = combineReducers({
  user: userSlice,
  subheadermenu: subHeaderMenuSlice,
  category: categorySlice,
  exam: examSlice,
  common: commonSlice,
  course: courseSlice,
  college: collegeSlice,
  newCollege: newCollegeSlice,
  feedback: feedbackSlice,
  newCourses: newCoursesSlice,
  newExam: newExamSlice
})
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})



export default store
